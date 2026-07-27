import { db } from '../firebase-admin';
import { RewardConfig } from '../types';

const DOC_ID = 'main';

export const DEFAULT_CONFIG: RewardConfig = {
  standard: 200,
  surgical: 400,
  conversionRate: 0.03
};

export async function getRewardConfig(): Promise<RewardConfig> {
  if (!db) return DEFAULT_CONFIG;
  const doc = await db.collection('config').doc(DOC_ID).get();
  if (!doc.exists) {
    return DEFAULT_CONFIG;
  }
  return doc.data() as RewardConfig;
}

export async function updateRewardConfig(config: RewardConfig): Promise<void> {
  if (!db) return;
  await db.collection('config').doc(DOC_ID).set(config);
}
