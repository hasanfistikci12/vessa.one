'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Users, Wallet, Clock, ArrowUpRight, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Customer } from '@/lib/types';
import { STAGE_LABELS } from '@/lib/business/pipeline';
import { CustomerTimelineDrawer } from '@/components/CustomerTimelineDrawer';
import { AddCustomerModal } from '@/components/AddCustomerModal';

const chartData = [
  { name: 'Jan', referrals: 2, revenue: 100 },
  { name: 'Feb', referrals: 3, revenue: 300 },
  { name: 'Mar', referrals: 1, revenue: 400 },
  { name: 'Apr', referrals: 4, revenue: 600 },
  { name: 'May', referrals: 2, revenue: 600 },
  { name: 'Jun', referrals: 6, revenue: 1200 },
];


export default function DashboardClient({ initialCustomers }: { initialCustomers: Customer[] }) {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'Partner';
  
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const partner = {
    referralCode: 'VESSA2026',
    businessName: 'Glow & Beauty'
  };

  const totalEarned = 1200; 
  const pendingReward = 400; 
  const activeCustomers = customers.filter(c => c.stage !== 'completed').length; 

  const handleSimulateNewCustomer = () => {
    const newCustomer: Customer = {
      id: `sim_${Date.now()}`,
      partnerId: 'p1',
      fullName: 'New VIP Client',
      phone: null,
      interestedIn: 'facelift',
      rewardTier: 'surgical',
      rewardAmount: null,
      isPaid: false,
      partnerNotes: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      stage: 'lead',
      timeline: [
        { stage: 'lead', changedAt: Date.now(), changedBy: 'system' }
      ]
    };
    // Add to the top of the list
    setCustomers([newCustomer, ...customers]);
  };

  return (
    <div className="h-full flex flex-col p-2 md:p-6 lg:p-8 animate-in slide-up">
      {/* Hero Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/10 text-blue text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-blue animate-pulse-slow"></span>
            Dashboard
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-deep mb-2">
            Welcome back, <span className="italic text-blue">{userName}</span>
          </h1>
          <p className="text-grey text-lg max-w-lg">
            Here's a detailed overview of your recent referrals and overall performance.
          </p>
        </div>
        
        {/* Core CTA - Add Customer */}
        <div className="z-10">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-deep text-white rounded-full overflow-hidden shadow-xl shadow-deep/20 hover:shadow-2xl hover:shadow-deep/30 transition-all hover:scale-[1.02]"
          >
            {/* Button Glare Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
            
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center z-10">
              <Plus size={20} strokeWidth={3} />
            </div>
            <span className="font-semibold text-lg tracking-wide z-10">Add Customer</span>
          </button>
        </div>
        
        {/* Background Decorative Blur */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-sky/10 rounded-full blur-3xl pointer-events-none"></div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={48} className="text-blue" />
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-grey mb-4">
            <div className="p-2 bg-mist rounded-lg text-blue"><Wallet size={16} /></div>
            Total Earned
          </div>
          <div className="text-4xl font-serif text-deep mb-2">${totalEarned.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs font-medium text-green">
            <TrendingUp size={14} /> <span>+24% from last month</span>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock size={48} className="text-gold" />
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-grey mb-4">
            <div className="p-2 bg-mist rounded-lg text-gold"><Clock size={16} /></div>
            Pending Rewards
          </div>
          <div className="text-4xl font-serif text-deep mb-2">${pendingReward.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs font-medium text-grey">
            Expected in next 14 days
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={48} className="text-deep" />
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-grey mb-4">
            <div className="p-2 bg-mist rounded-lg text-deep"><Users size={16} /></div>
            Active Journeys
          </div>
          <div className="text-4xl font-serif text-deep mb-2">{activeCustomers}</div>
          <div className="flex items-center gap-1 text-xs font-medium text-blue">
            <ArrowUpRight size={14} /> <span>Pipeline growing</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 flex-1 min-h-[400px]">
        {/* Chart Section */}
        <div className="xl:col-span-2 glass-panel rounded-3xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl text-deep mb-1">Revenue Trend</h2>
              <p className="text-sm text-grey">Your earnings over the last 6 months</p>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E5A8A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1E5A8A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#5C6B78', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#5C6B78', fontSize: 12 }} />
                <CartesianGrid vertical={false} stroke="#EAF2F8" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(11,27,43,0.1)' }}
                  itemStyle={{ color: '#12324D', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#1E5A8A" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Pipeline */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl text-deep">Pipeline</h2>
            <div className="text-sm font-medium px-3 py-1 bg-mist rounded-full text-grey">
              {customers.length} total
            </div>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 -mr-2">
            <div className="flex flex-col gap-4">
              {customers.map((customer) => (
                <div 
                  key={customer.id} 
                  onClick={() => setSelectedCustomer(customer)}
                  className="p-4 rounded-2xl border border-line bg-white/50 hover:bg-white hover:border-blue transition-all cursor-pointer group shadow-sm hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-ink group-hover:text-blue transition-colors">
                      {customer.fullName}
                    </div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      customer.stage === 'completed' ? 'bg-green/10 text-green' :
                      customer.stage === 'lead' ? 'bg-grey/10 text-grey' :
                      'bg-blue/10 text-blue'
                    }`}>
                      {STAGE_LABELS[customer.stage]}
                    </div>
                  </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-xs text-grey capitalize flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky"></span>
                          {customer.interestedIn?.replace('_', ' ')}
                        </div>
                        {customer.price && (
                          <div className="text-[10px] text-green font-semibold bg-green/10 px-2 py-0.5 rounded-full">
                            ${customer.price.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="text-[10px] text-grey">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      <AddCustomerModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        referralCode={partner.referralCode}
        onCustomerAdded={handleSimulateNewCustomer}
      />
      
      <CustomerTimelineDrawer 
        customer={selectedCustomer} 
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}
