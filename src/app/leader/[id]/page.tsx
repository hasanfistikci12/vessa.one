import { requirePartnerAuth } from '@/lib/auth';
import { getPartnerById } from '@/lib/db/partners';
import { listCustomersByPartner } from '@/lib/db/customers';
import { MOCK_PARTNERS } from '@/lib/db/partners';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';

export default async function LeaderPartnerDetail({ params }: { params: { id: string } }) {
  const session = await requirePartnerAuth();
  const email = session.user?.email || '';
  const authorizedEmails = ['hasanfistikci01@gmail.com', 'erengun00@gmail.com'];

  // Only allow super admins
  if (!authorizedEmails.includes(email)) {
    redirect('/dashboard');
  }

  let partner: any = null;
  let customers: any[] = [];

  try {
    partner = await getPartnerById(params.id);
    if (!partner) notFound();
    customers = await listCustomersByPartner(partner.id);
  } catch (error) {
    console.error('Failed to fetch partner detail data:', error);
    // If we got partner but failed on customers, continue
    if (!partner) notFound();
  }

  const activeCustomers = customers.filter(c => c.stage !== 'lead' && c.stage !== 'completed');
  const completedCustomers = customers.filter(c => c.stage === 'completed');
  const totalEarned = completedCustomers.reduce((sum, c) => sum + (c.rewardAmount || 0), 0);

  const formattedStatus = partner.status.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());

  return (
    <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      {/* Sticky Top Nav */}
      <div className="sticky top-0 z-30 bg-[#F8FAFC]/80 backdrop-blur-xl border-b border-line px-4 h-14 flex items-center justify-between">
        <Link href="/leader" className="flex items-center gap-1 text-sky font-medium py-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Back
        </Link>
        <span className="font-serif text-deep font-semibold truncate max-w-[200px]">{partner.businessName}</span>
        <div className="w-16"></div>
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 border border-line shadow-sm relative">
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <div className="w-20 h-20 bg-mist rounded-3xl flex items-center justify-center text-sky text-2xl font-serif">
              {partner.businessName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-2xl text-deep font-semibold mb-1">{partner.businessName}</h1>
              <p className="text-grey mb-3">{partner.name} • {partner.email}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-mist rounded-full text-xs font-bold uppercase tracking-wider text-deep border border-line">
                  {partner.businessType}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  partner.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'
                }`}>
                  {formattedStatus}
                </span>
              </div>
            </div>
            <div className="bg-mist px-4 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-grey mb-1">Referral Code</span>
              <span className="text-lg font-serif text-deep">{partner.referralCode}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-line p-5 rounded-3xl shadow-sm">
            <div className="text-xs text-grey uppercase font-semibold mb-2">Total Referrals</div>
            <div className="font-serif text-3xl text-deep">{customers.length}</div>
          </div>
          <div className="bg-white border border-line p-5 rounded-3xl shadow-sm">
            <div className="text-xs text-grey uppercase font-semibold mb-2">Active Journeys</div>
            <div className="font-serif text-3xl text-sky">{activeCustomers.length}</div>
          </div>
          <div className="bg-white border border-line p-5 rounded-3xl shadow-sm">
            <div className="text-xs text-grey uppercase font-semibold mb-2">Completed</div>
            <div className="font-serif text-3xl text-green-600">{completedCustomers.length}</div>
          </div>
          <div className="bg-white border border-line p-5 rounded-3xl shadow-sm">
            <div className="text-xs text-grey uppercase font-semibold mb-2">Total Payouts</div>
            <div className="font-serif text-3xl text-deep">${totalEarned.toLocaleString()}</div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white border border-line p-6 rounded-3xl shadow-sm">
          <h3 className="font-serif text-xl text-deep mb-4 border-b border-line pb-2">Business Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
            <div>
              <p className="text-xs text-grey uppercase font-bold tracking-wider mb-1">Location</p>
              <p className="text-deep font-medium">{partner.location.city}, {partner.location.state}</p>
            </div>
            <div>
              <p className="text-xs text-grey uppercase font-bold tracking-wider mb-1">Client Volume</p>
              <p className="text-deep font-medium">{partner.estimatedMonthlyClients} per month</p>
            </div>
            <div>
              <p className="text-xs text-grey uppercase font-bold tracking-wider mb-1">Joined Date</p>
              <p className="text-deep font-medium">{new Date(partner.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-grey uppercase font-bold tracking-wider mb-1">Contact Phone</p>
              <p className="text-deep font-medium">--</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
