import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { SampleData } from "@/utils/sample/Sample";
import { pathLogin } from "@/utils/path";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })

  await supabase.auth.getSession()

  if (!SampleData.isLogin) {
    if (req.nextUrl.pathname.startsWith('/writer/dashboard')) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = pathLogin();
      return NextResponse.redirect(redirectUrl);
    }

    const pattern = /^\/writer\/profile\/.*\/edit$/;
    if (pattern.test(req.nextUrl.pathname)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = pathLogin();
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res
}
