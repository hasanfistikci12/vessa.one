import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import DashboardClient from './DashboardClient';
import { listCustomersByPartner, getPartnerByEmail } from '@/lib/db/customers'; // I need to get partner
import { getPartnerByGoogleId } from '@/lib/db/partners';
import { Customer } from '@/lib/types';
import { listAllCustomers } from '@/lib/db/customers';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  let customers: Customer[] = [];
  
  if (session) {
    const isAdmin = (session as any).isAdmin;
    const partnerId = (session as any).partnerId;

    if (isAdmin) {
      customers = await listAllCustomers();
    } else if (partnerId && partnerId !== 'admin-override') {
      const { listCustomersByPartner } = await import('@/lib/db/customers');
      customers = await listCustomersByPartner(partnerId);
    } else {
      // Demo fallback
      const { listCustomersByPartner } = await import('@/lib/db/customers');
      customers = await listCustomersByPartner('mock-partner-2');
    }
  }

  return <DashboardClient initialCustomers={customers} />;
}
