import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Perform permanent 301 redirects for legacy capitalized routes
  if (pathname === '/About') {
    url.pathname = '/about';
    return NextResponse.redirect(url, 301);
  }

  if (pathname === '/Contact') {
    url.pathname = '/contact';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Highly optimized matcher so middleware only fires on exact capitalized legacy routes
export const config = {
  matcher: ['/About', '/Contact'],
};
