export default function BrandIdentityPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `

:root{
  --ink:#0B1B2B;        /* deep navy ink */
  --deep:#12324D;       /* primary deep blue */
  --blue:#1E5A8A;       /* signature clinical blue */
  --sky:#5FA8D3;        /* soft accent sky */
  --mist:#EAF2F8;       /* pale blue mist */
  --paper:#FBFCFD;      /* near-white paper */
  --line:#D7E3ED;       /* hairline */
  --gold:#B99770;       /* restrained warm foil accent */
  --grey:#5C6B78;
}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:var(--paper);color:var(--ink);line-height:1.6;-webkit-font-smoothing:antialiased}
.wrap{max-width:1000px;margin:0 auto;padding:0 32px}
.serif{font-family:'Cormorant Garamond',serif}

/* ---- doc header ---- */
.doc-head{padding:80px 0 48px;border-bottom:1px solid var(--line);text-align:center}
.doc-head .eyebrow{font-size:12px;letter-spacing:.32em;text-transform:uppercase;color:var(--blue);font-weight:600}
.doc-head h1{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:400;margin:16px 0 8px;letter-spacing:.02em}
.doc-head p{color:var(--grey);font-size:15px}

section.block{padding:64px 0;border-bottom:1px solid var(--line)}
.sec-label{font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:var(--blue);font-weight:600;margin-bottom:28px}

/* ---- logo ---- */
.logo-lockup{display:flex;flex-direction:column;align-items:center;gap:6px;padding:56px 0;background:linear-gradient(160deg,var(--mist),#fff);border-radius:12px;border:1px solid var(--line)}
.logo-mark{width:64px;height:64px;margin-bottom:14px}
.logo-word{font-family:'Cormorant Garamond',serif;font-size:52px;letter-spacing:.14em;font-weight:400;color:var(--deep)}
.logo-tag{font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:var(--gold);font-weight:600;padding-left:.42em}

.logo-variants{display:grid;grid-template-columns:1fr;gap:20px;margin-top:24px}
.lv{border:1px solid var(--line);border-radius:10px;padding:36px;display:flex;flex-direction:column;align-items:center;gap:10px}
.lv.dark{background:var(--ink)}
.lv.dark .logo-word{color:#fff}
.lv.dark .logo-tag{color:var(--sky)}
.lv small{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--grey);margin-top:8px}
.lv.dark small{color:#7d93a6}

/* ---- colors ---- */
.swatches{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.sw{border-radius:10px;overflow:hidden;border:1px solid var(--line)}
.sw .chip{height:96px}
.sw .meta{padding:12px 14px;background:#fff}
.sw .meta b{display:block;font-size:13px}
.sw .meta span{font-size:12px;color:var(--grey);font-family:'Inter';letter-spacing:.02em}

/* ---- type ---- */
.type-row{display:flex;flex-direction:column;gap:6px;padding:20px 0;border-bottom:1px dashed var(--line)}
.type-row:last-child{border:none}
.type-row .role{width:150px;flex-shrink:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--blue);font-weight:600}
.spec{font-size:12px;color:var(--grey);margin-top:4px}

/* ---- business card ---- */
.cards{display:grid;grid-template-columns:1fr;gap:28px}
.card{aspect-ratio:1.75/1;border-radius:14px;box-shadow:0 12px 40px rgba(18,50,77,.14);overflow:hidden;position:relative}
.card-front{background:linear-gradient(155deg,#fff 0%,var(--mist) 100%);padding:26px 28px;display:flex;flex-direction:column;justify-content:space-between}
.card-front .cf-top{display:flex;align-items:center;gap:12px}
.card-front .cf-word{font-family:'Cormorant Garamond',serif;font-size:30px;letter-spacing:.12em;color:var(--deep)}
.card-front .cf-tag{font-size:8px;letter-spacing:.34em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-top:2px}
.card-front .cf-name{font-size:15px;font-weight:600;color:var(--ink)}
.card-front .cf-role{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--blue);margin-top:2px}
.card-front .cf-contact{font-size:11px;color:var(--grey);margin-top:10px;line-height:1.7}
.card-back{background:var(--ink);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:24px}
.card-back .cb-word{font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.14em;color:#fff}
.card-back .cb-line{font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--sky)}
.card-back .qr{width:66px;height:66px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:8px;color:var(--grey);text-align:center;line-height:1.2}
.card-back .cb-cta{font-size:10px;color:#cfe0ee;letter-spacing:.06em}

.hint{background:var(--mist);border-left:3px solid var(--blue);padding:14px 18px;border-radius:0 8px 8px 0;font-size:13px;color:var(--deep);margin-top:22px}
.hint b{color:var(--blue)}

/* ---- brochure ---- */
.brochure-note{font-size:13px;color:var(--grey);margin-bottom:24px}
.panel{background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;margin-bottom:20px}
.panel-cover{background:linear-gradient(165deg,var(--deep),var(--blue));color:#fff;padding:48px 40px;position:relative;overflow:hidden}
.panel-cover::after{content:"";position:absolute;right:-60px;top:-60px;width:220px;height:220px;border:1px solid rgba(255,255,255,.14);border-radius:50%}
.panel-cover::before{content:"";position:absolute;right:-20px;bottom:-90px;width:180px;height:180px;border:1px solid rgba(255,255,255,.1);border-radius:50%}
.panel-cover .pc-eyebrow{font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:var(--sky);font-weight:600}
.panel-cover h2{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:400;line-height:1.1;margin:16px 0 14px;max-width:100%}
.panel-cover p{font-size:14px;color:#d3e3f0;max-width:100%}
.panel-cover .pc-logo{position:static;font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.14em;max-width:100%}
.panel-body{padding:36px 40px}
.panel-body h3{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:500;color:var(--deep);margin-bottom:6px}
.panel-body .sub{font-size:13px;color:var(--grey);margin-bottom:22px}
.journey{display:grid;gap:0}
.jstep{display:grid;grid-template-columns:44px 1fr;gap:16px;padding:14px 0;border-bottom:1px dashed var(--line)}
.jstep:last-child{border:none}
.jstep .jnum{width:44px;height:44px;border-radius:50%;background:var(--mist);color:var(--blue);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600}
.jstep .jt{font-weight:600;font-size:14px}
.jstep .jd{font-size:13px;color:var(--grey)}
.price-tbl{width:100%;border-collapse:collapse;margin-top:8px}
.price-tbl th{text-align:left;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);padding:10px 12px;border-bottom:2px solid var(--line)}
.price-tbl td{padding:12px;border-bottom:1px solid var(--line);font-size:13px}
.price-tbl .proc{font-weight:600;color:var(--ink)}
.price-tbl .us{color:var(--grey);text-decoration:line-through}
.price-tbl .ist{color:var(--blue);font-weight:600}
.trust-grid{display:grid;grid-template-columns:1fr;gap:16px;margin-top:8px}
.trust-item{text-align:center;padding:20px 12px;background:var(--mist);border-radius:10px}
.trust-item .ti-num{font-family:'Cormorant Garamond',serif;font-size:34px;color:var(--deep);font-weight:600}
.trust-item .ti-lbl{font-size:11px;color:var(--grey);letter-spacing:.04em;margin-top:2px}

.foot{padding:48px 0 80px;text-align:center;color:var(--grey);font-size:12px}

@media(min-width:768px){
  .swatches{grid-template-columns:repeat(4,1fr)}
  .cards,.logo-variants{grid-template-columns:1fr 1fr}
  .trust-grid{grid-template-columns:repeat(3,1fr)}
  .doc-head h1{font-size:64px}
  .panel-cover h2{font-size:44px;max-width:80%}
  .panel-cover p{position:static;max-width:70%}
  .panel-cover .pc-logo{position:absolute;top:40px;right:40px;max-width:auto}
  .type-row{flex-direction:row;align-items:baseline;gap:24px}
}

` }} />
      

<div className="doc-head">
  <div className="eyebrow">Brand Identity System</div>
  <h1 className="serif">Vessa</h1>
  <p>Istanbul Aesthetic Journeys — visual identity, print & digital assets</p>
</div>

<div className="wrap">

{/*  LOGO  */}
<section className="block">
  <div className="sec-label">01 — Logo</div>
  <div className="logo-lockup">
    <svg className="logo-mark" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="27" stroke="#12324D" strokeWidth="2" fill="none"/>
      <path d="M22 24 L32 42 L42 24" stroke="#1E5A8A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="32" cy="18" r="2.4" fill="#B99770"/>
    </svg>
    <div className="logo-word">VESSA</div>
    <div className="logo-tag">Istanbul Aesthetic Journeys</div>
  </div>
  <div className="logo-variants">
    <div className="lv">
      <div className="logo-word" style={{ fontSize: "38px" }}>VESSA</div>
      <div className="logo-tag">Istanbul Aesthetic Journeys</div>
      <small>Primary — light</small>
    </div>
    <div className="lv dark">
      <div className="logo-word" style={{ fontSize: "38px" }}>VESSA</div>
      <div className="logo-tag">Istanbul Aesthetic Journeys</div>
      <small>Reversed — dark</small>
    </div>
  </div>
  <div className="hint"><b>Mark anlamı:</b> Daire içinde "V" monogram + üstte altın nokta. Daire = mühür/güven ve tamamlanmış yolculuk; "V" = Vessa; altın nokta = pusula/kutup yıldızı (yön, rehberlik). Mühür formu kurumsal ve premium durur, tek renkte ve küçük boyutta net okunur, app ikonu olarak da çalışır.</div>
</section>

{/*  COLOR  */}
<section className="block">
  <div className="sec-label">02 — Color</div>
  <div className="swatches">
    <div className="sw"><div className="chip" style={{ background: "#0B1B2B" }}></div><div className="meta"><b>Ink</b><span>#0B1B2B</span></div></div>
    <div className="sw"><div className="chip" style={{ background: "#12324D" }}></div><div className="meta"><b>Deep Blue</b><span>#12324D</span></div></div>
    <div className="sw"><div className="chip" style={{ background: "#1E5A8A" }}></div><div className="meta"><b>Clinical Blue</b><span>#1E5A8A</span></div></div>
    <div className="sw"><div className="chip" style={{ background: "#5FA8D3" }}></div><div className="meta"><b>Sky</b><span>#5FA8D3</span></div></div>
    <div className="sw"><div className="chip" style={{ background: "#EAF2F8" }}></div><div className="meta"><b>Mist</b><span>#EAF2F8</span></div></div>
    <div className="sw"><div className="chip" style={{ background: "#FBFCFD", borderBottom: "1px solid #D7E3ED" }}></div><div className="meta"><b>Paper</b><span>#FBFCFD</span></div></div>
    <div className="sw"><div className="chip" style={{ background: "#B99770" }}></div><div className="meta"><b>Foil Gold</b><span>#B99770</span></div></div>
    <div className="sw"><div className="chip" style={{ background: "#5C6B78" }}></div><div className="meta"><b>Slate Grey</b><span>#5C6B78</span></div></div>
  </div>
  <div className="hint"><b>Kural:</b> Beyaz-mavi %90 hakim (güven, kliniklik). Altın sadece vurgu — logo çizgisi, ince ayraçlar, "premium" dokunuşlar. Altını asla arka plan olarak kullanma; nadir kullanım onu değerli tutar.</div>
</section>

{/*  TYPE  */}
<section className="block">
  <div className="sec-label">03 — Typography</div>
  <div className="type-row">
    <div className="role">Display</div>
    <div>
      <div className="serif" style={{ fontSize: "42px", color: "var(--deep)" }}>Cormorant Garamond</div>
      <div className="spec">Başlıklar, marka adı, sıcak & premium serif. Weight 400–500. Geniş letter-spacing.</div>
    </div>
  </div>
  <div className="type-row">
    <div className="role">Body / UI</div>
    <div>
      <div style={{ fontSize: "24px", fontWeight: "400", color: "var(--ink)" }}>Inter — clear, neutral, trustworthy</div>
      <div className="spec">Gövde metni, arayüz, formlar. Weight 300–600. Klinik netlik için.</div>
    </div>
  </div>
  <div className="type-row">
    <div className="role">Eyebrow / Data</div>
    <div>
      <div style={{ fontSize: "13px", fontWeight: "600", letterSpacing: ".28em", textTransform: "uppercase", color: "var(--blue)" }}>INTER · UPPERCASE · TRACKED</div>
      <div className="spec">Etiketler, üst başlıklar, sertifika satırları. Geniş harf aralığı = premium sinyal.</div>
    </div>
  </div>
</section>

{/*  BUSINESS CARD  */}
<section className="block">
  <div className="sec-label">04 — Business Card — Eren (US)</div>
  <div className="cards">
    <div className="card">
      <div className="card-front">
        <div className="cf-top">
          <svg width="34" height="34" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="27" stroke="#12324D" strokeWidth="2.5"/><path d="M22 24 L32 42 L42 24" stroke="#1E5A8A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="32" cy="18" r="2.6" fill="#B99770"/></svg>
          <div><div className="cf-word">VESSA</div><div className="cf-tag">Istanbul Aesthetic Journeys</div></div>
        </div>
        <div>
          <div className="cf-name">Eren [Soyad]</div>
          <div className="cf-role">Partnerships Lead · US</div>
          <div className="cf-contact">+1 (703) 000 0000<br />eren@vessa.co · vessa.co</div>
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-back">
        <div className="cb-word">VESSA</div>
        <div className="cb-line">Free Consultation</div>
        <div className="qr">QR →<br />WhatsApp</div>
        <div className="cb-cta">Scan to start your journey</div>
      </div>
    </div>
  </div>
  <div className="hint"><b>Baskı notu:</b> Mat kağıt, altın çizgi <i>foil/yaldız</i> baskı (dokunulunca hissedilen premium detay). Arka yüzdeki QR doğrudan <b>wa.me</b> WhatsApp hattına açılır — kartı alan kişi hemen mesaj atar. Eren'in kartında ABD numarası şart; müşteri önce yerel biriyle konuşmak ister.</div>
</section>

{/*  BROCHURE  */}
<section className="block">
  <div className="sec-label">05 — Brochure (Tri-fold / A4)</div>
  <div className="brochure-note">Müşteri broşürü — mekanların bekleme salonunda durur, müşteri koltukta beklerken okur. Sattığı şey ameliyat değil, <b>deneyim</b>.</div>

  {/*  cover panel  */}
  <div className="panel">
    <div className="panel-cover">
      <div className="pc-logo">VESSA</div>
      <div className="pc-eyebrow">Istanbul · Aesthetic Journeys</div>
      <h2>Your transformation, on the Bosphorus.</h2>
      <p>World-class aesthetic surgery in accredited Istanbul clinics — planned end to end, at a fraction of US cost. You arrive as a guest, not a patient.</p>
    </div>
  </div>

  {/*  inside: journey  */}
  <div className="panel">
    <div className="panel-body">
      <h3>The 7-day journey</h3>
      <div className="sub">Everything is arranged before you land. You only bring yourself.</div>
      <div className="journey">
        <div className="jstep"><div className="jnum">1</div><div><div className="jt">Arrival & VIP welcome</div><div className="jd">Private airport pickup, 5-star Bosphorus-view hotel check-in.</div></div></div>
        <div className="jstep"><div className="jnum">2</div><div><div className="jt">Consultation</div><div className="jd">Face-to-face with your surgeon. Personalized plan, no surprises.</div></div></div>
        <div className="jstep"><div className="jnum">3</div><div><div className="jt">Your procedure</div><div className="jd">Accredited hospital, board-certified surgeon, full aftercare team.</div></div></div>
        <div className="jstep"><div className="jnum">4</div><div><div className="jt">Recovery by the water</div><div className="jd">Rest in comfort with daily check-ins and a dedicated coordinator.</div></div></div>
        <div className="jstep"><div className="jnum">5</div><div><div className="jt">Final check & farewell</div><div className="jd">Post-op review, then private transfer back home.</div></div></div>
        <div className="jstep"><div className="jnum">6</div><div><div className="jt">12 months of follow-up</div><div className="jd">We stay with you online, long after you return.</div></div></div>
      </div>
    </div>
  </div>

  {/*  inside: pricing  */}
  <div className="panel">
    <div className="panel-body">
      <h3>What you'd pay — and what you'll pay</h3>
      <div className="sub">Illustrative package pricing. Your exact quote comes after a free consultation.</div>
      <table className="price-tbl">
        <thead><tr><th>Procedure</th><th>Typical US</th><th>Istanbul package</th></tr></thead>
        <tbody>
          <tr><td className="proc">DHI Hair Transplant</td><td className="us">$12,000+</td><td className="ist">from $3,200</td></tr>
          <tr><td className="proc">Rhinoplasty</td><td className="us">$11,000+</td><td className="ist">from $5,250</td></tr>
          <tr><td className="proc">BBL / Body contouring</td><td className="us">$15,000+</td><td className="ist">from $7,000</td></tr>
          <tr><td className="proc">Facelift (full)</td><td className="us">$28,000+</td><td className="ist">from $12,000</td></tr>
          <tr><td className="proc">Breast lift + implants</td><td className="us">$16,000+</td><td className="ist">from $7,300</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  {/*  inside: trust  */}
  <div className="panel">
    <div className="panel-body">
      <h3>Why you can trust the journey</h3>
      <div className="sub">Our own team is on the ground in Istanbul — you're never on your own.</div>
      <div className="trust-grid">
        <div className="trust-item"><div className="ti-num">JCI</div><div className="ti-lbl">Accredited partner clinics</div></div>
        <div className="trust-item"><div className="ti-num">1:1</div><div className="ti-lbl">Dedicated coordinator</div></div>
        <div className="trust-item"><div className="ti-num">12mo</div><div className="ti-lbl">Online aftercare</div></div>
      </div>
      <div className="hint" style={{ marginTop: "24px" }}><b>Back panel CTA:</b> "Scan to talk to a real person — free, no obligation." + QR to WhatsApp + vessa.co</div>
    </div>
  </div>
</section>

<div className="foot wrap">Vessa — Istanbul Aesthetic Journeys · Brand identity draft v1 · All names, prices & certifications are placeholders pending finalization.</div>

</div>

    </>
  );
}
