import { listAllCustomers } from '@/lib/db/customers';
import Link from 'next/link';

export default async function AdminDashboard() {
  const customers = await listAllCustomers();
  
  const activeCustomers = customers.filter(c => c.stage !== 'completed');

  return (
    <div>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-serif text-3xl text-deep mb-2">Admin Dashboard</h1>
          <p className="text-grey">Manage all active journeys across partners.</p>
        </div>
      </header>
      
      <div className="bg-white rounded-2xl shadow-sm border border-line overflow-hidden">
        <div className="p-6 border-b border-line flex justify-between items-center">
          <h2 className="font-serif text-xl text-deep">Active Journeys ({activeCustomers.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-mist text-grey text-xs font-medium uppercase tracking-wider">
                <th className="p-4">Client</th>
                <th className="p-4">Procedure</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Partner ID</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {activeCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-grey">No active journeys.</td>
                </tr>
              ) : (
                activeCustomers.map(c => (
                  <tr key={c.id} className="hover:bg-mist/50 transition-colors">
                    <td className="p-4 font-medium text-deep">{c.fullName || 'Unknown'}</td>
                    <td className="p-4 text-sm text-grey capitalize">{c.interestedIn?.replace('_', ' ') || '-'}</td>
                    <td className="p-4 text-sm text-deep capitalize">
                      <span className="bg-mist px-2 py-1 rounded-full text-xs font-medium border border-line">
                        {c.stage.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-grey font-mono text-[10px]">{c.partnerId}</td>
                    <td className="p-4">
                      <Link href={`/admin/customer/${c.id}`} className="text-sm font-medium text-blue hover:text-deep">
                        Manage
                      </Link>
                    </td>
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
