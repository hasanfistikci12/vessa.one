import Link from 'next/link';

export default function HomePage() {
  return (
    <>


<nav className="vessa-nav">
  <div className="wrap vessa-nav-in">
    <div className="vessa-brand">
      <svg width="30" height="30" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="27" stroke="#12324D" strokeWidth="2.5"/><path d="M22 24 L32 42 L42 24" stroke="#1E5A8A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="32" cy="18" r="2.6" fill="#B99770"/></svg>
      <span className="w">VESSA</span>
    </div>
    <div className="nav-links">
      <a href="#why">Why Vessa</a>
      <a href="#process">How it works</a>
      <a href="#services">Services</a>
      <a href="#results">Results</a>
      <a href="#talk" className="nav-cta">Free consultation</a>
    </div>
  </div>
</nav>

{/*  HERO  */}
<header className="hero">
  <div className="wrap hero-in">
    <div className="eyebrow rise d1">Istanbul · Aesthetic Journeys</div>
    <h1 className="rise d2">One journey.<br />A <em>new</em> you.</h1>
    <p className="lead rise d3">World-class aesthetic surgery in accredited Istanbul clinics — planned end to end by one team, at a fraction of US cost. You arrive as a guest, not a patient.</p>
    <div className="hero-actions rise d4">
      <a href="#talk" className="btn-primary">Start with a free consultation
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
      <a href="#process" className="btn-ghost">See how it works ↓</a>
    </div>
    <div className="hero-note rise d4"><span className="dot"></span> A real person in Istanbul replies within the hour, 7 days a week.</div>
  </div>
</header>

{/*  THE ONE line  */}
<div className="oneline">Vessa is <b>the one</b> address for your whole journey — from first message to full recovery.</div>

{/*  WHY US  */}
<section className="pad" id="why">
  <div className="wrap">
    <div className="sec-eyebrow">Why Vessa</div>
    <h2 className="sec-title">Everything most people fear — handled</h2>
    <p className="sec-sub">Going abroad for surgery sounds daunting. We built Vessa to remove every reason to worry.</p>
    <div className="why-grid">
      <div className="why">
        <div className="ic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#1E5A8A" strokeWidth="2" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        <h3>Accredited clinics only</h3>
        <p>We work exclusively with internationally accredited hospitals and board-certified surgeons. You see their credentials before you decide.</p>
      </div>
      <div className="why">
        <div className="ic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="#1E5A8A" strokeWidth="2"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round"/></svg></div>
        <h3>A real team on the ground</h3>
        <p>From the moment you land, a dedicated coordinator is with you. You're never alone in a foreign city — you're our guest.</p>
      </div>
      <div className="why">
        <div className="ic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round"/><path d="M7 14l4-4 3 3 5-6" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        <h3>Half the cost, none of the compromise</h3>
        <p>Istanbul is a world capital of aesthetic surgery. Lower costs come from the location — never from lower standards.</p>
      </div>
      <div className="why">
        <div className="ic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#1E5A8A" strokeWidth="2"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round"/></svg></div>
        <h3>Planned end to end</h3>
        <p>Flights, 5-star hotel, transfers, interpreter, surgery, aftercare — arranged in one place. You only bring yourself.</p>
      </div>
      <div className="why">
        <div className="ic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="#1E5A8A" strokeWidth="2"/><path d="M12 7v5l3 2" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round"/></svg></div>
        <h3>12 months of aftercare</h3>
        <p>We stay reachable long after you fly home — questions, follow-ups, reassurance, all included.</p>
      </div>
      <div className="why">
        <div className="ic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#1E5A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        <h3>No pressure, ever</h3>
        <p>Your consultation is free and honest. If it's not right for you, you walk away — no cost, no chasing.</p>
      </div>
    </div>
  </div>
</section>

{/*  PROCESS  */}
<section className="pad process" id="process">
  <div className="wrap">
    <div className="sec-eyebrow">The journey</div>
    <h2 className="sec-title">From first message to full recovery</h2>
    <p className="sec-sub">Seven simple steps. We carry the weight of every one of them.</p>
    <div className="tl">
      <div className="tstep"><div className="tn">1</div><div className="tc"><h4>Free consultation</h4><p>Send a photo and your goal over WhatsApp. A surgeon reviews it, and you get an honest, personalized plan.</p></div></div>
      <div className="tstep"><div className="tn">2</div><div className="tc"><h4>Your plan & quote</h4><p>Clear pricing, no surprises. You decide in your own time — zero pressure.</p></div></div>
      <div className="tstep"><div className="tn">3</div><div className="tc"><h4>We arrange everything</h4><p>Flights, hotel, transfers, interpreter. One coordinator handles it all before you leave.</p></div></div>
      <div className="tstep"><div className="tn">4</div><div className="tc"><h4>VIP arrival in Istanbul</h4><p>Private airport pickup, 5-star Bosphorus-view hotel, and a face-to-face welcome from your coordinator.</p></div></div>
      <div className="tstep"><div className="tn">5</div><div className="tc"><h4>Your procedure</h4><p>Accredited hospital, board-certified surgeon, full aftercare team. The standards you'd expect at home.</p></div></div>
      <div className="tstep"><div className="tn">6</div><div className="tc"><h4>Recovery by the water</h4><p>Rest in comfort with daily check-ins. Istanbul becomes your recovery retreat.</p></div></div>
      <div className="tstep"><div className="tn">7</div><div className="tc"><h4>Home — and still with you</h4><p>Private transfer back, then 12 months of online follow-up. We don't disappear.</p></div></div>
    </div>
  </div>
</section>

{/*  TRUST  */}
<section className="pad trust">
  <div className="wrap">
    <div className="sec-eyebrow" style={{ color: "var(--sky)" }}>Peace of mind</div>
    <h2 className="sec-title">Trust, built into every step</h2>
    <p className="sec-sub">The reasons thousands choose Istanbul — with a team that has your back.</p>
    <div className="tbadges">
      <div className="tbadge"><div className="tb-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21 8 14 2 9.4h7.6z" stroke="#5FA8D3" strokeWidth="1.6" strokeLinejoin="round"/></svg></div><h4>Accredited partners</h4><p>Internationally certified clinics only.</p></div>
      <div className="tbadge"><div className="tb-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#5FA8D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="#5FA8D3" strokeWidth="1.6"/></svg></div><h4>Board-certified surgeons</h4><p>Credentials shared up front.</p></div>
      <div className="tbadge"><div className="tb-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#5FA8D3" strokeWidth="1.6" strokeLinejoin="round"/></svg></div><h4>Revision policy</h4><p>Aftercare and revisions covered.</p></div>
      <div className="tbadge"><div className="tb-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#5FA8D3" strokeWidth="1.6" strokeLinejoin="round"/></svg></div><h4>Reachable 7 days</h4><p>A real person, within the hour.</p></div>
    </div>
  </div>
</section>

{/*  SERVICES  */}
<section className="pad" id="services">
  <div className="wrap">
    <div className="sec-eyebrow">What we offer</div>
    <h2 className="sec-title">Popular procedures</h2>
    <p className="sec-sub">Illustrative package pricing. Your exact quote is free, after a quick consultation.</p>
    <div className="svc-grid">
      <div className="svc"><div className="svc-top"><h4>DHI Hair Transplant</h4></div><div className="svc-body"><div className="price">from $3,200 <small>package</small></div><div className="us"><s>Typical US $12,000+</s></div></div></div>
      <div className="svc"><div className="svc-top"><h4>Rhinoplasty</h4></div><div className="svc-body"><div className="price">from $5,250 <small>package</small></div><div className="us"><s>Typical US $11,000+</s></div></div></div>
      <div className="svc"><div className="svc-top"><h4>BBL / Body Contouring</h4></div><div className="svc-body"><div className="price">from $7,000 <small>package</small></div><div className="us"><s>Typical US $15,000+</s></div></div></div>
      <div className="svc"><div className="svc-top"><h4>Breast Lift + Implants</h4></div><div className="svc-body"><div className="price">from $7,300 <small>package</small></div><div className="us"><s>Typical US $16,000+</s></div></div></div>
      <div className="svc"><div className="svc-top"><h4>Full Facelift</h4></div><div className="svc-body"><div className="price">from $12,000 <small>package</small></div><div className="us"><s>Typical US $28,000+</s></div></div></div>
      <div className="svc"><div className="svc-top"><h4>Tummy Tuck + Lipo</h4></div><div className="svc-body"><div className="price">from $7,000 <small>package</small></div><div className="us"><s>Typical US $14,000+</s></div></div></div>
    </div>
  </div>
</section>

{/*  RESULTS / BEFORE-AFTER  */}
<section className="pad results" id="results">
  <div className="wrap">
    <div className="sec-eyebrow">Real journeys</div>
    <h2 className="sec-title">Before & after</h2>
    <p className="sec-sub">A glimpse of the transformations our guests have made. Full galleries shared on request.</p>
    <div className="res-grid">
      <div className="rescard"><div className="ba"><div className="half before"><span className="tag">Before</span><span className="ph">Photo</span></div><div className="half after"><span className="tag">After</span><span className="ph">Photo</span></div></div><div className="res-cap"><h4>DHI Hair Transplant</h4><p>Guest from Virginia · 8-month result</p></div></div>
      <div className="rescard"><div className="ba"><div className="half before"><span className="tag">Before</span><span className="ph">Photo</span></div><div className="half after"><span className="tag">After</span><span className="ph">Photo</span></div></div><div className="res-cap"><h4>Rhinoplasty</h4><p>Guest from Maryland · 6-month result</p></div></div>
      <div className="rescard"><div className="ba"><div className="half before"><span className="tag">Before</span><span className="ph">Photo</span></div><div className="half after"><span className="tag">After</span><span className="ph">Photo</span></div></div><div className="res-cap"><h4>BBL</h4><p>Guest from DC · 4-month result</p></div></div>
    </div>
    <p className="res-note">Placeholder frames — replace with real, consented before/after photos from partner clinics.</p>
  </div>
</section>

{/*  TESTIMONIAL  */}
<section className="pad quote-band">
  <div className="wrap">
    <div className="qmark">"</div>
    <blockquote>I was terrified of going abroad alone. Instead I felt like a guest the whole time — someone was with me at every step.</blockquote>
    <div className="qby">— Placeholder testimonial · replace with a real guest quote</div>
  </div>
</section>

{/*  FINAL CTA  */}
<section className="final" id="talk">
  <div className="final-in">
    <div className="eyebrow">Start with a conversation</div>
    <h2>See what your journey could look like.</h2>
    <p>Send us your goal and a photo over WhatsApp. Free, private, no obligation — a real person replies within the hour.</p>
    <a href="#" className="btn-light">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#12324D"><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20z"/></svg>
      Message us on WhatsApp
    </a>
    <small>vessa.one · Istanbul & Virginia</small>
  </div>
</section>

<footer className="vessa-footer">
  <div className="wrap">
    <div className="fw">VESSA</div>
    <div className="flinks">
      <a href="#why">Why Vessa</a>
      <a href="#process">How it works</a>
      <a href="#services">Services</a>
      <a href="#results">Results</a>
      <Link href="/partner/join">Partner Program</Link>
      <Link href="/partner-kit">Partner Kit</Link>
      <Link href="/partner-earnings" style={{ color: '#B99770', fontWeight: 'bold' }}>Earnings Calculator</Link>
      <a href="#talk">Contact</a>
    </div>
    <div>vessa.one · hello@vessa.one</div>
    <div className="fdisc">Vessa arranges travel and coordination for elective aesthetic procedures. Medical services are provided by independent, accredited clinics. All prices are illustrative and confirmed after consultation.</div>
  </div>
</footer>


    </>
  );
}
