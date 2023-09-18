import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// チャット画面です
export default async function Index({
  params: { messageId }
}: {
  params: { messageId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      {messageId}
    </>
  )
}