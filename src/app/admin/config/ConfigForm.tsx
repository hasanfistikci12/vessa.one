'use client';
import { useState } from 'react';
import { RewardConfig } from '@/lib/types';
import { useRouter } from 'next/navigation';

export function ConfigForm({ initialConfig }: { initialConfig: RewardConfig }) {
  const router = useRouter();
  const [config, setConfig] = useState(initialConfig);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error();
      alert('Configuration saved.');
      router.refresh();
    } catch {
      alert('Failed to save config.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-ink mb-2">Standard Reward Amount ($)</label>
        <input 
          type="number" 
          value={config.standard}
          onChange={e => setConfig(c => ({ ...c, standard: parseInt(e.target.value) || 0 }))}
          className="w-full p-3 border border-line rounded-xl focus:outline-none focus:border-blue"
        />
        <p className="text-xs text-grey mt-1">Applies to Hair Transplants, Dentistry, etc.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">Surgical Reward Amount ($)</label>
        <input 
          type="number" 
          value={config.surgical}
          onChange={e => setConfig(c => ({ ...c, surgical: parseInt(e.target.value) || 0 }))}
          className="w-full p-3 border border-line rounded-xl focus:outline-none focus:border-blue"
        />
        <p className="text-xs text-grey mt-1">Applies to BBL, Tummy Tuck, Rhinoplasty, etc.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">Projected Conversion Rate</label>
        <input 
          type="number" 
          step="0.01"
          value={config.conversionRate}
          onChange={e => setConfig(c => ({ ...c, conversionRate: parseFloat(e.target.value) || 0 }))}
          className="w-full p-3 border border-line rounded-xl focus:outline-none focus:border-blue"
        />
        <p className="text-xs text-grey mt-1">Used to estimate earnings during Partner onboarding.</p>
      </div>

      <button 
        type="submit" 
        disabled={isSaving}
        className="w-full bg-deep text-white py-3 rounded-xl font-medium mt-4 hover:bg-blue transition-colors disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : 'Save Configuration'}
      </button>
    </form>
  );
}
