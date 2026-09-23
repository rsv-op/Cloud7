
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pin = request.cookies.get('kitchen_pin')?.value;
  
  // Developer master bypass
  const isDev = pin === '9999';

  if (!pin) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isDev) {
    return NextResponse.next();
  }

  // Strict role isolation
  if (pathname.startsWith('/cook') && pin !== '1111') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (pathname.startsWith('/dispatch') && pin !== '2222') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (pathname.startsWith('/owner') && pin !== '3333') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cook/:path*', '/dispatch/:path*', '/owner/:path*'],
};
