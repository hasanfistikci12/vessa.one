'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building2, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { Partner } from '@/lib/types';
import { Customer } from '@/lib/types';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

type EnrichedPartner = Partner & {
  customers?: Customer[];
  stats?: {
    totalCustomers: number;
    activeJourneys: number;
    totalEarned: number;
  };
};

type PartnerDrawerProps = {
  partner: EnrichedPartner | null;
  onClose: () => void;
  onCustomerClick?: (customer: Customer) => void;
};

// Mock data for the sparkline in the drawer
const sparklineData = [
  { value: 10 }, { value: 15 }, { value: 8 }, { value: 25 }, { value: 20 }, { value: 35 }, { value: 30 }
];

export function PartnerDrawer({ partner, onClose, onCustomerClick }: PartnerDrawerProps) {
  return (
    <AnimatePresence>
      {partner && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full md:w-[480px] bg-paper shadow-2xl z-50 flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="relative p-8 bg-gradient-to-br from-deep to-ink text-white overflow-hidden shrink-0">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue/30 rounded-full blur-3xl pointer-events-none"></div>
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-serif text-2xl backdrop-blur-md">
                  {partner.businessName.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif text-2xl mb-1">{partner.businessName}</h2>
                  <div className="flex items-center gap-1.5 text-sky text-sm">
                    <MapPin size={14} />
                    {partner.location.city}, {partner.location.state}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Status</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green animate-pulse-slow"></span>
                    <span className="capitalize">{partner.status}</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Category</div>
                  <div className="capitalize flex items-center gap-2">
                    <Building2 size={16} className="text-gold" />
                    {partner.businessType.replace('_', ' ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col gap-8 pb-12">
              
              {/* Analytics Overview */}
              <div>
                <h3 className="text-sm font-semibold text-deep uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-blue" />
                  Performance Overview
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-line bg-white shadow-sm">
                    <div className="text-xs text-grey mb-1">Total Referrals</div>
                    <div className="font-serif text-2xl text-deep">{partner.stats?.totalCustomers || 0}</div>
                  </div>
                  <div className="p-4 rounded-xl border border-line bg-white shadow-sm">
                    <div className="text-xs text-grey mb-1">Revenue Gen</div>
                    <div className="font-serif text-2xl text-green">${partner.stats?.totalEarned?.toLocaleString() || 0}</div>
                  </div>
                </div>
              </div>

              {/* Referred Customers List */}
              {partner.customers && partner.customers.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold text-deep uppercase tracking-widest flex items-center gap-2">
                      <Users size={16} className="text-blue" />
                      Referred Clients
                    </h3>
                    <span className="text-xs font-medium text-grey bg-mist px-2 py-1 rounded-full">
                      {partner.customers.length} total
                    </span>
                  </div>

                  <div className="bg-white border border-line rounded-2xl shadow-sm overflow-hidden flex flex-col gap-px bg-line/50">
                    {partner.customers.map(c => (
                      <div 
                        key={c.id} 
                        onClick={() => onCustomerClick && onCustomerClick(c)}
                        className={`bg-white p-4 flex items-center justify-between hover:bg-mist/50 transition-colors ${onCustomerClick ? 'cursor-pointer group' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-white shadow-sm ${
                            c.stage === 'lead' ? 'bg-grey' : 
                            c.stage === 'consultation' ? 'bg-gold' : 
                            c.stage === 'completed' ? 'bg-green' : 'bg-blue'
                          }`}>
                            {(c.fullName || 'U').charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-deep group-hover:text-blue transition-colors">
                              {c.fullName || 'Unknown Client'}
                            </div>
                            <div className="text-xs text-grey capitalize">
                              {c.stage.replace('_', ' ')} • {new Date(c.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        {onCustomerClick && (
                          <div className="text-grey group-hover:text-blue group-hover:translate-x-1 transition-all">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Owner Info */}
              <div>
                <h3 className="text-sm font-semibold text-deep uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Users size={16} className="text-blue" />
                  Contact Information
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-line shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-grey">Primary Contact</span>
                    <span className="text-sm font-medium text-deep">{partner.name}</span>
                  </div>
                  <div className="h-px bg-line/50 w-full"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-grey">Email</span>
                    <span className="text-sm font-medium text-deep">{partner.email}</span>
                  </div>
                  <div className="h-px bg-line/50 w-full"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-grey">Referral Code</span>
                    <span className="text-xs font-bold text-blue bg-blue/10 px-2 py-1 rounded tracking-wider">
                      {partner.referralCode}
                    </span>
                  </div>
                  <div className="h-px bg-line/50 w-full"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-grey">Joined</span>
                    <span className="text-sm font-medium text-deep flex items-center gap-1.5">
                      <Calendar size={14} className="text-grey" />
                      {new Date(partner.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
