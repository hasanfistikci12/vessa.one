'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FinalizeOnboarding() {
  const router = useRouter();

  useEffect(() => {
    const finalize = async () => {
      const dataStr = localStorage.getItem('vessa_onboarding');
      if (!dataStr) {
        router.push('/dashboard'); // fallback
        return;
      }
      
      const data = JSON.parse(dataStr);
      await fetch('/api/partner/create', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      localStorage.removeItem('vessa_onboarding');
      
      // Force a reload to refresh the session token from NextAuth
      window.location.href = '/dashboard';
    };
    
    finalize();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <div className="w-8 h-8 border-4 border-mist border-t-blue rounded-full animate-spin"></div>
    </div>
  );
}
