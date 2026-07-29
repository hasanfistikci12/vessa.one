import { requirePartnerAuth } from '@/lib/auth';
import { getPartnerById, listAllPartners } from '@/lib/db/partners';
import { listAllCustomers } from '@/lib/db/customers';
import { getRewardConfig } from '@/lib/db/config';
import { computeEarned } from '@/lib/business/earnings';
import { LeaderBoard } from '@/components/LeaderBoard';

export default async function LeaderPage() {
  const session = await requirePartnerAuth();
  
  // Fetch all required data in parallel
  const [partners, customers, config] = await Promise.all([
    listAllPartners(),
    listAllCustomers(),
    getRewardConfig()
  ]);

  // Enrich partners with their performance statistics
  const enrichedPartners = partners.map(p => {
    const pCustomers = customers.filter(c => c.partnerId === p.id);
    const active = pCustomers.filter(c => c.stage !== 'lead' && c.stage !== 'completed').length;
    const totalEarned = computeEarned(pCustomers);
    
    return {
      ...p,
      customers: pCustomers,
      stats: {
        totalCustomers: pCustomers.length,
        activeJourneys: active,
        totalEarned
      }
    };
  });

  return (
    <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
       <LeaderBoard partners={enrichedPartners} />
    </main>
  );
}
