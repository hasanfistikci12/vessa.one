const fs = require('fs');
let html = fs.readFileSync('../landing.html', 'utf8');

// Extract body
let bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
let body = bodyMatch ? bodyMatch[1] : '';

// Convert class to className
body = body.replace(/class=/g, 'className=');

// Convert self-closing tags
body = body.replace(/<br>/g, '<br />');
body = body.replace(/<img(.*?)>/g, (match) => {
  if (match.endsWith('/>')) return match;
  return match.replace(/>$/, ' />');
});

// Convert comments
body = body.replace(/<!--(.*?)-->/g, '{/* $1 */}');

// Convert SVG attributes
body = body.replace(/stroke-width/g, 'strokeWidth');
body = body.replace(/stroke-linecap/g, 'strokeLinecap');
body = body.replace(/stroke-linejoin/g, 'strokeLinejoin');

// Convert inline styles
body = body.replace(/style="([^"]+)"/g, (match, p1) => {
  let styles = p1.split(';').filter(Boolean).map(s => {
    let [key, value] = s.split(':').map(str => str.trim());
    key = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
    return `${key}: "${value}"`;
  });
  return `style={{ ${styles.join(', ')} }}`;
});

// Replace the static "Eren" info with dynamic {partner.firstName} / {partner.businessName}
body = body.replace(
  /<div className="tperson"><div className="av">E<\/div><div className="tn">Eren<\/div><div className="tr">US contact<\/div><div className="tl">Your first point of contact, right here at home.<\/div><\/div>/,
  `
      <div className="tperson">
        <div className="av">{partner.firstName ? partner.firstName.charAt(0).toUpperCase() : 'P'}</div>
        <div className="tn">{partner.firstName || partner.businessName}</div>
        <div className="tr">{partner.businessName || 'Partner'}</div>
        <div className="tl">Your first point of contact, right here at home.</div>
      </div>`
);

// We need to inject the dynamic whatsapp link, the text says "Or call Eren directly: +1 (703) 000 0000"
body = body.replace(
  /<small>Or call Eren directly: \+1 \(703\) 000 0000<\/small>/,
  `<small>Referred by {partner.businessName}</small>`
);

// We should replace `<a href="#" className="btn-light">` with the WhatsApp link.
// We can use a pre-filled message like "Hi, I was referred by {partner.code}"
body = body.replace(
  /<a href="#" className="btn-light">/,
  `<a href={\`https://wa.me/1234567890?text=Hi,%20I%20was%20referred%20by%20\${partner.code}%20and%20I'd%20like%20to%20learn%20more.\`} target="_blank" className="btn-light">`
);

const tsx = `import { getPartnerByReferralCode } from '@/lib/db/partners';
import { notFound } from 'next/navigation';

export default async function ReferralPage({ params }: { params: { code: string } }) {
  const partner = await getPartnerByReferralCode(params.code);
  
  if (!partner) {
    return notFound();
  }

  return (
    <>
${body}
    </>
  );
}
`;

fs.writeFileSync('src/app/r/[code]/page.tsx', tsx);
console.log("Converted landing.html to src/app/r/[code]/page.tsx");
