import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('auth-token')?.value;
  const role = req.cookies.get('auth-role')?.value;

  if (pathname === '/login') {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/dashboard/super-admin') && role !== 'Super Admin') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/dashboard/gym-admin') && role !== 'Gym Admin') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
