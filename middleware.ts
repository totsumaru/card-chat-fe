import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { pathDashboard, pathLogin } from "@/utils/path";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const session = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = pathLogin();
      return NextResponse.redirect(redirectUrl);
    }

    const pattern = /^\/profile\/.*\/edit$/
    if (pattern.test(req.nextUrl.pathname)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = pathLogin();
      return NextResponse.redirect(redirectUrl);
    }

    const patternChatEdit = /^\/chat\/.*\/edit$/
    if (patternChatEdit.test(req.nextUrl.pathname)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = pathLogin();
      return NextResponse.redirect(redirectUrl);
    }
  } else {
    // ログインしている状態

    if (req.nextUrl.pathname.startsWith('/login')
      || req.nextUrl.pathname.startsWith("/signup")) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = pathDashboard();
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res
}
