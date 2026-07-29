import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import DashboardClient from './DashboardClient';
import { listCustomersByPartner, getPartnerByEmail } from '@/lib/db/customers'; // I need to get partner
import { getPartnerByGoogleId } from '@/lib/db/partners';
import { Customer } from '@/lib/types';
import { listAllCustomers } from '@/lib/db/customers';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  // Actually, for demo purposes let's just fetch all customers for mock-partner-2 
  // or use the current logged-in user if available.
  let customers: Customer[] = [];
  
  if (session?.user?.email) {
    const partner = await getPartnerByGoogleId(session.user.id || session.user.email);
    if (partner) {
      if (partner.isAdmin) {
        customers = await listAllCustomers();
      } else {
        const { listCustomersByPartner } = await import('@/lib/db/customers');
        customers = await listCustomersByPartner(partner.id);
      }
    } else {
      // Demo fallback: mock-partner-2's customers
      const { listCustomersByPartner } = await import('@/lib/db/customers');
      customers = await listCustomersByPartner('mock-partner-2');
    }
  } else {
    const { listCustomersByPartner } = await import('@/lib/db/customers');
    customers = await listCustomersByPartner('mock-partner-2');
  }

  return <DashboardClient initialCustomers={customers} />;
}
