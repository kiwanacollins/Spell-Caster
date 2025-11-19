'use client';

/**
 * Service Payment Checkout Component
 * Handles Stripe payment processing for service requests using Payment Element
 * Features: Mystical styling, payment status handling, receipt generation
 */

import React, { useEffect, useState } from 'react';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  GiCoinsPile, 
  GiMoon, 
  GiCandles,
  GiCheckMark,
} from 'react-icons/gi';
import { IoWarning, IoCheckmarkCircle } from 'react-icons/io5';

interface ServicePaymentCheckoutProps {
  serviceName: string;
  serviceId: string;
  amount: number;
  description?: string;
  onPaymentSuccess?: (paymentIntentId: string) => void;
  onPaymentError?: (error: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

let stripePromise: ReturnType<typeof loadStripe> | null = null;

function getStripe() {
  if (!stripePromise) {
    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
    if (!publicKey) {
      throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
    }
    stripePromise = loadStripe(publicKey);
  }
  return stripePromise;
}

/**
 * Embedded Checkout Component
 */
function CheckoutContent({
  clientSecret,
  onPaymentSuccess,
  onPaymentError,
}: {
  clientSecret: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
}) {
  return (
    <EmbeddedCheckoutProvider
      stripe={getStripe()}
      options={{
        clientSecret,
        onComplete: () => {
          // Payment completed, extract intent ID from clientSecret if available
          const intentId = clientSecret.split('_secret_')[0];
          onPaymentSuccess(intentId);
        },
      }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}

/**
 * Main Payment Checkout Component
 */
export function ServicePaymentCheckout({
  serviceName,
  serviceId,
  amount,
  description,
  onPaymentSuccess,
  onPaymentError,
  isOpen,
  onClose,
}: ServicePaymentCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  // Create payment intent when dialog opens
  useEffect(() => {
    if (!isOpen || clientSecret) return;

    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/payments/create-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            serviceId,
            serviceName,
            amount,
            description: description || `Payment for ${serviceName}`,
            metadata: {
              serviceType: serviceName,
            },
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setPaymentStatus('error');
        onPaymentError?.(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [isOpen, clientSecret, serviceId, serviceName, amount, description, onPaymentError]);

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setPaymentStatus('success');
    onPaymentSuccess?.(paymentIntentId);

    // Auto-close after 3 seconds
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handlePaymentError = (errorMessage: string) => {
    setPaymentStatus('error');
    setError(errorMessage);
    onPaymentError?.(errorMessage);
  };

  const handleClose = () => {
    setClientSecret(null);
    setError(null);
    setPaymentStatus('idle');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-[#1A1A1A] border-2 border-[#B8860B]">
        <DialogHeader>
          <DialogTitle className="font-['MedievalSharp'] text-2xl text-[#F4E8D0] flex items-center gap-3">
            <GiCoinsPile className="text-[#B8860B]" />
            Sacred Investment
          </DialogTitle>
          <DialogDescription className="font-['Crimson_Text'] text-[#E8DCC0]">
            Complete your payment for <span className="text-[#B8860B] font-medium">{serviceName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Service Summary */}
          <Card className="bg-[#2C2416] border-[#B8860B] border-2">
            <CardHeader className="border-b border-[#8B6F47]">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0]">
                    {serviceName}
                  </CardTitle>
                  <CardDescription className="font-['Crimson_Text'] text-[#8B6F47]">
                    Mystical ritual to transform your life
                  </CardDescription>
                </div>
                <Badge className="bg-[#8B0000] text-[#F4E8D0] font-['MedievalSharp']">
                  Investment Amount
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-['Crimson_Text'] text-[#E8DCC0]">Service Fee:</span>
                <span className="font-['MedievalSharp'] text-2xl text-[#B8860B]">
                  ${amount.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-[#8B6F47] pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-['MedievalSharp'] text-[#F4E8D0]">Total Due:</span>
                  <span className="font-['MedievalSharp'] text-3xl text-[#B8860B]">
                    ${amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status Messages */}
          {loading && (
            <Alert className="bg-[#2C2416] border-[#CC8800]">
              <GiCandles className="h-4 w-4 text-[#CC8800]" />
              <AlertDescription className="font-['Crimson_Text'] text-[#E8DCC0]">
                Preparing the sacred ritual space... Please wait while we initialize payment.
              </AlertDescription>
            </Alert>
          )}

          {error && paymentStatus === 'error' && (
            <Alert className="bg-[#2C2416] border-[#8B0000]">
              <IoWarning className="h-4 w-4 text-[#8B0000]" />
              <AlertDescription className="font-['Crimson_Text'] text-[#E8DCC0]">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {paymentStatus === 'success' && (
            <Alert className="bg-[#2C5530] border-[#2C5530]">
              <IoCheckmarkCircle className="h-4 w-4 text-[#90EE90]" />
              <AlertDescription className="font-['Crimson_Text'] text-[#E8DCC0]">
                ✓ Payment received! Your ritual begins immediately. Check your email for details.
              </AlertDescription>
            </Alert>
          )}

          {/* Checkout Form */}
          {clientSecret && paymentStatus !== 'success' && (
            <div className="bg-[#2C2416] border-2 border-[#B8860B] rounded-lg p-6">
              <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret }}>
                <CheckoutContent
                  clientSecret={clientSecret}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              </EmbeddedCheckoutProvider>
            </div>
          )}

          {/* Trust & Security Message */}
          <Alert className="bg-[#2C2416] border-[#8B6F47]">
            <GiMoon className="h-4 w-4 text-[#B8860B]" />
            <AlertDescription className="font-['Crimson_Text'] text-[#8B6F47]">
              Your payment is encrypted and secure. No spell can penetrate Stripe's ancient protection wards.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="border-t border-[#8B6F47] pt-6">
          <Button
            onClick={handleClose}
            variant="outline"
            className="border-[#8B6F47] text-[#E8DCC0] hover:bg-[#2C2416] font-['MedievalSharp']"
            disabled={loading || paymentStatus === 'processing'}
          >
            {paymentStatus === 'success' ? 'Close' : 'Cancel'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ServicePaymentCheckout;
