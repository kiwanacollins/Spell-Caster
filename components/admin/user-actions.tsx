'use client';

import { useState } from 'react';
import { UserDocument } from '@/lib/db/models/user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FiAlertCircle, FiCreditCard, FiGift } from 'react-icons/fi';

interface UserActionsProps {
  user: UserDocument;
  onSuspend?: (userId: string, reason: string) => Promise<void>;
  onReactivate?: (userId: string) => Promise<void>;
  onRefund?: (userId: string, amount: number, reason: string) => Promise<void>;
  onGrantCredits?: (userId: string, amount: number, reason: string) => Promise<void>;
}

export function UserActions({
  user,
  onSuspend,
  onReactivate,
  onRefund,
  onGrantCredits,
}: UserActionsProps) {
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [showCreditsDialog, setShowCreditsDialog] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [creditsAmount, setCreditsAmount] = useState('');
  const [creditsReason, setCreditsReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSuspend = async () => {
    if (!suspensionReason.trim()) {
      alert('Please provide a suspension reason');
      return;
    }

    setIsLoading(true);
    try {
      await onSuspend?.(user.id, suspensionReason);
      setShowSuspendDialog(false);
      setSuspensionReason('');
    } catch (error) {
      console.error('Error suspending user:', error);
      alert('Failed to suspend user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReactivate = async () => {
    setIsLoading(true);
    try {
      await onReactivate?.(user.id);
    } catch (error) {
      console.error('Error reactivating user:', error);
      alert('Failed to reactivate user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefund = async () => {
    const amount = parseFloat(refundAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid refund amount');
      return;
    }

    if (!refundReason.trim()) {
      alert('Please provide a refund reason');
      return;
    }

    setIsLoading(true);
    try {
      await onRefund?.(user.id, amount, refundReason);
      setShowRefundDialog(false);
      setRefundAmount('');
      setRefundReason('');
    } catch (error) {
      console.error('Error issuing refund:', error);
      alert('Failed to issue refund');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGrantCredits = async () => {
    const amount = parseFloat(creditsAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid credit amount');
      return;
    }

    if (!creditsReason.trim()) {
      alert('Please provide a reason for granting credits');
      return;
    }

    setIsLoading(true);
    try {
      await onGrantCredits?.(user.id, amount, creditsReason);
      setShowCreditsDialog(false);
      setCreditsAmount('');
      setCreditsReason('');
    } catch (error) {
      console.error('Error granting credits:', error);
      alert('Failed to grant credits');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] rounded-lg p-6">
        <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-4">Admin Actions</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Suspend/Reactivate */}
          {!user.isSuspended && user.role === 'user' && (
            <Button
              variant="outline"
              onClick={() => setShowSuspendDialog(true)}
              disabled={isLoading}
              className="border-red-700 text-red-700 hover:bg-red-900/10"
            >
              <FiAlertCircle className="w-4 h-4 mr-2" />
              Suspend User
            </Button>
          )}

          {user.isSuspended && (
            <Button
              variant="outline"
              onClick={handleReactivate}
              disabled={isLoading}
              className="border-green-700 text-green-700 hover:bg-green-900/10"
            >
              <FiAlertCircle className="w-4 h-4 mr-2" />
              Reactivate User
            </Button>
          )}

          {/* Refund */}
          <Button
            variant="outline"
            onClick={() => setShowRefundDialog(true)}
            disabled={isLoading}
            className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47]/10"
          >
            <FiCreditCard className="w-4 h-4 mr-2" />
            Issue Refund
          </Button>

          {/* Grant Credits */}
          <Button
            variant="outline"
            onClick={() => setShowCreditsDialog(true)}
            disabled={isLoading}
            className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B]/10"
          >
            <FiGift className="w-4 h-4 mr-2" />
            Grant Credits
          </Button>
        </div>
      </div>

      {/* Suspension Dialog */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent className="bg-[#1A1A1A] border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="text-[#F4E8D0]">Suspend User</DialogTitle>
            <DialogDescription className="text-[#C0C0C0]">
              Suspending {user.name} will prevent them from accessing their account.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Alert className="bg-red-900/20 border-red-700">
              <FiAlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-300 ml-2">
                This action will disable the user's account. They will not be able to access the
                platform.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F4E8D0]">Suspension Reason</label>
              <Textarea
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                placeholder="Enter the reason for suspending this user..."
                className="bg-[#2A2A2A] border-[#8B6F47] text-[#F4E8D0] placeholder:text-[#8B6F47]/50"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSuspendDialog(false)}
              disabled={isLoading}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSuspend}
              disabled={isLoading || !suspensionReason.trim()}
              className="bg-red-900 text-white hover:bg-red-800"
            >
              {isLoading ? 'Suspending...' : 'Suspend User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refund Dialog */}
      <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <DialogContent className="bg-[#1A1A1A] border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="text-[#F4E8D0]">Issue Refund</DialogTitle>
            <DialogDescription className="text-[#C0C0C0]">
              Issue a refund to {user.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F4E8D0]">Refund Amount ($)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                placeholder="Enter refund amount..."
                className="bg-[#2A2A2A] border-[#8B6F47] text-[#F4E8D0] placeholder:text-[#8B6F47]/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F4E8D0]">Reason</label>
              <Textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                placeholder="Enter refund reason..."
                className="bg-[#2A2A2A] border-[#8B6F47] text-[#F4E8D0] placeholder:text-[#8B6F47]/50"
                rows={3}
              />
            </div>

            <Alert className="bg-[#8B6F47]/20 border-[#8B6F47]">
              <AlertDescription className="text-[#F4E8D0]">
                Refund will be processed to the original payment method.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRefundDialog(false)}
              disabled={isLoading}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRefund}
              disabled={isLoading || !refundAmount || !refundReason.trim()}
              className="bg-[#8B6F47] text-[#1A1A1A] hover:bg-[#9B7F57]"
            >
              {isLoading ? 'Processing...' : 'Issue Refund'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Grant Credits Dialog */}
      <Dialog open={showCreditsDialog} onOpenChange={setShowCreditsDialog}>
        <DialogContent className="bg-[#1A1A1A] border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="text-[#F4E8D0]">Grant Credits</DialogTitle>
            <DialogDescription className="text-[#C0C0C0]">
              Grant store credits to {user.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F4E8D0]">Credit Amount ($)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={creditsAmount}
                onChange={(e) => setCreditsAmount(e.target.value)}
                placeholder="Enter credit amount..."
                className="bg-[#2A2A2A] border-[#8B6F47] text-[#F4E8D0] placeholder:text-[#8B6F47]/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F4E8D0]">Reason</label>
              <Textarea
                value={creditsReason}
                onChange={(e) => setCreditsReason(e.target.value)}
                placeholder="Enter reason for granting credits..."
                className="bg-[#2A2A2A] border-[#8B6F47] text-[#F4E8D0] placeholder:text-[#8B6F47]/50"
                rows={3}
              />
            </div>

            <Alert className="bg-[#2C5530]/20 border-[#2C5530]">
              <AlertDescription className="text-[#7FD87F]">
                Credits will be added to the user's account immediately.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreditsDialog(false)}
              disabled={isLoading}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGrantCredits}
              disabled={isLoading || !creditsAmount || !creditsReason.trim()}
              className="bg-[#B8860B] text-[#1A1A1A] hover:bg-[#C89C2B]"
            >
              {isLoading ? 'Granting...' : 'Grant Credits'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
