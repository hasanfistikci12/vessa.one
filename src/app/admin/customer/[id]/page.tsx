import { getCustomerById } from '@/lib/db/customers';
import { getPartnerById } from '@/lib/db/partners';
import { getRewardConfig } from '@/lib/db/config';
import { STAGE_ORDER } from '@/lib/business/pipeline';
import { AdminCustomerControls } from './AdminCustomerControls';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function AdminCustomerDetail({ params }: { params: { id: string } }) {
  const customer = await getCustomerById(params.id);
  if (!customer) return notFound();
  
  const partner = await getPartnerById(customer.partnerId);
  const config = await getRewardConfig();

  return (
    <div>
      <Link href="/admin" className="text-sm text-grey hover:text-deep mb-4 inline-block">
        ← Back to Dashboard
      </Link>
      <h1 className="font-serif text-3xl text-deep mb-2">Manage Customer: {customer.fullName}</h1>
      <p className="text-grey mb-8">Referred by Partner: {partner?.businessName || customer.partnerId}</p>

      <AdminCustomerControls customer={customer} stages={STAGE_ORDER} config={config} />
    </div>
  );
}
