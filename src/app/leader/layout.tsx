import { ReactNode } from 'react';
import { requirePartnerAuth } from '@/lib/auth';
import { getPartnerById } from '@/lib/db/partners';
import { notFound, redirect } from 'next/navigation';
import { LeaderNavigation } from '@/components/LeaderNavigation';

export default async function LeaderLayout({ children }: { children: ReactNode }) {
  const session = await requirePartnerAuth();
  const email = session.user?.email || '';
  
  const authorizedEmails = ['hasanfistikci01@gmail.com', 'erengun00@gmail.com'];
  
  // Enforce admin only using session email
  if (!authorizedEmails.includes(email)) {
    redirect('/dashboard');
  }

  // Attempt to get partner if it exists, otherwise just use the email/name from session
  let adminName = session.user?.name || email;
  const partnerId = (session as any).partnerId;
  if (partnerId && partnerId !== 'admin-override') {
    const partner = await getPartnerById(partnerId);
    if (partner) adminName = partner.name;
  }

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] flex flex-col md:flex-row">
      <LeaderNavigation adminName={adminName} />
      <div className="flex-1 md:ml-64 flex flex-col h-[calc(100dvh-60px)] md:h-[100dvh] pb-[60px] md:pb-0">
        {children}
      </div>
    </div>
  );
}
