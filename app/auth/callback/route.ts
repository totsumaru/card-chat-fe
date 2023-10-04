import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { PostCreateHost } from "@/utils/api/postCreateHost";
import { pathError } from "@/utils/path";

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const name = requestUrl.searchParams.get('name')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.access_token || !name) {
      NextResponse.redirect(`${requestUrl.origin}${pathError("エラーが発生しました")}`)
      return
    }

    try {
      // ホストを作成します
      await PostCreateHost(session.access_token, name)
    } catch (error) {
      console.error("エラーが発生しました", error);
      return new Response("Error occurred", { status: 500 })
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
