export default function EarningsPage() {
  // Mock Data
  const completedCustomers = [
    {
      id: '1',
      fullName: 'Sarah M.',
      interestedIn: 'hair_transplant',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      rewardAmount: 200,
      isPaid: true
    },
    {
      id: '2',
      fullName: 'Mike D.',
      interestedIn: 'aesthetic_surgery',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      rewardAmount: 400,
      isPaid: false
    }
  ];
  
  const totalEarned = completedCustomers.reduce((sum, c) => sum + (c.rewardAmount || 0), 0);
  const totalPaid = completedCustomers.filter(c => c.isPaid).reduce((sum, c) => sum + (c.rewardAmount || 0), 0);
  const totalOwed = totalEarned - totalPaid;

  return (
    <div className="h-full flex flex-col">
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-deep mb-2">Earnings & Payouts</h1>
        <p className="text-grey">Track your rewards for completed journeys.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      <div className="flex-1 min-h-0 bg-white border border-line rounded-2xl shadow-sm flex flex-col">
        <div className="p-6 border-b border-line">
          <h2 className="font-serif text-xl text-deep">Completed Referrals</h2>
        </div>
        
        <div className="flex-1 overflow-x-auto overflow-y-auto min-h-0">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-mist z-10">
              <tr className="text-grey text-xs font-medium uppercase tracking-wider">
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
                  const amount = c.rewardAmount;
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
    </div>
  );
}
