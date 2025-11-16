'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FiPlus, FiTrash2, FiEdit2, FiLink2 } from 'react-icons/fi';

interface TestimonialService {
  id: string;
  testimonialId: string;
  clientName: string;
  rating: number;
  service: string;
  isPrimary: boolean;
  createdAt: string;
}

interface ServiceAssociationProps {
  onAssociate?: (testimonialId: string, service: string, isPrimary: boolean) => Promise<void>;
  onRemove?: (testimonialId: string, service: string) => Promise<void>;
}

const SERVICES = [
  'Love Spell',
  'Protection Ritual',
  'Prosperity Blessing',
  'Healing Ceremony',
  'Spiritual Cleansing',
  'Energy Alignment',
  'Manifestation Ritual',
  'Tarot Reading',
  'Chakra Balancing',
];

const mockAssociations: TestimonialService[] = [
  {
    id: '1',
    testimonialId: 'test-1',
    clientName: 'Sarah M.',
    rating: 5,
    service: 'Love Spell',
    isPrimary: true,
    createdAt: '2025-11-10',
  },
  {
    id: '2',
    testimonialId: 'test-1',
    clientName: 'Sarah M.',
    rating: 5,
    service: 'Energy Alignment',
    isPrimary: false,
    createdAt: '2025-11-10',
  },
  {
    id: '3',
    testimonialId: 'test-2',
    clientName: 'James L.',
    rating: 5,
    service: 'Protection Ritual',
    isPrimary: true,
    createdAt: '2025-11-08',
  },
  {
    id: '4',
    testimonialId: 'test-3',
    clientName: 'Emma K.',
    rating: 4,
    service: 'Healing Ceremony',
    isPrimary: true,
    createdAt: '2025-11-05',
  },
  {
    id: '5',
    testimonialId: 'test-4',
    clientName: 'Michael R.',
    rating: 5,
    service: 'Prosperity Blessing',
    isPrimary: true,
    createdAt: '2025-11-03',
  },
  {
    id: '6',
    testimonialId: 'test-4',
    clientName: 'Michael R.',
    rating: 5,
    service: 'Manifestation Ritual',
    isPrimary: false,
    createdAt: '2025-11-03',
  },
];

export function TestimonialServiceAssociation({ onAssociate, onRemove }: ServiceAssociationProps) {
  const [associations, setAssociations] = useState<TestimonialService[]>(mockAssociations);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTestimonial, setSelectedTestimonial] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [isPrimary, setIsPrimary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredAssociations = associations.filter((assoc) =>
    assoc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assoc.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = async () => {
    if (!selectedTestimonial || !selectedService) return;

    setIsLoading(true);
    try {
      if (onAssociate) {
        await onAssociate(selectedTestimonial, selectedService, isPrimary);
      }

      const newAssociation: TestimonialService = {
        id: `assoc-${Date.now()}`,
        testimonialId: selectedTestimonial,
        clientName: 'New Client',
        rating: 5,
        service: selectedService,
        isPrimary,
        createdAt: new Date().toISOString().split('T')[0],
      };

      setAssociations([...associations, newAssociation]);
      setOpenDialog(false);
      setSelectedTestimonial('');
      setSelectedService('');
      setIsPrimary(false);
    } catch (error) {
      console.error('Failed to associate testimonial with service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    const association = associations.find((a) => a.id === id);
    if (!association) return;

    try {
      if (onRemove) {
        await onRemove(association.testimonialId, association.service);
      }

      setAssociations(associations.filter((a) => a.id !== id));
    } catch (error) {
      console.error('Failed to remove association:', error);
    }
  };

  const groupedByTestimonial = associations.reduce(
    (acc, assoc) => {
      if (!acc[assoc.testimonialId]) {
        acc[assoc.testimonialId] = [];
      }
      acc[assoc.testimonialId].push(assoc);
      return acc;
    },
    {} as Record<string, TestimonialService[]>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A]">Service Association</h3>
          <p className="text-sm text-[#4A4A4A]">Link testimonials to services for targeted campaigns</p>
        </div>
        <Button
          onClick={() => setOpenDialog(true)}
          className="bg-[#2C5530] text-white hover:bg-[#1e3d22]"
        >
          <FiLink2 className="w-4 h-4 mr-2" />
          Link Testimonial
        </Button>
      </div>

      {/* Mapping by Testimonial */}
      <div className="space-y-4">
        {Object.entries(groupedByTestimonial).map(([testimonialId, serviceAssociations]) => (
          <Card
            key={testimonialId}
            className="border-2 border-[#8B6F47] bg-white p-4 space-y-3"
          >
            {/* Client Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 bg-[#CC8800]">
                  <AvatarFallback className="text-white font-bold">
                    {serviceAssociations[0].clientName.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-[#1A1A1A]">{serviceAssociations[0].clientName}</p>
                  <p className="text-xs text-[#4A4A4A]">{serviceAssociations.length} service(s)</p>
                </div>
              </div>
              <div className="flex gap-1">
                {Array(serviceAssociations[0].rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-[#B8860B]">
                      ★
                    </span>
                  ))}
              </div>
            </div>

            {/* Services List */}
            <div className="flex flex-wrap gap-2">
              {serviceAssociations.map((assoc) => (
                <div key={assoc.id} className="relative">
                  <Badge
                    className={`${
                      assoc.isPrimary
                        ? 'bg-[#2C5530] text-white'
                        : 'bg-[#F4E8D0] text-[#1A1A1A] border border-[#8B6F47]'
                    } cursor-pointer hover:opacity-80 transition-opacity`}
                  >
                    {assoc.service}
                    {assoc.isPrimary && <span className="ml-2">★ Primary</span>}
                  </Badge>
                  <button
                    onClick={() => handleRemove(assoc.id)}
                    className="absolute -top-2 -right-2 bg-[#8B0000] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-[#6b0000] transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Associated Date */}
            <p className="text-xs text-[#4A4A4A]">
              Associated: {serviceAssociations[0].createdAt}
            </p>
          </Card>
        ))}
      </div>

      {/* Association Table View */}
      <Card className="border-2 border-[#8B6F47] bg-white p-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-['MedievalSharp'] text-[#1A1A1A] mb-3">All Associations</h4>
            <Input
              placeholder="Search by client or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-[#8B6F47]"
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#8B6F47]">
                  <TableHead className="text-[#1A1A1A]">Client</TableHead>
                  <TableHead className="text-[#1A1A1A]">Service</TableHead>
                  <TableHead className="text-[#1A1A1A]">Rating</TableHead>
                  <TableHead className="text-[#1A1A1A]">Type</TableHead>
                  <TableHead className="text-[#1A1A1A]">Date</TableHead>
                  <TableHead className="text-[#1A1A1A]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssociations.map((assoc) => (
                  <TableRow
                    key={assoc.id}
                    className="border-[#F4E8D0] hover:bg-[#F9F3E8] transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8 bg-[#CC8800]">
                          <AvatarFallback className="text-white text-xs font-bold">
                            {assoc.clientName.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[#1A1A1A]">{assoc.clientName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#1A1A1A]">{assoc.service}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {Array(assoc.rating)
                          .fill(0)
                          .map((_, i) => (
                            <span key={i} className="text-[#B8860B]">
                              ★
                            </span>
                          ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          assoc.isPrimary
                            ? 'bg-[#2C5530] text-white'
                            : 'bg-[#F4E8D0] text-[#1A1A1A] border border-[#8B6F47]'
                        }
                      >
                        {assoc.isPrimary ? 'Primary' : 'Secondary'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#4A4A4A] text-sm">{assoc.createdAt}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleRemove(assoc.id)}
                        className="text-[#8B0000] hover:text-[#6b0000] transition-colors p-1"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAssociations.length === 0 && (
            <div className="text-center py-8 text-[#4A4A4A]">
              No associations found. Create one to get started.
            </div>
          )}
        </div>
      </Card>

      {/* Add Association Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="border-2 border-[#8B6F47] bg-[#F4E8D0]">
          <DialogHeader>
            <DialogTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Link Testimonial to Service
            </DialogTitle>
            <DialogDescription className="text-[#4A4A4A]">
              Associate a client testimonial with one or more services for targeted marketing campaigns.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Testimonial Select */}
            <div>
              <label className="text-sm font-semibold text-[#1A1A1A] block mb-2">
                Select Testimonial
              </label>
              <Select value={selectedTestimonial} onValueChange={setSelectedTestimonial}>
                <SelectTrigger className="border-[#8B6F47]">
                  <SelectValue placeholder="Choose a testimonial..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(groupedByTestimonial).map(([id, assocs]) => (
                    <SelectItem key={id} value={id}>
                      {assocs[0].clientName} - {assocs.length} service(s)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service Select */}
            <div>
              <label className="text-sm font-semibold text-[#1A1A1A] block mb-2">
                Select Service
              </label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="border-[#8B6F47]">
                  <SelectValue placeholder="Choose a service..." />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Primary Service Toggle */}
            <div className="flex items-center gap-3 p-3 bg-white border border-[#8B6F47] rounded">
              <input
                type="checkbox"
                id="isPrimary"
                checked={isPrimary}
                onChange={(e) => setIsPrimary(e.target.checked)}
                className="w-4 h-4 accent-[#2C5530] cursor-pointer"
              />
              <label htmlFor="isPrimary" className="text-sm text-[#1A1A1A] cursor-pointer">
                Mark as primary service for this testimonial
              </label>
            </div>

            {/* Info Box */}
            <div className="p-3 bg-[#E8D8C0] border-l-4 border-[#CC8800] rounded">
              <p className="text-xs text-[#1A1A1A]">
                <strong>Primary services</strong> are featured prominently in marketing materials and service pages. Each testimonial can have multiple services.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
              className="border-[#8B6F47] text-[#1A1A1A]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={!selectedTestimonial || !selectedService || isLoading}
              className="bg-[#2C5530] text-white hover:bg-[#1e3d22]"
            >
              {isLoading ? 'Linking...' : 'Link Testimonial'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <p className="text-sm text-[#4A4A4A] mb-1">Total Associations</p>
          <p className="text-3xl font-bold text-[#2C5530]">{associations.length}</p>
        </Card>

        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <p className="text-sm text-[#4A4A4A] mb-1">Unique Testimonials</p>
          <p className="text-3xl font-bold text-[#CC8800]">{Object.keys(groupedByTestimonial).length}</p>
        </Card>

        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <p className="text-sm text-[#4A4A4A] mb-1">Services Covered</p>
          <p className="text-3xl font-bold text-[#B8860B]">
            {new Set(associations.map((a) => a.service)).size}
          </p>
        </Card>
      </div>
    </div>
  );
}
