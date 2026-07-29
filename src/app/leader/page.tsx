import { requirePartnerAuth } from '@/lib/auth';
import { listAllPartners } from '@/lib/db/partners';
import { listAllCustomers } from '@/lib/db/customers';
import { getRewardConfig, DEFAULT_CONFIG } from '@/lib/db/config';
import { computeEarned } from '@/lib/business/earnings';
import { LeaderBoard } from '@/components/LeaderBoard';

export default async function LeaderPage() {
  await requirePartnerAuth();
  
  let partners: any[] = [];
  let customers: any[] = [];
  let config = DEFAULT_CONFIG;

  try {
    const results = await Promise.all([
      listAllPartners(),
      listAllCustomers(),
      getRewardConfig()
    ]);
    partners = results[0];
    customers = results[1];
    config = results[2];
  } catch (error) {
    console.error('Failed to fetch leader data:', error);
  }

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
