'use client';
import { useState, useMemo } from 'react';
import { Customer, CustomerStage } from '@/lib/types';
import { Search, Building2, Users, Clock, AlertCircle, ChevronDown, Stethoscope } from 'lucide-react';
import { CustomerTimelineDrawer } from './CustomerTimelineDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { updateCustomerAction } from '@/app/actions/customers';

type EnrichedCustomer = Customer & {
  partnerName: string;
  partnerType: string;
};

type FilterTab = 'all' | 'new_leads' | 'in_communication' | 'pending' | 'completed' | 'expired';

const STAGE_LABELS: Record<CustomerStage, string> = {
  lead: 'Lead',
  contacted: 'Contacted',
  trip_pending: 'Trip Pending',
  payment_pending: 'Payment Pending',
  completed: 'Completed',
};

const STAGE_COLORS: Record<CustomerStage, string> = {
  lead: 'bg-grey/20 text-deep',
  contacted: 'bg-blue/20 text-blue',
  trip_pending: 'bg-gold/20 text-gold',
  payment_pending: 'bg-gold/20 text-gold',
  completed: 'bg-green/20 text-green',
};

const FIFTEEN_DAYS = 15 * 24 * 60 * 60 * 1000;

export function LeaderAllCustomers({ initialCustomers }: { initialCustomers: EnrichedCustomer[] }) {
  const [customers, setCustomers] = useState<EnrichedCustomer[]>(initialCustomers);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  // State to handle which customer dropdown is open
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const tabs: { id: FilterTab, label: string }[] = [
    { id: 'all', label: 'All Clients' },
    { id: 'new_leads', label: 'New Leads' },
    { id: 'in_communication', label: 'In Comm.' },
    { id: 'pending', label: 'Pending Action' },
    { id: 'completed', label: 'Completed' },
    { id: 'expired', label: 'Expired / Stale' },
  ];

  const filteredCustomers = useMemo(() => {
    const now = Date.now();
    let filtered = customers;

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(c => 
        (c.fullName || '').toLowerCase().includes(s) || 
        c.partnerName.toLowerCase().includes(s)
      );
    }

    filtered = filtered.filter(c => {
      const isStale = (now - c.updatedAt) > FIFTEEN_DAYS;

      switch (activeTab) {
        case 'new_leads':
          return c.stage === 'lead' && !isStale;
        case 'in_communication':
          return c.stage === 'contacted' && !isStale;
        case 'pending':
          return c.stage === 'trip_pending' || c.stage === 'payment_pending';
        case 'completed':
          return c.stage === 'completed';
        case 'expired':
          return (c.stage === 'lead' || c.stage === 'contacted') && isStale;
        default:
          return true;
      }
    });

    return filtered.sort((a, b) => b.updatedAt - a.updatedAt);
  }, [customers, search, activeTab]);

  const handleStageChange = async (customerId: string, newStage: CustomerStage) => {
    // Optimistic UI update
    setCustomers(prev => prev.map(c => 
      c.id === customerId 
        ? { 
            ...c, 
            stage: newStage, 
            updatedAt: Date.now(),
            timeline: [...c.timeline, { stage: newStage, changedAt: Date.now(), changedBy: 'leader' }]
          } 
        : c
    ));
    setOpenDropdownId(null);
    
    // Attempt DB update
    try {
      await updateCustomerAction(customerId, { stage: newStage });
    } catch (err) {
      console.error('Failed to update status', err);
      // Ideally revert state on fail
    }
  };

  return (
    <div className="p-4 md:p-8 flex flex-col h-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-deep mb-2">Global Client Network</h1>
          <p className="text-grey font-medium">Monitor and manage all referral pipelines across your partners.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-grey" size={18} />
          <input 
            type="text" 
            placeholder="Search clients or partners..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-line rounded-2xl py-3 pl-11 pr-4 text-sm text-deep focus:outline-none focus:border-blue shadow-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-deep text-white shadow-md' 
                : 'bg-white text-grey hover:bg-mist border border-line'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-20">
        <AnimatePresence>
          {filteredCustomers.map(customer => {
            const now = Date.now();
            const isStale = (now - customer.updatedAt) > FIFTEEN_DAYS && (customer.stage === 'lead' || customer.stage === 'contacted');

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={customer.id}
                className="bg-white rounded-3xl border border-line p-5 shadow-sm hover:shadow-lg transition-all flex flex-col group relative"
              >
                {/* Partner Badge */}
                <div className="absolute top-0 right-0 bg-mist px-3 py-1.5 rounded-bl-xl rounded-tr-3xl text-[10px] font-bold text-grey flex items-center gap-1.5 border-b border-l border-line">
                  <Building2 size={12} />
                  {customer.partnerName}
                </div>

                <div className="flex items-start gap-4 mt-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-white text-lg shrink-0 shadow-sm ${
                    customer.stage === 'lead' ? 'bg-grey' : 
                    customer.stage === 'consultation' ? 'bg-gold' : 
                    customer.stage === 'completed' ? 'bg-green' : 'bg-blue'
                  }`}>
                    {(customer.fullName || 'U').charAt(0)}
                  </div>
                  
                  <div className="flex-1 cursor-pointer" onClick={() => setSelectedCustomer(customer)}>
                    <h3 className="font-serif text-xl text-deep group-hover:text-blue transition-colors">
                      {customer.fullName || 'Unknown Client'}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-sky text-xs bg-sky/10 px-2 py-0.5 rounded-full">
                        <Stethoscope size={12} />
                        <span className="capitalize">{customer.interestedIn?.replace('_', ' ') || 'Consultation'}</span>
                      </div>
                      {customer.price && (
                        <div className="flex items-center gap-1 text-green text-xs bg-green/10 px-2 py-0.5 rounded-full font-semibold">
                          ${customer.price.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-line/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-grey tracking-widest mb-1">Last Update</span>
                    <span className="text-sm text-deep font-medium flex items-center gap-1.5">
                      <Clock size={14} className={isStale ? 'text-red-400' : 'text-blue'} />
                      {new Date(customer.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Inline Status Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setOpenDropdownId(openDropdownId === customer.id ? null : customer.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${STAGE_COLORS[customer.stage]} ${isStale ? 'ring-2 ring-red-400/50 bg-red-50 text-red-600' : 'hover:opacity-80'}`}
                    >
                      {isStale && <AlertCircle size={12} />}
                      {isStale ? 'EXPIRED' : STAGE_LABELS[customer.stage]}
                      <ChevronDown size={14} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {openDropdownId === customer.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 bottom-full mb-2 w-48 bg-white border border-line rounded-xl shadow-xl z-20 overflow-hidden"
                        >
                          {(Object.keys(STAGE_LABELS) as CustomerStage[]).map(stage => (
                            <button
                              key={stage}
                              onClick={() => handleStageChange(customer.id, stage)}
                              className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-mist transition-colors ${customer.stage === stage ? 'text-blue bg-blue/5' : 'text-deep'}`}
                            >
                              {STAGE_LABELS[stage]}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Stale Warning Banner */}
                {isStale && (
                  <div className="mt-4 bg-red-50 text-red-600 text-xs p-2 rounded-lg font-medium flex items-center gap-2">
                    <AlertCircle size={14} />
                    Client inactive for 15+ days. Action required.
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {filteredCustomers.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-mist rounded-full flex items-center justify-center text-grey mb-4">
              <Users size={32} />
            </div>
            <h3 className="font-serif text-xl text-deep mb-2">No Clients Found</h3>
            <p className="text-grey max-w-sm">No clients match the current filters. Adjust your search or change the active tab.</p>
          </div>
        )}
      </div>

      <CustomerTimelineDrawer 
        customer={selectedCustomer} 
        onClose={() => setSelectedCustomer(null)} 
      />
      
      {/* Click outside handler for dropdowns */}
      {openDropdownId && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)}></div>
      )}
    </div>
  );
}
