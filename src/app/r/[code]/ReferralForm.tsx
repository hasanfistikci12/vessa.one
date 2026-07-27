'use client';
import { useState } from 'react';

export function ReferralForm({ partnerId }: { partnerId: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedIn: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, partnerId }),
      });
      
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-blue/10 text-blue rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"></path></svg>
        </div>
        <h2 className="font-serif text-2xl text-deep mb-2">Request Received</h2>
        <p className="text-grey">Our medical concierge team will reach out to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-ink mb-2">Full Name</label>
        <input 
          required 
          type="text" 
          value={formData.name}
          onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
          className="w-full p-3.5 border border-line rounded-xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Email</label>
          <input 
            required 
            type="email" 
            value={formData.email}
            onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
            className="w-full p-3.5 border border-line rounded-xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Phone</label>
          <input 
            required 
            type="tel" 
            value={formData.phone}
            onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))}
            className="w-full p-3.5 border border-line rounded-xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-ink mb-2">Interested In</label>
        <select 
          required 
          value={formData.interestedIn}
          onChange={e => setFormData(d => ({ ...d, interestedIn: e.target.value }))}
          className="w-full p-3.5 border border-line rounded-xl bg-white focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
        >
          <option value="" disabled>Select a procedure</option>
          <option value="hair_transplant">Hair Transplant</option>
          <option value="rhinoplasty">Rhinoplasty</option>
          <option value="bbl">BBL</option>
          <option value="tummy_tuck">Tummy Tuck</option>
          <option value="mommy_makeover">Mommy Makeover</option>
          <option value="dentistry">Cosmetic Dentistry</option>
          <option value="other">Other</option>
        </select>
      </div>

      {status === 'error' && (
        <div className="text-red-500 text-sm">Something went wrong. Please try again.</div>
      )}

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full bg-deep text-white font-medium py-4 rounded-xl hover:bg-blue transition-colors disabled:opacity-70 mt-4"
      >
        {status === 'loading' ? 'Submitting...' : 'Request Consultation'}
      </button>
    </form>
  );
}
