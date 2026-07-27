import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');
  const path = request.nextUrl.pathname;
  
  const protectedPaths = ['/dashboard', '/earnings', '/admin', '/partner/join'];
  const isProtected = protectedPaths.some(p => path.startsWith(p));
  
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/earnings', '/admin/:path*', '/partner/join'],
};
