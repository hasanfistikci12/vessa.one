import { NextResponse } from 'next/server';
import { upsertCustomerLead, updateCustomer } from '@/lib/db/customers';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.partnerId || !body.name || !body.email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const customer = await upsertCustomerLead({
      id: randomUUID(),
      partnerId: body.partnerId,
      sessionToken: randomUUID(),
      fullName: body.name,
      interestedIn: body.interestedIn as any,
    });

    if (body.phone) {
      await updateCustomer(customer.id, { phone: body.phone });
    }

    return NextResponse.json({ success: true, customerId: customer.id });
  } catch (error) {
    console.error('Lead creation failed:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
