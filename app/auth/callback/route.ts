import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { PostCreateHost } from "@/utils/api/postCreateHost";

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
    const { data: { session } } = await supabase.auth.getSession()

    try {
      // ホストを作成します
      await PostCreateHost(session?.access_token || "")
    } catch (error) {
      console.error("エラーが発生しました", error);
      return new Response("Error occurred", { status: 500 })
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
