import { ReactNode } from 'react';
import { requireAdminAuth } from '@/lib/auth';
import { VessaLogo } from '@/components/VessaLogo';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdminAuth();

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="bg-deep text-white px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <VessaLogo className="w-8 h-8" dark />
          <span className="font-serif text-xl tracking-wide">VESSA Admin</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/admin" className="text-sm font-medium text-sky hover:text-white transition-colors">Dashboard</Link>
          <Link href="/admin/partners" className="text-sm font-medium text-sky hover:text-white transition-colors">Partners</Link>
          <Link href="/admin/config" className="text-sm font-medium text-sky hover:text-white transition-colors">Config</Link>
        </nav>
      </header>
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
