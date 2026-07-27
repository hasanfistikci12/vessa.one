const fs = require('fs');
let html = fs.readFileSync('../partner-kit.html', 'utf8');

let bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
let body = bodyMatch ? bodyMatch[1] : '';

// Extract styles to include locally
let styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
let style = styleMatch ? styleMatch[1] : '';

// Remove root vars since globals.css has them, or keep them scoped to a class
// Actually just keeping the style block in JSX works
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
body = body.replace(/style="([^"]+)"/g, (match, p1) => {
  let styles = p1.split(';').filter(Boolean).map(s => {
    let [key, value] = s.split(':').map(str => str.trim());
    key = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
    return `${key}: "${value}"`;
  });
  return `style={{ ${styles.join(', ')} }}`;
});

const tsx = `export default function PartnerKitPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: \`\n${style}\n\` }} />
      ${body}
    </>
  );
}
`;

fs.mkdirSync('src/app/partner-kit', { recursive: true });
fs.writeFileSync('src/app/partner-kit/page.tsx', tsx);
console.log("Converted partner-kit.html to src/app/partner-kit/page.tsx");
