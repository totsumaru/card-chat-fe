import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { PostCreateHost } from "@/utils/api/postCreateHost";

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  // バックエンドでホストを作成します
  if (!session?.access_token) {
    console.error("アクストークンが取得できません");
    return new Response("Access token not available", { status: 401 });
  }

  try {
    await PostCreateHost(session.access_token)
  } catch (error) {
    console.error("エラーが発生しました");
    return new Response("Error occurred", { status: 500 })
  }

  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
