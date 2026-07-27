import { requireAdminAuth } from '@/lib/auth';
import { getRewardConfig } from '@/lib/db/config';
import { ConfigForm } from './ConfigForm';

export default async function AdminConfigPage() {
  await requireAdminAuth();
  const config = await getRewardConfig();

  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-deep mb-2">Platform Configuration</h1>
        <p className="text-grey">Manage global reward settings. Changes will apply to all future referrals.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-line shadow-sm">
        <ConfigForm initialConfig={config} />
      </div>
    </div>
  );
}
