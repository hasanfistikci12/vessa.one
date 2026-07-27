import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { updateCustomer, getCustomerById } from '@/lib/db/customers';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !(session.user as any).isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const customer = await getCustomerById(params.id);
    if (!customer) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    const timeline = [...customer.timeline];
    if (body.stage && body.stage !== customer.stage) {
      timeline.push({
        stage: body.stage,
        changedAt: Date.now(),
        changedBy: session.user?.email || 'admin'
      });
    }

    await updateCustomer(params.id, {
      ...body,
      timeline,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
