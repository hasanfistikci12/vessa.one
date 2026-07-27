import { db } from '../firebase-admin';
import { Customer, CustomerStage, InterestedIn, RewardTier, TimelineEntry } from '../types';

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'mock-cust-1',
    partnerId: 'mock-partner-1',
    sessionToken: 'xyz123',
    fullName: 'Jane Doe',
    phone: '+1 555-1234',
    interestedIn: 'rhinoplasty',
    stage: 'lead',
    rewardTier: null,
    rewardAmount: null,
    isPaid: false,
    partnerNotes: [],
    timeline: [{ stage: 'lead', changedAt: Date.now(), changedBy: 'system' }],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'mock-cust-2',
    partnerId: 'mock-partner-1',
    sessionToken: 'abc456',
    fullName: 'John Smith',
    phone: '+1 555-5678',
    interestedIn: 'hair_transplant',
    stage: 'completed',
    rewardTier: 'standard',
    rewardAmount: 500,
    isPaid: true,
    partnerNotes: [{ text: 'Great patient', createdAt: Date.now() }],
    timeline: [{ stage: 'completed', changedAt: Date.now(), changedBy: 'system' }],
    createdAt: Date.now() - 10000000,
    updatedAt: Date.now(),
  }
];

export async function upsertCustomerLead(data: {
  id: string;
  partnerId: string;
  sessionToken: string;
  interestedIn?: InterestedIn | null;
  fullName?: string | null;
}): Promise<Customer> {
  if (!db) return MOCK_CUSTOMERS[0];
  const now = Date.now();
  const collection = db.collection('customers');
  
  const snapshot = await collection.where('sessionToken', '==', data.sessionToken).limit(1).get();
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    const customer = doc.data() as Customer;
    const updates: Partial<Customer> = { updatedAt: now };
    if (data.interestedIn) updates.interestedIn = data.interestedIn;
    if (data.fullName) updates.fullName = data.fullName;
    await doc.ref.update(updates);
    return { ...customer, ...updates };
  }
  
  const docRef = collection.doc(data.id);
  const newCustomer: Customer = {
    id: data.id,
    partnerId: data.partnerId,
    sessionToken: data.sessionToken,
    fullName: data.fullName || null,
    phone: null,
    interestedIn: data.interestedIn || null,
    stage: 'lead',
    rewardTier: null,
    rewardAmount: null,
    isPaid: false,
    partnerNotes: [],
    timeline: [{ stage: 'lead', changedAt: now, changedBy: 'system' }],
    createdAt: now,
    updatedAt: now,
  };
  await docRef.set(newCustomer);
  return newCustomer;
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  if (!db) return MOCK_CUSTOMERS[0];
  const doc = await db.collection('customers').doc(id).get();
  if (!doc.exists) return null;
  return doc.data() as Customer;
}

export async function listCustomersByPartner(partnerId: string): Promise<Customer[]> {
  if (!db) return MOCK_CUSTOMERS;
  const snapshot = await db.collection('customers').where('partnerId', '==', partnerId).orderBy('updatedAt', 'desc').get();
  return snapshot.docs.map((doc: any) => doc.data() as Customer);
}

export async function listAllCustomers(): Promise<Customer[]> {
  if (!db) return MOCK_CUSTOMERS;
  const snapshot = await db.collection('customers').orderBy('updatedAt', 'desc').get();
  return snapshot.docs.map((doc: any) => doc.data() as Customer);
}

export async function updateCustomer(id: string, updates: Partial<Customer>): Promise<void> {
  if (!db) return;
  await db.collection('customers').doc(id).update({
    ...updates,
    updatedAt: Date.now()
  });
}
