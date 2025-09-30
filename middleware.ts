import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
   console.log('====================================');
   console.log(session);
   console.log('====================================');
  // Protect dashboard, orders, cart routes
  if ( 
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/orders') ||
    req.nextUrl.pathname.startsWith('/cart')
  ) {
    if (!session) {
   console.log('==================================== no session' );

      // Not logged in, redirect to home
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Redirect logged-in users away from login/register
  if (
    req.nextUrl.pathname === '/auth' &&
    session
  ) {
    // Already logged in, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/orders/:path*',
    '/cart/:path*',
    '/',
  ],
};
