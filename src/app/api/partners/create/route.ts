import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session as any).googleId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const googleId = (session as any).googleId;
    const email = session.user?.email || '';
    const name = session.user?.name || 'Partner';
    
    // Generate a unique ID and referral code
    const partnerId = `pt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const referralCode = `VESSA_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Admin email check for auto-admin
    const isAdmin = email === 'hasanfistikci01@gmail.com' || email === 'erengun00@gmail.com';

    const newPartner = {
      id: partnerId,
      googleId,
      email,
      name,
      businessName: data.businessName || 'My Business',
      businessType: data.businessType || 'other',
      location: { 
        city: data.city || '', 
        state: data.state || '', 
        country: 'US' 
      },
      estimatedMonthlyClients: data.volume || '1-20',
      referralCode,
      status: 'active',
      isAdmin,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (db) {
      await db.collection('partners').doc(partnerId).set(newPartner);
    }

    return NextResponse.json({ success: true, partnerId });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
