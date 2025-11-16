'use client';

import { useState } from 'react';
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
import { FiEdit, FiSave, FiX, FiPlus } from 'react-icons/fi';
import { Textarea } from '@/components/ui/textarea';

interface ServicePrice {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  discountedPrice?: number;
  description: string;
  duration?: string;
  isActive: boolean;
  lastUpdated: Date;
}

interface AdminPricingManagementProps {
  services?: ServicePrice[];
  onUpdatePrice?: (serviceId: string, newPrice: number) => Promise<void>;
  onAddService?: (service: ServicePrice) => Promise<void>;
  onToggleService?: (serviceId: string, isActive: boolean) => Promise<void>;
}

const mockServices: ServicePrice[] = [
  {
    id: 'love_binding',
    name: 'Binding Spell',
    category: 'Love & Relationships',
    basePrice: 350,
    discountedPrice: 299,
    description: 'Powerful love binding ritual to strengthen connections',
    duration: '7 days',
    isActive: true,
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'marriage_commitment',
    name: 'Marriage & Commitment',
    category: 'Love & Relationships',
    basePrice: 500,
    description: 'Sacred marriage commitment enhancement ritual',
    duration: '14 days',
    isActive: true,
    lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'business_prosperity',
    name: 'Business Boost',
    category: 'Business & Prosperity',
    basePrice: 325,
    discountedPrice: 299,
    description: 'Enhancement spell for business success and prosperity',
    duration: '10 days',
    isActive: true,
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'protection_shield',
    name: 'Protection & Shielding',
    category: 'Protection',
    basePrice: 300,
    description: 'Protective spell against negative energies',
    duration: '30 days',
    isActive: true,
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'wealth_flow',
    name: 'Wealth Flow',
    category: 'Business & Prosperity',
    basePrice: 400,
    discountedPrice: 349,
    description: 'Attract abundance and financial flow',
    duration: '21 days',
    isActive: true,
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'cleansing_ritual',
    name: 'Cleansing Rituals',
    category: 'Healing & Cleansing',
    basePrice: 225,
    description: 'Energy cleansing and spiritual purification',
    duration: '5 days',
    isActive: false,
    lastUpdated: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
];

export function AdminPricingManagement({
  services = mockServices,
  onUpdatePrice,
  onAddService,
  onToggleService,
}: AdminPricingManagementProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editDiscountedPrice, setEditDiscountedPrice] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [newServiceDialogOpen, setNewServiceDialogOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    category: '',
    basePrice: '',
    discountedPrice: '',
    description: '',
    duration: '',
  });
  const [isAddingService, setIsAddingService] = useState(false);

  const handleEditClick = (service: ServicePrice) => {
    setEditingId(service.id);
    setEditPrice(service.basePrice.toString());
    setEditDiscountedPrice((service.discountedPrice || '').toString());
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditPrice('');
    setEditDiscountedPrice('');
    setError('');
  };

  const handleSavePrice = async (serviceId: string) => {
    const newPrice = parseFloat(editPrice);
    const discPrice = editDiscountedPrice ? parseFloat(editDiscountedPrice) : undefined;

    if (isNaN(newPrice) || newPrice <= 0) {
      setError('Please enter a valid price');
      return;
    }

    if (discPrice !== undefined && (isNaN(discPrice) || discPrice <= 0 || discPrice >= newPrice)) {
      setError('Discounted price must be greater than 0 and less than base price');
      return;
    }

    setIsUpdating(true);
    setError('');

    try {
      await onUpdatePrice?.(serviceId, newPrice);
      setSuccessMessage('Price updated successfully');
      setTimeout(() => {
        setEditingId(null);
        setSuccessMessage('');
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update price'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleService = async (service: ServicePrice) => {
    try {
      await onToggleService?.(service.id, !service.isActive);
      setSuccessMessage(
        `Service ${!service.isActive ? 'activated' : 'deactivated'} successfully`
      );
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to toggle service'
      );
    }
  };

  const handleAddService = async () => {
    if (!newService.name || !newService.category || !newService.basePrice) {
      setError('Please fill in required fields');
      return;
    }

    const basePrice = parseFloat(newService.basePrice);
    const discPrice = newService.discountedPrice ? parseFloat(newService.discountedPrice) : undefined;

    if (isNaN(basePrice) || basePrice <= 0) {
      setError('Please enter a valid base price');
      return;
    }

    if (discPrice !== undefined && (isNaN(discPrice) || discPrice <= 0 || discPrice >= basePrice)) {
      setError('Discounted price must be greater than 0 and less than base price');
      return;
    }

    setIsAddingService(true);
    setError('');

    try {
      const newServiceData: ServicePrice = {
        id: `service_${Date.now()}`,
        name: newService.name,
        category: newService.category,
        basePrice,
        discountedPrice: discPrice,
        description: newService.description,
        duration: newService.duration,
        isActive: true,
        lastUpdated: new Date(),
      };

      await onAddService?.(newServiceData);
      setSuccessMessage('Service added successfully');
      setNewService({
        name: '',
        category: '',
        basePrice: '',
        discountedPrice: '',
        description: '',
        duration: '',
      });
      setTimeout(() => {
        setNewServiceDialogOpen(false);
        setSuccessMessage('');
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to add service'
      );
    } finally {
      setIsAddingService(false);
    }
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'Love & Relationships': 'bg-[#8B0000] text-white',
      'Business & Prosperity': 'bg-[#2C5530] text-white',
      'Protection': 'bg-[#8B6F47] text-white',
      'Healing & Cleansing': 'bg-[#CC8800] text-white',
    };
    return colors[category] || 'bg-[#666] text-white';
  };

  const totalServices = services.length;
  const activeServices = services.filter(s => s.isActive).length;
  const avgPrice = Math.round(
    services.reduce((sum, s) => sum + s.basePrice, 0) / totalServices
  );

  return (
    <div className="space-y-6">
      {/* Header with Add Service */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-['MedievalSharp'] text-[#1A1A1A]">
            Pricing Management
          </h2>
          <p className="text-[#4A4A4A]">Configure and manage service pricing</p>
        </div>
        <Button
          onClick={() => setNewServiceDialogOpen(true)}
          className="bg-[#2C5530] text-white hover:bg-[#1e3d22]"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">
              Total Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#1A1A1A]">
              {totalServices}
            </div>
            <p className="text-xs text-[#4A4A4A] mt-1">
              {activeServices} active, {totalServices - activeServices} inactive
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">
              Average Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#1A1A1A]">
              ${avgPrice}
            </div>
            <p className="text-xs text-[#4A4A4A] mt-1">
              Across all services
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">
              Discounted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#CC8800]">
              {services.filter(s => s.discountedPrice).length}
            </div>
            <p className="text-xs text-[#4A4A4A] mt-1">
              Services on sale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Messages */}
      {error && (
        <Alert className="border-[#8B0000] bg-[#FFE5E5]">
          <AlertDescription className="text-[#8B0000]">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="border-[#2C5530] bg-[#E8F5E9]">
          <AlertDescription className="text-[#2C5530]">
            ✓ {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Services Table */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
            Service Pricing
          </CardTitle>
          <CardDescription className="text-[#4A4A4A]">
            Click edit to modify prices
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto border-2 border-[#8B6F47] rounded">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#E8D8C0] border-b-2 border-[#8B6F47]">
                  <TableHead className="text-[#1A1A1A] font-semibold">
                    Service
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">
                    Category
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">
                    Base Price
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">
                    Discounted
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-center text-[#1A1A1A] font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service, index) => (
                  <TableRow
                    key={service.id}
                    className={`border-b-2 border-[#E8D8C0] hover:bg-[#F9F3E6] transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F4]'
                    }`}
                  >
                    <TableCell>
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">
                          {service.name}
                        </p>
                        <p className="text-xs text-[#666]">
                          {service.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(service.category)}>
                        {service.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {editingId === service.id ? (
                        <Input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-24 bg-white border-[#8B6F47]"
                          step="0.01"
                          min="0.01"
                        />
                      ) : (
                        <span className="font-semibold text-[#1A1A1A]">
                          ${service.basePrice}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === service.id ? (
                        <Input
                          type="number"
                          value={editDiscountedPrice}
                          onChange={(e) => setEditDiscountedPrice(e.target.value)}
                          placeholder="Optional"
                          className="w-24 bg-white border-[#8B6F47]"
                          step="0.01"
                          min="0.01"
                        />
                      ) : (
                        <span className="text-[#CC8800] font-semibold">
                          {service.discountedPrice
                            ? `$${service.discountedPrice}`
                            : '-'}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          service.isActive
                            ? 'bg-[#2C5530] text-white'
                            : 'bg-[#999] text-white'
                        }
                      >
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        {editingId === service.id ? (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                handleSavePrice(service.id)
                              }
                              disabled={isUpdating}
                              className="h-8 px-2"
                            >
                              <FiSave className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleCancelEdit}
                              className="h-8 px-2"
                            >
                              <FiX className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditClick(service)}
                              className="h-8 px-2"
                            >
                              <FiEdit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                service.isActive ? 'default' : 'outline'
                              }
                              onClick={() => handleToggleService(service)}
                              className={`h-8 px-2 ${
                                service.isActive
                                  ? 'bg-[#2C5530] text-white'
                                  : 'border-[#8B6F47] text-[#8B6F47]'
                              }`}
                            >
                              {service.isActive ? 'Active' : 'Inactive'}
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Service Dialog */}
      <Dialog open={newServiceDialogOpen} onOpenChange={setNewServiceDialogOpen}>
        <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Add New Service
            </DialogTitle>
            <DialogDescription className="text-[#4A4A4A]">
              Create a new service offering
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="service-name" className="text-[#1A1A1A]">
                Service Name *
              </Label>
              <Input
                id="service-name"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                className="bg-white border-[#8B6F47]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-category" className="text-[#1A1A1A]">
                Category *
              </Label>
              <Input
                id="service-category"
                value={newService.category}
                onChange={(e) =>
                  setNewService({ ...newService, category: e.target.value })
                }
                className="bg-white border-[#8B6F47]"
                placeholder="e.g., Love & Relationships"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="base-price" className="text-[#1A1A1A]">
                  Base Price *
                </Label>
                <Input
                  id="base-price"
                  type="number"
                  value={newService.basePrice}
                  onChange={(e) =>
                    setNewService({ ...newService, basePrice: e.target.value })
                  }
                  className="bg-white border-[#8B6F47]"
                  step="0.01"
                  min="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="discounted-price"
                  className="text-[#1A1A1A]"
                >
                  Discounted Price
                </Label>
                <Input
                  id="discounted-price"
                  type="number"
                  value={newService.discountedPrice}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      discountedPrice: e.target.value,
                    })
                  }
                  className="bg-white border-[#8B6F47]"
                  placeholder="Optional"
                  step="0.01"
                  min="0.01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-[#1A1A1A]">
                Duration
              </Label>
              <Input
                id="duration"
                value={newService.duration}
                onChange={(e) =>
                  setNewService({ ...newService, duration: e.target.value })
                }
                className="bg-white border-[#8B6F47]"
                placeholder="e.g., 7 days"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-[#1A1A1A]">
                Description
              </Label>
              <Textarea
                id="description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    description: e.target.value,
                  })
                }
                className="bg-white border-[#8B6F47] resize-none"
                rows={3}
              />
            </div>

            {error && (
              <Alert className="border-[#8B0000] bg-[#FFE5E5]">
                <AlertDescription className="text-[#8B0000]">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewServiceDialogOpen(false)}
              disabled={isAddingService}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddService}
              disabled={isAddingService}
              className="bg-[#2C5530] text-white hover:bg-[#1e3d22]"
            >
              {isAddingService ? 'Adding...' : 'Add Service'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
