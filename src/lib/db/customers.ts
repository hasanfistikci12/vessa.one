import { db } from '../firebase-admin';
import { Customer, CustomerStage, InterestedIn, RewardTier, TimelineEntry } from '../types';

const MOCK_CUSTOMERS: Customer[] = [
  // New Leads (Fresh)
  {
    id: 'mock-cust-1',
    partnerId: 'mock-partner-2',
    sessionToken: 't1',
    fullName: 'Emma Watson',
    phone: '+1 555-0101',
    interestedIn: 'rhinoplasty',
    stage: 'lead',
    rewardTier: null,
    rewardAmount: null,
    price: 2500,
    isPaid: false,
    partnerNotes: [{ text: 'Wants a natural look', createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000 }],
    timeline: [{ stage: 'lead', changedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, changedBy: 'system' }],
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'mock-cust-2',
    partnerId: 'mock-partner-3',
    sessionToken: 't2',
    fullName: 'Liam Hemsworth',
    phone: '+1 555-0102',
    interestedIn: 'hair_transplant',
    stage: 'lead',
    rewardTier: null,
    rewardAmount: null,
    price: 3200,
    isPaid: false,
    partnerNotes: [],
    timeline: [{ stage: 'lead', changedAt: Date.now() - 5 * 24 * 60 * 60 * 1000, changedBy: 'system' }],
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },
  
  // In Communication (Fresh)
  {
    id: 'mock-cust-3',
    partnerId: 'mock-partner-4',
    sessionToken: 't3',
    fullName: 'Olivia Colman',
    phone: '+44 7700 900077',
    interestedIn: 'facelift',
    stage: 'contacted',
    rewardTier: null,
    rewardAmount: null,
    price: 4100,
    isPaid: false,
    partnerNotes: [
      { text: 'Had initial consultation via Zoom.', createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000 },
      { text: 'Waiting for her husband to confirm dates.', createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000 }
    ],
    timeline: [
      { stage: 'lead', changedAt: Date.now() - 10 * 24 * 60 * 60 * 1000, changedBy: 'system' },
      { stage: 'contacted', changedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, changedBy: 'leader' }
    ],
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
  
  // Pending Action (Trip Pending / Payment Pending)
  {
    id: 'mock-cust-4',
    partnerId: 'mock-partner-2',
    sessionToken: 't4',
    fullName: 'Noah Centineo',
    phone: '+1 555-0104',
    interestedIn: 'bbl',
    stage: 'trip_pending',
    rewardTier: null,
    rewardAmount: null,
    price: 2900,
    isPaid: false,
    partnerNotes: [{ text: 'Flights booked for next month.', createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000 }],
    timeline: [
      { stage: 'lead', changedAt: Date.now() - 30 * 24 * 60 * 60 * 1000, changedBy: 'system' },
      { stage: 'contacted', changedAt: Date.now() - 25 * 24 * 60 * 60 * 1000, changedBy: 'leader' },
      { stage: 'trip_pending', changedAt: Date.now() - 1 * 24 * 60 * 60 * 1000, changedBy: 'leader' }
    ],
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'mock-cust-5',
    partnerId: 'mock-partner-3',
    sessionToken: 't5',
    fullName: 'Sophia Loren',
    phone: '+39 333 1234567',
    interestedIn: 'tummy_tuck',
    stage: 'payment_pending',
    rewardTier: null,
    rewardAmount: null,
    price: 5500,
    isPaid: false,
    partnerNotes: [{ text: 'Waiting for deposit transfer.', createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000 }],
    timeline: [
      { stage: 'lead', changedAt: Date.now() - 20 * 24 * 60 * 60 * 1000, changedBy: 'system' },
      { stage: 'payment_pending', changedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, changedBy: 'leader' }
    ],
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  
  // Completed
  {
    id: 'mock-cust-6',
    partnerId: 'mock-partner-2',
    sessionToken: 't6',
    fullName: 'James Bond',
    phone: '+44 7700 900007',
    interestedIn: 'hair_transplant',
    stage: 'completed',
    rewardTier: 'premium',
    rewardAmount: 1000,
    price: 3800,
    isPaid: true,
    partnerNotes: [{ text: 'Very happy with the result.', createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000 }],
    timeline: [
      { stage: 'lead', changedAt: Date.now() - 60 * 24 * 60 * 60 * 1000, changedBy: 'system' },
      { stage: 'completed', changedAt: Date.now() - 10 * 24 * 60 * 60 * 1000, changedBy: 'leader' }
    ],
    createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'mock-cust-7',
    partnerId: 'mock-partner-4',
    sessionToken: 't7',
    fullName: 'Mia Wallace',
    phone: '+1 555-0107',
    interestedIn: 'breast',
    stage: 'completed',
    rewardTier: 'standard',
    rewardAmount: 500,
    price: 4800,
    isPaid: false,
    partnerNotes: [{ text: 'Procedure done. Partner payout pending.', createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000 }],
    timeline: [
      { stage: 'lead', changedAt: Date.now() - 40 * 24 * 60 * 60 * 1000, changedBy: 'system' },
      { stage: 'completed', changedAt: Date.now() - 5 * 24 * 60 * 60 * 1000, changedBy: 'leader' }
    ],
    createdAt: Date.now() - 40 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },

  // Expired / Stale (Updated > 15 days ago and in lead/contacted stage)
  {
    id: 'mock-cust-8',
    partnerId: 'mock-partner-3',
    sessionToken: 't8',
    fullName: 'Walter White',
    phone: '+1 555-0108',
    interestedIn: 'hair_transplant',
    stage: 'lead',
    rewardTier: null,
    rewardAmount: null,
    price: 2100,
    isPaid: false,
    partnerNotes: [{ text: 'Tried calling 3 times, no answer.', createdAt: Date.now() - 25 * 24 * 60 * 60 * 1000 }],
    timeline: [{ stage: 'lead', changedAt: Date.now() - 30 * 24 * 60 * 60 * 1000, changedBy: 'system' }],
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 25 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'mock-cust-9',
    partnerId: 'mock-partner-2',
    sessionToken: 't9',
    fullName: 'Jesse Pinkman',
    phone: '+1 555-0109',
    interestedIn: 'other',
    stage: 'contacted',
    rewardTier: null,
    rewardAmount: null,
    price: 3600,
    isPaid: false,
    partnerNotes: [{ text: 'Said he needs to save money, contact next year.', createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000 }],
    timeline: [
      { stage: 'lead', changedAt: Date.now() - 50 * 24 * 60 * 60 * 1000, changedBy: 'system' },
      { stage: 'contacted', changedAt: Date.now() - 45 * 24 * 60 * 60 * 1000, changedBy: 'leader' }
    ],
    createdAt: Date.now() - 50 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'mock-cust-10',
    partnerId: 'mock-partner-1',
    sessionToken: 't10',
    fullName: 'Saul Goodman',
    phone: '+1 555-0110',
    interestedIn: 'hair_transplant',
    stage: 'lead',
    rewardTier: null,
    rewardAmount: null,
    price: 4200,
    isPaid: false,
    partnerNotes: [],
    timeline: [{ stage: 'lead', changedAt: Date.now() - 20 * 24 * 60 * 60 * 1000, changedBy: 'system' }],
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
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
    price: 2500,
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
  return JSON.parse(JSON.stringify(doc.data())) as Customer;
}

export async function listCustomersByPartner(partnerId: string): Promise<Customer[]> {
  if (!db) return MOCK_CUSTOMERS;
  const snapshot = await db.collection('customers').where('partnerId', '==', partnerId).orderBy('updatedAt', 'desc').get();
  return snapshot.docs.map((doc: any) => {
    const data = doc.data();
    return JSON.parse(JSON.stringify(data)) as Customer;
  });
}

export async function listAllCustomers(): Promise<Customer[]> {
  if (!db) return MOCK_CUSTOMERS;
  const snapshot = await db.collection('customers').orderBy('updatedAt', 'desc').get();
  return snapshot.docs.map((doc: any) => {
    const data = doc.data();
    return JSON.parse(JSON.stringify(data)) as Customer;
  });
}

export async function updateCustomer(id: string, updates: Partial<Customer>): Promise<void> {
  if (!db) {
    const idx = MOCK_CUSTOMERS.findIndex(c => c.id === id);
    if (idx !== -1) {
      MOCK_CUSTOMERS[idx] = { ...MOCK_CUSTOMERS[idx], ...updates, updatedAt: Date.now() };
    }
    return;
  }
  await db.collection('customers').doc(id).update({
    ...updates,
    updatedAt: Date.now()
  });
}
