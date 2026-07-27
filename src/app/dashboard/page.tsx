import { CustomerBoard } from '@/components/CustomerBoard';
import { QRButton } from '@/components/QRButton';

export default function DashboardPage() {
  // Mock Data
  const partner = {
    referralCode: 'GLOW2024',
    businessName: 'Glow & Beauty'
  };

  const customers: any[] = [
    {
      id: '1',
      name: 'Sarah M.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
      stage: 'completed',
      procedure: 'Hair Transplant',
      notes: 'Completed successfully.'
    },
    {
      id: '2',
      name: 'Emily R.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
      stage: 'booked',
      procedure: 'Aesthetic Surgery',
      dateBooked: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5)
    },
    {
      id: '3',
      name: 'Jessica T.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      stage: 'lead',
      notes: 'Interested in BBL'
    }
  ];

  const totalEarned = 200; // Mock earned (1 completed Hair Transplant)
  const pendingReward = 400; // Mock pending (1 booked surgery)
  const activeCustomers = 1; // 1 booked

  return (
    <div className="h-full flex flex-col">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-deep mb-2">Welcome back.</h1>
          <p className="text-grey">Here is how your referrals are doing.</p>
        </div>
        <QRButton referralCode={partner.referralCode} businessName={partner.businessName} />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-line shadow-sm">
          <div className="text-sm font-medium text-grey mb-2">Total Earned</div>
          <div className="text-3xl font-serif text-deep">${totalEarned.toLocaleString()}</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-line shadow-sm">
          <div className="text-sm font-medium text-grey mb-2">Pending Rewards</div>
          <div className="text-3xl font-serif text-blue">${pendingReward.toLocaleString()}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-line shadow-sm">
          <div className="text-sm font-medium text-grey mb-2">Active Journeys</div>
          <div className="text-3xl font-serif text-deep">{activeCustomers}</div>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-white border border-line rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col">
        <h2 className="font-serif text-xl text-deep mb-6">Referral Pipeline</h2>
        <div className="flex-1 overflow-y-auto min-h-0">
          <CustomerBoard customers={customers} />
        </div>
      </div>
    </div>
  );
}
