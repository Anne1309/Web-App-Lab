export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: BloodType;
  role: 'user' | 'admin';
  address: string;
  createdAt: Date;
}

export interface BloodInventory {
  id: string;
  bloodType: BloodType;
  units: number;
  lastUpdated: Date;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodType: BloodType;
  units: number;
  hospital: string;
  contactNumber: string;
  urgency: 'normal' | 'urgent' | 'critical';
  status: 'pending' | 'approved' | 'fulfilled' | 'rejected';
  requestedBy: string;
  requestedAt: Date;
  notes?: string;
}

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: BloodType;
  lastDonation: Date | null;
  totalDonations: number;
  address: string;
  isEligible: boolean;
}
