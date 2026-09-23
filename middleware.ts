// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pin = request.cookies.get('kitchen_pin')?.value;

  // Master developer bypass is the only permitted access right now
  const isDev = pin === 'dev_token' || pin === '9999';

  if (!pin || !isDev) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cook/:path*', '/dispatch/:path*', '/owner/:path*'],
};
