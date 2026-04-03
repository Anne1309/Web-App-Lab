'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/auth-context';
import { BloodType } from '@/lib/types';
import { FileText, Loader2, CheckCircle, AlertTriangle, Clock, Zap, AlertCircle } from 'lucide-react';

const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function RequestBloodForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const preselectedBloodType = searchParams.get('bloodType') as BloodType | null;

  const [formData, setFormData] = useState({
    patientName: '',
    bloodType: preselectedBloodType || '' as BloodType | '',
    units: '1',
    hospital: '',
    contactNumber: '',
    urgency: 'normal' as 'normal' | 'urgent' | 'critical',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedBloodType) {
      setFormData(prev => ({ ...prev, bloodType: preselectedBloodType }));
    }
  }, [preselectedBloodType]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }
    if (!formData.bloodType) {
      newErrors.bloodType = 'Blood type is required';
    }
    if (!formData.units || parseInt(formData.units) < 1) {
      newErrors.units = 'At least 1 unit is required';
    }
    if (!formData.hospital.trim()) {
      newErrors.hospital = 'Hospital name is required';
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSuccess(true);
    setIsLoading(false);
  };

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-background px-4 py-16">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <AlertTriangle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Login Required</h2>
              <p className="mt-2 text-muted-foreground">
                Please login or register to submit a blood request
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-background px-4 py-16">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chart-4">
                <CheckCircle className="h-8 w-8 text-background" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Request Submitted!</h2>
              <p className="mt-2 text-muted-foreground">
                Your blood request has been submitted successfully. Our team will review it and contact you shortly.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button asChild>
                  <Link href="/">Go Home</Link>
                </Button>
                <Button variant="outline" onClick={() => {
                  setSuccess(false);
                  setFormData({
                    patientName: '',
                    bloodType: '',
                    units: '1',
                    hospital: '',
                    contactNumber: '',
                    urgency: 'normal',
                    notes: '',
                  });
                }}>
                  Submit Another Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Header */}
        <section className="border-b border-border bg-card px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Request Blood</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Fill out the form below to submit a blood request. Our team will process it as quickly as possible.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Blood Request Form</CardTitle>
                <CardDescription>
                  Provide accurate information to help us process your request efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Patient Info */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="patientName">Patient Name *</Label>
                      <Input
                        id="patientName"
                        placeholder="Full name of patient"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      />
                      {errors.patientName && <p className="text-sm text-destructive">{errors.patientName}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="bloodType">Blood Type Required *</Label>
                      <Select
                        value={formData.bloodType}
                        onValueChange={(value) => setFormData({ ...formData, bloodType: value as BloodType })}
                      >
                        <SelectTrigger id="bloodType">
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.bloodType && <p className="text-sm text-destructive">{errors.bloodType}</p>}
                    </div>
                  </div>

                  {/* Units and Hospital */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="units">Units Required *</Label>
                      <Input
                        id="units"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.units}
                        onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                      />
                      {errors.units && <p className="text-sm text-destructive">{errors.units}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="hospital">Hospital Name *</Label>
                      <Input
                        id="hospital"
                        placeholder="Name of hospital"
                        value={formData.hospital}
                        onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                      />
                      {errors.hospital && <p className="text-sm text-destructive">{errors.hospital}</p>}
                    </div>
                  </div>

                  {/* Contact and Urgency */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="contactNumber">Contact Number *</Label>
                      <Input
                        id="contactNumber"
                        type="tel"
                        placeholder="Phone number"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      />
                      {errors.contactNumber && <p className="text-sm text-destructive">{errors.contactNumber}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="urgency">Urgency Level *</Label>
                      <Select
                        value={formData.urgency}
                        onValueChange={(value) => setFormData({ ...formData, urgency: value as 'normal' | 'urgent' | 'critical' })}
                      >
                        <SelectTrigger id="urgency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-chart-4" />
                              Normal
                            </div>
                          </SelectItem>
                          <SelectItem value="urgent">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-chart-5" />
                              Urgent
                            </div>
                          </SelectItem>
                          <SelectItem value="critical">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-destructive" />
                              Critical
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional information about the patient or request..."
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  {/* Urgency Info */}
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <h4 className="font-medium text-foreground">Urgency Level Guide</h4>
                    <ul className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
                      <li><strong className="text-chart-4">Normal:</strong> Scheduled procedure (24-48 hours)</li>
                      <li><strong className="text-chart-5">Urgent:</strong> Required within 12 hours</li>
                      <li><strong className="text-destructive">Critical:</strong> Emergency - needed immediately</li>
                    </ul>
                  </div>

                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting Request...
                      </>
                    ) : (
                      'Submit Blood Request'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function RequestBloodPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    }>
      <RequestBloodForm />
    </Suspense>
  );
}
