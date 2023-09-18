import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// 顧客情報の登録画面です
export default async function Index({
  params: { writerId, messageId }
}: {
  params: { writerId: string, messageId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      {writerId}, {messageId}
    </>
  )
}