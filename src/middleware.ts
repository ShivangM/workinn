import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
  '/dashboard',
  '/settings',
  '/profile',
  'manage-service',
];

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const signInURL = new URL('/signin', request.url);

  const token = request.cookies.get('token')?.value;

  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(signInURL);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|static|.*\\..*).*)',
  ],
};
