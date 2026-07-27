'use client';
import { useState } from 'react';
import { Customer, CustomerStage, RewardConfig, RewardTier } from '@/lib/types';
import { STAGE_LABELS } from '@/lib/business/pipeline';
import { deriveRewardTier } from '@/lib/business/earnings';
import { useRouter } from 'next/navigation';

export function AdminCustomerControls({ customer, stages, config }: { customer: Customer, stages: CustomerStage[], config: RewardConfig }) {
  const router = useRouter();
  const [stage, setStage] = useState(customer.stage);
  const [tier, setTier] = useState<RewardTier>(customer.rewardTier || deriveRewardTier(customer.interestedIn));
  const [isPaid, setIsPaid] = useState(customer.isPaid);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const rewardAmount = stage === 'completed' ? (tier === 'standard' ? config.standard : config.surgical) : null;
      
      const res = await fetch(`/api/admin/customer/${customer.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage, rewardTier: tier, rewardAmount, isPaid }),
      });
      
      if (!res.ok) throw new Error();
      alert('Saved successfully.');
      router.refresh();
    } catch {
      alert('Error saving.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-line shadow-sm max-w-2xl">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Stage</label>
          <select 
            value={stage}
            onChange={e => setStage(e.target.value as CustomerStage)}
            className="w-full p-3 border border-line rounded-xl focus:outline-none focus:border-blue bg-white"
          >
            {stages.map(s => (
              <option key={s} value={s}>{STAGE_LABELS[s]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Reward Tier Override</label>
          <select 
            value={tier}
            onChange={e => setTier(e.target.value as RewardTier)}
            className="w-full p-3 border border-line rounded-xl focus:outline-none focus:border-blue bg-white"
          >
            <option value="standard">Standard (${config.standard})</option>
            <option value="surgical">Surgical (${config.surgical})</option>
          </select>
          <p className="text-xs text-grey mt-1">If the customer completes the journey, this tier will be locked in.</p>
        </div>
        
        {stage === 'completed' && (
          <div>
            <label className="flex items-center gap-3 p-4 border border-line rounded-xl cursor-pointer hover:bg-mist transition-colors">
              <input 
                type="checkbox" 
                checked={isPaid}
                onChange={e => setIsPaid(e.target.checked)}
                className="w-5 h-5 accent-blue"
              />
              <span className="font-medium text-ink">Mark as Paid</span>
            </label>
            <p className="text-xs text-grey mt-1">Checking this will remove the reward from the partner's pending balance and add it to paid.</p>
          </div>
        )}

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-deep text-white py-3 rounded-xl font-medium mt-4 hover:bg-blue transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
