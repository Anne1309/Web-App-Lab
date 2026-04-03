'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { bloodRequests as initialRequests } from '@/lib/mock-data';
import { BloodRequest } from '@/lib/types';
import { 
  ClipboardList, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertCircle,
  Phone,
  Building,
  FileText
} from 'lucide-react';

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<BloodRequest[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = 
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || request.urgency === urgencyFilter;

    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const updateRequestStatus = (id: string, newStatus: BloodRequest['status']) => {
    setRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Blood Requests</h1>
        <p className="text-muted-foreground">Manage and process blood requests</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by patient, hospital, or blood type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="flex flex-col gap-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">No requests found matching your filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  {/* Request Info */}
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {request.bloodType}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-foreground">{request.patientName}</h3>
                        <Badge 
                          variant={
                            request.urgency === 'critical' ? 'destructive' : 
                            request.urgency === 'urgent' ? 'default' : 
                            'secondary'
                          }
                        >
                          {request.urgency === 'critical' && <AlertCircle className="mr-1 h-3 w-3" />}
                          {request.urgency}
                        </Badge>
                        <StatusBadge status={request.status} />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {request.hospital}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {request.contactNumber}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(request.requestedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {request.notes && (
                        <p className="mt-2 flex items-start gap-1 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4 shrink-0 mt-0.5" />
                          {request.notes}
                        </p>
                      )}
                      <p className="mt-2 text-sm">
                        <strong>Units Requested:</strong> {request.units}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 lg:flex-col">
                    {request.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => updateRequestStatus(request.id, 'approved')}
                          className="flex-1 lg:flex-none"
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updateRequestStatus(request.id, 'rejected')}
                          className="flex-1 lg:flex-none"
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </>
                    )}
                    {request.status === 'approved' && (
                      <Button 
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, 'fulfilled')}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Mark Fulfilled
                      </Button>
                    )}
                    {(request.status === 'fulfilled' || request.status === 'rejected') && (
                      <span className="text-sm text-muted-foreground">No actions available</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
    pending: { icon: Clock, color: 'text-chart-5', bg: 'bg-chart-5/10' },
    approved: { icon: CheckCircle, color: 'text-chart-4', bg: 'bg-chart-4/10' },
    fulfilled: { icon: CheckCircle, color: 'text-chart-4', bg: 'bg-chart-4/10' },
    rejected: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  };

  const { icon: Icon, color, bg } = config[status] || config.pending;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${bg} ${color}`}>
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}
