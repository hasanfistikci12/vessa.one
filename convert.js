const fs = require('fs');
let html = fs.readFileSync('../homepage.html', 'utf8');

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

const tsx = `import Link from 'next/link';

export default function HomePage() {
  return (
    <>
${body}
    </>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', tsx);
console.log("Converted homepage.html to src/app/page.tsx");
