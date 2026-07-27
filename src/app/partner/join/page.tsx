'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Step = 1 | 2 | 3 | 4 | 5;

export default function JoinWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState({
    businessType: '',
    businessName: '',
    city: '',
    state: '',
    volume: '20-50' as '1-20' | '20-50' | '50-100' | '100+',
  });
  const [isSigningIn, setIsSigningIn] = useState(false);

  const next = () => setStep(s => Math.min(s + 1, 5) as Step);
  const back = () => setStep(s => Math.max(s - 1, 1) as Step);

  const handleFinish = async () => {
    setIsSigningIn(true);
    localStorage.setItem('vessa_onboarding', JSON.stringify(data));
    await signIn('google', { callbackUrl: '/partner/finalize' });
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center pt-20 px-6">
      <div className="flex gap-2 mb-12">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-8 bg-blue' : i < step ? 'w-2 bg-blue/50' : 'w-2 bg-line'}`} />
        ))}
      </div>

      <div className="w-full max-w-lg">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="font-serif text-3xl text-deep mb-2">What best describes your business?</h1>
            <p className="text-grey mb-8">This helps us tailor your partner experience.</p>
            <div className="grid grid-cols-2 gap-4">
              {['salon', 'barbershop', 'medspa', 'nail_lash', 'coach', 'other'].map(type => (
                <button
                  key={type}
                  onClick={() => { setData(d => ({ ...d, businessType: type })); next(); }}
                  className={`p-6 rounded-xl border text-left transition-all ${
                    data.businessType === type ? 'border-blue bg-mist shadow-sm' : 'border-line bg-white hover:border-blue/50'
                  }`}
                >
                  <div className="font-medium text-ink capitalize">{type.replace('_', ' & ')}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="font-serif text-3xl text-deep mb-2">What is the name of your business?</h1>
            <p className="text-grey mb-8">Your clients will see this name on your referral page.</p>
            <input
              autoFocus
              type="text"
              value={data.businessName}
              onChange={e => setData(d => ({ ...d, businessName: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && data.businessName && next()}
              placeholder="e.g. Glow & Beauty"
              className="w-full text-xl p-4 border border-line rounded-xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue"
            />
            <button
              onClick={next}
              disabled={!data.businessName}
              className="mt-8 bg-deep text-white px-8 py-3 rounded-full font-medium disabled:opacity-50 w-full"
            >
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="font-serif text-3xl text-deep mb-2">Where are you located?</h1>
            <p className="text-grey mb-8">Vessa partners operate exclusively in the US.</p>
            <div className="flex gap-4">
              <input
                autoFocus
                type="text"
                placeholder="City"
                value={data.city}
                onChange={e => setData(d => ({ ...d, city: e.target.value }))}
                className="flex-[2] p-4 border border-line rounded-xl focus:outline-none focus:border-blue"
              />
              <select
                value={data.state}
                onChange={e => setData(d => ({ ...d, state: e.target.value }))}
                className="flex-1 p-4 border border-line rounded-xl bg-white focus:outline-none focus:border-blue"
              >
                <option value="">State</option>
                {['CA', 'NY', 'TX', 'FL', 'VA', 'MD', 'DC', 'IL', 'PA', 'OH', 'OTHER'].map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
            <button
              onClick={next}
              disabled={!data.city || !data.state}
              className="mt-8 bg-deep text-white px-8 py-3 rounded-full font-medium disabled:opacity-50 w-full"
            >
              Continue
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="font-serif text-3xl text-deep mb-2">How many clients do you serve monthly?</h1>
            <p className="text-grey mb-8">Roughly — this just helps us estimate your earning potential. No exact number needed.</p>
            <div className="flex flex-col gap-3">
              {(['1-20', '20-50', '50-100', '100+'] as const).map(vol => (
                <button
                  key={vol}
                  onClick={() => { setData(d => ({ ...d, volume: vol })); next(); }}
                  className="p-5 rounded-xl border border-line bg-white text-left font-medium text-ink hover:border-blue transition-colors"
                >
                  {vol} clients
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-mist p-8 rounded-2xl border border-line mb-8 text-center">
              <div className="text-xs font-bold tracking-[0.28em] text-blue uppercase mb-4">Earnings Preview</div>
              <h1 className="font-serif text-4xl text-deep mb-4">You could earn up to <br/><span className="text-blue">$2,000–$5,000+</span>/year</h1>
              <p className="text-sm text-grey">Based on {data.volume} monthly clients. Partners your size typically refer a few clients a month. This is a conservative estimate of your partner rewards for completed journeys.</p>
            </div>
            
            <button
              onClick={handleFinish}
              disabled={isSigningIn}
              className="w-full bg-deep text-white py-4 rounded-full font-medium hover:bg-blue transition-colors flex justify-center items-center gap-2"
            >
              {isSigningIn ? 'Connecting...' : 'Sign up with Google'}
            </button>
            <p className="text-center text-xs text-grey mt-4">By signing up, you agree to our Partner Terms.</p>
          </div>
        )}

        {step > 1 && (
          <button onClick={back} className="mt-8 text-sm text-grey hover:text-deep font-medium">
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
