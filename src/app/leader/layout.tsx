import { ReactNode } from 'react';
import { requirePartnerAuth } from '@/lib/auth';
import { getPartnerById } from '@/lib/db/partners';
import { notFound, redirect } from 'next/navigation';
import { LeaderNavigation } from '@/components/LeaderNavigation';

export default async function LeaderLayout({ children }: { children: ReactNode }) {
  const session = await requirePartnerAuth();
  const partnerId = (session as any).partnerId;
  
  const partner = await getPartnerById(partnerId);

  if (!partner) return notFound();

  const authorizedEmails = ['hasanfistikci01@gmail.com']; // Later add Eren's email

  // Enforce admin only
  if (!authorizedEmails.includes(partner.email)) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] flex flex-col md:flex-row">
      <LeaderNavigation adminName={partner.name} />
      <div className="flex-1 md:ml-64 flex flex-col h-[calc(100dvh-60px)] md:h-[100dvh] pb-[60px] md:pb-0">
        {children}
      </div>
    </div>
  );
}
