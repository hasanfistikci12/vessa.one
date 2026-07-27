'use client';
import { useState } from 'react';
import { QRModal } from './QRModal';

export function QRButton({ referralCode, businessName }: { referralCode: string, businessName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-deep text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue transition-colors flex items-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        Share Link
      </button>
      
      <QRModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        referralCode={referralCode} 
        businessName={businessName} 
      />
    </>
  );
}
