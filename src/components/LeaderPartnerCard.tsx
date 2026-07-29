import Link from 'next/link';
import { Partner, BusinessType } from '@/lib/types';

type EnrichedPartner = Partner & {
  stats: {
    totalCustomers: number;
    activeJourneys: number;
    totalEarned: number;
  };
};

const TYPE_ICONS: Record<BusinessType, React.ReactNode> = {
  salon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
  ),
  barbershop: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
  ),
  medspa: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
  ),
  nail_lash: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
  ),
  coach: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>
  ),
  other: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  )
};

const TYPE_GRADIENTS: Record<BusinessType, string> = {
  salon: 'from-pink-500/20 to-rose-500/20 text-rose-600',
  barbershop: 'from-blue-500/20 to-cyan-500/20 text-blue-600',
  medspa: 'from-emerald-500/20 to-teal-500/20 text-teal-600',
  nail_lash: 'from-purple-500/20 to-fuchsia-500/20 text-purple-600',
  coach: 'from-amber-500/20 to-orange-500/20 text-orange-600',
  other: 'from-gray-500/20 to-slate-500/20 text-slate-600'
};

const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700 border-green-200',
  pending_verification: 'bg-amber-100 text-amber-700 border-amber-200',
  paused: 'bg-gray-100 text-gray-700 border-gray-200',
};

export function LeaderPartnerCard({ partner }: { partner: EnrichedPartner }) {
  const gradient = TYPE_GRADIENTS[partner.businessType] || TYPE_GRADIENTS.other;
  const icon = TYPE_ICONS[partner.businessType] || TYPE_ICONS.other;
  const statusColor = STATUS_COLORS[partner.status] || STATUS_COLORS.paused;
  const formattedStatus = partner.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <Link 
      href={`/leader/${partner.id}`}
      className="group block bg-white rounded-3xl p-5 border border-line shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4">
        <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${statusColor}`}>
          {formattedStatus}
        </div>
      </div>

      <div className="flex items-start gap-4 mb-5 mt-1">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-serif text-lg text-deep font-semibold truncate pr-20">{partner.businessName}</h3>
          <p className="text-sm text-grey">{partner.name} • {partner.location.city}, {partner.location.state}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-mist rounded-2xl p-3">
          <div className="text-[10px] text-grey uppercase font-semibold tracking-wider mb-1">Referrals</div>
          <div className="font-serif text-2xl text-deep">{partner.stats.totalCustomers}</div>
        </div>
        <div className="bg-mist rounded-2xl p-3">
          <div className="text-[10px] text-grey uppercase font-semibold tracking-wider mb-1">Earned</div>
          <div className="font-serif text-2xl text-deep">${partner.stats.totalEarned.toLocaleString()}</div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-4">
        <div className="text-sm font-medium text-sky">
          Code: <span className="text-deep bg-mist px-2 py-0.5 rounded ml-1">{partner.referralCode}</span>
        </div>
        <div className="text-sky opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </div>
    </Link>
  );
}
