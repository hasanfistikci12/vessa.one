import { deriveRewardTier, computeEarned, computePending, computeProjection } from '../earnings';
import { Customer, RewardConfig } from '../../types';

describe('Earnings Business Logic', () => {
  const mockConfig: RewardConfig = { standard: 200, surgical: 400, conversionRate: 0.03 };

  it('derives reward tier correctly', () => {
    expect(deriveRewardTier('hair_transplant')).toBe('standard');
    expect(deriveRewardTier('bbl')).toBe('surgical');
    expect(deriveRewardTier(null)).toBe('surgical'); // fallback
  });

  it('computes earned correctly', () => {
    const customers: Partial<Customer>[] = [
      { stage: 'completed', rewardAmount: 200 },
      { stage: 'completed', rewardAmount: 400 },
      { stage: 'trip_pending', rewardAmount: null },
    ];
    expect(computeEarned(customers as Customer[])).toBe(600);
  });

  it('computes pending correctly', () => {
    const customers: Partial<Customer>[] = [
      { stage: 'contacted', rewardTier: null, interestedIn: 'hair_transplant' }, // 200
      { stage: 'trip_pending', rewardTier: 'surgical', interestedIn: 'hair_transplant' }, // 400 (override)
      { stage: 'lead', rewardTier: null, interestedIn: 'bbl' }, // 0 (leads don't count)
    ];
    expect(computePending(customers as Customer[], mockConfig)).toBe(600);
  });

  it('computes projections correctly', () => {
    const proj = computeProjection('20-50', mockConfig); 
    // midpoint 35, * 0.03 = 1.05 referrals/mo
    // 1.05 * 12 = 12.6 referrals/yr
    // annualLowRaw = 12.6 * 200 * 0.8 = 2016 -> Math.round(2016/50)*50 = 2000
    // annualHighRaw = 12.6 * 400 * 1.0 = 5040 -> Math.round(5040/50)*50 = 5050
    expect(proj.annualLow).toBe(2000);
    expect(proj.annualHigh).toBe(5050);
  });
});
