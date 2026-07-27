import { getPartnerByReferralCode } from '@/lib/db/partners';
import { notFound } from 'next/navigation';

export default async function ReferralPage({ params }: { params: { code: string } }) {
  const partner = await getPartnerByReferralCode(params.code);
  
  if (!partner) {
    return notFound();
  }

  return (
    <>


<nav>
  <div className="wrap nav-in">
    <div className="brand">
      <svg width="30" height="30" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="27" stroke="#12324D" strokeWidth="2.5"/><path d="M22 24 L32 42 L42 24" stroke="#1E5A8A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="32" cy="18" r="2.6" fill="#B99770"/></svg>
      <span className="w">VESSA</span>
    </div>
    <a href="#talk" className="nav-cta">Free consultation</a>
  </div>
</nav>

{/*  HERO  */}
<header className="hero">
  <div className="wrap hero-in">
    <div className="eyebrow rise d1">Istanbul · Aesthetic Journeys</div>
    <h1 className="rise d2">Your transformation,<br />on the <em>Bosphorus</em>.</h1>
    <p className="lead rise d3">World-class aesthetic surgery in accredited Istanbul clinics — planned end to end, at a fraction of US cost. You arrive as a guest, not a patient.</p>
    <div className="hero-actions rise d4">
      <a href="#talk" className="btn-primary">Talk to a real person
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
      <a href="#journey" className="btn-ghost">See how it works ↓</a>
    </div>
    <div className="hero-note rise d4"><span className="dot"></span> A team member in Istanbul replies within the hour, 7 days a week.</div>
  </div>
</header>

{/*  STRIP  */}
<div className="strip">
  <div className="wrap strip-in">
    <div><div className="s-num">JCI</div><div className="s-lbl">Accredited clinics</div></div>
    <div><div className="s-num">½</div><div className="s-lbl">Of typical US cost</div></div>
    <div><div className="s-num">1:1</div><div className="s-lbl">Dedicated coordinator</div></div>
    <div><div className="s-num">12&nbsp;mo</div><div className="s-lbl">Aftercare included</div></div>
  </div>
</div>

{/*  JOURNEY  */}
<section className="pad" id="journey">
  <div className="wrap">
    <div className="sec-eyebrow">The journey</div>
    <h2 className="sec-title">Everything arranged before you land</h2>
    <p className="sec-sub">No agencies to chase, no surprises. One coordinator handles the whole trip — you only bring yourself.</p>
    <div className="jgrid">
      <div className="jcard"><div className="jn">01</div><h4>Free consultation</h4><p>Send a photo and your goal over WhatsApp. A surgeon reviews it and you get an honest, personalized plan — no pressure.</p></div>
      <div className="jcard"><div className="jn">02</div><h4>VIP arrival</h4><p>Private airport pickup and check-in at a 5-star Bosphorus-view hotel. Your coordinator meets you in person.</p></div>
      <div className="jcard"><div className="jn">03</div><h4>Your procedure</h4><p>Board-certified surgeon, accredited hospital, full aftercare team. Same standards you'd expect at home.</p></div>
      <div className="jcard"><div className="jn">04</div><h4>Recover by the water</h4><p>Rest in comfort with daily check-ins. Istanbul becomes your recovery retreat, not just a clinic.</p></div>
      <div className="jcard"><div className="jn">05</div><h4>Final check & farewell</h4><p>Post-op review with your surgeon, then a private transfer back to the airport.</p></div>
      <div className="jcard"><div className="jn">06</div><h4>12 months with you</h4><p>We stay reachable online long after you're home — questions, follow-ups, reassurance.</p></div>
    </div>
  </div>
</section>

{/*  TEAM / FEAR-BREAKER  */}
<section className="pad team">
  <div className="wrap team-in">
    <div className="team-copy">
      <div className="sec-eyebrow" style={{ textAlign: "left" }}>Real people, on the ground</div>
      <h2>You're never doing this alone.</h2>
      <p>The biggest worry about surgery abroad is simple: <em>what if something goes wrong and I'm on my own?</em></p>
      <p>With Vessa, there's a real person waiting for you in Istanbul from the moment you land — and a familiar face back home who introduced you. You're a guest of the team, not a case number.</p>
      <div className="sign">— The Vessa team, Istanbul & Virginia</div>
    </div>
    <div className="team-cards">
      <div className="tperson"><div className="av">H</div><div className="tn">Hasan</div><div className="tr">Istanbul lead</div><div className="tl">Meets you on the ground, oversees every step.</div></div>
      
      <div className="tperson">
        <div className="av">{partner.name ? partner.name.charAt(0).toUpperCase() : 'P'}</div>
        <div className="tn">{partner.name || partner.businessName}</div>
        <div className="tr">{partner.businessName || 'Partner'}</div>
        <div className="tl">Your first point of contact, right here at home.</div>
      </div>
    </div>
  </div>
</section>

{/*  PRICING  */}
<section className="pad">
  <div className="wrap">
    <div className="sec-eyebrow">Transparent pricing</div>
    <h2 className="sec-title">What you'd pay — and what you'll pay</h2>
    <p className="sec-sub">Illustrative packages. Your exact quote comes free, after a quick consultation.</p>
    <div className="ptable">
      <div className="prow head"><span>Procedure</span><span>Typical US</span><span>Istanbul</span></div>
      <div className="prow"><div className="pp">DHI Hair Transplant</div><div className="pus">$12,000+</div><div className="pist">from $3,200</div></div>
      <div className="prow"><div className="pp">Rhinoplasty</div><div className="pus">$11,000+</div><div className="pist">from $5,250</div></div>
      <div className="prow"><div className="pp">BBL / Body contouring</div><div className="pus">$15,000+</div><div className="pist">from $7,000</div></div>
      <div className="prow"><div className="pp">Breast lift + implants</div><div className="pus">$16,000+</div><div className="pist">from $7,300</div></div>
      <div className="prow"><div className="pp">Full facelift</div><div className="pus">$28,000+</div><div className="pist">from $12,000</div></div>
    </div>
    <p className="price-foot">Packages can include hotel, transfers and an interpreter. Ask for a full breakdown.</p>
  </div>
</section>

{/*  FEAR-BREAKER FAQ  */}
<section className="pad" style={{ background: "linear-gradient(180deg,#fff,var(--mist))" }}>
  <div className="wrap">
    <div className="sec-eyebrow">Honest answers</div>
    <h2 className="sec-title">The questions everyone asks</h2>
    <div className="faq" style={{ marginTop: "44px" }}>
      <div className="qitem"><h4><span>—</span>Is it safe?</h4><p>We only work with accredited clinics and board-certified surgeons. You get their credentials up front, and before/after cases from real patients.</p></div>
      <div className="qitem"><h4><span>—</span>What if I don't like the plan?</h4><p>The consultation is free and there's no obligation. If it's not right for you, you walk away — no cost, no pressure.</p></div>
      <div className="qitem"><h4><span>—</span>Who looks after me if something's wrong?</h4><p>Your coordinator is reachable throughout, and the clinic provides aftercare and a revision policy. We stay with you online for 12 months.</p></div>
      <div className="qitem"><h4><span>—</span>Why is it so much cheaper?</h4><p>Lower operating costs in Turkey — not lower standards. Istanbul is one of the world's leading destinations for aesthetic surgery.</p></div>
    </div>
  </div>
</section>

{/*  FINAL CTA  */}
<section className="final" id="talk">
  <div className="final-in">
    <div className="eyebrow">Start with a conversation</div>
    <h2>See what your journey could look like.</h2>
    <p>Send us your goal and a photo over WhatsApp. Free, private, no obligation — a real person replies within the hour.</p>
    <a href={`https://wa.me/1234567890?text=Hi,%20I%20was%20referred%20by%20${partner.referralCode}%20and%20I'd%20like%20to%20learn%20more.`} target="_blank" className="btn-light">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#12324D"><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20z"/></svg>
      Message us on WhatsApp
    </a>
    <small>Referred by {partner.businessName}</small>
  </div>
</section>

<footer>
  <div className="fw">VESSA</div>
  Istanbul Aesthetic Journeys · vessa.co · hello@vessa.co<br />
  <span style={{ fontSize: "11px", opacity: ".7" }}>Vessa arranges travel and coordination for elective aesthetic procedures. Medical services are provided by independent accredited clinics.</span>
</footer>


    </>
  );
}
