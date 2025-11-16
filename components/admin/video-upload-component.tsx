'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FiUpload, FiX, FiCheckCircle } from 'react-icons/fi';

interface VideoUploadComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload?: (data: {
    clientName: string;
    clientEmail: string;
    service: string;
    rating: number;
    testimonialText: string;
    videoFile: File;
  }) => Promise<void>;
}

const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/mpeg'];

export function VideoUploadComponent({
  open,
  onOpenChange,
  onUpload,
}: VideoUploadComponentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    service: '',
    rating: '5',
    testimonialText: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    // Validate file type
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload MP4, WebM, or MPEG video.');
      return;
    }

    // Validate file size
    if (file.size > MAX_VIDEO_SIZE) {
      setError('File size exceeds 500MB limit. Please upload a smaller video.');
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    // Validation
    if (!formData.clientName.trim()) {
      setError('Client name is required');
      return;
    }
    if (!formData.clientEmail.trim()) {
      setError('Client email is required');
      return;
    }
    if (!formData.service.trim()) {
      setError('Service type is required');
      return;
    }
    if (!formData.testimonialText.trim()) {
      setError('Testimonial text is required');
      return;
    }
    if (!selectedFile) {
      setError('Please select a video file');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess(false);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 30;
        });
      }, 300);

      await onUpload?.({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        service: formData.service,
        rating: parseInt(formData.rating),
        testimonialText: formData.testimonialText,
        videoFile: selectedFile,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      setSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          clientName: '',
          clientEmail: '',
          service: '',
          rating: '5',
          testimonialText: '',
        });
        setSelectedFile(null);
        setUploadProgress(0);
        setSuccess(false);
        onOpenChange(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload testimonial');
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const getRatingLabel = (rating: string) => {
    const labels: { [key: string]: string } = {
      '5': '⭐⭐⭐⭐⭐ Excellent',
      '4': '⭐⭐⭐⭐ Very Good',
      '3': '⭐⭐⭐ Good',
      '2': '⭐⭐ Fair',
      '1': '⭐ Poor',
    };
    return labels[rating] || 'Rate';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47] max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
            Upload Video Testimonial
          </DialogTitle>
          <DialogDescription className="text-[#4A4A4A]">
            Share a client's success story through video
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Client Information */}
          <Card className="bg-white border-2 border-[#8B6F47]">
            <CardHeader>
              <CardTitle className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName" className="text-[#1A1A1A]">
                    Client Name *
                  </Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="bg-white border-[#8B6F47]"
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail" className="text-[#1A1A1A]">
                    Email *
                  </Label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    className="bg-white border-[#8B6F47]"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service & Rating */}
          <Card className="bg-white border-2 border-[#8B6F47]">
            <CardHeader>
              <CardTitle className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                Service & Rating
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-[#1A1A1A]">
                    Service Type *
                  </Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border-2 border-[#8B6F47] rounded text-[#1A1A1A]"
                  >
                    <option value="">Select a service</option>
                    <option value="Binding Spell">Binding Spell</option>
                    <option value="Business Boost">Business Boost</option>
                    <option value="Protection">Protection & Shielding</option>
                    <option value="Marriage">Marriage & Commitment</option>
                    <option value="Cleansing">Cleansing Rituals</option>
                    <option value="Wealth Flow">Wealth Flow</option>
                    <option value="Divorce Spell">Divorce Spell</option>
                    <option value="Court Case">Winning a Court Case</option>
                    <option value="Obsession">Obsession Spell</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating" className="text-[#1A1A1A]">
                    Rating *
                  </Label>
                  <select
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border-2 border-[#8B6F47] rounded text-[#1A1A1A]"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Very Good</option>
                    <option value="3">⭐⭐⭐ Good</option>
                    <option value="2">⭐⭐ Fair</option>
                    <option value="1">⭐ Poor</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial Text */}
          <div className="space-y-2">
            <Label htmlFor="testimonialText" className="text-[#1A1A1A]">
              Testimonial Text *
            </Label>
            <Textarea
              id="testimonialText"
              name="testimonialText"
              value={formData.testimonialText}
              onChange={handleInputChange}
              placeholder="What did the client say about the service..."
              className="bg-white border-2 border-[#8B6F47] resize-none min-h-[120px]"
            />
            <p className="text-xs text-[#666]">
              {formData.testimonialText.length}/500 characters
            </p>
          </div>

          {/* Video Upload */}
          <div className="space-y-2">
            <Label className="text-[#1A1A1A]">Video File *</Label>
            <div
              className="border-2 border-dashed border-[#8B6F47] rounded-lg p-6 text-center cursor-pointer hover:bg-[#F9F3E6] transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <FiUpload className="w-8 h-8 text-[#8B6F47]" />
                {selectedFile ? (
                  <>
                    <p className="font-semibold text-[#2C5530]">{selectedFile.name}</p>
                    <p className="text-xs text-[#666]">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-[#1A1A1A]">Click to upload video</p>
                    <p className="text-xs text-[#666]">
                      MP4, WebM, MPEG • Max 500MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#1A1A1A]">Uploading...</p>
                <p className="text-sm font-semibold text-[#8B6F47]">
                  {Math.round(uploadProgress)}%
                </p>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Success Message */}
          {success && (
            <Alert className="border-[#2C5530] bg-[#E8F5E9]">
              <FiCheckCircle className="h-4 w-4 text-[#2C5530]" />
              <AlertDescription className="text-[#2C5530]">
                ✓ Testimonial uploaded successfully and is pending review
              </AlertDescription>
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert className="border-[#8B0000] bg-[#FFE5E5]">
              <AlertDescription className="text-[#8B0000]">{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
            className="border-[#8B6F47] text-[#8B6F47]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={isUploading || !selectedFile || !formData.clientName}
            className="bg-[#2C5530] text-white hover:bg-[#1e3d22]"
          >
            {isUploading ? 'Uploading...' : 'Upload Testimonial'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
