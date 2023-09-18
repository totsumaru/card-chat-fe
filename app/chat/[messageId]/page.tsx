import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Chat from "@/components/chat/Chat";

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
      {/*<Chat/>*/}
      <Chat/>
    </>
  )
}