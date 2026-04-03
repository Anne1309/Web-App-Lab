'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { donors as initialDonors } from '@/lib/mock-data';
import { Donor, BloodType } from '@/lib/types';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Heart,
  CheckCircle,
  XCircle,
  UserPlus
} from 'lucide-react';

const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function AdminDonorsPage() {
  const [donors, setDonors] = useState<Donor[]>(initialDonors);
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>('all');
  const [eligibilityFilter, setEligibilityFilter] = useState<string>('all');

  const filteredDonors = donors.filter((donor) => {
    const matchesSearch = 
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.phone.includes(searchTerm);
    
    const matchesBloodType = bloodTypeFilter === 'all' || donor.bloodType === bloodTypeFilter;
    const matchesEligibility = 
      eligibilityFilter === 'all' || 
      (eligibilityFilter === 'eligible' && donor.isEligible) ||
      (eligibilityFilter === 'ineligible' && !donor.isEligible);

    return matchesSearch && matchesBloodType && matchesEligibility;
  });

  const totalDonors = donors.length;
  const eligibleDonors = donors.filter(d => d.isEligible).length;
  const totalDonations = donors.reduce((sum, d) => sum + d.totalDonations, 0);

  const toggleEligibility = (id: string) => {
    setDonors(prev => 
      prev.map(donor => 
        donor.id === id ? { ...donor, isEligible: !donor.isEligible } : donor
      )
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Donors</h1>
          <p className="text-muted-foreground">Manage registered blood donors</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Donor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Donors</p>
                <p className="text-3xl font-bold text-foreground">{totalDonors}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Eligible Donors</p>
                <p className="text-3xl font-bold text-chart-4">{eligibleDonors}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/10">
                <CheckCircle className="h-6 w-6 text-chart-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <p className="text-3xl font-bold text-primary">{totalDonations}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={bloodTypeFilter} onValueChange={setBloodTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Blood Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {bloodTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={eligibilityFilter} onValueChange={setEligibilityFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Eligibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="eligible">Eligible</SelectItem>
                <SelectItem value="ineligible">Ineligible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Donors List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDonors.length === 0 ? (
          <Card className="sm:col-span-2 lg:col-span-3">
            <CardContent className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">No donors found matching your filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredDonors.map((donor) => (
            <Card key={donor.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {donor.bloodType}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{donor.name}</h3>
                      <Badge variant={donor.isEligible ? 'default' : 'secondary'}>
                        {donor.isEligible ? (
                          <><CheckCircle className="mr-1 h-3 w-3" /> Eligible</>
                        ) : (
                          <><XCircle className="mr-1 h-3 w-3" /> Ineligible</>
                        )}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0" />
                    {donor.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{donor.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {donor.address}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{donor.totalDonations}</p>
                    <p className="text-xs text-muted-foreground">Donations</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      {donor.lastDonation 
                        ? new Date(donor.lastDonation).toLocaleDateString() 
                        : 'Never'
                      }
                    </p>
                    <p className="text-xs text-muted-foreground">Last Donation</p>
                  </div>
                </div>

                <Button
                  variant={donor.isEligible ? 'outline' : 'default'}
                  size="sm"
                  className="w-full"
                  onClick={() => toggleEligibility(donor.id)}
                >
                  {donor.isEligible ? 'Mark Ineligible' : 'Mark Eligible'}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
