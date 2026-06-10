'use client';
import { useSearchParams } from 'next/navigation';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { ContactForm } from '@/components/forms/ContactForm';
import { useState } from 'react';

export function ContactPageContent() {
  const searchParams = useSearchParams();
  const craneId = searchParams.get('crane');
  const craneName = searchParams.get('model');

  const [activeTab, setActiveTab] = useState<'contact' | 'devis'>(
    craneId ? 'devis' : 'contact',
  );

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 bg-[#F4F6F9] p-1 rounded-sm mb-6">
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all ${
            activeTab === 'contact'
              ? 'bg-white text-navy shadow-sm'
              : 'text-steel hover:text-navy'
          }`}
        >
          Message
        </button>
        <button
          onClick={() => setActiveTab('devis')}
          className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all ${
            activeTab === 'devis'
              ? 'bg-white text-navy shadow-sm'
              : 'text-steel hover:text-navy'
          }`}
        >
          Demande de devis
        </button>
      </div>

      <h2 className="font-display font-bold text-navy text-xl uppercase tracking-wide mb-5">
        {activeTab === 'contact' ? 'Envoyez-nous un message' : 'Demande de devis'}
      </h2>

      {activeTab === 'contact' ? (
        <ContactForm />
      ) : (
        <QuoteForm
          craneId={craneId ? Number(craneId) : undefined}
          craneName={craneName || undefined}
        />
      )}
    </div>
  );
}
