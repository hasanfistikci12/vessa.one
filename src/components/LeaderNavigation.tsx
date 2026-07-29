'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { VessaLogo } from './VessaLogo';

export function LeaderNavigation({ adminName, adminImage }: { adminName?: string, adminImage?: string | null }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (desktopRef.current && !desktopRef.current.contains(event.target as Node)) {
        setIsDesktopMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const links = [
    { href: '/leader', label: 'Partners', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
    { href: '/leader/customers', label: 'All Clients', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
    { href: '/dashboard', label: 'My Dashboard', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg> },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-line sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <VessaLogo className="w-6 h-6" />
          <span className="font-serif text-lg text-deep tracking-wide">LEADER</span>
        </div>
        {adminName && (
          <div className="relative" ref={mobileRef}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="text-xs font-medium text-grey truncate max-w-[120px]">
                {adminName}
              </div>
              {adminImage ? (
                <Image src={adminImage} alt={adminName} width={32} height={32} className="rounded-full object-cover border border-line" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-deep font-bold text-xs border border-line">
                  {adminName.charAt(0).toUpperCase()}
                </div>
              )}
            </button>
            {isMobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-line rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-mist flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-white border-r border-line">
        <div className="p-6 flex items-center gap-3 border-b border-line">
          <VessaLogo className="w-8 h-8" />
          <span className="font-serif text-xl text-deep tracking-wide">LEADER</span>
        </div>
        
        {adminName && (
          <div className="px-6 py-4 border-b border-line relative" ref={desktopRef}>
            <button 
              onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
              className="w-full flex items-center justify-between focus:outline-none group hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {adminImage ? (
                  <Image src={adminImage} alt={adminName} width={36} height={36} className="rounded-full object-cover border border-line flex-shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-mist flex items-center justify-center text-deep font-bold text-sm border border-line flex-shrink-0">
                    {adminName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 text-left overflow-hidden">
                  <div className="text-[10px] uppercase tracking-wider text-grey font-semibold mb-0.5">Admin</div>
                  <div className="text-deep font-medium text-sm truncate">{adminName}</div>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-grey transition-transform flex-shrink-0 ${isDesktopMenuOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            {isDesktopMenuOpen && (
              <div className="absolute left-6 right-6 top-full mt-2 bg-white border border-line rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-mist flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}

        <nav className="flex-1 p-4 space-y-1">
          {links.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-deep text-white shadow-md' : 'text-grey hover:bg-mist hover:text-deep'}`}>
                {link.icon}
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-line">
          {/* Kept empty or add other links if needed, logout moved to profile */}
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-line pb-safe z-50 shadow-[0_-4px_24px_rgba(18,50,77,0.06)]">
        <nav className="flex items-center justify-around h-[60px]">
          {links.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`flex flex-col items-center justify-center w-full h-full gap-1 ${isActive ? 'text-deep' : 'text-grey hover:text-deep transition-colors'}`}>
                {link.icon}
                <span className="text-[10px] font-medium">{link.label}</span>
              </Link>
            );
          })}
          <button onClick={() => signOut({ callbackUrl: '/login' })} className="flex flex-col items-center justify-center w-full h-full gap-1 text-grey hover:text-deep transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span className="text-[10px] font-medium">Log out</span>
          </button>
        </nav>
      </div>
    </>
  );
}
