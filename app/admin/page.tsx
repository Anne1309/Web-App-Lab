'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { bloodInventory, bloodRequests, donors } from '@/lib/mock-data';
import { 
  Droplet, 
  Users, 
  ClipboardList, 
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const totalUnits = bloodInventory.reduce((sum, item) => sum + item.units, 0);
  const pendingRequests = bloodRequests.filter(r => r.status === 'pending').length;
  const criticalRequests = bloodRequests.filter(r => r.urgency === 'critical').length;
  const eligibleDonors = donors.filter(d => d.isEligible).length;

  const stats = [
    {
      title: 'Total Blood Units',
      value: totalUnits.toString(),
      description: 'Available in inventory',
      icon: Droplet,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Pending Requests',
      value: pendingRequests.toString(),
      description: 'Awaiting approval',
      icon: ClipboardList,
      color: 'text-chart-5',
      bgColor: 'bg-chart-5/10',
    },
    {
      title: 'Critical Requests',
      value: criticalRequests.toString(),
      description: 'Require immediate attention',
      icon: AlertCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      title: 'Eligible Donors',
      value: eligibleDonors.toString(),
      description: `Out of ${donors.length} registered`,
      icon: Users,
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of blood bank operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Blood Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-primary" />
              Blood Inventory
            </CardTitle>
            <CardDescription>Current stock levels by blood type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {bloodInventory.map((item) => {
                const isCritical = item.units < 10;
                const isLow = item.units < 15 && !isCritical;
                return (
                  <div 
                    key={item.id}
                    className={`rounded-lg border p-3 text-center ${
                      isCritical ? 'border-destructive bg-destructive/5' : 
                      isLow ? 'border-chart-5 bg-chart-5/5' : 
                      'border-border'
                    }`}
                  >
                    <p className="text-lg font-bold text-foreground">{item.bloodType}</p>
                    <p className={`text-2xl font-bold ${
                      isCritical ? 'text-destructive' : 
                      isLow ? 'text-chart-5' : 
                      'text-chart-4'
                    }`}>
                      {item.units}
                    </p>
                    <p className="text-xs text-muted-foreground">units</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Recent Requests
            </CardTitle>
            <CardDescription>Latest blood requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {bloodRequests.slice(0, 4).map((request) => (
                <div 
                  key={request.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {request.bloodType}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{request.patientName}</p>
                      <p className="text-sm text-muted-foreground">{request.hospital}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge 
                      variant={
                        request.urgency === 'critical' ? 'destructive' : 
                        request.urgency === 'urgent' ? 'default' : 
                        'secondary'
                      }
                    >
                      {request.urgency}
                    </Badge>
                    <StatusBadge status={request.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                <TrendingUp className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-xl font-bold text-foreground">156 Units Donated</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-xl font-bold text-foreground">2.5 Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                <CheckCircle className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fulfillment Rate</p>
                <p className="text-xl font-bold text-foreground">94.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    pending: { icon: Clock, color: 'text-chart-5', bg: 'bg-chart-5/10' },
    approved: { icon: CheckCircle, color: 'text-chart-4', bg: 'bg-chart-4/10' },
    fulfilled: { icon: CheckCircle, color: 'text-chart-4', bg: 'bg-chart-4/10' },
    rejected: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  }[status] || { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted' };

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}>
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}
