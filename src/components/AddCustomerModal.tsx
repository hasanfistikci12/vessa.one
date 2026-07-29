'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Users, Link as LinkIcon, PartyPopper, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

type AddCustomerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCustomerAdded: (customerName?: string) => void;
  referralCode: string;
};

// Generate a random 5-character alphanumeric string
const generateUniqueSessionId = () => {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
};

export function AddCustomerModal({ isOpen, onClose, onCustomerAdded, referralCode }: AddCustomerModalProps) {
  const [copied, setCopied] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [uniqueLinkId, setUniqueLinkId] = useState('');

  // Generate a new unique ID every time the modal opens
  useEffect(() => {
    if (isOpen) {
      setUniqueLinkId(`${referralCode}-${generateUniqueSessionId()}`);
      setCopied(false);
      setShowCongrats(false);
      setWaiting(false);
      setNewCustomerName('');
    }
  }, [isOpen, referralCode]);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/r/${uniqueLinkId}`
    : `https://vessa.com/r/${uniqueLinkId}`;
    
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}`;
  const shareText = `Hi! Use this link to start your journey with Vessa.`;

  // Listen for real-time customer addition from the opened link
  useEffect(() => {
    if (!isOpen || !uniqueLinkId) return;

    const channel = new BroadcastChannel('vessa_realtime');
    
    channel.onmessage = (event) => {
      // Check if the opened link matches our currently generated unique ID
      if (event.data?.type === 'CUSTOMER_OPENED_LINK' && event.data?.linkId === uniqueLinkId) {
        const cName = event.data?.customerName || 'New Client';
        setNewCustomerName(cName);
        setShowCongrats(true);
        triggerConfetti();
        onCustomerAdded(cName);
        
        setTimeout(() => {
          setShowCongrats(false);
          setCopied(false);
          setWaiting(false);
          onClose();
        }, 5000); // give them 5 seconds to enjoy the confetti
      }
    };

    return () => {
      channel.close();
    };
  }, [isOpen, uniqueLinkId, onCustomerAdded, onClose]);

  const triggerConfetti = () => {
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 65, origin: { x: 0 }, colors: ['#1E5A8A', '#5FA8D3', '#E6C875'] });
      confetti({ particleCount: 6, angle: 120, spread: 65, origin: { x: 1 }, colors: ['#1E5A8A', '#5FA8D3', '#E6C875'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setWaiting(true);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleShareClick = () => {
    setWaiting(true);
  };

  const resetStateAndClose = () => {
    setShowCongrats(false);
    setCopied(false);
    setWaiting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetStateAndClose}
            className="fixed inset-0 bg-ink/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[32px] w-full max-w-sm shadow-2xl overflow-hidden relative"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky/20 rounded-full blur-3xl pointer-events-none"></div>

              <button 
                onClick={resetStateAndClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-mist hover:bg-line/50 transition-colors text-grey hover:text-deep z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 pb-6">
                <AnimatePresence mode="wait">
                  {!showCongrats ? (
                    <motion.div
                      key="add-form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col items-center"
                    >
                      <h2 className="font-serif text-3xl text-deep mb-2 text-center">Add Customer</h2>
                      
                      {waiting ? (
                        <div className="flex flex-col items-center py-4">
                          <div className="w-16 h-16 rounded-full bg-mist text-blue flex items-center justify-center mb-4 border border-line">
                            <Clock className="animate-spin-slow" size={24} />
                          </div>
                          <p className="text-deep font-medium text-center">Waiting for client...</p>
                          <p className="text-grey text-xs text-center mt-1">Keep this screen open. The magic will happen when they scan or open the link!</p>
                        </div>
                      ) : (
                        <>
                          <p className="text-grey text-center text-sm mb-6">
                            Scan the QR or share your link. Once registered, they appear in your pipeline.
                          </p>

                          {/* QR Code */}
                          <div className="bg-mist p-2 rounded-2xl mb-6 shadow-sm border border-line/50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={qrImageUrl} alt="QR Code" className="w-48 h-48 rounded-xl object-contain bg-white" />
                          </div>
                        </>
                      )}
                      
                      {/* Share Buttons */}
                      <div className="grid grid-cols-4 gap-3 w-full mb-6 relative z-10">
                        <a onClick={handleShareClick} href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                          <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/></svg>
                          </div>
                          <span className="text-[10px] font-medium text-ink">WhatsApp</span>
                        </a>
                        
                        <a onClick={handleShareClick} href={`sms:?body=${encodeURIComponent(shareText + ' ' + shareUrl)}`} className="flex flex-col items-center gap-2 group">
                          <div className="w-12 h-12 rounded-full bg-mist text-blue flex items-center justify-center group-hover:bg-blue/10 transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                          </div>
                          <span className="text-[10px] font-medium text-ink">SMS</span>
                        </a>
                        
                        <a onClick={handleShareClick} href={`mailto:?subject=${encodeURIComponent('Vessa Aesthetic Journeys')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`} className="flex flex-col items-center gap-2 group">
                          <div className="w-12 h-12 rounded-full bg-mist text-blue flex items-center justify-center group-hover:bg-blue/10 transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                          </div>
                          <span className="text-[10px] font-medium text-ink">Email</span>
                        </a>
                        
                        <button onClick={handleCopy} className="flex flex-col items-center gap-2 group relative">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${copied ? 'bg-green text-white' : 'bg-mist text-blue group-hover:bg-blue/10'}`}>
                            {copied ? <Check size={20} /> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>}
                          </div>
                          <span className="text-[10px] font-medium text-ink">{copied ? 'Copied!' : 'Copy link'}</span>
                        </button>
                      </div>

                      {!waiting && (
                        <div className="w-full bg-mist rounded-xl p-3 flex items-center justify-between border border-line/50 relative z-10">
                          <div className="text-xs font-medium text-deep font-mono truncate mr-3">{shareUrl.replace(/^https?:\/\//, '')}</div>
                          <a href={qrImageUrl} download={`vessa-qr-${uniqueLinkId}.png`} className="text-[10px] font-bold uppercase tracking-wider text-sky hover:text-blue shrink-0 bg-white px-2 py-1 rounded shadow-sm border border-line/50">
                            Save QR
                          </a>
                        </div>
                      )}

                    </motion.div>
                  ) : (
                    <motion.div
                      key="congrats"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-10"
                    >
                      <div className="w-24 h-24 rounded-full bg-green/10 flex items-center justify-center text-green mb-6 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-green/30 animate-ping"></div>
                        <PartyPopper size={40} />
                      </div>
                      <h2 className="font-serif text-4xl text-deep mb-2 text-center">Incredible!</h2>
                      <p className="text-deep font-medium text-lg text-center mb-2">
                        {newCustomerName} just joined your pipeline!
                      </p>
                      <p className="text-grey text-center text-sm">
                        You can now track their journey on your dashboard.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
