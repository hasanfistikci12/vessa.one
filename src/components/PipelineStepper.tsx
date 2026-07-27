import { CustomerStage } from '@/lib/types';
import { STAGE_ORDER, STAGE_LABELS } from '@/lib/business/pipeline';

export function PipelineStepper({ currentStage }: { currentStage: CustomerStage }) {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 right-4 h-0.5 bg-line -z-10" />
      <div className="absolute top-4 left-4 h-0.5 bg-blue transition-all duration-500 -z-10" style={{ width: `${(currentIndex / (STAGE_ORDER.length - 1)) * 100}%` }} />
      
      <div className="flex justify-between">
        {STAGE_ORDER.map((stage, i) => {
          const isPast = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isFuture = i > currentIndex;
          
          return (
            <div key={stage} className="flex flex-col items-center group">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-3 transition-colors bg-white ${
                isPast ? 'bg-blue border-blue text-white' : 
                isCurrent ? 'border-blue text-blue' : 
                'border-line text-grey'
              }`}>
                {isPast ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"></path></svg> : <span className="text-xs font-bold">{i + 1}</span>}
              </div>
              <span className={`text-xs font-medium text-center max-w-[80px] ${isCurrent ? 'text-deep' : 'text-grey'}`}>
                {STAGE_LABELS[stage]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
