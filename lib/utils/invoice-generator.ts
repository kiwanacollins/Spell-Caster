/**
 * Invoice and Receipt Generation Utilities
 * Generates mystical themed receipts and invoices in PDF format
 */

export interface InvoiceData {
  invoiceId: string;
  date: string;
  service: string;
  amount: number;
  paymentMethod: string;
  status: "completed" | "pending" | "failed";
  clientName?: string;
  clientEmail?: string;
  transactionId: string;
  description?: string;
}

/**
 * Generate a mystical receipt text format
 * Can be used for email or text display
 */
export function generateReceiptText(invoice: InvoiceData): string {
  const divider = "═".repeat(50);
  const receiptDate = new Date(invoice.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const receipt = `
${divider}
✦ SACRED RECEIPT OF SPIRITUAL INVESTMENT ✦
${divider}

Invoice ID: ${invoice.invoiceId}
Transaction ID: ${invoice.transactionId}
Date: ${receiptDate}
Status: ${invoice.status.toUpperCase()}

${divider}
SERVICE RENDERED
${divider}

Service: ${invoice.service}
${invoice.description ? `Description: ${invoice.description}` : ""}

${divider}
PAYMENT DETAILS
${divider}

Amount: $${invoice.amount.toFixed(2)}
Payment Method: ${invoice.paymentMethod}
Status: ${invoice.status === "completed" ? "✓ Completed" : "⏳ " + invoice.status}

${divider}

Thank you for trusting in the ancient power of our spiritual practices.
Your investment in transformation is honored.

✦ May the energies align in your favor ✦

${divider}
  `.trim();

  return receipt;
}

/**
 * Download receipt as text file
 */
export function downloadReceiptAsText(invoice: InvoiceData): void {
  const receiptText = generateReceiptText(invoice);
  const element = document.createElement("a");
  const file = new Blob([receiptText], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `receipt-${invoice.invoiceId}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * Download receipt as CSV for records
 */
export function downloadReceiptAsCSV(invoice: InvoiceData): void {
  const headers = [
    "Invoice ID",
    "Transaction ID",
    "Date",
    "Service",
    "Amount",
    "Payment Method",
    "Status",
  ];
  const data = [
    invoice.invoiceId,
    invoice.transactionId,
    invoice.date,
    invoice.service,
    `$${invoice.amount.toFixed(2)}`,
    invoice.paymentMethod,
    invoice.status,
  ];

  const csvContent = [headers.join(","), data.join(",")].join("\n");

  const element = document.createElement("a");
  const file = new Blob([csvContent], { type: "text/csv" });
  element.href = URL.createObjectURL(file);
  element.download = `receipt-${invoice.invoiceId}.csv`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * Generate invoice data for mock transactions
 * (Replace with real API calls when Stripe is integrated)
 */
export function generateInvoiceFromTransaction(
  transactionId: string,
  service: string,
  amount: number,
  date: string,
  paymentMethod: string,
  status: "completed" | "pending" | "failed"
): InvoiceData {
  return {
    invoiceId: `INV-${transactionId.toUpperCase()}`,
    date,
    service,
    amount,
    paymentMethod,
    status,
    transactionId,
    description: `Mystical spiritual service: ${service}`,
  };
}

/**
 * Format invoice amount as currency
 */
export function formatInvoiceAmount(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Get invoice status badge color
 */
export function getInvoiceStatusColor(
  status: "completed" | "pending" | "failed"
): string {
  switch (status) {
    case "completed":
      return "bg-[#2C5530] text-[#F4E8D0]";
    case "pending":
      return "bg-[#CC8800] text-[#1A1A1A]";
    case "failed":
      return "bg-[#8B0000] text-[#F4E8D0]";
    default:
      return "bg-[#4A4A4A] text-[#F4E8D0]";
  }
}

/**
 * Get invoice status icon
 */
export function getInvoiceStatusIcon(status: "completed" | "pending" | "failed"): string {
  switch (status) {
    case "completed":
      return "✓";
    case "pending":
      return "⏳";
    case "failed":
      return "✕";
    default:
      return "?";
  }
}
