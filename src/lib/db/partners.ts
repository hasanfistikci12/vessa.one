import { db } from '../firebase-admin';
import { Partner } from '../types';

export const MOCK_PARTNERS: Partner[] = [
  {
    id: 'mock-partner-1',
    googleId: 'mock-google-1',
    email: 'hasanfistikci01@gmail.com',
    name: 'Hasan Fıstıkçı',
    businessName: 'Vessa Test Clinic',
    businessType: 'salon',
    location: { city: 'New York', state: 'NY', country: 'US' },
    estimatedMonthlyClients: '20-50',
    referralCode: 'VESSA2026',
    status: 'active',
    isAdmin: true,
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
  },
  {
    id: 'mock-partner-2',
    googleId: 'mock-google-2',
    email: 'jane@glamourspa.com',
    name: 'Jane Smith',
    businessName: 'Glamour Beauty Spa',
    businessType: 'spa',
    location: { city: 'Los Angeles', state: 'CA', country: 'US' },
    estimatedMonthlyClients: '50-100',
    referralCode: 'GLAMOUR50',
    status: 'active',
    isAdmin: false,
    createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
  },
  {
    id: 'mock-partner-3',
    googleId: 'mock-google-3',
    email: 'michael@fitgym.com',
    name: 'Michael Jordan',
    businessName: 'Fit & Glow Gym',
    businessType: 'gym',
    location: { city: 'Miami', state: 'FL', country: 'US' },
    estimatedMonthlyClients: '100+',
    referralCode: 'FITGLOW',
    status: 'active',
    isAdmin: false,
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
  },
  {
    id: 'mock-partner-4',
    googleId: 'mock-google-4',
    email: 'sarah@hairco.com',
    name: 'Sarah Connor',
    businessName: 'Elite Hair Studio',
    businessType: 'salon',
    location: { city: 'London', state: 'ENG', country: 'UK' },
    estimatedMonthlyClients: '10-20',
    referralCode: 'ELITEHAIR',
    status: 'active',
    isAdmin: false,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
  }
];

const MOCK_PARTNER = MOCK_PARTNERS[0];

export async function createPartner(partner: Omit<Partner, 'createdAt' | 'updatedAt'>): Promise<Partner> {
  if (!db) return MOCK_PARTNER;
  const now = Date.now();
  const docRef = db.collection('partners').doc(partner.id);
  const newPartner: Partner = {
    ...partner,
    createdAt: now,
    updatedAt: now,
  };
  await docRef.set(newPartner);
  return newPartner;
}

export async function getPartnerById(id: string): Promise<Partner | null> {
  if (!db) return MOCK_PARTNER;
  const doc = await db.collection('partners').doc(id).get();
  if (!doc.exists) return null;
  return doc.data() as Partner;
}

export async function getPartnerByGoogleId(googleId: string): Promise<Partner | null> {
  if (!db) return MOCK_PARTNER;
  const snapshot = await db.collection('partners').where('googleId', '==', googleId).limit(1).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as Partner;
}

export async function getPartnerByReferralCode(referralCode: string): Promise<Partner | null> {
  if (!db) return { ...MOCK_PARTNER, referralCode };
  const snapshot = await db.collection('partners').where('referralCode', '==', referralCode).limit(1).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as Partner;
}

export async function listAllPartners(): Promise<Partner[]> {
  if (!db) return MOCK_PARTNERS;
  const snapshot = await db.collection('partners').orderBy('createdAt', 'desc').get();
  return snapshot.docs.map((doc: any) => doc.data() as Partner);
}
