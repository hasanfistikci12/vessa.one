export function VessaLogo({ className = "w-16 h-16", dark = false }: { className?: string; dark?: boolean }) {
  const strokeColor = dark ? "#FFFFFF" : "#12324D";
  const pathColor = dark ? "#5FA8D3" : "#1E5A8A";
  
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="27" stroke={strokeColor} strokeWidth="2.5" />
      <path d="M22 24 L32 42 L42 24" stroke={pathColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="18" r="2.6" fill="#B99770" />
    </svg>
  );
}
