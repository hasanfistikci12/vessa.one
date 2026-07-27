'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PartnerEarningsPage() {
  const [referrals, setReferrals] = useState(2);
  const [reward, setReward] = useState(400);

  const monthTotal = referrals * reward;
  const yearTotal = monthTotal * 12;

  const formatMoney = (n: number) => '$' + n.toLocaleString('en-US');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
:root{--ink:#0B1B2B;--deep:#12324D;--blue:#1E5A8A;--sky:#5FA8D3;--mist:#EAF2F8;--paper:#FBFCFD;--line:#D7E3ED;--gold:#B99770;--grey:#5C6B78;--green:#2f9e6f}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:var(--paper);color:var(--ink);line-height:1.6;-webkit-font-smoothing:antialiased}
.serif{font-family:'Cormorant Garamond',serif}
.wrap{max-width:820px;margin:0 auto;padding:0 24px}

@keyframes pop{0%{transform:scale(.96);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.rise{animation:rise .7s cubic-bezier(.2,.7,.2,1) both}
@media(prefers-reduced-motion:reduce){.rise{animation:none}}

/* hero */
.top{background:linear-gradient(165deg,var(--deep),var(--ink));color:#fff;padding:52px 0 60px;text-align:center;position:relative;overflow:hidden}
.top::before{content:"";position:absolute;right:-100px;top:-100px;width:340px;height:340px;border:1px solid rgba(95,168,211,.18);border-radius:50%}
.brand{display:inline-flex;align-items:center;gap:10px;margin-bottom:28px}
.brand svg{display:block}
.brand .w{font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.16em;color:#fff}
.top .eyebrow{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--sky);font-weight:600}
.top h1{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,6vw,48px);font-weight:400;margin:14px 0 12px;line-height:1.1}
.top p{color:#cfe0ee;max-width:480px;margin:0 auto;font-size:16px}
.pills{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:26px}
.pill{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);padding:8px 16px;border-radius:100px;font-size:13px;color:#fff;display:flex;align-items:center;gap:7px}

/* calculator */
.calc{background:#fff;border:1px solid var(--line);border-radius:20px;box-shadow:0 24px 60px rgba(18,50,77,.14);padding:36px;margin:-36px auto 0;position:relative;z-index:5}
.calc h2{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:500;text-align:center;color:var(--deep)}
.calc .csub{text-align:center;color:var(--grey);font-size:14px;margin-bottom:28px}
.slider-block{margin-bottom:26px}
.slider-block .slabel{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px}
.slider-block .slabel .st{font-size:14px;font-weight:600;color:var(--deep)}
.slider-block .slabel .sv{font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--blue);font-weight:600}
input[type=range]{-webkit-appearance:none;width:100%;height:8px;border-radius:100px;background:var(--mist);outline:none}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:28px;height:28px;border-radius:50%;background:var(--deep);cursor:pointer;border:4px solid #fff;box-shadow:0 3px 10px rgba(18,50,77,.3)}
input[type=range]::-moz-range-thumb{width:28px;height:28px;border-radius:50%;background:var(--deep);cursor:pointer;border:4px solid #fff}
.mix{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:8px}
.mixbtn{border:1.5px solid var(--line);background:#fff;border-radius:12px;padding:14px;cursor:pointer;text-align:center;transition:all .18s}
.mixbtn.active{border-color:var(--blue);background:var(--mist)}
.mixbtn .mt{font-size:13px;font-weight:600;color:var(--deep)}
.mixbtn .md{font-size:12px;color:var(--grey)}
.mixbtn .mp{font-size:12px;color:var(--gold);font-weight:600;margin-top:2px}

/* result */
.res-box{background:var(--mist);border-radius:12px;padding:24px;text-align:center;margin-bottom:32px;animation:pop .4s cubic-bezier(.2,.7,.2,1) both}
.res-box .yr{font-family:'Cormorant Garamond',serif;font-size:42px;color:var(--deep);line-height:1;margin-bottom:8px}
.res-box .yr-lbl{font-size:14px;font-weight:600;color:var(--blue);letter-spacing:.04em;text-transform:uppercase}
.res-box .brk{display:flex;justify-content:center;gap:24px;margin-top:20px;padding-top:20px;border-top:1px solid rgba(30,90,138,.15)}
.res-box .brk-item{font-size:13px;color:var(--grey)}
.res-box .brk-item b{display:block;color:var(--deep);font-size:15px;margin-bottom:2px}

/* sections */
.pad{padding:60px 0}
.slbl{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-weight:600;text-align:center;margin-bottom:12px}
.stitle{text-align:center;font-size:32px;margin-bottom:44px}

/* steps */
.steps{display:grid;grid-template-columns:1fr 1fr;gap:32px 48px}
.step{display:flex;gap:16px;align-items:flex-start}
.step .icon{width:48px;height:48px;background:var(--mist);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.step h4{font-size:17px;color:var(--deep);margin-bottom:6px;font-weight:600}
.step p{color:var(--grey);font-size:15px}

/* proof */
.proof-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.pcard{background:#fff;border:1px solid var(--line);border-radius:16px;padding:32px;box-shadow:0 12px 30px rgba(11,27,43,.03)}
.picon{margin-bottom:20px}
.pcard h4{font-size:18px;color:var(--deep);margin-bottom:12px;font-weight:600}
.pcard p, .pcard ul{font-size:15px;color:var(--grey)}
.pcard ul{margin-left:20px;margin-bottom:12px}
.pcard li{margin-bottom:4px}

.statement{background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;box-shadow:0 12px 30px rgba(11,27,43,.03)}
.st-head{background:var(--deep);color:#fff;padding:16px 24px;display:flex;justify-content:space-between;align-items:center}
.st-head .w{font-family:'Cormorant Garamond',serif;letter-spacing:.1em;font-size:18px}
.st-head .m{font-size:13px;opacity:.8}
.st-row{padding:16px 24px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center}
.st-row .d{font-size:13px;color:var(--grey);margin-top:2px}
.st-row .amt{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--deep);font-weight:600}
.st-total{padding:20px 24px;background:var(--mist);display:flex;justify-content:space-between;align-items:center;font-weight:600;color:var(--deep)}

/* cta */
.cta{background:var(--deep);border-radius:20px;padding:48px 36px;text-align:center;color:#fff}
.cta h2{color:#fff;font-size:32px;margin-bottom:14px}
.cta p{color:#cfe0ee;font-size:16px;max-width:500px;margin:0 auto 32px}
.btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:var(--deep);padding:14px 28px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;transition:transform .2s}
.btn:hover{transform:translateY(-2px)}
.cta small{display:block;margin-top:20px;color:#85a2b8;font-size:13px}

@media(max-width:768px){
  .mix{grid-template-columns:1fr}
  .steps, .proof-grid{grid-template-columns:1fr}
  .res-box .brk{flex-direction:column;gap:12px;text-align:center}
}
      `}} />

      <header className="top">
        <div className="wrap">
          <div className="brand rise">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="w">VESSA</span>
          </div>
          <div className="eyebrow rise" style={{ animationDelay: '0.1s' }}>Partner Program</div>
          <h1 className="rise" style={{ animationDelay: '0.2s' }}>Add a high-margin revenue stream, overnight.</h1>
          <p className="rise" style={{ animationDelay: '0.3s' }}>Earn $200–$400 for every aesthetic journey you refer to our trusted clinics in Istanbul. Zero cost, zero operational risk.</p>
          
          <div className="pills rise" style={{ animationDelay: '0.4s' }}>
            <div className="pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              No upfront fees
            </div>
            <div className="pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              We handle all logistics
            </div>
            <div className="pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Monthly transparent payouts
            </div>
          </div>
        </div>
      </header>

      <div className="wrap" style={{ position: 'relative' }}>
        <div className="calc rise" style={{ animationDelay: '0.5s' }}>
          <h2>Earnings Calculator</h2>
          <div className="csub">Estimate your potential extra income</div>

          <div className="res-box" id="resBox">
            <div className="yr-lbl">Potential Annual Extra Income</div>
            <div className="yr" id="yearVal">{formatMoney(yearTotal)}</div>
            
            <div className="brk">
              <div className="brk-item">
                <b id="perVal">
                  {referrals} referral{referrals > 1 ? 's' : ''}/month × {formatMoney(reward)} each
                </b>
                You invest nothing. We do all the work.
              </div>
            </div>
          </div>

          <div className="slider-block">
            <div className="slabel">
              <span className="st">Referrals you send per month</span>
              <span className="sv" id="cntVal">{referrals}</span>
            </div>
            <input 
              type="range" 
              id="cnt" 
              min="1" 
              max="10" 
              value={referrals} 
              step="1"
              onChange={(e) => setReferrals(parseInt(e.target.value, 10))}
            />
          </div>

          <div className="slider-block" style={{ marginBottom: 0 }}>
            <div className="slabel"><span className="st">What kind of procedures?</span></div>
            <div className="mix">
              <div 
                className={`mixbtn ${reward === 200 ? 'active' : ''}`} 
                onClick={() => setReward(200)}
              >
                <div className="mt">Hair transplant & small</div>
                <div className="md">most common</div>
                <div className="mp">$200 each</div>
              </div>
              <div 
                className={`mixbtn ${reward === 400 ? 'active' : ''}`} 
                onClick={() => setReward(400)}
              >
                <div className="mt">Aesthetic surgery</div>
                <div className="md">BBL, facelift, nose</div>
                <div className="mp">$400 each</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="pad">
        <div className="wrap">
          <div className="slbl">Dead simple</div>
          <h2 className="stitle">How you earn, step by step</h2>
          <div className="steps">
            <div className="step">
              <div className="icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M8 12h8M8 8h8M8 16h5" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round"/><rect x="4" y="3" width="16" height="18" rx="2" stroke="#1E5A8A" strokeWidth="2"/></svg>
              </div>
              <div><h4>We give you a brochure & QR code</h4><p>It sits at your reception. Your own unique code is printed on it — that's how every guest is tied to you.</p></div>
            </div>
            <div className="step">
              <div className="icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div><h4>You mention us when it fits</h4><p>"I know a great team in Istanbul — take a card." No selling, no pressure. Just a tip to someone who trusts you.</p></div>
            </div>
            <div className="step">
              <div className="icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M2 12h4l2-7 4 14 3-9 2 2h5" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div><h4>We handle everything</h4><p>Consultation, travel, hotel, surgery, aftercare — all us. Your client is looked after from start to finish.</p></div>
            </div>
            <div className="step">
              <div className="icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#2f9e6f" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div><h4>You get paid</h4><p>When your guest completes their trip, your reward lands — every month, straight to you.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="pad" style={{ background: 'linear-gradient(180deg,#fff,var(--mist))' }}>
        <div className="wrap">
          <div className="slbl">No trust required</div>
          <h2 className="stitle">How you know it's real</h2>
          <div className="proof-grid">
            <div className="pcard">
              <div className="picon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#1E5A8A" strokeWidth="2"/><path d="M3 9h18" stroke="#1E5A8A" strokeWidth="2"/></svg></div>
              <h4>How you get paid</h4>
              <p>Your choice, whichever is easiest:</p>
              <ul>
                <li>Direct bank transfer</li>
                <li>Zelle / Venmo / PayPal</li>
                <li>Check by mail</li>
              </ul>
              <p style={{ marginTop: 10 }}>Paid <b>monthly</b>, only on completed journeys. Never on no-shows.</p>
            </div>
            <div className="pcard">
              <div className="picon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="#2f9e6f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round"/></svg></div>
              <h4>You can verify everything</h4>
              <p>Every month you get a simple statement showing:</p>
              <ul>
                <li>Who you referred (by code)</li>
                <li>Which trips completed</li>
                <li>Exactly what you earned</li>
              </ul>
              <p style={{ marginTop: 10 }}>Nothing hidden. Ask to see the records anytime.</p>
            </div>
          </div>

          <div style={{ marginTop: 36 }}>
            <div className="statement">
              <div className="st-head"><span className="w">VESSA</span><span className="m">Your statement · March</span></div>
              <div className="st-row"><div><b>Guest #A-104</b><div className="d">Hair transplant · completed Mar 8</div></div><div className="amt">$200</div></div>
              <div className="st-row"><div><b>Guest #A-118</b><div className="d">BBL · completed Mar 22</div></div><div className="amt">$400</div></div>
              <div className="st-total"><div>Paid to you this month</div><div className="amt">$600</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="slbl">The honest part</div>
          <h2 className="stitle">Why this doesn't touch your business</h2>
          <div className="proof-grid">
            <div className="pcard">
              <div className="picon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#1E5A8A" strokeWidth="2" strokeLinejoin="round"/></svg></div>
              <h4>We only do what you can't</h4>
              <p>Surgical procedures — hair transplants, BBL, facelifts. We never touch your Botox, fillers or lasers. Those clients stay 100% yours.</p>
            </div>
            <div className="pcard">
              <div className="picon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="#1E5A8A" strokeWidth="2"/><path d="M12 8v4l3 2" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round"/></svg></div>
              <h4>Zero time, zero cost</h4>
              <p>No inventory, no staff training, no upfront fee. A brochure at reception and a sentence when it comes up. That's the whole job.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 60 }}>
        <div className="cta">
          <h2>Ready to add a new income stream?</h2>
          <p>Sign up in two minutes. Get your brochures and unique code today, start earning this month.</p>
          <Link href="/partner/join" className="btn">
            Become a partner
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#12324D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <small>Questions? Ask Eren — he's right here.</small>
        </div>
      </div>
    </>
  );
}
