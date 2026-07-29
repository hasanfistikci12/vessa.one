export type BusinessType = 'salon' | 'barbershop' | 'medspa' | 'nail_lash' | 'coach' | 'other';
export type PartnerStatus = 'pending_verification' | 'active' | 'paused';
export type CustomerStage = 'lead' | 'contacted' | 'trip_pending' | 'payment_pending' | 'completed';
export type InterestedIn = 'hair_transplant' | 'rhinoplasty' | 'bbl' | 'facelift' | 'breast' | 'tummy_tuck' | 'other';
export type RewardTier = 'standard' | 'surgical';

export interface Partner {
  id: string;
  googleId: string;
  email: string;
  name: string;
  businessName: string;
  businessType: BusinessType;
  location: { city: string; state: string; country: "US" };
  estimatedMonthlyClients: "1-20" | "20-50" | "50-100" | "100+";
  referralCode: string;
  status: PartnerStatus;
  isAdmin?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface TimelineEntry {
  stage: CustomerStage;
  changedAt: number;
  changedBy: string; // email of the admin who changed it, or 'system'
}

export interface PartnerNote {
  text: string;
  createdAt: number;
}

export interface Customer {
  id: string;
  partnerId: string; // FK
  sessionToken?: string; // To dedupe on success_qr page before we have contact info
  fullName: string | null;
  phone: string | null;
  interestedIn: InterestedIn | null;
  stage: CustomerStage;
  rewardTier: RewardTier | null;
  rewardAmount: number | null;
  price?: number | null; // Procedure cost
  isPaid: boolean; // Added for payouts export tracking
  partnerNotes: PartnerNote[];
  timeline: TimelineEntry[];
  createdAt: number;
  updatedAt: number;
}

export interface RewardConfig {
  standard: number;
  surgical: number;
  conversionRate: number; // Storing here so admin can tune it (default 0.03)
}
