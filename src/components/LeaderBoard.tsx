'use client';
import { useState, useMemo } from 'react';
import { Partner, BusinessType, Customer } from '@/lib/types';
import { PartnerDrawer } from './PartnerDrawer';
import { AddPartnerModal } from './AddPartnerModal';
import { CustomerTimelineDrawer } from './CustomerTimelineDrawer';
import { Search, Building2, TrendingUp, Users, DollarSign, Activity, ChevronRight, UserPlus } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

type EnrichedPartner = Partner & {
  customers: Customer[];
  stats: {
    totalCustomers: number;
    activeJourneys: number;
    totalEarned: number;
  };
};

const networkData = [
  { name: 'W1', value: 20 },
  { name: 'W2', value: 35 },
  { name: 'W3', value: 28 },
  { name: 'W4', value: 50 },
  { name: 'W5', value: 45 },
  { name: 'W6', value: 75 },
];

export function LeaderBoard({ partners: initialPartners }: { partners: EnrichedPartner[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<BusinessType | 'all'>('all');
  const [selectedPartner, setSelectedPartner] = useState<EnrichedPartner | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [partners, setPartners] = useState<EnrichedPartner[]>(initialPartners);

  const categories: { id: BusinessType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Partners' },
    { id: 'salon', label: 'Salon' },
    { id: 'barbershop', label: 'Barbershop' },
    { id: 'medspa', label: 'MedSpa' },
    { id: 'nail_lash', label: 'Lash & Brow' },
    { id: 'coach', label: 'Coach' },
    { id: 'other', label: 'Other' },
  ];

  const filteredPartners = useMemo(() => {
    return partners.filter(p => {
      const matchSearch = p.businessName.toLowerCase().includes(search.toLowerCase()) || 
                          p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.email.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'all' || p.businessType === category;
      return matchSearch && matchCat;
    });
  }, [partners, search, category]);

  const totalPartners = partners.length;
  const totalCustomers = partners.reduce((sum, p) => sum + p.stats.totalCustomers, 0);
  const totalRevenue = partners.reduce((sum, p) => sum + p.stats.totalEarned, 0);

  const handleSimulateNewPartner = (email: string) => {
    const newPartner: EnrichedPartner = {
      id: `sim_${Date.now()}`,
      googleId: `sim_google_${Date.now()}`,
      email,
      name: email.split('@')[0],
      businessName: 'New Partner',
      businessType: 'other',
      location: { city: 'Pending', state: 'US', country: 'US' },
      estimatedMonthlyClients: '1-20',
      referralCode: 'PENDING',
      status: 'pending_verification',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      customers: [],
      stats: {
        totalCustomers: 0,
        activeJourneys: 0,
        totalEarned: 0
      }
    };
    setPartners([newPartner, ...partners]);
  };

  return (
    <div className="flex flex-col min-h-full pb-8 bg-paper">
      
      {/* Header & KPI Summary */}
      <div className="bg-gradient-to-br from-deep to-ink text-white px-6 md:px-10 py-10 rounded-b-[40px] relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue/20 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-sky animate-pulse-slow"></span>
              Admin Network
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mb-2 text-white">Leader Board</h1>
            <p className="text-white/70 max-w-md">Oversee the entire Vessa partner ecosystem. Track growth, analyze revenue, and manage partnerships.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-end gap-4">
            {/* Core CTA - Add Partner */}
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 bg-white text-deep rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] border border-transparent"
            >
              <div className="w-8 h-8 rounded-full bg-blue/10 flex items-center justify-center z-10 text-blue group-hover:bg-blue group-hover:text-white transition-colors">
                <UserPlus size={18} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-sm tracking-wide z-10">Add Partner</span>
            </button>

            {/* Mini Network Chart */}
            <div className="w-full md:w-48 h-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex flex-col hidden lg:flex">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-1">Network Growth</div>
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={networkData}>
                    <Area type="monotone" dataKey="value" stroke="#5FA8D3" strokeWidth={2} fillOpacity={0.2} fill="#5FA8D3" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue/30 flex items-center justify-center text-sky"><Building2 size={24} /></div>
            <div>
              <div className="text-white/60 text-sm font-medium">Total Partners</div>
              <div className="font-serif text-3xl text-white">{totalPartners}</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/30 flex items-center justify-center text-gold"><Users size={24} /></div>
            <div>
              <div className="text-white/60 text-sm font-medium">Total Referrals</div>
              <div className="font-serif text-3xl text-white">{totalCustomers}</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green/30 flex items-center justify-center text-green"><DollarSign size={24} /></div>
            <div>
              <div className="text-white/60 text-sm font-medium">Generated Revenue</div>
              <div className="font-serif text-3xl text-white">${totalRevenue.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Data Grid */}
      <div className="px-6 md:px-10 mt-8">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Categories */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 md:pb-0 snap-x snap-mandatory flex-1 max-w-3xl">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`snap-center shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat.id 
                    ? 'bg-deep text-white shadow-md' 
                    : 'bg-white text-grey border border-line hover:border-sky hover:text-deep shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-grey" />
            </div>
            <input 
              type="text" 
              placeholder="Search partners..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-line rounded-full text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Data Grid / Cards */}
        <div className="animate-in slide-up">
          {filteredPartners.length === 0 ? (
            <div className="text-center py-24 bg-white border border-line rounded-3xl shadow-sm">
              <div className="w-16 h-16 bg-mist rounded-full flex items-center justify-center mx-auto mb-4 text-sky">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-serif text-deep mb-2">No partners found</h3>
              <p className="text-sm text-grey">Adjust your search or filters to see results.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPartners.map(partner => (
                <div 
                  key={partner.id} 
                  onClick={() => setSelectedPartner(partner)}
                  className="bg-white rounded-[32px] p-6 shadow-sm hover:shadow-xl border border-line/50 hover:border-blue/30 transition-all cursor-pointer group relative overflow-hidden flex flex-col hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue/5 to-transparent rounded-bl-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Top Section */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-2xl shrink-0 shadow-inner group-hover:scale-105 transition-transform ${partner.status === 'pending_verification' ? 'bg-mist text-grey border border-line' : 'bg-gradient-to-br from-deep to-blue text-white'}`}>
                        {partner.businessName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-deep group-hover:text-blue transition-colors flex items-center gap-2 text-lg">
                          {partner.businessName}
                        </div>
                        <div className="text-sm text-grey font-medium">{partner.name}</div>
                      </div>
                    </div>
                    {partner.status === 'pending_verification' && (
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-gold/10 text-gold px-2 py-1 rounded-full">Pending</span>
                    )}
                  </div>

                  {/* Middle Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 relative z-10 bg-mist/50 p-4 rounded-2xl">
                    <div>
                      <div className="text-[10px] text-grey uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                        <Users size={12} /> Referrals
                      </div>
                      <div className="font-serif text-2xl text-deep">{partner.stats.totalCustomers}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-grey uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                        <DollarSign size={12} /> Revenue
                      </div>
                      <div className="font-serif text-2xl text-green">${partner.stats.totalEarned.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="mt-auto flex items-center justify-between relative z-10">
                    <div className="flex flex-col gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mist text-deep text-xs font-medium capitalize border border-line/50 w-fit">
                        <Building2 size={12} className="text-blue" />
                        {partner.businessType.replace('_', ' ')}
                      </span>
                      <div className="text-xs text-grey flex items-center gap-1">
                        <Activity size={12} /> {partner.stats.activeJourneys} active journeys
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white shadow-sm border border-line/50 transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals & Drawers */}
      <AddPartnerModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onPartnerAdded={handleSimulateNewPartner}
      />

      <PartnerDrawer 
        partner={selectedPartner} 
        onClose={() => setSelectedPartner(null)} 
        onCustomerClick={(c) => {
          setSelectedCustomer(c);
        }}
      />
      
      <CustomerTimelineDrawer 
        customer={selectedCustomer} 
        onClose={() => setSelectedCustomer(null)} 
      />
    </div>
  );
}
