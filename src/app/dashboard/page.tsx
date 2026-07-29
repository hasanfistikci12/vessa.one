import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import DashboardClient from './DashboardClient';
import { listCustomersByPartner, listAllCustomers } from '@/lib/db/customers';
import { Customer } from '@/lib/types';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  let customers: Customer[] = [];
  
  if (session) {
    const isAdmin = (session as any).isAdmin;
    const partnerId = (session as any).partnerId;

    try {
      if (isAdmin) {
        customers = await listAllCustomers();
      } else if (partnerId && partnerId !== 'admin-override') {
        customers = await listCustomersByPartner(partnerId);
      } else {
        customers = await listCustomersByPartner('mock-partner-2');
      }
    } catch (error) {
      console.error('Failed to fetch customers, using empty list:', error);
      customers = [];
    }
  }

  return <DashboardClient initialCustomers={customers} />;
}
