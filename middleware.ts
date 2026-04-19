import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isLoggedIn = !!token;
    const isVerified = token?.emailVerified === true;
    
    const pathname = req.nextUrl.pathname;
    
    const isProtectedRoute = pathname.startsWith('/vendor');
    const isAuthRoute = pathname === '/sign-in' || pathname === '/sign-up';
    const isVerifyRoute = pathname === '/verify-email';
    
    // 1. Not logged in
    if (!isLoggedIn) {
      if (isProtectedRoute || isVerifyRoute) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
      }
      return NextResponse.next();
    }
    
    // 2. Logged In, but NOT verified
    if (isLoggedIn && !isVerified) {
      if (isProtectedRoute || isAuthRoute) {
        return NextResponse.redirect(new URL('/verify-email', req.url));
      }
      return NextResponse.next();
    }
    
    // 3. Logged in AND verified
    if (isLoggedIn && isVerified) {
      if (isAuthRoute || isVerifyRoute) {
        return NextResponse.redirect(new URL('/vendor/dashboard', req.url));
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true // Let the middleware logic above dictate redirects
    }
  }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
