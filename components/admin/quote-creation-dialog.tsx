'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FiSave, FiX, FiAlertCircle, FiCheck, FiSearch } from 'react-icons/fi';

interface QuoteCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId?: string;
  serviceName?: string;
  onQuoteCreated?: (quoteId: string) => void;
}

interface Service {
  serviceId: string;
  name: string;
}

interface UserOption {
  _id: string;
  name: string;
  email: string;
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

export function QuoteCreationDialog({
  isOpen,
  onClose,
  serviceId: preselectedServiceId,
  serviceName: preselectedServiceName,
  onQuoteCreated,
}: QuoteCreationDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userSearchResults, setUserSearchResults] = useState<UserOption[]>([]);
  const [userSearchLoading, setUserSearchLoading] = useState(false);
  const [showUserResults, setShowUserResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserOption | null>(null);
  const [formData, setFormData] = useState({
    userId: '',
    serviceId: preselectedServiceId || '',
    quotedPrice: '',
    validDays: '7',
    notes: '',
  });

  // Search users as admin types
  useEffect(() => {
    const searchUsers = async () => {
      if (!searchQuery.trim() || searchQuery.length < 2) {
        setUserSearchResults([]);
        setShowUserResults(false);
        return;
      }

      setUserSearchLoading(true);
      try {
        const response = await fetch(`/api/users/search?query=${encodeURIComponent(searchQuery)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setUserSearchResults(data.users || []);
          setShowUserResults(true);
        }
      } catch (err) {
        console.error('User search error:', err);
        setUserSearchResults([]);
      } finally {
        setUserSearchLoading(false);
      }
    };

    const timer = setTimeout(searchUsers, 300); // Debounce
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectUser = (user: UserOption) => {
    setSelectedUser(user);
    setFormData(prev => ({ ...prev, userId: user._id }));
    setSearchQuery('');
    setUserSearchResults([]);
    setShowUserResults(false);
  };

  const handleClearSelection = () => {
    setSelectedUser(null);
    setFormData(prev => ({ ...prev, userId: '' }));
    setSearchQuery('');
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        userId: '',
        serviceId: preselectedServiceId || '',
        quotedPrice: '',
        validDays: '7',
        notes: '',
      });
      setSelectedUser(null);
      setSearchQuery('');
      setUserSearchResults([]);
      setShowUserResults(false);
      setError('');
      setSuccess(false);
      onClose();
    }
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess(false);

    // Validation
    if (!formData.userId?.trim()) {
      setError('Please select a client');
      return;
    }

    if (!formData.serviceId) {
      setError('Please select a service');
      return;
    }

    if (!formData.quotedPrice || parseFloat(formData.quotedPrice) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/payments/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: formData.userId,
          serviceId: formData.serviceId,
          quotedPrice: Math.round(parseFloat(formData.quotedPrice) * 100), // Convert to cents
          validDays: parseInt(formData.validDays),
          notes: formData.notes || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create quote');
      }

      const data = await response.json();
      setSuccess(true);
      onQuoteCreated?.(data.quoteId);

      // Reset form after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create quote');
    } finally {
      setLoading(false);
    }
  };

  const selectedService = SERVICES.find((s) => s.serviceId === formData.serviceId);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-[#1A1A1A] border-[#B8860B] border-2 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-['MedievalSharp'] text-[#F4E8D0]">
            Create Price Quote
          </DialogTitle>
          <DialogDescription className="font-['Crimson_Text'] text-[#E8DCC0]">
            Generate a personalized quote for a client&apos;s spiritual service
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* User Selection Section */}
          <div className="space-y-4 border-b border-[#8B6F47] pb-6">
            <h3 className="font-['MedievalSharp'] text-[#F4E8D0] text-lg">Client Selection</h3>

            <div className="space-y-2">
              <Label htmlFor="clientSearch" className="font-['Crimson_Text'] text-[#E8DCC0]">
                Search for Client
              </Label>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-3 text-[#8B6F47] w-4 h-4" />
                    <Input
                      id="clientSearch"
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => searchQuery.length >= 2 && setShowUserResults(true)}
                      disabled={loading || !!selectedUser}
                      className="bg-[#2A2A2A] border-[#8B6F47] text-[#E8DCC0] placeholder-[#6B5C3D] pl-10"
                    />
                  </div>
                  {selectedUser && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleClearSelection}
                      disabled={loading}
                      className="border-[#8B6F47] text-[#E8DCC0] hover:bg-[#2A2A2A]"
                    >
                      Clear
                    </Button>
                  )}
                </div>

                {/* User Search Results Dropdown */}
                {showUserResults && userSearchResults.length > 0 && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#2A2A2A] border-2 border-[#8B6F47] rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {userSearchLoading ? (
                      <div className="p-3 text-center text-[#8B6F47] font-['Crimson_Text']">
                        <span className="animate-spin mr-2">✦</span>
                        Searching...
                      </div>
                    ) : (
                      userSearchResults.map((user) => (
                        <button
                          key={user._id}
                          type="button"
                          onClick={() => handleSelectUser(user)}
                          className="w-full text-left px-4 py-2 hover:bg-[#3A3A3A] border-b border-[#8B6F47] last:border-b-0 transition-colors"
                        >
                          <div className="font-['MedievalSharp'] text-[#F4E8D0]">{user.name}</div>
                          <div className="text-sm text-[#B8860B] font-['Crimson_Text']">{user.email}</div>
                        </button>
                      ))
                    )}
                  </div>
                )}

                {/* No results message */}
                {showUserResults && !userSearchLoading && userSearchResults.length === 0 && searchQuery.length >= 2 && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#2A2A2A] border-2 border-[#8B6F47] rounded-md p-3 text-center text-[#8B6F47] font-['Crimson_Text']">
                    No clients found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>

            {/* Selected Client Display */}
            {selectedUser && (
              <div className="bg-[#2A2A2A] border-2 border-[#B8860B] rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-['MedievalSharp'] text-[#F4E8D0] text-lg">{selectedUser.name}</div>
                    <div className="text-sm text-[#B8860B] font-['Crimson_Text']">{selectedUser.email}</div>
                    <div className="text-xs text-[#8B6F47] mt-1">ID: {selectedUser._id}</div>
                  </div>
                  <FiCheck className="w-5 h-5 text-[#2C5530]" />
                </div>
              </div>
            )}
          </div>

          {/* Service Selection Section */}
          <div className="space-y-4 border-b border-[#8B6F47] pb-6">
            <h3 className="font-['MedievalSharp'] text-[#F4E8D0] text-lg">Service Details</h3>

            <div className="space-y-2">
              <Label htmlFor="service" className="font-['Crimson_Text'] text-[#E8DCC0]">
                Select Sacred Service
              </Label>
              <Select
                value={formData.serviceId}
                onValueChange={(value) =>
                  setFormData({ ...formData, serviceId: value })
                }
                disabled={loading || !!preselectedServiceId}
              >
                <SelectTrigger
                  id="service"
                  className="bg-[#2A2A2A] border-[#8B6F47] text-[#E8DCC0]"
                >
                  <SelectValue
                    placeholder={
                      preselectedServiceName || 'Choose a service...'
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2A] border-[#8B6F47]">
                  {SERVICES.map((service) => (
                    <SelectItem
                      key={service.serviceId}
                      value={service.serviceId}
                      className="text-[#E8DCC0]"
                    >
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedService && (
                <p className="text-sm text-[#B8860B] font-['Crimson_Text']">
                  Selected: {selectedService.name}
                </p>
              )}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4 border-b border-[#8B6F47] pb-6">
            <h3 className="font-['MedievalSharp'] text-[#F4E8D0] text-lg">Pricing & Validity</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="font-['Crimson_Text'] text-[#E8DCC0]">
                  Quoted Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.quotedPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, quotedPrice: e.target.value })
                  }
                  disabled={loading}
                  className="bg-[#2A2A2A] border-[#8B6F47] text-[#E8DCC0] placeholder-[#6B5C3D]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="validity" className="font-['Crimson_Text'] text-[#E8DCC0]">
                  Quote Validity (Days)
                </Label>
                <Select
                  value={formData.validDays}
                  onValueChange={(value) =>
                    setFormData({ ...formData, validDays: value })
                  }
                  disabled={loading}
                >
                  <SelectTrigger
                    id="validity"
                    className="bg-[#2A2A2A] border-[#8B6F47] text-[#E8DCC0]"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-[#8B6F47]">
                    <SelectItem value="3" className="text-[#E8DCC0]">
                      3 Days
                    </SelectItem>
                    <SelectItem value="7" className="text-[#E8DCC0]">
                      7 Days (Recommended)
                    </SelectItem>
                    <SelectItem value="14" className="text-[#E8DCC0]">
                      14 Days
                    </SelectItem>
                    <SelectItem value="30" className="text-[#E8DCC0]">
                      30 Days
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Admin Notes Section */}
          <div className="space-y-4">
            <h3 className="font-['MedievalSharp'] text-[#F4E8D0] text-lg">Additional Information</h3>

            <div className="space-y-2">
              <Label htmlFor="notes" className="font-['Crimson_Text'] text-[#E8DCC0]">
                Admin Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Special instructions, client notes, payment arrangements, etc."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                disabled={loading}
                rows={3}
                className="bg-[#2A2A2A] border-[#8B6F47] text-[#E8DCC0] placeholder-[#6B5C3D] font-['Crimson_Text']"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert className="bg-[#2A2A2A] border-[#8B0000] border-2">
              <FiAlertCircle className="h-4 w-4 text-[#8B0000]" />
              <AlertDescription className="text-[#FFB6C6] font-['Crimson_Text']">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {success && (
            <Alert className="bg-[#2A2A2A] border-[#2C5530] border-2">
              <FiCheck className="h-4 w-4 text-[#2C5530]" />
              <AlertDescription className="text-[#C8E6C9] font-['Crimson_Text']">
                Quote created successfully! Redirecting...
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={loading}
            className="border-[#8B6F47] text-[#E8DCC0] hover:bg-[#2A2A2A]"
          >
            <FiX className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#B8860B] hover:bg-[#CC8800] text-[#1A1A1A] font-['MedievalSharp']"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">✦</span>
                Creating...
              </>
            ) : (
              <>
                <FiSave className="w-4 h-4 mr-2" />
                Create Quote
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
