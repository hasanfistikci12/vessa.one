const fs = require('fs');
let html = fs.readFileSync('../brand-identity.html', 'utf8');

let bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
let body = bodyMatch ? bodyMatch[1] : '';

// Extract styles to include locally
let styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
let style = styleMatch ? styleMatch[1] : '';

// Convert classes and tags
body = body.replace(/class=/g, 'className=');
body = body.replace(/<br>/g, '<br />');
body = body.replace(/<!--(.*?)-->/g, '{/* $1 */}');
body = body.replace(/<hr(.*?)>/g, (match) => {
  if (match.endsWith('/>')) return match;
  return match.replace(/>$/, ' />');
});
body = body.replace(/<img(.*?)>/g, (match) => {
  if (match.endsWith('/>')) return match;
  return match.replace(/>$/, ' />');
});

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

const tsx = `export default function BrandIdentityPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: \`\n${style}\n\` }} />
      ${body}
    </>
  );
}
`;

fs.mkdirSync('src/app/brand', { recursive: true });
fs.writeFileSync('src/app/brand/page.tsx', tsx);
console.log("Converted brand-identity.html to src/app/brand/page.tsx");
