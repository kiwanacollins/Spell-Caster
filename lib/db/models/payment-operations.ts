import { getMongoClient } from '../mongodb';
import {
  Payment,
  PaymentStatus,
  PaymentPlanType,
  createPayment,
  createInstallmentSchedule,
  isPaymentOverdue,
  getDaysOverdue,
  getPaymentProgress,
} from './payment';
import { ObjectId } from 'mongodb';

const PAYMENT_COLLECTION = 'payments';

/**
 * Create a new payment record
 */
export async function createPaymentRecord(
  userId: string,
  serviceRequestId: string,
  serviceName: string,
  serviceType: string,
  totalAmount: number,
  paymentPlanType: PaymentPlanType = 'one_time',
  dueDate?: Date,
  paymentMethod: string = 'card'
): Promise<Payment> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const paymentsCollection = db.collection<Payment>(PAYMENT_COLLECTION);

  const payment = createPayment(
    userId,
    serviceRequestId,
    serviceName,
    serviceType,
    totalAmount,
    paymentPlanType,
    dueDate,
    paymentMethod
  );

  // Create installment schedule if service cost > $200
  if (totalAmount > 200 && paymentPlanType === 'installment') {
    const numberOfInstallments = Math.ceil(totalAmount / 100); // Default: ~$100 per installment
    payment.installments = createInstallmentSchedule(numberOfInstallments, totalAmount);
    payment.currentInstallmentNumber = 1;
    payment.status = 'scheduled'; // Not yet due
  }

  const result = await paymentsCollection.insertOne(payment);
  payment._id = result.insertedId;
  return payment;
}

/**
 * Get all pending payments for a user
 */
export async function getUserPendingPayments(userId: string): Promise<Payment[]> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const paymentsCollection = db.collection<Payment>(PAYMENT_COLLECTION);

  const payments = await paymentsCollection
    .find({
      userId,
      status: { $in: ['pending', 'scheduled', 'partially_paid', 'overdue'] },
      amountDue: { $gt: 0 },
    })
    .sort({ dueDate: 1 })
    .toArray();

  // Add days overdue for overdue payments
  return payments.map((p) => {
    if (isPaymentOverdue(p.dueDate) && p.status !== 'overdue') {
      p.overdueBy = getDaysOverdue(p.dueDate);
      p.status = 'overdue';
    }
    return p;
  });
}

/**
 * Get total pending amounts for a user
 */
export async function getUserTotalPendingAmount(userId: string): Promise<number> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const paymentsCollection = db.collection<Payment>(PAYMENT_COLLECTION);

  const result = await paymentsCollection.aggregate<{ total: number }>([
    {
      $match: {
        userId,
        status: { $in: ['pending', 'scheduled', 'partially_paid', 'overdue'] },
        amountDue: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$amountDue' },
      },
    },
  ]).toArray();

  return result.length > 0 ? result[0].total : 0;
}

/**
 * Get next payment due date for a user
 */
export async function getUserNextPaymentDue(userId: string): Promise<Date | null> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const paymentsCollection = db.collection<Payment>(PAYMENT_COLLECTION);

  const payment = await paymentsCollection.findOne(
    {
      userId,
      status: { $in: ['pending', 'scheduled', 'partially_paid', 'overdue'] },
      amountDue: { $gt: 0 },
    },
    { sort: { dueDate: 1 } }
  );

  return payment?.dueDate || null;
}

/**
 * Get payment details by ID
 */
export async function getPaymentById(paymentId: string): Promise<Payment | null> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const paymentsCollection = db.collection<Payment>(PAYMENT_COLLECTION);

  return await paymentsCollection.findOne({
    _id: new ObjectId(paymentId),
  });
}

/**
 * Update payment status
 */
export async function updatePaymentStatus(
  paymentId: string,
  status: PaymentStatus,
  amountPaid?: number
): Promise<Payment | null> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const paymentsCollection = db.collection<Payment>(PAYMENT_COLLECTION);

  const updateData: any = {
    status,
    updatedAt: new Date(),
  };

  if (amountPaid !== undefined) {
    updateData.amountPaid = amountPaid;
    // Calculate remaining due amount
    const payment = await getPaymentById(paymentId);
    if (payment) {
      updateData.amountDue = Math.max(0, payment.totalAmount - amountPaid);
      
      if (updateData.amountDue === 0) {
        updateData.status = 'completed';
        updateData.completedAt = new Date();
      } else if (updateData.amountDue > 0 && updateData.amountDue < payment.totalAmount) {
        updateData.status = 'partially_paid';
      }
    }
  }

  const result = await paymentsCollection.findOneAndUpdate(
    { _id: new ObjectId(paymentId) },
    { $set: updateData },
    { returnDocument: 'after' }
  );

  return result || null;
}

/**
 * Update installment payment
 */
export async function updateInstallmentPayment(
  paymentId: string,
  installmentNumber: number,
  paidAmount: number
): Promise<Payment | null> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const paymentsCollection = db.collection<Payment>(PAYMENT_COLLECTION);

  const payment = await getPaymentById(paymentId);
  if (!payment || !payment.installments) {
    throw new Error('Payment or installments not found');
  }

  // Update installment
  const installmentIndex = payment.installments.findIndex(
    (inst) => inst.installmentNumber === installmentNumber
  );

  if (installmentIndex === -1) {
    throw new Error('Installment not found');
  }

  payment.installments[installmentIndex].paidAmount = paidAmount;
  payment.installments[installmentIndex].status =
    paidAmount >= payment.installments[installmentIndex].amount ? 'paid' : 'partial';
  payment.installments[installmentIndex].paidDate = new Date();

  // Calculate total amount paid
  const totalPaid = payment.installments.reduce((sum, inst) => sum + inst.paidAmount, 0);

  const result = await paymentsCollection.findOneAndUpdate(
    { _id: new ObjectId(paymentId) },
    {
      $set: {
        installments: payment.installments,
        amountPaid: totalPaid,
        amountDue: payment.totalAmount - totalPaid,
        status: totalPaid >= payment.totalAmount ? 'completed' : 'partially_paid',
        completedAt: totalPaid >= payment.totalAmount ? new Date() : undefined,
        updatedAt: new Date(),
      },
    },
    { returnDocument: 'after' }
  );

  return result || null;
}

/**
 * Get payments for admin - all pending/overdue
 */
export async function getAdminPendingPayments(limit: number = 50): Promise<Payment[]> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const paymentsCollection = db.collection<Payment>(PAYMENT_COLLECTION);

  const payments = await paymentsCollection
    .find({
      status: { $in: ['pending', 'scheduled', 'partially_paid', 'overdue'] },
      amountDue: { $gt: 0 },
    })
    .sort({ dueDate: 1 })
    .limit(limit)
    .toArray();

  return payments.map((p) => {
    if (isPaymentOverdue(p.dueDate) && p.status !== 'overdue') {
      p.overdueBy = getDaysOverdue(p.dueDate);
    }
    return p;
  });
}

/**
 * Get payment statistics for admin
 */
export async function getPaymentStats(): Promise<{
  totalPending: number;
  totalOverdue: number;
  totalPartiallyPaid: number;
  overdueDays: number[];
}> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const paymentsCollection = db.collection<Payment>(PAYMENT_COLLECTION);

  const stats = await paymentsCollection.aggregate([
    {
      $match: {
        status: { $in: ['pending', 'scheduled', 'partially_paid', 'overdue'] },
        amountDue: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$amountDue' },
      },
    },
  ]).toArray();

  const pending = stats.find((s) => s._id === 'pending') || { count: 0, totalAmount: 0 };
  const overdue = stats.find((s) => s._id === 'overdue') || { count: 0, totalAmount: 0 };
  const partiallyPaid = stats.find((s) => s._id === 'partially_paid') || { count: 0, totalAmount: 0 };

  const overdueDays = await paymentsCollection
    .find({ status: 'overdue' })
    .map((p) => getDaysOverdue(p.dueDate))
    .toArray();

  return {
    totalPending: pending.count,
    totalOverdue: overdue.count,
    totalPartiallyPaid: partiallyPaid.count,
    overdueDays,
  };
}

/**
 * Mark payment as overdue
 */
export async function markPaymentAsOverdue(paymentId: string): Promise<Payment | null> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const paymentsCollection = db.collection<Payment>(PAYMENT_COLLECTION);

  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new Error('Payment not found');
  }

  const overdueBy = getDaysOverdue(payment.dueDate);

  const result = await paymentsCollection.findOneAndUpdate(
    { _id: new ObjectId(paymentId) },
    {
      $set: {
        status: 'overdue',
        overdueBy,
        updatedAt: new Date(),
      },
    },
    { returnDocument: 'after' }
  );

  return result || null;
}

/**
 * Export utility functions for calculations
 */
export { isPaymentOverdue, getDaysOverdue, getPaymentProgress };
