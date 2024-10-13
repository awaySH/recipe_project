import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();

  // 보호된 경로 목록
  const protectedPaths = ['/dashboard', '/profile', '/settings'];

  if (!session && protectedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
