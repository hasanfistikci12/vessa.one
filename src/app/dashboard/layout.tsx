import { ReactNode } from 'react';
import { requirePartnerAuth } from '@/lib/auth';
import { Navigation } from '@/components/Navigation';
import { getPartnerById } from '@/lib/db/partners';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await requirePartnerAuth();
  const partnerId = (session as any).partnerId;
  const partner = await getPartnerById(partnerId);

  return (
    <div className="min-h-[100dvh] bg-paper flex flex-col md:flex-row">
      <Navigation partnerName={partner?.businessName} />
      <div className="flex-1 md:ml-64 flex flex-col h-[calc(100dvh-56px)] md:h-[100dvh] pb-[60px] md:pb-0">
        <main className="flex-1 overflow-auto p-4 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
