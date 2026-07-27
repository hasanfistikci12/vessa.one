import Link from 'next/link';
import { Customer } from '@/lib/types';
import { STAGE_ORDER, STAGE_LABELS } from '@/lib/business/pipeline';

export function CustomerBoard({ customers }: { customers: Customer[] }) {
  return (
    <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 h-full snap-x">
      {STAGE_ORDER.map(stage => {
        const stageCustomers = customers.filter(c => c.stage === stage);
        return (
          <div key={stage} className="flex-shrink-0 w-72 md:w-80 flex flex-col snap-center">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-ink">{STAGE_LABELS[stage]}</h3>
              <span className="bg-mist text-grey text-xs font-semibold px-2 py-0.5 rounded-full">{stageCustomers.length}</span>
            </div>
            
            <div className="flex-1 bg-mist/50 border border-line border-dashed rounded-xl p-3 flex flex-col gap-3 min-h-[200px]">
              {stageCustomers.map(customer => (
                <Link href={`/dashboard/customer/${customer.id}`} key={customer.id} className="bg-white p-4 rounded-lg shadow-sm border border-line block hover:border-blue transition-colors">
                  <div className="font-medium text-deep mb-1">{customer.fullName || 'Unknown Client'}</div>
                  {customer.interestedIn && (
                    <div className="text-xs text-grey capitalize bg-mist inline-block px-2 py-1 rounded">
                      {customer.interestedIn.replace('_', ' ')}
                    </div>
                  )}
                  <div className="text-[10px] text-grey mt-3 text-right">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </div>
                </Link>
              ))}
              {stageCustomers.length === 0 && (
                <div className="m-auto text-sm text-grey text-center py-8">
                  No customers yet
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
