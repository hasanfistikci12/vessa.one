import { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Mock Partner Data
  const partner = {
    businessName: 'Glow & Beauty (Demo)',
  };

  return (
    <div className="min-h-[100dvh] bg-paper flex flex-col md:flex-row">
      <Navigation partnerName={partner.businessName} />
      <div className="flex-1 md:ml-64 flex flex-col h-[calc(100dvh-56px)] md:h-[100dvh] pb-[60px] md:pb-0">
        <main className="flex-1 overflow-auto p-4 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
