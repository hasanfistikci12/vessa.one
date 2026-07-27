import { canAdvanceStage, getNextStage, lockRewardOnComplete } from '../pipeline';
import { Customer, RewardConfig } from '../../types';

describe('Pipeline Business Logic', () => {
  const mockConfig: RewardConfig = { standard: 200, surgical: 400, conversionRate: 0.03 };

  it('advances stages in order', () => {
    expect(getNextStage('lead')).toBe('contacted');
    expect(getNextStage('contacted')).toBe('trip_pending');
    expect(getNextStage('payment_pending')).toBe('completed');
    expect(getNextStage('completed')).toBeNull();
  });

  it('checks if can advance', () => {
    expect(canAdvanceStage('lead')).toBe(true);
    expect(canAdvanceStage('completed')).toBe(false);
  });

  it('locks reward on complete based on tier or interest', () => {
    const c1: Partial<Customer> = { rewardTier: 'surgical', interestedIn: 'hair_transplant', rewardAmount: null };
    expect(lockRewardOnComplete(c1 as Customer, mockConfig)).toBe(400);

    const c2: Partial<Customer> = { rewardTier: null, interestedIn: 'hair_transplant', rewardAmount: null };
    expect(lockRewardOnComplete(c2 as Customer, mockConfig)).toBe(200);
    
    const c3: Partial<Customer> = { rewardAmount: 300 };
    expect(lockRewardOnComplete(c3 as Customer, mockConfig)).toBe(300);
  });
});
