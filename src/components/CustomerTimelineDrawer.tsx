import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Circle, Clock, Stethoscope, User, Calendar, Phone, MessageSquare, Plus, Save } from 'lucide-react';
import { Customer, CustomerStage, InterestedIn, PartnerNote } from '@/lib/types';
import { STAGE_ORDER, STAGE_LABELS } from '@/lib/business/pipeline';
import { updateCustomerAction } from '@/app/actions/customers';

type CustomerTimelineDrawerProps = {
  customer: Customer | null;
  onClose: () => void;
};

const INTEREST_OPTIONS: { value: InterestedIn, label: string }[] = [
  { value: 'hair_transplant', label: 'Hair Transplant' },
  { value: 'rhinoplasty', label: 'Rhinoplasty' },
  { value: 'bbl', label: 'BBL' },
  { value: 'facelift', label: 'Facelift' },
  { value: 'breast', label: 'Breast Surgery' },
  { value: 'tummy_tuck', label: 'Tummy Tuck' },
  { value: 'other', label: 'Other' }
];

export function CustomerTimelineDrawer({ customer, onClose }: CustomerTimelineDrawerProps) {
  const [interestedIn, setInterestedIn] = useState<InterestedIn | null>(null);
  const [notes, setNotes] = useState<PartnerNote[]>([]);
  const [newNote, setNewNote] = useState('');
  
  // Sync state when customer changes
  useEffect(() => {
    if (customer) {
      setInterestedIn(customer.interestedIn);
      setNotes(customer.partnerNotes || []);
      setNewNote('');
    }
  }, [customer]);

  if (!customer) return null;

  // Find the index of the current stage
  const currentStageIndex = STAGE_ORDER.indexOf(customer.stage);

  const handleAddNote = async () => {
    if (!newNote.trim() || !customer) return;
    const note: PartnerNote = {
      text: newNote.trim(),
      createdAt: Date.now()
    };
    const newNotes = [...notes, note];
    setNotes(newNotes);
    setNewNote('');
    
    // Attempt DB update
    try {
      await updateCustomerAction(customer.id, { partnerNotes: newNotes });
    } catch (err) {
      console.error('Failed to update notes', err);
    }
  };

  const handleInterestChange = async (val: string) => {
    const interest = val as InterestedIn;
    setInterestedIn(interest);
    if (!customer) return;
    try {
      await updateCustomerAction(customer.id, { interestedIn: interest });
    } catch (err) {
      console.error('Failed to update interest', err);
    }
  };

  // End of handleAddNote
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-40"
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-[100dvh] w-full md:w-[440px] bg-paper shadow-2xl z-50 flex flex-col overflow-y-auto"
      >
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-br from-deep to-ink text-white overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md"
          >
            <X size={20} />
          </button>

          <div className="flex items-start gap-4 mb-6 relative z-10 mt-4">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-serif text-2xl backdrop-blur-md shrink-0">
              {customer.fullName ? customer.fullName.charAt(0) : 'U'}
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl mb-1">{customer.fullName || 'Unknown Client'}</h2>
              
              <div className="flex flex-col gap-2 mt-2">
                {/* Phone */}
                <div className="flex items-center gap-2 text-sky text-sm">
                  <Phone size={14} />
                  <span>{customer.phone || 'No phone provided'}</span>
                </div>
                
                {/* Editable Interest */}
                <div className="flex items-center gap-2 text-sky text-sm">
                  <Stethoscope size={14} className="shrink-0" />
                  <select 
                    value={interestedIn || ''} 
                    onChange={(e) => handleInterestChange(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs backdrop-blur-md focus:outline-none focus:border-white/50 w-full max-w-[200px]"
                  >
                    <option value="" disabled className="text-deep">Select Interest</option>
                    {INTEREST_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value} className="text-deep">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 bg-[#F8FAFC]">
          <h3 className="text-sm font-semibold text-deep uppercase tracking-widest mb-6 flex items-center gap-2">
            <Clock size={16} className="text-blue" />
            Journey Tracker
          </h3>
          
          {/* Vertical Timeline */}
          <div className="relative pl-6">
            {/* Continuous Line (Background) */}
            <div className="absolute top-4 bottom-8 left-[11px] w-[2px] bg-line z-0"></div>
            
            {/* Progress Line (Filled) */}
            <div 
              className="absolute top-4 left-[11px] w-[2px] bg-blue z-0 transition-all duration-1000 ease-out" 
              style={{ 
                height: `${currentStageIndex === 0 ? 0 : (currentStageIndex / (STAGE_ORDER.length - 1)) * 100}%`,
                maxHeight: 'calc(100% - 32px)'
              }}
            ></div>

            <div className="flex flex-col gap-8 relative z-10">
              {STAGE_ORDER.map((stage, index) => {
                const isCompleted = index < currentStageIndex;
                const isCurrent = index === currentStageIndex;
                const isFuture = index > currentStageIndex;
                
                // Find if there's a timeline entry for this stage
                const timelineEntry = customer.timeline?.find(t => t.stage === stage);
                const dateText = timelineEntry 
                  ? new Date(timelineEntry.changedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                  : (isCurrent ? 'Current Phase' : 'Pending');

                return (
                  <div key={stage} className={`flex gap-4 relative group ${isFuture ? 'opacity-50' : ''}`}>
                    {/* Icon / Node */}
                    <div className="relative flex-shrink-0 mt-1">
                      {isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-blue text-white flex items-center justify-center shadow-md">
                          <CheckCircle2 size={14} strokeWidth={3} />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-6 h-6 rounded-full bg-white border-4 border-blue flex items-center justify-center shadow-[0_0_15px_rgba(30,90,138,0.3)]">
                          <div className="w-2 h-2 rounded-full bg-blue animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-line flex items-center justify-center">
                          <Circle size={10} className="text-line" fill="currentColor" />
                        </div>
                      )}
                    </div>

                    {/* Content Box */}
                    <div className={`flex-1 p-4 rounded-xl border transition-all ${
                      isCurrent 
                        ? 'bg-white border-blue shadow-md transform scale-[1.02]' 
                        : isCompleted
                          ? 'bg-white border-line'
                          : 'bg-transparent border-transparent pl-2'
                    }`}>
                      <div className="flex justify-between items-start mb-1">
                        <div className={`font-medium ${isCurrent ? 'text-blue' : 'text-deep'}`}>
                          {STAGE_LABELS[stage]}
                        </div>
                        <div className="text-[10px] uppercase font-semibold text-grey tracking-wider mt-0.5">
                          {dateText}
                        </div>
                      </div>
                      
                      {isCurrent && (
                        <div className="text-sm text-grey mt-2">
                          {stage === 'lead' && "Client has expressed interest. Vessa team is preparing to contact."}
                          {stage === 'contacted' && "Vessa team is currently discussing procedures and options with the client."}
                          {stage === 'trip_pending' && "Travel dates and accommodation are being arranged."}
                          {stage === 'payment_pending' && "Final deposits and paperwork are being processed."}
                          {stage === 'completed' && "Procedure completed successfully. Reward has been unlocked!"}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-10 mb-6">
            <h3 className="text-sm font-semibold text-deep uppercase tracking-widest mb-4 flex items-center gap-2">
              <MessageSquare size={16} className="text-blue" />
              Notes
            </h3>
            
            <div className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden flex flex-col gap-px bg-line/50">
              <div className="bg-white p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a note about this client..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                    className="flex-1 bg-mist border border-line rounded-lg px-3 py-2 text-sm text-deep focus:outline-none focus:border-blue"
                  />
                  <button 
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className="bg-blue text-white p-2 rounded-lg hover:bg-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
              
              {notes.length > 0 ? (
                <div className="flex flex-col gap-px max-h-60 overflow-y-auto">
                  {notes.slice().reverse().map((note, idx) => (
                    <div key={idx} className="bg-white p-4 hover:bg-mist/30 transition-colors">
                      <div className="text-sm text-deep">{note.text}</div>
                      <div className="text-[10px] text-grey uppercase tracking-wider mt-2 font-medium">
                        {new Date(note.createdAt).toLocaleString(undefined, { 
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-6 text-center text-sm text-grey italic">
                  No notes added yet.
                </div>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
