import { requireAdminAuth } from '@/lib/auth';
import { listAllPartners } from '@/lib/db/partners';

export default async function AdminPartnersPage() {
  await requireAdminAuth();
  const partners = await listAllPartners();

  return (
    <div>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-serif text-3xl text-deep mb-2">Partners</h1>
          <p className="text-grey">All registered partners on the platform.</p>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-line overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-mist text-grey text-xs font-medium uppercase tracking-wider">
                <th className="p-4">Business Name</th>
                <th className="p-4">Owner Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Location</th>
                <th className="p-4">Volume</th>
                <th className="p-4">Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {partners.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-grey">No partners found.</td>
                </tr>
              ) : (
                partners.map(p => (
                  <tr key={p.id} className="hover:bg-mist/50 transition-colors">
                    <td className="p-4 font-medium text-deep">{p.businessName}</td>
                    <td className="p-4 text-sm text-grey">{p.name || p.email}</td>
                    <td className="p-4 text-sm text-grey capitalize">{p.businessType.replace('_', ' ')}</td>
                    <td className="p-4 text-sm text-grey">{p.location.city}, {p.location.state}</td>
                    <td className="p-4 text-sm text-grey">{p.estimatedMonthlyClients}</td>
                    <td className="p-4 text-sm font-mono text-blue">{p.referralCode}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
