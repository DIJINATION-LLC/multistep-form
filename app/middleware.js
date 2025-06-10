import { NextResponse } from 'next/server'

export function middleware(request) {
  const isLoggedIn = request.cookies.get('logged_in')?.value === 'true'

  const loginPath = new URL('/login', request.url)
  const formPath = new URL('/multistep-form', request.url)

  if (!isLoggedIn && request.nextUrl.pathname.startsWith('/multistep-form')) {
    return NextResponse.redirect(loginPath)
  }

  if (isLoggedIn && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(formPath)
  }

  return NextResponse.next()
}
