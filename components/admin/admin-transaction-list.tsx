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
import { format } from 'date-fns';
import { FiSearch, FiDownload, FiMoreVertical } from 'react-icons/fi';

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  service: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  date: Date;
  description?: string;
}

interface AdminTransactionListProps {
  transactions?: Transaction[];
  onDownload?: (transactions: Transaction[]) => void;
  onAction?: (transactionId: string, action: string) => void;
}

const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    userId: 'user_123',
    userName: 'Sarah Johnson',
    userEmail: 'sarah@example.com',
    service: 'Binding Spell',
    amount: 350,
    status: 'completed',
    paymentMethod: 'card',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    description: 'Binding Spell - Love Ritual',
  },
  {
    id: 'txn_002',
    userId: 'user_124',
    userName: 'Marcus Brown',
    userEmail: 'marcus@example.com',
    service: 'Business Boost',
    amount: 299,
    status: 'completed',
    paymentMethod: 'card',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    description: 'Business Boost Spell',
  },
  {
    id: 'txn_003',
    userId: 'user_125',
    userName: 'Emily Chen',
    userEmail: 'emily@example.com',
    service: 'Protection',
    amount: 275,
    status: 'completed',
    paymentMethod: 'card',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    description: 'Protection & Shielding',
  },
  {
    id: 'txn_004',
    userId: 'user_126',
    userName: 'David Wilson',
    userEmail: 'david@example.com',
    service: 'Marriage',
    amount: 450,
    status: 'pending',
    paymentMethod: 'card',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    description: 'Marriage & Commitment',
  },
  {
    id: 'txn_005',
    userId: 'user_127',
    userName: 'Jessica Lee',
    userEmail: 'jessica@example.com',
    service: 'Cleansing',
    amount: 199,
    status: 'refunded',
    paymentMethod: 'card',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    description: 'Cleansing Rituals',
  },
];

export function AdminTransactionList({
  transactions = mockTransactions,
  onDownload,
  onAction,
}: AdminTransactionListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch =
        txn.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || txn.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchTerm, statusFilter]);

  const getStatusColor = (status: string): string => {
    const colors: { [key: string]: string } = {
      completed: 'bg-[#2C5530] text-white',
      pending: 'bg-[#CC8800] text-white',
      failed: 'bg-[#8B0000] text-white',
      refunded: 'bg-[#8B6F47] text-white',
    };
    return colors[status] || 'bg-[#8B6F47] text-white';
  };

  const getStatusLabel = (status: string): string => {
    const labels: { [key: string]: string } = {
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
      refunded: 'Refunded',
    };
    return labels[status] || status;
  };

  return (
    <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Transaction History
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">
              All payments and refunds
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload?.(filteredTransactions)}
            className="border-[#8B6F47] text-[#8B6F47]"
          >
            <FiDownload className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-[#8B6F47]" />
            <Input
              placeholder="Search by name, email, service..."
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
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 text-[#4A4A4A]">
            <p>No transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto border-2 border-[#8B6F47] rounded">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#E8D8C0] border-b-2 border-[#8B6F47]">
                  <TableHead className="text-[#1A1A1A] font-semibold">
                    ID
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">
                    Customer
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">
                    Service
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">
                    Amount
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">
                    Date
                  </TableHead>
                  <TableHead className="text-center text-[#1A1A1A] font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((txn, index) => (
                  <TableRow
                    key={txn.id}
                    className={`border-b-2 border-[#E8D8C0] hover:bg-[#F9F3E6] transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F4]'
                    }`}
                  >
                    <TableCell className="font-mono text-xs text-[#4A4A4A]">
                      {txn.id.slice(-8)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">
                          {txn.userName}
                        </p>
                        <p className="text-xs text-[#666]">{txn.userEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#1A1A1A]">
                      {txn.service}
                    </TableCell>
                    <TableCell className="font-semibold text-[#1A1A1A]">
                      ${txn.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(txn.status)}>
                        {getStatusLabel(txn.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#4A4A4A] text-sm">
                      {format(txn.date, 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          onAction?.(txn.id, 'view')
                        }
                      >
                        <FiMoreVertical className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Summary */}
        <div className="mt-4 p-3 bg-white border-2 border-[#8B6F47] rounded">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[#4A4A4A]">Showing</p>
              <p className="font-semibold text-[#1A1A1A]">
                {filteredTransactions.length} of {transactions.length}
              </p>
            </div>
            <div>
              <p className="text-[#4A4A4A]">Total Amount</p>
              <p className="font-semibold text-[#1A1A1A]">
                ${filteredTransactions
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[#4A4A4A]">Avg Amount</p>
              <p className="font-semibold text-[#1A1A1A]">
                ${Math.round(
                  filteredTransactions.reduce((sum, t) => sum + t.amount, 0) /
                    Math.max(filteredTransactions.length, 1)
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
