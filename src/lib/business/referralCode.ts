import { getPartnerByReferralCode } from '../db/partners';

export async function generateReferralCode(businessName: string): Promise<string> {
  let slug = businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  
  if (!slug) slug = 'partner';
  if (slug.length > 15) slug = slug.substring(0, 15);

  let isUnique = false;
  let code = '';
  
  while (!isUnique) {
    const randomHex = Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
    code = `${slug}-${randomHex}`;
    const existing = await getPartnerByReferralCode(code);
    if (!existing) {
      isUnique = true;
    }
  }
  
  return code;
}
