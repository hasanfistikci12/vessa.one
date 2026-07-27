'use client';
import { useState } from 'react';
import { PartnerNote } from '@/lib/types';

export function NotesSection({ customerId, initialNotes }: { customerId: string, initialNotes: PartnerNote[] }) {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/customer/${customerId}/note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newNote }),
      });
      if (res.ok) {
        const { note } = await res.json();
        setNotes([...notes, note]);
        setNewNote('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
        {notes.length === 0 ? (
          <p className="text-grey text-sm italic text-center py-4">No notes yet.</p>
        ) : (
          notes.map((note, i) => (
            <div key={i} className="bg-mist p-4 rounded-xl text-sm">
              <p className="text-deep mb-2">{note.text}</p>
              <p className="text-[10px] text-grey text-right">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input 
          type="text" 
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder="Type a note..."
          className="flex-1 p-3 border border-line rounded-xl focus:outline-none focus:border-blue text-sm"
        />
        <button 
          type="submit" 
          disabled={isSubmitting || !newNote.trim()}
          className="bg-deep text-white px-6 rounded-xl font-medium text-sm hover:bg-blue transition-colors disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
