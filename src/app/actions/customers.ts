'use server';

import { updateCustomer } from '@/lib/db/customers';
import { Customer } from '@/lib/types';

export async function updateCustomerAction(id: string, updates: Partial<Customer>) {
  await updateCustomer(id, updates);
}
