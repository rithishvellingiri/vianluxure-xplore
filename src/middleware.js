import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Perform permanent 301 redirects for legacy capitalized routes using recommended safe URL constructor
  if (pathname === '/About') {
    return NextResponse.redirect(new URL('/about', request.url), 301);
  }

  if (pathname === '/Contact') {
    return NextResponse.redirect(new URL('/contact', request.url), 301);
  }

  return NextResponse.next();
}

// Highly optimized matcher so middleware only fires on exact capitalized legacy routes
export const config = {
  matcher: ['/About', '/Contact'],
};
