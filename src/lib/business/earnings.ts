import { Customer, InterestedIn, Partner, RewardConfig, RewardTier } from '../types';

export const CLIENT_RANGE_MIDPOINTS: Record<string, number> = {
  '1-20': 10,
  '20-50': 35,
  '50-100': 75,
  '100+': 125,
};

export function deriveRewardTier(interestedIn: InterestedIn | null): RewardTier {
  if (!interestedIn) return 'surgical'; // default conservative if unknown
  if (interestedIn === 'hair_transplant' || interestedIn === 'other') {
    return 'standard';
  }
  return 'surgical';
}

export function computeEarned(customers: Customer[]): number {
  return customers
    .filter(c => c.stage === 'completed' && c.rewardAmount != null)
    .reduce((sum, c) => sum + (c.rewardAmount || 0), 0);
}

export function computePending(customers: Customer[], config: RewardConfig): number {
  return customers
    .filter(c => ['contacted', 'trip_pending', 'payment_pending'].includes(c.stage))
    .reduce((sum, c) => {
      const tier = c.rewardTier || deriveRewardTier(c.interestedIn);
      return sum + (tier === 'standard' ? config.standard : config.surgical);
    }, 0);
}

export function computeProjection(
  clientRange: Partner['estimatedMonthlyClients'],
  config: RewardConfig
): { monthlyLow: number; monthlyHigh: number; annualLow: number; annualHigh: number } {
  const midpoint = CLIENT_RANGE_MIDPOINTS[clientRange] || 10;
  const monthlyReferrals = midpoint * config.conversionRate;
  
  const annualLowRaw = monthlyReferrals * 12 * config.standard * 0.8;
  const annualHighRaw = monthlyReferrals * 12 * config.surgical * 1.0;
  
  return {
    monthlyLow: Math.round((annualLowRaw / 12) / 50) * 50,
    monthlyHigh: Math.round((annualHighRaw / 12) / 50) * 50,
    annualLow: Math.round(annualLowRaw / 50) * 50,
    annualHigh: Math.round(annualHighRaw / 50) * 50,
  };
}
