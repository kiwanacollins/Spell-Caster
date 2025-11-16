'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AdminTestimonialManagement } from './admin-testimonial-management';
import { AdminTestimonialAnalytics } from './admin-testimonial-analytics';
import { VideoUploadComponent } from './video-upload-component';
import { TestimonialServiceAssociation } from './testimonial-service-association';
import { FiPlus } from 'react-icons/fi';

export function AdminTestimonialPageClient() {
  const [activeTab, setActiveTab] = useState('management');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleVideoUpload = async (data: {
    clientName: string;
    clientEmail: string;
    service: string;
    rating: number;
    testimonialText: string;
    videoFile: File;
  }) => {
    try {
      const formData = new FormData();
      formData.append('clientName', data.clientName);
      formData.append('clientEmail', data.clientEmail);
      formData.append('service', data.service);
      formData.append('rating', data.rating.toString());
      formData.append('testimonialText', data.testimonialText);
      formData.append('videoFile', data.videoFile);

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload testimonial');
      }

      // Success - testimonial uploaded
    } catch (error) {
      throw error;
    }
  };

  const handleApprove = async (testimonialId: string) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve testimonial');
      }

      // eslint-disable-next-line no-console
      console.log('Testimonial approved');
    } catch (error) {
      throw error;
    }
  };

  const handleReject = async (testimonialId: string, reason?: string) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected', reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject testimonial');
      }

      // Success - testimonial rejected
    } catch (error) {
      throw error;
    }
  };

  const handleFeature = async (testimonialId: string, isFeatured: boolean) => {
    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured }),
      });

      if (!response.ok) {
        throw new Error('Failed to update testimonial');
      }

      // Success - testimonial featured status updated
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-['MedievalSharp'] text-[#1A1A1A]">
            Video Testimonials Management
          </h2>
          <p className="text-[#4A4A4A]">Manage and analyze client success stories</p>
        </div>
        <Button
          onClick={() => setUploadDialogOpen(true)}
          className="bg-[#2C5530] text-white hover:bg-[#1e3d22]"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Upload Video
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <TabsTrigger
            value="management"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Queue & Moderation
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="association"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Service Association
          </TabsTrigger>
        </TabsList>

        {/* Management Tab */}
        <TabsContent value="management" className="space-y-6">
          <AdminTestimonialManagement
            onApprove={handleApprove}
            onReject={handleReject}
            onFeature={handleFeature}
          />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <AdminTestimonialAnalytics />
        </TabsContent>

        {/* Service Association Tab */}
        <TabsContent value="association" className="space-y-6">
          <TestimonialServiceAssociation />
        </TabsContent>
      </Tabs>

      {/* Video Upload Dialog */}
      <VideoUploadComponent
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUpload={handleVideoUpload}
      />
    </div>
  );
}
