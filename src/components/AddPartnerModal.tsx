'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, UserPlus, PartyPopper, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

type AddPartnerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onPartnerAdded: (email: string) => void;
};

export function AddPartnerModal({ isOpen, onClose, onPartnerAdded }: AddPartnerModalProps) {
  const [email, setEmail] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const [sending, setSending] = useState(false);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#1E5A8A', '#5FA8D3', '#E6C875'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#1E5A8A', '#5FA8D3', '#E6C875'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSending(true);
    
    // Simulate API call to send invite
    setTimeout(() => {
      setSending(false);
      setShowCongrats(true);
      triggerConfetti();
      onPartnerAdded(email);
      
      // Close after a few seconds
      setTimeout(() => {
        resetStateAndClose();
      }, 4000);
    }, 1500);
  };

  const resetStateAndClose = () => {
    setShowCongrats(false);
    setEmail('');
    setSending(false);
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

              <div className="p-8 pb-8">
                <AnimatePresence mode="wait">
                  {!showCongrats ? (
                    <motion.div
                      key="invite-form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-blue/10 flex items-center justify-center text-blue mb-6 border-4 border-white shadow-sm">
                        <UserPlus size={32} />
                      </div>
                      
                      <h2 className="font-serif text-3xl text-deep mb-2 text-center">Invite Partner</h2>
                      <p className="text-grey text-center text-sm mb-8">
                        Enter a valid Gmail address to grant access. They will be able to login to the partner dashboard immediately.
                      </p>

                      <form onSubmit={handleSend} className="w-full">
                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-sky" />
                          </div>
                          <input 
                            type="email" 
                            required
                            placeholder="partner@gmail.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-mist border border-line rounded-xl text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all shadow-sm text-deep"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={sending || !email}
                          className={`w-full py-4 rounded-full font-medium text-lg transition-all flex items-center justify-center gap-2 ${
                            sending || !email
                              ? 'bg-line text-grey cursor-not-allowed'
                              : 'bg-deep text-white hover:bg-blue shadow-lg shadow-blue/20 hover:scale-[1.02]'
                          }`}
                        >
                          {sending ? (
                            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Sending...</>
                          ) : (
                            <><Send size={20} /> Send Invite</>
                          )}
                        </button>
                      </form>
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
                      <h2 className="font-serif text-3xl text-deep mb-3 text-center">Invite Sent!</h2>
                      <p className="text-deep font-medium text-center mb-2">
                        {email}
                      </p>
                      <p className="text-grey text-center text-sm">
                        has been authorized. They can now login using this Gmail account.
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
