'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FiPlus, FiEdit, FiSave, FiX, FiTrendingUp, FiClock, FiCheck, FiAlertCircle } from 'react-icons/fi';

interface PriceQuote {
  _id: string;
  userId: string;
  serviceId: string;
  quotedPrice: number;
  notes?: string;
  validUntil?: string;
  accepted: boolean;
  acceptedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

interface QuoteStats {
  totalQuotes: number;
  acceptedQuotes: number;
  pendingQuotes: number;
  rejectedQuotes: number;
}

interface Service {
  serviceId: string;
  name: string;
}

const SERVICES: Service[] = [
  { serviceId: 'get_back_lost_items', name: 'Get Back Lost Items' },
  { serviceId: 'land_solving_spell', name: 'Land Solving Spell' },
  { serviceId: 'obsession_spell', name: 'Obsession Spell' },
  { serviceId: 'stop_cheating_spell', name: 'Stop Cheating Spell' },
  { serviceId: 'binding_spell', name: 'Binding Spell' },
  { serviceId: 'gay_lesbian_spell', name: 'Gay & Lesbian Spell' },
  { serviceId: 'winning_court_case', name: 'Winning a Court Case' },
  { serviceId: 'business_boost_spells', name: 'Business Boost Spells' },
  { serviceId: 'cleansing_rituals', name: 'Cleansing Rituals' },
  { serviceId: 'divorce_spell', name: 'Divorce Spell' },
  { serviceId: 'marriage_commitment', name: 'Marriage & Commitment' },
  { serviceId: 'magic_wallet', name: 'Magic Wallet' },
  { serviceId: 'financial_issues', name: 'Financial Issues' },
  { serviceId: 'protection_shielding', name: 'Protection & Shielding' },
  { serviceId: 'magic_rings', name: 'Magic Rings' },
];

export function AdminQuotesManagement() {
  const [quotes, setQuotes] = useState<PriceQuote[]>([]);
  const [stats, setStats] = useState<QuoteStats>({
    totalQuotes: 0,
    acceptedQuotes: 0,
    pendingQuotes: 0,
    rejectedQuotes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // Create Quote Dialog
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [newQuote, setNewQuote] = useState({
    userId: '',
    serviceId: '',
    quotedPrice: '',
    notes: '',
    validDays: '7',
  });

  // Update Quote Dialog
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<PriceQuote | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateQuote, setUpdateQuote] = useState({
    newPrice: '',
    newNotes: '',
    extendValidityDays: '0',
  });

  // Fetch quotes and stats on mount and when filter changes
  useEffect(() => {
    fetchQuotesAndStats();
  }, [filter]);

  const fetchQuotesAndStats = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch stats
      const statsRes = await fetch('/api/payments/quotes?view=admin&stats=true', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch quotes based on filter
      let url = '/api/payments/quotes?view=admin';
      if (filter === 'pending') {
        url += '&limit=50';
      }

      const quotesRes = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!quotesRes.ok) {
        throw new Error('Failed to fetch quotes');
      }

      const quotesData = await quotesRes.json();
      let filteredQuotes = quotesData.quotes || [];

      // Apply client-side filtering
      if (filter === 'accepted') {
        filteredQuotes = filteredQuotes.filter((q: PriceQuote) => q.accepted);
      } else if (filter === 'rejected') {
        filteredQuotes = filteredQuotes.filter((q: PriceQuote) => q.rejectedAt);
      } else if (filter === 'pending') {
        filteredQuotes = filteredQuotes.filter(
          (q: PriceQuote) => !q.accepted && !q.rejectedAt
        );
      }

      setQuotes(filteredQuotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quotes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuote = async () => {
    if (!newQuote.userId || !newQuote.serviceId || !newQuote.quotedPrice) {
      setError('Please fill in all required fields');
      return;
    }

    const price = parseFloat(newQuote.quotedPrice);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price');
      return;
    }

    setCreateLoading(true);
    setError('');

    try {
      const service = SERVICES.find((s) => s.serviceId === newQuote.serviceId);
      const serviceName = service?.name || newQuote.serviceId;

      const response = await fetch('/api/payments/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: newQuote.userId,
          serviceId: newQuote.serviceId,
          serviceName,
          quotedPrice: price,
          notes: newQuote.notes || undefined,
          validDays: parseInt(newQuote.validDays),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create quote');
      }

      setSuccessMessage('Quote created successfully');
      setNewQuote({
        userId: '',
        serviceId: '',
        quotedPrice: '',
        notes: '',
        validDays: '7',
      });
      setIsCreateDialogOpen(false);

      // Refresh quotes
      setTimeout(() => {
        fetchQuotesAndStats();
        setSuccessMessage('');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create quote');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleOpenUpdateDialog = (quote: PriceQuote) => {
    setSelectedQuote(quote);
    setUpdateQuote({
      newPrice: quote.quotedPrice.toString(),
      newNotes: quote.notes || '',
      extendValidityDays: '0',
    });
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateQuote = async () => {
    if (!selectedQuote) return;

    const price = parseFloat(updateQuote.newPrice);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price');
      return;
    }

    setUpdateLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/payments/quotes/${selectedQuote._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          newPrice: price,
          newNotes: updateQuote.newNotes || undefined,
          extendValidityDays: parseInt(updateQuote.extendValidityDays) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quote');
      }

      setSuccessMessage('Quote updated successfully');
      setIsUpdateDialogOpen(false);

      // Refresh quotes
      setTimeout(() => {
        fetchQuotesAndStats();
        setSuccessMessage('');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update quote');
    } finally {
      setUpdateLoading(false);
    }
  };

  const getStatusBadgeColor = (quote: PriceQuote): string => {
    if (quote.accepted) return 'bg-[#2C5530] text-white';
    if (quote.rejectedAt) return 'bg-[#8B0000] text-white';
    return 'bg-[#CC8800] text-white';
  };

  const getStatusText = (quote: PriceQuote): string => {
    if (quote.accepted) return 'Accepted';
    if (quote.rejectedAt) return 'Rejected';
    return 'Pending';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isExpired = (validUntil: string | undefined): boolean => {
    if (!validUntil) return false;
    return new Date(validUntil) < new Date();
  };

  const filteredQuotes = quotes.filter((quote) => {
    const service = SERVICES.find((s) => s.serviceId === quote.serviceId);
    const serviceName = service?.name || quote.serviceId;
    return (
      quote.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-['MedievalSharp'] text-[#1A1A1A]">
            Price Quotes Management
          </h2>
          <p className="text-[#4A4A4A]">Create and manage service price quotes for users</p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-[#2C5530] text-white hover:bg-[#1e3d22]"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Create Quote
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A] flex items-center gap-2">
              <FiTrendingUp className="w-4 h-4" />
              Total Quotes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#1A1A1A]">{stats.totalQuotes}</div>
            <p className="text-xs text-[#4A4A4A] mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A] flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#CC8800]">{stats.pendingQuotes}</div>
            <p className="text-xs text-[#4A4A4A] mt-1">Awaiting user response</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A] flex items-center gap-2">
              <FiCheck className="w-4 h-4" />
              Accepted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#2C5530]">{stats.acceptedQuotes}</div>
            <p className="text-xs text-[#4A4A4A] mt-1">Ready for payment</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A] flex items-center gap-2">
              <FiAlertCircle className="w-4 h-4" />
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#8B0000]">{stats.rejectedQuotes}</div>
            <p className="text-xs text-[#4A4A4A] mt-1">Need renegotiation</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader>
          <CardTitle className="text-lg font-['MedievalSharp'] text-[#1A1A1A]">
            Filter Quotes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
              <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-[#8B6F47]">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-[#2C5530] data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-[#CC8800] data-[state=active]:text-white"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="accepted"
                  className="data-[state=active]:bg-[#2C5530] data-[state=active]:text-white"
                >
                  Accepted
                </TabsTrigger>
                <TabsTrigger
                  value="rejected"
                  className="data-[state=active]:bg-[#8B0000] data-[state=active]:text-white"
                >
                  Rejected
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Input
            placeholder="Search by user ID or service name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border-[#8B6F47]"
          />
        </CardContent>
      </Card>

      {/* Messages */}
      {error && (
        <Alert className="border-[#8B0000] bg-[#FFE5E5]">
          <FiAlertCircle className="h-4 w-4 text-[#8B0000]" />
          <AlertDescription className="text-[#8B0000]">{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="border-[#2C5530] bg-[#E8F5E9]">
          <FiCheck className="h-4 w-4 text-[#2C5530]" />
          <AlertDescription className="text-[#2C5530]">✓ {successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Quotes Table */}
      <Card className="bg-white border-2 border-[#8B6F47]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
            {filter === 'all' ? 'All' : filter === 'pending' ? 'Pending' : filter === 'accepted' ? 'Accepted' : 'Rejected'} Quotes ({filteredQuotes.length})
          </CardTitle>
          <CardDescription className="text-[#4A4A4A]">
            {loading ? 'Loading quotes...' : 'Click edit to modify quote'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-[#4A4A4A]">Loading quotes...</p>
            </div>
          ) : filteredQuotes.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-[#4A4A4A]">No quotes found</p>
            </div>
          ) : (
            <div className="overflow-x-auto border-2 border-[#8B6F47] rounded">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#E8D8C0] border-b-2 border-[#8B6F47]">
                    <TableHead className="text-[#1A1A1A] font-semibold">User ID</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Service</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Quoted Price</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Status</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Valid Until</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Created</TableHead>
                    <TableHead className="text-center text-[#1A1A1A] font-semibold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotes.map((quote, index) => {
                    const service = SERVICES.find((s) => s.serviceId === quote.serviceId);
                    const serviceName = service?.name || quote.serviceId;
                    const isExpiredQuote = isExpired(quote.validUntil);

                    return (
                      <TableRow
                        key={quote._id}
                        className={`border-b-2 border-[#E8D8C0] hover:bg-[#F9F3E6] transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F4]'
                        }`}
                      >
                        <TableCell>
                          <code className="text-xs bg-[#f0f0f0] px-2 py-1 rounded">
                            {quote.userId.substring(0, 8)}...
                          </code>
                        </TableCell>
                        <TableCell className="font-medium text-[#1A1A1A]">
                          {serviceName}
                        </TableCell>
                        <TableCell className="font-semibold text-[#1A1A1A]">
                          ${quote.quotedPrice.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusBadgeColor(quote)}>
                              {getStatusText(quote)}
                            </Badge>
                            {isExpiredQuote && !quote.accepted && (
                              <Badge className="bg-[#999] text-white text-xs">Expired</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-[#4A4A4A]">
                          {quote.validUntil ? formatDate(quote.validUntil) : '-'}
                        </TableCell>
                        <TableCell className="text-sm text-[#4A4A4A]">
                          {formatDate(quote.createdAt)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleOpenUpdateDialog(quote)}
                              disabled={quote.accepted || !!quote.rejectedAt}
                              className="h-8 px-2"
                            >
                              <FiEdit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // Copy quote details for reference
                                navigator.clipboard.writeText(
                                  `User: ${quote.userId}\nService: ${serviceName}\nPrice: $${quote.quotedPrice}`
                                );
                                setSuccessMessage('Quote details copied');
                                setTimeout(() => setSuccessMessage(''), 2000);
                              }}
                              className="h-8 px-2 border-[#8B6F47] text-[#8B6F47]"
                            >
                              Copy
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Quote Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Create New Quote
            </DialogTitle>
            <DialogDescription className="text-[#4A4A4A]">
              Send a price quote to a user after discussing via WhatsApp/Messenger
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-id" className="text-[#1A1A1A]">
                User ID *
              </Label>
              <Input
                id="user-id"
                placeholder="User's MongoDB ObjectId"
                value={newQuote.userId}
                onChange={(e) => setNewQuote({ ...newQuote, userId: e.target.value })}
                className="bg-white border-[#8B6F47]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service" className="text-[#1A1A1A]">
                Service *
              </Label>
              <Select value={newQuote.serviceId} onValueChange={(v) => setNewQuote({ ...newQuote, serviceId: v })}>
                <SelectTrigger className="bg-white border-[#8B6F47]">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#8B6F47]">
                  {SERVICES.map((service) => (
                    <SelectItem key={service.serviceId} value={service.serviceId}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-[#1A1A1A]">
                Quoted Price (USD) *
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 199.99"
                value={newQuote.quotedPrice}
                onChange={(e) => setNewQuote({ ...newQuote, quotedPrice: e.target.value })}
                className="bg-white border-[#8B6F47]"
                step="0.01"
                min="0.01"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="validity" className="text-[#1A1A1A]">
                  Valid for (days)
                </Label>
                <Select value={newQuote.validDays} onValueChange={(v) => setNewQuote({ ...newQuote, validDays: v })}>
                  <SelectTrigger className="bg-white border-[#8B6F47]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#8B6F47]">
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-[#1A1A1A]">
                Admin Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="e.g., Complex love situation, requires extended ritual"
                value={newQuote.notes}
                onChange={(e) => setNewQuote({ ...newQuote, notes: e.target.value })}
                className="bg-white border-[#8B6F47] resize-none"
                rows={3}
              />
            </div>

            {error && (
              <Alert className="border-[#8B0000] bg-[#FFE5E5]">
                <AlertDescription className="text-[#8B0000]">{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              disabled={createLoading}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateQuote}
              disabled={createLoading}
              className="bg-[#2C5530] text-white hover:bg-[#1e3d22]"
            >
              {createLoading ? 'Creating...' : 'Create Quote'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Quote Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Update Quote
            </DialogTitle>
            <DialogDescription className="text-[#4A4A4A]">
              Modify the quote price or notes
            </DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="space-y-4 py-4">
              <div className="bg-white border-2 border-[#8B6F47] p-3 rounded">
                <p className="text-sm text-[#4A4A4A]">
                  <strong>Service:</strong> {SERVICES.find((s) => s.serviceId === selectedQuote.serviceId)?.name}
                </p>
                <p className="text-sm text-[#4A4A4A]">
                  <strong>Original Quote:</strong> ${selectedQuote.quotedPrice.toFixed(2)}
                </p>
                <p className="text-sm text-[#4A4A4A]">
                  <strong>Status:</strong> {getStatusText(selectedQuote)}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-price" className="text-[#1A1A1A]">
                  New Price (USD) *
                </Label>
                <Input
                  id="new-price"
                  type="number"
                  value={updateQuote.newPrice}
                  onChange={(e) => setUpdateQuote({ ...updateQuote, newPrice: e.target.value })}
                  className="bg-white border-[#8B6F47]"
                  step="0.01"
                  min="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-notes" className="text-[#1A1A1A]">
                  Updated Notes
                </Label>
                <Textarea
                  id="new-notes"
                  value={updateQuote.newNotes}
                  onChange={(e) => setUpdateQuote({ ...updateQuote, newNotes: e.target.value })}
                  className="bg-white border-[#8B6F47] resize-none"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="extend-days" className="text-[#1A1A1A]">
                  Extend Validity (days)
                </Label>
                <Input
                  id="extend-days"
                  type="number"
                  value={updateQuote.extendValidityDays}
                  onChange={(e) => setUpdateQuote({ ...updateQuote, extendValidityDays: e.target.value })}
                  className="bg-white border-[#8B6F47]"
                  min="0"
                  placeholder="0 = no extension"
                />
              </div>

              {error && (
                <Alert className="border-[#8B0000] bg-[#FFE5E5]">
                  <AlertDescription className="text-[#8B0000]">{error}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUpdateDialogOpen(false)}
              disabled={updateLoading}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateQuote}
              disabled={updateLoading}
              className="bg-[#2C5530] text-white hover:bg-[#1e3d22]"
            >
              {updateLoading ? 'Updating...' : 'Update Quote'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
