import { db } from '../firebase-admin';
import { Partner } from '../types';

const MOCK_PARTNER: Partner = {
  id: 'mock-partner-1',
  googleId: 'mock-google-1',
  email: 'test@vessa.one',
  name: 'Hasan Fıstıkçı',
  businessName: 'Vessa Test Clinic',
  businessType: 'salon',
  location: { city: 'New York', state: 'NY', country: 'US' },
  estimatedMonthlyClients: '20-50',
  referralCode: 'VESSA2026',
  status: 'active',
  isAdmin: true,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

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
  if (!db) return [MOCK_PARTNER];
  const snapshot = await db.collection('partners').orderBy('createdAt', 'desc').get();
  return snapshot.docs.map((doc: any) => doc.data() as Partner);
}
