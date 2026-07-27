import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/authOptions';
import { createPartner, getPartnerByGoogleId } from '../../../../lib/db/partners';
import { generateReferralCode } from '../../../../lib/business/referralCode';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = session.user as any;
  const googleId = user.googleId;
  const email = user.email;
  const name = user.name;

  const existing = await getPartnerByGoogleId(googleId);
  if (existing) {
    return NextResponse.json({ success: true, partnerId: existing.id });
  }

  const body = await request.json();
  const referralCode = await generateReferralCode(body.businessName);

  const newPartner = await createPartner({
    id: randomUUID(),
    googleId,
    email,
    name,
    businessName: body.businessName,
    businessType: body.businessType,
    location: { city: body.city, state: body.state, country: 'US' },
    estimatedMonthlyClients: body.volume,
    referralCode,
    status: 'active',
  });

  return NextResponse.json({ success: true, partnerId: newPartner.id });
}
