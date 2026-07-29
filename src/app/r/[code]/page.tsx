'use client';

import { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReferralLandingPage({ params }: { params: { code: string } }) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    // When this page opens, simulate that the customer opened the link
    // and broadcast it back to the partner's dashboard in real-time
    const channel = new BroadcastChannel('vessa_realtime');
    
    // Simulate a slight delay to mimic reading the page before accepting
    const timer = setTimeout(() => {
      channel.postMessage({ 
        type: 'CUSTOMER_OPENED_LINK',
        linkId: params.code,
        customerName: 'Aesthetic VIP Client'
      });
      setTriggered(true);
      
      // Fire confetti for the client as well
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1E5A8A', '#5FA8D3', '#E6C875']
      });

    }, 1500);

    return () => {
      clearTimeout(timer);
      channel.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky/20 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue/10 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[32px] shadow-2xl border border-line/50 max-w-md w-full text-center relative z-10">
        
        {triggered ? (
          <div className="animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green/10 text-green rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="font-serif text-3xl text-deep mb-3">You're Connected!</h1>
            <p className="text-grey mb-8">
              Your partner has been notified instantly. They are adding you to the Vessa priority list.
            </p>
            <button className="w-full bg-deep text-white py-4 rounded-full font-medium hover:bg-blue transition-colors">
              Continue to Consultation
            </button>
          </div>
        ) : (
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles size={40} />
            </div>
            <h1 className="font-serif text-3xl text-deep mb-3">Welcome to Vessa</h1>
            <p className="text-grey mb-8">
              You were referred by partner <span className="font-bold text-ink">{params.code}</span>. Setting up your VIP access...
            </p>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-blue rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
