import { requirePartnerAuth } from '@/lib/auth';
import { getCustomerById } from '@/lib/db/customers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PipelineStepper } from '@/components/PipelineStepper';
import { NotesSection } from '@/components/NotesSection';

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
  const session = await requirePartnerAuth();
  const customer = await getCustomerById(params.id);
  
  if (!customer || customer.partnerId !== (session as any).partnerId) {
    return notFound();
  }

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <header className="mb-8">
        <Link href="/dashboard" className="text-sm text-grey hover:text-deep mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="font-serif text-3xl text-deep">{customer.fullName || 'Unknown Client'}</h1>
        <p className="text-grey">Referred on {new Date(customer.createdAt).toLocaleDateString()}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-2xl border border-line shadow-sm">
            <h2 className="font-serif text-xl text-deep mb-6">Journey Progress</h2>
            <PipelineStepper currentStage={customer.stage} />
          </section>

          <section className="bg-white p-8 rounded-2xl border border-line shadow-sm">
            <h2 className="font-serif text-xl text-deep mb-6">Notes & Updates</h2>
            <p className="text-sm text-grey mb-6">Vessa's team and you can leave notes here.</p>
            <NotesSection customerId={customer.id} initialNotes={customer.partnerNotes || []} />
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-mist p-6 rounded-2xl border border-line">
            <h3 className="font-medium text-ink mb-4">Client Details</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs text-grey mb-1">Interested In</div>
                <div className="font-medium text-deep capitalize">
                  {customer.interestedIn ? customer.interestedIn.replace('_', ' ') : 'Not specified'}
                </div>
              </div>
              
              <div>
                <div className="text-xs text-grey mb-1">Contact Info</div>
                <div className="text-sm text-deep italic">Hidden for privacy</div>
              </div>

              <div>
                <div className="text-xs text-grey mb-1">Reward Tier</div>
                <div className="font-medium text-blue capitalize">
                  {customer.rewardTier || 'Pending'}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
