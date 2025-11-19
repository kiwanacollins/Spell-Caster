/**
 * Refund Notification Utilities
 * 
 * Handles sending notifications to users when their refund status changes
 */

import { RefundStatus } from '../db/models';

/**
 * Notification templates for different refund statuses
 */
export const REFUND_NOTIFICATIONS: Record<RefundStatus, {
  subject: string;
  title: string;
  message: string;
  mystical: string; // Mystical messaging for the platform
}> = {
  pending: {
    subject: 'Refund Request Received',
    title: 'Your Refund Request Has Been Received',
    message: 'Your refund request has been submitted and is awaiting admin review. We typically review requests within 1-2 business days.',
    mystical: 'Your request for restoration of funds has been received by the Temple Keepers. The spirits are consulting the records...',
  },
  approved: {
    subject: 'Refund Approved',
    title: 'Your Refund Has Been Approved',
    message: 'Your refund request has been approved! The funds will be returned to your original payment method within 5-10 business days.',
    mystical: 'The Temple Keepers have approved your request. The sacred energies are aligning to return your investment...',
  },
  denied: {
    subject: 'Refund Request Denied',
    title: 'Your Refund Request Could Not Be Approved',
    message: 'Unfortunately, your refund request could not be approved. Please contact the healer directly for more information.',
    mystical: 'The ancient energies have guided us to decline your refund request. Reach out to the healer to understand more...',
  },
  processed: {
    subject: 'Refund Processing',
    title: 'Your Refund Is Being Processed',
    message: 'Your refund is now being processed with Stripe. The funds should appear in your account within 5-10 business days.',
    mystical: 'The sacred transfer is underway. Watch your payment method for the return of your sacred investment...',
  },
  failed: {
    subject: 'Refund Processing Error',
    title: 'There Was An Issue Processing Your Refund',
    message: 'Unfortunately, there was an error processing your refund. Our team has been notified and will contact you shortly.',
    mystical: 'A shadow has crossed the path of your refund. The Temple Keepers are investigating this mystical hindrance...',
  },
};

/**
 * Format notification message for different channels
 */
export function formatRefundNotification(
  status: RefundStatus,
  channel: 'email' | 'whatsapp' | 'in-app' = 'email'
): {
  subject?: string;
  title: string;
  message: string;
} {
  const notification = REFUND_NOTIFICATIONS[status];

  if (channel === 'whatsapp') {
    return {
      title: notification.title,
      message: notification.mystical,
    };
  }

  return {
    subject: notification.subject,
    title: notification.title,
    message: channel === 'in-app' ? notification.mystical : notification.message,
  };
}

/**
 * Build WhatsApp refund notification message
 */
export function buildWhatsAppRefundMessage(
  status: RefundStatus,
  amount: number,
  serviceName: string
): string {
  const notification = REFUND_NOTIFICATIONS[status];

  let message = `✨ *${notification.title}* ✨\n\n`;
  message += `Service: ${serviceName}\n`;
  message += `Amount: $${(amount / 100).toFixed(2)}\n\n`;
  message += notification.mystical;

  if (status === 'denied') {
    message += '\n\nTo discuss this further, please reach out to the healer directly.';
  } else if (status === 'processed') {
    message += '\n\nThank you for your understanding.';
  }

  return message;
}

/**
 * Build email refund notification
 */
export function buildEmailRefundNotification(
  status: RefundStatus,
  amount: number,
  serviceName: string,
  adminNotes?: string
): {
  subject: string;
  html: string;
  text: string;
} {
  const notification = REFUND_NOTIFICATIONS[status];

  const text = `
${notification.title}

Service: ${serviceName}
Amount: $${(amount / 100).toFixed(2)}

${notification.message}
${adminNotes ? `\nAdmin Notes: ${adminNotes}` : ''}

If you have any questions, please contact the healer directly.

Warmest regards,
The Sacred Circle
  `.trim();

  const html = `
    <div style="font-family: 'Crimson Text', serif; color: #E8DCC0; background: #1A1A1A; padding: 20px;">
      <h2 style="color: #B8860B; font-family: 'MedievalSharp', cursive;">${notification.title}</h2>
      <p>
        <strong>Service:</strong> ${serviceName}<br/>
        <strong>Amount:</strong> $${(amount / 100).toFixed(2)}
      </p>
      <p>${notification.message}</p>
      ${adminNotes ? `<p style="color: #8B6F47;"><strong>Notes:</strong> ${adminNotes}</p>` : ''}
      <p>If you have any questions, please contact the healer directly.</p>
      <p style="color: #8B6F47;">Warmest regards,<br/>The Sacred Circle</p>
    </div>
  `;

  return {
    subject: notification.subject,
    text,
    html,
  };
}
