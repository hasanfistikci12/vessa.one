import { requirePartnerAuth } from '@/lib/auth';
import { listAllPartners } from '@/lib/db/partners';
import { listAllCustomers } from '@/lib/db/customers';
import { LeaderAllCustomers } from '@/components/LeaderAllCustomers';

export default async function LeaderCustomersPage() {
  await requirePartnerAuth();

  let partners: any[] = [];
  let customers: any[] = [];

  try {
    const results = await Promise.all([
      listAllPartners(),
      listAllCustomers(),
    ]);
    partners = results[0];
    customers = results[1];
  } catch (error) {
    console.error('Failed to fetch leader customers data:', error);
  }

  // Enrich customers with partner data
  const enrichedCustomers = customers.map(c => {
    const partner = partners.find(p => p.id === c.partnerId);
    return {
      ...c,
      partnerName: partner?.businessName || partner?.name || 'Unknown Partner',
      partnerType: partner?.businessType || 'other'
    };
  });

  return (
    <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
       <LeaderAllCustomers initialCustomers={enrichedCustomers} />
    </main>
  );
}
