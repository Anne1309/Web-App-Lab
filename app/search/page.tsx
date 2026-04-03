'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { bloodInventory, donors, getCompatibleBloodTypes } from '@/lib/mock-data';
import { BloodType } from '@/lib/types';
import { Search, Droplet, Users, Phone, Mail, MapPin, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function SearchBloodPage() {
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType | ''>('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (selectedBloodType) {
      setShowResults(true);
    }
  };

  const compatibleTypes = selectedBloodType ? getCompatibleBloodTypes(selectedBloodType) : [];
  
  const availableInventory = bloodInventory.filter(
    (item) => compatibleTypes.includes(item.bloodType) && item.units > 0
  );

  const availableDonors = donors.filter(
    (donor) => compatibleTypes.includes(donor.bloodType) && donor.isEligible
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Header */}
        <section className="border-b border-border bg-card px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Search className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Search Blood</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find available blood types and compatible donors in our network
            </p>
          </div>
        </section>

        {/* Search Form */}
        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-xl">
            <Card>
              <CardHeader>
                <CardTitle>Find Blood Type</CardTitle>
                <CardDescription>
                  Select the blood type you need to find availability and compatible donors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Select
                    value={selectedBloodType}
                    onValueChange={(value) => {
                      setSelectedBloodType(value as BloodType);
                      setShowResults(false);
                    }}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select Blood Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center gap-2">
                            <Droplet className="h-4 w-4 text-primary" />
                            {type}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch} disabled={!selectedBloodType}>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>

                {selectedBloodType && (
                  <div className="mt-4 rounded-lg bg-secondary/50 p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">{selectedBloodType}</strong> can receive blood from:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {compatibleTypes.map((type) => (
                        <Badge key={type} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Results */}
        {showResults && selectedBloodType && (
          <section className="border-t border-border bg-card px-4 py-12 lg:px-8">
            <div className="mx-auto max-w-7xl">
              {/* Inventory Results */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Droplet className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Available Blood Inventory</h2>
                </div>

                {availableInventory.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {availableInventory.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                              {item.bloodType}
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-foreground">{item.units}</p>
                              <p className="text-sm text-muted-foreground">units available</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button asChild variant="outline" className="w-full">
                              <Link href={`/request?bloodType=${item.bloodType}`}>
                                Request This Type
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">
                        No compatible blood types currently available in inventory
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Donors Results */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Available Donors</h2>
                </div>

                {availableDonors.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {availableDonors.map((donor) => (
                      <Card key={donor.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground">{donor.name}</h3>
                              <Badge className="mt-1">{donor.bloodType}</Badge>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-chart-4">
                              <CheckCircle className="h-4 w-4" />
                              Eligible
                            </div>
                          </div>

                          <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {donor.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              {donor.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {donor.address}
                            </div>
                          </div>

                          <div className="mt-4 rounded-lg bg-secondary/50 p-3 text-center">
                            <p className="text-sm text-muted-foreground">
                              Total Donations: <strong className="text-foreground">{donor.totalDonations}</strong>
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">
                        No eligible donors found for compatible blood types
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* CTA */}
              <div className="mt-12 rounded-xl bg-primary/5 border border-primary/20 p-8 text-center">
                <h3 className="text-xl font-bold text-foreground">Need Blood Urgently?</h3>
                <p className="mt-2 text-muted-foreground">
                  Submit a blood request and our team will prioritize your case
                </p>
                <Button asChild className="mt-4">
                  <Link href="/request">Submit Blood Request</Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
