'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { FiSearch, FiMoreVertical, FiStar, FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface Testimonial {
  id: string;
  clientName: string;
  clientEmail: string;
  clientImage?: string;
  service: string;
  videoUrl: string;
  rating: number;
  testimonialText: string;
  status: 'pending' | 'approved' | 'rejected' | 'featured';
  isFeatured: boolean;
  submittedDate: Date;
  approvedDate?: Date;
  admin?: string;
}

interface AdminTestimonialManagementProps {
  testimonials?: Testimonial[];
  onApprove?: (testimonialId: string) => Promise<void>;
  onReject?: (testimonialId: string, reason?: string) => Promise<void>;
  onFeature?: (testimonialId: string, featured: boolean) => Promise<void>;
  onDelete?: (testimonialId: string) => Promise<void>;
}

const mockTestimonials: Testimonial[] = [
  {
    id: 'test_001',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    clientImage: '/images/testimonials/sarah.webp',
    service: 'Binding Spell',
    videoUrl: '/testimony-videos/sarah-binding.mp4',
    rating: 5,
    testimonialText: 'The binding spell truly transformed my relationship. My partner and I are closer than ever!',
    status: 'approved',
    isFeatured: true,
    submittedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    approvedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    admin: 'admin_001',
  },
  {
    id: 'test_002',
    clientName: 'Marcus Brown',
    clientEmail: 'marcus@example.com',
    clientImage: '/images/testimonials/marcus.webp',
    service: 'Business Boost',
    videoUrl: '/testimony-videos/marcus-business.mp4',
    rating: 5,
    testimonialText: 'My business revenue doubled within 3 months. Incredible results!',
    status: 'approved',
    isFeatured: false,
    submittedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    approvedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'test_003',
    clientName: 'Emily Chen',
    clientEmail: 'emily@example.com',
    clientImage: '/images/testimonials/emily.webp',
    service: 'Protection',
    videoUrl: '/testimony-videos/emily-protection.mp4',
    rating: 4,
    testimonialText: 'I feel much safer and protected. Highly recommended!',
    status: 'pending',
    isFeatured: false,
    submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'test_004',
    clientName: 'David Wilson',
    clientEmail: 'david@example.com',
    clientImage: '/images/testimonials/david.webp',
    service: 'Marriage',
    videoUrl: '/testimony-videos/david-marriage.mp4',
    rating: 5,
    testimonialText: 'Got engaged 2 months after the marriage spell! Dreams do come true.',
    status: 'approved',
    isFeatured: true,
    submittedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    approvedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'test_005',
    clientName: 'Jessica Lee',
    clientEmail: 'jessica@example.com',
    clientImage: '/images/testimonials/jessica.webp',
    service: 'Cleansing',
    videoUrl: '/testimony-videos/jessica-cleansing.mp4',
    rating: 3,
    testimonialText: 'Good experience overall.',
    status: 'rejected',
    isFeatured: false,
    submittedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
  },
];

export function AdminTestimonialManagement({
  testimonials = mockTestimonials,
  onApprove,
  onReject,
  onFeature,
  onDelete,
}: AdminTestimonialManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((test) => {
      const matchesSearch =
        test.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.testimonialText.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || test.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [testimonials, searchTerm, statusFilter]);

  const stats = {
    total: testimonials.length,
    pending: testimonials.filter((t) => t.status === 'pending').length,
    approved: testimonials.filter((t) => t.status === 'approved').length,
    featured: testimonials.filter((t) => t.isFeatured).length,
  };

  const getStatusColor = (status: string): string => {
    const colors: { [key: string]: string } = {
      pending: 'bg-[#CC8800] text-white',
      approved: 'bg-[#2C5530] text-white',
      rejected: 'bg-[#8B0000] text-white',
      featured: 'bg-[#B8860B] text-white',
    };
    return colors[status] || 'bg-[#8B6F47] text-white';
  };

  const getStatusLabel = (status: string): string => {
    const labels: { [key: string]: string } = {
      pending: 'Pending Review',
      approved: 'Approved',
      rejected: 'Rejected',
      featured: 'Featured',
    };
    return labels[status] || status;
  };

  const handleApprove = async (testimonialId: string) => {
    setIsLoading(testimonialId);
    try {
      await onApprove?.(testimonialId);
    } catch (error) {
      console.error('Failed to approve testimonial:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleReject = async (testimonialId: string) => {
    setIsLoading(testimonialId);
    try {
      await onReject?.(testimonialId);
    } catch (error) {
      console.error('Failed to reject testimonial:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleToggleFeatured = async (testimonialId: string, currentFeatured: boolean) => {
    setIsLoading(testimonialId);
    try {
      await onFeature?.(testimonialId, !currentFeatured);
    } catch (error) {
      console.error('Failed to toggle featured:', error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">Total Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#1A1A1A]">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#CC8800]">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#2C5530]">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#B8860B]">{stats.featured}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
            Testimonial Queue
          </CardTitle>
          <CardDescription className="text-[#4A4A4A]">
            Review and manage video testimonials
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-[#8B6F47]" />
              <Input
                placeholder="Search by name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-[#8B6F47]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-white border-[#8B6F47]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-[#8B6F47]">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          {filteredTestimonials.length === 0 ? (
            <div className="text-center py-12 text-[#4A4A4A]">
              <p>No testimonials found</p>
            </div>
          ) : (
            <div className="overflow-x-auto border-2 border-[#8B6F47] rounded">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#E8D8C0] border-b-2 border-[#8B6F47]">
                    <TableHead className="text-[#1A1A1A] font-semibold">Client</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Service</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Rating</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Status</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Submitted</TableHead>
                    <TableHead className="text-center text-[#1A1A1A] font-semibold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTestimonials.map((test, index) => (
                    <TableRow
                      key={test.id}
                      className={`border-b-2 border-[#E8D8C0] hover:bg-[#F9F3E6] transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F4]'
                      }`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-[#8B6F47]">
                            <AvatarImage src={test.clientImage} alt={test.clientName} />
                            <AvatarFallback className="bg-[#E8D8C0] text-[#1A1A1A]">
                              {test.clientName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-[#1A1A1A]">{test.clientName}</p>
                            <p className="text-xs text-[#666]">{test.clientEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-[#1A1A1A]">{test.service}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < test.rating
                                  ? 'fill-[#B8860B] text-[#B8860B]'
                                  : 'text-[#CCC]'
                              }`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(test.status)}>
                          {getStatusLabel(test.status)}
                        </Badge>
                        {test.isFeatured && (
                          <Badge className="ml-1 bg-[#B8860B] text-white">Featured</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-[#4A4A4A] text-sm">
                        {format(test.submittedDate, 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          {test.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={isLoading === test.id}
                                onClick={() => handleApprove(test.id)}
                                className="h-8 px-2 text-[#2C5530] hover:bg-[#E8F5E9]"
                              >
                                <FiCheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={isLoading === test.id}
                                onClick={() => handleReject(test.id)}
                                className="h-8 px-2 text-[#8B0000] hover:bg-[#FFE5E5]"
                              >
                                <FiXCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {test.status === 'approved' && (
                            <Button
                              size="sm"
                              variant={test.isFeatured ? 'default' : 'outline'}
                              disabled={isLoading === test.id}
                              onClick={() => handleToggleFeatured(test.id, test.isFeatured)}
                              className={`h-8 px-2 ${
                                test.isFeatured
                                  ? 'bg-[#B8860B] text-white'
                                  : 'border-[#8B6F47] text-[#8B6F47]'
                              }`}
                            >
                              {test.isFeatured ? '⭐ Featured' : 'Feature'}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-[#4A4A4A] hover:text-[#1A1A1A]"
                          >
                            <FiMoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
