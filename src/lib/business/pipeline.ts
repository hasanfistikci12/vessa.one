import { Customer, CustomerStage, RewardConfig } from '../types';
import { deriveRewardTier } from './earnings';

export const STAGE_ORDER: CustomerStage[] = [
  'lead',
  'contacted',
  'trip_pending',
  'payment_pending',
  'completed'
];

export const STAGE_LABELS: Record<CustomerStage, string> = {
  'lead': 'Referred',
  'contacted': 'In conversation',
  'trip_pending': 'Arranging travel',
  'payment_pending': 'Finalizing',
  'completed': 'Completed — reward earned'
};

export function canAdvanceStage(currentStage: CustomerStage): boolean {
  return currentStage !== 'completed';
}

export function getNextStage(currentStage: CustomerStage): CustomerStage | null {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);
  if (currentIndex === -1 || currentIndex === STAGE_ORDER.length - 1) {
    return null;
  }
  return STAGE_ORDER[currentIndex + 1];
}

export function lockRewardOnComplete(customer: Customer, config: RewardConfig): number {
  if (customer.rewardAmount !== null) {
    return customer.rewardAmount;
  }
  const tier = customer.rewardTier || deriveRewardTier(customer.interestedIn);
  return tier === 'standard' ? config.standard : config.surgical;
}
