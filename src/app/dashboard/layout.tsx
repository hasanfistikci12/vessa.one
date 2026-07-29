import { ReactNode } from 'react';
import { requirePartnerAuth } from '@/lib/auth';
import { getPartnerById } from '@/lib/db/partners';
import { Navigation } from '@/components/Navigation';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await requirePartnerAuth();
  
  const email = session.user?.email || '';
  const authorizedEmails = ['hasanfistikci01@gmail.com', 'erengun00@gmail.com'];
  const isSuperAdmin = authorizedEmails.includes(email);

  let partner = null;
  const partnerId = (session as any).partnerId;
  
  try {
    if (partnerId && partnerId !== 'admin-override') {
      partner = await getPartnerById(partnerId);
    }
  } catch (error) {
    console.error('Failed to fetch partner in dashboard layout:', error);
  }

  const isAdmin = isSuperAdmin || (partner ? authorizedEmails.includes(partner.email) : false);

  return (
    <div className="min-h-[100dvh] bg-paper flex flex-col md:flex-row">
      <Navigation partnerName={isSuperAdmin ? (session.user?.name || email) : (partner?.businessName || 'Partner')} isAdmin={isAdmin} />
      <div className="flex-1 md:ml-64 flex flex-col h-[calc(100dvh-56px)] md:h-[100dvh] pb-[60px] md:pb-0">
        <main className="flex-1 overflow-auto p-4 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
