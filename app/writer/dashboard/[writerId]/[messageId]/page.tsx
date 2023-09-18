import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// チャットの登録情報を表示/編集する画面です
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