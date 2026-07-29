'use client';
import { useEffect, useState } from 'react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode: string;
  businessName: string;
}

export function QRModal({ isOpen, onClose, referralCode, businessName }: QRModalProps) {
  const [mounted, setMounted] = useState(false);
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${referralCode}`;

  useEffect(() => {
    setMounted(true);
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
  
  const text = `Hi! Use this link to start your journey with Vessa.`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-grey hover:text-ink transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div className="p-8 text-center border-b border-line">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-blue mb-1">Your Partner Link</div>
          <h2 className="font-serif text-2xl text-deep">{businessName}</h2>
        </div>

        <div className="p-8 flex flex-col items-center">
          <div className="bg-mist p-2 rounded-2xl mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrImageUrl} alt="QR Code" className="w-56 h-56 rounded-xl" />
          </div>
          
          <div className="grid grid-cols-4 gap-3 w-full mb-6">
            <a href={`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/></svg>
              </div>
              <span className="text-[10px] font-medium text-ink">WhatsApp</span>
            </a>
            
            <a href={`sms:?body=${encodeURIComponent(text + ' ' + url)}`} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-mist text-blue flex items-center justify-center group-hover:bg-blue/10 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <span className="text-[10px] font-medium text-ink">SMS</span>
            </a>
            
            <a href={`mailto:?subject=${encodeURIComponent('Vessa Aesthetic Journeys')}&body=${encodeURIComponent(text + '\n\n' + url)}`} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-mist text-blue flex items-center justify-center group-hover:bg-blue/10 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </div>
              <span className="text-[10px] font-medium text-ink">Email</span>
            </a>
            
            <button onClick={handleCopy} className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-mist text-blue flex items-center justify-center group-hover:bg-blue/10 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
              </div>
              <span className="text-[10px] font-medium text-ink">Copy link</span>
            </button>
          </div>

          <div className="w-full bg-mist rounded-xl p-3 flex items-center justify-between">
            <div className="text-sm font-medium text-deep font-mono truncate mr-3">{url}</div>
            <a href={qrImageUrl} download={`vessa-qr-${referralCode}.png`} className="text-xs font-semibold uppercase tracking-wider text-blue hover:text-deep shrink-0">
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
