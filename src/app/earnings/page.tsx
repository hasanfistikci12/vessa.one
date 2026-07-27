import { requirePartnerAuth } from '@/lib/auth';
import { getPartnerById } from '@/lib/db/partners';
import { listCustomersByPartner } from '@/lib/db/customers';
import { getRewardConfig } from '@/lib/db/config';
import { lockRewardOnComplete } from '@/lib/business/pipeline';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/Navigation';

export default async function EarningsPage() {
  const session = await requirePartnerAuth();
  const partnerId = (session as any).partnerId;
  
  const [partner, customers, config] = await Promise.all([
    getPartnerById(partnerId),
    listCustomersByPartner(partnerId),
    getRewardConfig()
  ]);

  if (!partner) return notFound();

  const completedCustomers = customers.filter(c => c.stage === 'completed');
  
  const totalEarned = completedCustomers.reduce((sum, c) => sum + (c.rewardAmount || 0), 0);
  const totalPaid = completedCustomers.filter(c => c.isPaid).reduce((sum, c) => sum + (c.rewardAmount || 0), 0);
  const totalOwed = totalEarned - totalPaid;

  return (
    <div className="min-h-screen bg-paper flex">
      <Navigation partnerName={partner.businessName} />
      <div className="flex-1 md:ml-64 flex flex-col h-screen">
        <main className="flex-1 overflow-auto p-6 md:p-10">
          <header className="mb-8">
            <h1 className="font-serif text-3xl text-deep mb-2">Earnings & Payouts</h1>
            <p className="text-grey">Track your rewards for completed journeys.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-line shadow-sm">
              <div className="text-sm font-medium text-grey mb-2">Total Earned All Time</div>
              <div className="text-3xl font-serif text-deep">${totalEarned.toLocaleString()}</div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-line shadow-sm">
              <div className="text-sm font-medium text-grey mb-2">Total Paid Out</div>
              <div className="text-3xl font-serif text-blue">${totalPaid.toLocaleString()}</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-line shadow-sm">
              <div className="text-sm font-medium text-grey mb-2">Current Balance</div>
              <div className="text-3xl font-serif text-deep">${totalOwed.toLocaleString()}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
            <div className="p-6 border-b border-line">
              <h2 className="font-serif text-xl text-deep">Completed Referrals</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-mist text-grey text-xs font-medium uppercase tracking-wider">
                    <th className="p-4">Client</th>
                    <th className="p-4">Procedure</th>
                    <th className="p-4">Completed On</th>
                    <th className="p-4">Reward</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {completedCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-grey">
                        No completed journeys yet.
                      </td>
                    </tr>
                  ) : (
                    completedCustomers.map(c => {
                      const amount = c.rewardAmount || lockRewardOnComplete(c, config);
                      return (
                        <tr key={c.id} className="hover:bg-mist/50 transition-colors">
                          <td className="p-4 font-medium text-deep">{c.fullName || 'Unknown'}</td>
                          <td className="p-4 text-sm text-grey capitalize">
                            {c.interestedIn?.replace('_', ' ') || '-'}
                          </td>
                          <td className="p-4 text-sm text-grey">
                            {new Date(c.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 font-medium text-deep">${amount}</td>
                          <td className="p-4">
                            {c.isPaid ? (
                              <span className="bg-[#E7F3EF] text-[#1E8F67] px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Paid</span>
                            ) : (
                              <span className="bg-blue/10 text-blue px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Pending Payout</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
