export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type AvailabilityStatus = 'available' | 'busy' | 'donated_recently';

export type RequestUrgency = 'emergency' | 'upcoming_operation';

export type RequestStatus = 'open' | 'fulfilled' | 'in_progress';

export interface Review {
  id: string;
  donorId: string;
  reviewerName: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  bloodTypeProvided: BloodGroup;
  hospitalName?: string;
}

export interface Donor {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email: string;
  bloodType: BloodGroup;
  division: string;
  district: string;
  area: string;
  subArea: string;
  availability: AvailabilityStatus;
  lastDonationDate: string; // ISO date string e.g. '2026-07-15'
  totalDonations: number;
  rating: number; // e.g. 4.9
  reviewCount: number;
  verified: boolean;
  heroBadge?: boolean;
  avatarUrl: string;
  bio?: string;
  readyForEmergency: boolean;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  reviews?: Review[];
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodType: BloodGroup;
  unitsNeeded: number;
  hospitalName: string;
  division: string;
  district: string;
  area: string;
  subArea: string;
  requestType: RequestUrgency;
  requiredByDate: string;
  requiredByTime?: string;
  contactPhone: string;
  alternativePhone?: string;
  reason: string;
  status: RequestStatus;
  createdAt: string;
  responsesCount: number;
  verifiedHospital: boolean;
  contactPerson: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  message: string;
  timestamp: string;
  isDonorSender: boolean;
  read: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleBn: string;
  message: string;
  messageBn: string;
  type: 'emergency' | 'match' | 'system' | 'chat';
  timestamp: string;
  read: boolean;
  bloodGroup?: BloodGroup;
  targetRequestId?: string;
  hospital?: string;
}

export type Language = 'en' | 'bn';
export type Theme = 'light' | 'dark';
