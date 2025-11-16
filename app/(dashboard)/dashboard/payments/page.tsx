'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  GiCoinsPile,
  GiWallet,
  GiReceiveMoney,
  GiCheckMark,
  GiCancel,
  GiPentacle,
} from "react-icons/gi";
import { IoCheckmarkCircle, IoWarning, IoDownload, IoCashOutline, IoFilter, IoCard } from "react-icons/io5";
import { generateInvoiceFromTransaction, downloadReceiptAsText } from "@/lib/utils/invoice-generator";
import { useState } from "react";

/**
 * Payments & Billing Dashboard
 * Displays payment overview, transaction history with filtering, payment methods, and invoices
 */
export default function PaymentsPage() {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<typeof subscriptions[0] | null>(null);

  // Handle invoice download
  const handleDownloadInvoice = (txn: typeof allTransactions[0]) => {
    const invoice = generateInvoiceFromTransaction(
      txn.id,
      txn.service,
      txn.amount,
      txn.date,
      txn.paymentMethod,
      txn.status as "completed" | "pending" | "failed"
    );
    downloadReceiptAsText(invoice);
  };

  // Handle subscription cancellation
  const handleCancelSubscription = (sub: typeof subscriptions[0]) => {
    setSelectedSubscription(sub);
    setCancelDialogOpen(true);
  };

  const confirmCancelSubscription = () => {
    if (selectedSubscription) {
      // Here you would make an API call to cancel the subscription
      console.log(`Cancelling subscription: ${selectedSubscription.id}`);
      setCancelDialogOpen(false);
      setSelectedSubscription(null);
      // Show success toast notification
    }
  };
  // Mock data - replace with real data from API
  const accountBalance = 450.00;
  const totalSpent = 2150.00;
  const pendingPayments = 350.00;
  const nextPaymentDue = "2025-12-15";

  const allTransactions = [
    {
      id: "txn_001",
      service: "Obsession Spell",
      amount: 250.00,
      date: "2025-11-10",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
      invoiceUrl: "/invoices/txn_001.pdf",
    },
    {
      id: "txn_002",
      service: "Protection & Shielding",
      amount: 275.00,
      date: "2025-11-05",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
      invoiceUrl: "/invoices/txn_002.pdf",
    },
    {
      id: "txn_003",
      service: "Binding Spell",
      amount: 350.00,
      date: "2025-10-28",
      status: "completed",
      paymentMethod: "Mastercard •••• 5555",
      invoiceUrl: "/invoices/txn_003.pdf",
    },
    {
      id: "txn_004",
      service: "Magic Wallet Subscription",
      amount: 450.00,
      date: "2025-10-20",
      status: "pending",
      paymentMethod: "Visa •••• 4242",
      invoiceUrl: "/invoices/txn_004.pdf",
    },
    {
      id: "txn_005",
      service: "Cleansing Rituals",
      amount: 175.00,
      date: "2025-10-15",
      status: "completed",
      paymentMethod: "Visa •••• 4242",
      invoiceUrl: "/invoices/txn_005.pdf",
    },
    {
      id: "txn_006",
      service: "Business Boost Spells",
      amount: 425.00,
      date: "2025-09-28",
      status: "failed",
      paymentMethod: "Visa •••• 4242",
      invoiceUrl: "/invoices/txn_006.pdf",
    },
    {
      id: "txn_007",
      service: "Marriage & Commitment",
      amount: 500.00,
      date: "2025-09-15",
      status: "completed",
      paymentMethod: "Mastercard •••• 5555",
      invoiceUrl: "/invoices/txn_007.pdf",
    },
  ];

  const paymentMethods = [
    {
      id: "pm_001",
      type: "Visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: "pm_002",
      type: "Mastercard",
      last4: "5555",
      expiry: "08/25",
      isDefault: false,
    },
  ];

  const subscriptions = [
    {
      id: "sub_001",
      service: "Magic Wallet",
      frequency: "Monthly",
      amount: 450.00,
      status: "active",
      nextBilling: "2025-12-20",
    },
    {
      id: "sub_002",
      service: "Protection Renewal",
      frequency: "Monthly",
      amount: 275.00,
      status: "active",
      nextBilling: "2025-12-15",
    },
  ];

  const getStatusColor = (status: string) => {
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
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <IoCheckmarkCircle className="w-4 h-4" />;
      case "pending":
        return <IoWarning className="w-4 h-4" />;
      case "failed":
        return <GiCancel className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-['MedievalSharp'] text-[#F4E8D0]">
            ✦ Payments & Billing ✦
          </h1>
          <p className="font-['Crimson_Text'] text-[#E8DCC0] text-lg">
            Manage your sacred investments and service transactions
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Account Balance */}
          <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] flex items-center gap-2 text-lg">
                  <GiWallet className="w-6 h-6 text-[#B8860B]" />
                  Account Balance
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-['MedievalSharp'] text-[#B8860B] mb-2">
                ${accountBalance.toFixed(2)}
              </p>
              <p className="text-sm font-['Crimson_Text'] text-[#E8DCC0]">
                Available funds
              </p>
            </CardContent>
          </Card>

          {/* Total Spent */}
          <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] flex items-center gap-2 text-lg">
                  <GiCoinsPile className="w-6 h-6 text-[#B8860B]" />
                  Total Invested
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-['MedievalSharp'] text-[#B8860B] mb-2">
                ${totalSpent.toFixed(2)}
              </p>
              <p className="text-sm font-['Crimson_Text'] text-[#E8DCC0]">
                All-time service spending
              </p>
            </CardContent>
          </Card>

          {/* Pending Payments */}
          <Card className="border-2 border-[#CC8800] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] flex items-center gap-2 text-lg">
                  <IoWarning className="w-6 h-6 text-[#CC8800]" />
                  Pending
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-['MedievalSharp'] text-[#CC8800] mb-2">
                ${pendingPayments.toFixed(2)}
              </p>
              <p className="text-sm font-['Crimson_Text'] text-[#E8DCC0]">
                Due by {nextPaymentDue}
              </p>
            </CardContent>
          </Card>

          {/* Active Subscriptions */}
          <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] flex items-center gap-2 text-lg">
                  <GiCheckMark className="w-6 h-6 text-[#B8860B]" />
                  Subscriptions
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-['MedievalSharp'] text-[#B8860B] mb-2">
                {subscriptions.length}
              </p>
              <p className="text-sm font-['Crimson_Text'] text-[#E8DCC0]">
                Active recurring services
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#2C2416] border-2 border-[#B8860B] p-1 rounded-lg">
            <TabsTrigger
              value="transactions"
              className="font-['Crimson_Text'] data-[state=active]:bg-[#B8860B] data-[state=active]:text-[#1A1A1A] data-[state=inactive]:text-[#E8DCC0]"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="methods"
              className="font-['Crimson_Text'] data-[state=active]:bg-[#B8860B] data-[state=active]:text-[#1A1A1A] data-[state=inactive]:text-[#E8DCC0]"
            >
              Payment Methods
            </TabsTrigger>
            <TabsTrigger
              value="subscriptions"
              className="font-['Crimson_Text'] data-[state=active]:bg-[#B8860B] data-[state=active]:text-[#1A1A1A] data-[state=inactive]:text-[#E8DCC0]"
            >
              Subscriptions
            </TabsTrigger>
            <TabsTrigger
              value="invoices"
              className="font-['Crimson_Text'] data-[state=active]:bg-[#B8860B] data-[state=active]:text-[#1A1A1A] data-[state=inactive]:text-[#E8DCC0]"
            >
              Invoices
            </TabsTrigger>
          </TabsList>

          {/* Transactions Tab with Filtering */}
          <TabsContent value="transactions" className="space-y-4 mt-6">
            <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0]">
                      Transaction History
                    </CardTitle>
                    <CardDescription className="font-['Crimson_Text'] text-[#8B6F47]">
                      Your complete payment history with advanced filtering
                    </CardDescription>
                  </div>
                  
                  {/* Filters */}
                  <div className="flex flex-wrap gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px] border-[#8B6F47] bg-[#2C2416] text-[#F4E8D0] font-['Crimson_Text']">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2C2416] border-[#8B6F47]">
                        <SelectItem value="all" className="text-[#F4E8D0] font-['Crimson_Text']">All Status</SelectItem>
                        <SelectItem value="completed" className="text-[#F4E8D0] font-['Crimson_Text']">Completed</SelectItem>
                        <SelectItem value="pending" className="text-[#F4E8D0] font-['Crimson_Text']">Pending</SelectItem>
                        <SelectItem value="failed" className="text-[#F4E8D0] font-['Crimson_Text']">Failed</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px] border-[#8B6F47] bg-[#2C2416] text-[#F4E8D0] font-['Crimson_Text']">
                        <SelectValue placeholder="Service Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2C2416] border-[#8B6F47]">
                        <SelectItem value="all" className="text-[#F4E8D0] font-['Crimson_Text']">All Services</SelectItem>
                        <SelectItem value="love" className="text-[#F4E8D0] font-['Crimson_Text']">Love & Relationships</SelectItem>
                        <SelectItem value="wealth" className="text-[#F4E8D0] font-['Crimson_Text']">Wealth & Business</SelectItem>
                        <SelectItem value="protection" className="text-[#F4E8D0] font-['Crimson_Text']">Protection</SelectItem>
                        <SelectItem value="justice" className="text-[#F4E8D0] font-['Crimson_Text']">Justice & Legal</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="date-desc">
                      <SelectTrigger className="w-[150px] border-[#8B6F47] bg-[#2C2416] text-[#F4E8D0] font-['Crimson_Text']">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2C2416] border-[#8B6F47]">
                        <SelectItem value="date-desc" className="text-[#F4E8D0] font-['Crimson_Text']">Newest First</SelectItem>
                        <SelectItem value="date-asc" className="text-[#F4E8D0] font-['Crimson_Text']">Oldest First</SelectItem>
                        <SelectItem value="amount-desc" className="text-[#F4E8D0] font-['Crimson_Text']">Highest Amount</SelectItem>
                        <SelectItem value="amount-asc" className="text-[#F4E8D0] font-['Crimson_Text']">Lowest Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border-2 border-[#8B6F47]/30 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-[#2C2416]">
                      <TableRow className="border-b-2 border-[#8B6F47]/30 hover:bg-[#2C2416]">
                        <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">Date</TableHead>
                        <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">Service</TableHead>
                        <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">Payment Method</TableHead>
                        <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">Amount</TableHead>
                        <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">Status</TableHead>
                        <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allTransactions.map((txn) => (
                        <TableRow 
                          key={txn.id} 
                          className="border-b border-[#8B6F47]/20 hover:bg-[#2C2416]/50"
                        >
                          <TableCell className="font-['Crimson_Text'] text-[#E8DCC0]">
                            {new Date(txn.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </TableCell>
                          <TableCell className="font-['Crimson_Text'] text-[#F4E8D0] font-semibold">
                            {txn.service}
                          </TableCell>
                          <TableCell className="font-['Crimson_Text'] text-[#8B6F47]">
                            {txn.paymentMethod}
                          </TableCell>
                          <TableCell className="font-['MedievalSharp'] text-[#B8860B]">
                            ${txn.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge className={`font-['Crimson_Text'] text-xs flex items-center gap-1 w-fit ${getStatusColor(txn.status)}`}>
                              {getStatusIcon(txn.status)}
                              {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleDownloadInvoice(txn)}
                              variant="outline"
                              size="sm"
                              className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#1A1A1A] font-['Crimson_Text']"
                              title="Download receipt"
                            >
                              <IoDownload className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <p className="font-['Crimson_Text'] text-[#8B6F47] text-sm">
                    Showing {allTransactions.length} of {allTransactions.length} transactions
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-[#8B6F47] text-[#8B6F47] font-['Crimson_Text']"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-[#8B6F47] text-[#8B6F47] font-['Crimson_Text']"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="methods" className="space-y-4 mt-6">
            <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              <CardHeader>
                <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0]">
                  Payment Methods
                </CardTitle>
                <CardDescription className="font-['Crimson_Text'] text-[#8B6F47]">
                  Manage your saved payment options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="border-2 border-[#8B6F47]/30 rounded-lg p-4 bg-[#2C2416] hover:border-[#B8860B] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <IoCard className="w-8 h-8 text-[#B8860B]" />
                        <div>
                          <h4 className="font-['Crimson_Text'] text-[#F4E8D0] font-semibold">
                            {method.type} •••• {method.last4}
                          </h4>
                          <p className="font-['Crimson_Text'] text-sm text-[#8B6F47]">
                            Expires {method.expiry}
                          </p>
                        </div>
                      </div>
                      {method.isDefault && (
                        <Badge className="bg-[#2C5530] text-[#F4E8D0] font-['Crimson_Text']">
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {!method.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-[#1A1A1A] font-['Crimson_Text']"
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#F4E8D0] font-['Crimson_Text']"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  className="w-full bg-[#B8860B] hover:bg-[#CC8800] text-[#1A1A1A] font-['MedievalSharp'] mt-4 border-2 border-[#F4E8D0] shadow-[0_0_20px_rgba(184,134,11,0.3)]"
                >
                  <IoCard className="w-5 h-5 mr-2" />
                  Add New Payment Method
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-4 mt-6">
            <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              <CardHeader>
                <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0]">
                  Active Subscriptions
                </CardTitle>
                <CardDescription className="font-['Crimson_Text'] text-[#8B6F47]">
                  Your recurring spiritual services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subscriptions.length === 0 ? (
                  <p className="font-['Crimson_Text'] text-[#8B6F47] text-center py-8">
                    No active subscriptions. Embrace the recurring power of spiritual transformation.
                  </p>
                ) : (
                  subscriptions.map((sub) => (
                    <div
                      key={sub.id}
                      className="border-2 border-[#8B6F47]/30 rounded-lg p-4 bg-[#2C2416] hover:border-[#B8860B] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-['Crimson_Text'] text-[#F4E8D0] font-semibold text-lg">
                            {sub.service}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            <div>
                              <p className="font-['Crimson_Text'] text-xs text-[#8B6F47]">Frequency</p>
                              <p className="font-['Crimson_Text'] text-[#F4E8D0]">{sub.frequency}</p>
                            </div>
                            <div>
                              <p className="font-['Crimson_Text'] text-xs text-[#8B6F47]">Amount</p>
                              <p className="font-['MedievalSharp'] text-[#B8860B]">${sub.amount.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="font-['Crimson_Text'] text-xs text-[#8B6F47]">Next Billing</p>
                              <p className="font-['Crimson_Text'] text-[#F4E8D0]">
                                {new Date(sub.nextBilling).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-[#2C5530] text-[#F4E8D0] font-['Crimson_Text'] h-fit">
                          Active
                        </Badge>
                      </div>

                      <div className="border-t border-[#8B6F47]/20 pt-3 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-[#1A1A1A] font-['Crimson_Text']"
                        >
                          Manage
                        </Button>
                        <Button
                          onClick={() => handleCancelSubscription(sub)}
                          variant="outline"
                          size="sm"
                          className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#F4E8D0] font-['Crimson_Text']"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))
                )}

                {subscriptions.length > 0 && (
                  <div className="border-t-2 border-[#8B6F47]/30 pt-4 mt-4">
                    <p className="font-['Crimson_Text'] text-sm text-[#8B6F47] mb-3">
                      💡 Tip: You can modify your subscription frequency or pause it temporarily before cancelling.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cancel Subscription Dialog */}
            <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
              <DialogContent className="bg-[#2C2416] border-2 border-[#B8860B]">
                <DialogHeader>
                  <DialogTitle className="font-['MedievalSharp'] text-[#F4E8D0]">
                    Cancel Subscription
                  </DialogTitle>
                  <DialogDescription className="font-['Crimson_Text'] text-[#8B6F47]">
                    {selectedSubscription && `Are you sure you want to cancel ${selectedSubscription.service}?`}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <Alert className="border-2 border-[#CC8800] bg-[#1A1A1A] text-[#F4E8D0]">
                    <IoWarning className="h-4 w-4 text-[#CC8800]" />
                    <AlertDescription className="font-['Crimson_Text']">
                      Your subscription will end at the end of the current billing cycle ({selectedSubscription?.nextBilling}).
                    </AlertDescription>
                  </Alert>

                  <div className="bg-[#1A1A1A] p-3 rounded border border-[#8B6F47]/30">
                    <p className="font-['Crimson_Text'] text-sm text-[#8B6F47] mb-2">Remaining benefits:</p>
                    <ul className="font-['Crimson_Text'] text-sm text-[#E8DCC0] space-y-1">
                      <li>✓ Access until billing cycle ends</li>
                      <li>✓ No refunds will be issued</li>
                      <li>✓ You can reactivate anytime</li>
                    </ul>
                  </div>
                </div>

                <DialogFooter className="flex gap-2 justify-end">
                  <Button
                    onClick={() => setCancelDialogOpen(false)}
                    variant="outline"
                    className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-[#1A1A1A] font-['Crimson_Text']"
                  >
                    Keep Subscription
                  </Button>
                  <Button
                    onClick={confirmCancelSubscription}
                    className="bg-[#8B0000] hover:bg-[#A50000] text-[#F4E8D0] font-['Crimson_Text']"
                  >
                    Confirm Cancellation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-4 mt-6">
            <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              <CardHeader>
                <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0]">
                  Invoices
                </CardTitle>
                <CardDescription className="font-['Crimson_Text'] text-[#8B6F47]">
                  Download and view all your invoices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {allTransactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="border-2 border-[#8B6F47]/30 rounded-lg p-4 bg-[#2C2416] flex items-center justify-between hover:border-[#B8860B] transition-colors"
                  >
                    <div>
                      <p className="font-['Crimson_Text'] text-[#F4E8D0] font-semibold">
                        Invoice {txn.id}
                      </p>
                      <p className="font-['Crimson_Text'] text-sm text-[#8B6F47]">
                        {txn.service} • ${txn.amount.toFixed(2)} • {new Date(txn.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleDownloadInvoice(txn)}
                      className="bg-[#B8860B] hover:bg-[#CC8800] text-[#1A1A1A] font-['Crimson_Text'] flex items-center gap-2"
                    >
                      <IoDownload className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Help Alert */}
        <Alert className="border-2 border-[#B8860B] bg-[#2C2416] text-[#F4E8D0]">
          <GiPentacle className="h-4 w-4 text-[#B8860B]" />
          <AlertDescription className="font-['Crimson_Text']">
            <strong>Need assistance?</strong> Contact the healer directly via WhatsApp or Messenger for payment inquiries, refund requests, or billing questions.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
