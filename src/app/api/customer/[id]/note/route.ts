import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { getCustomerById, updateCustomer } from '@/lib/db/customers';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { text } = await request.json();
    if (!text) return NextResponse.json({ error: 'Note text required' }, { status: 400 });

    const customer = await getCustomerById(params.id);
    if (!customer) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    const isAdmin = (session.user as any).isAdmin;
    const partnerId = (session.user as any).partnerId;
    
    if (!isAdmin && customer.partnerId !== partnerId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const newNote = { text, createdAt: Date.now() };
    const partnerNotes = [...(customer.partnerNotes || []), newNote];
    
    await updateCustomer(params.id, { partnerNotes });
    
    return NextResponse.json({ success: true, note: newNote });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
