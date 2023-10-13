import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CreateChatButton from "@/app/admin/CreateChatButton";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = await supabase.auth.getSession()

  if (user?.email !== "techstart35@gmail.com") {
    return (
      <div>
        認証されていません。Email: {user?.email}
      </div>
    )
  }

  return (
    <div>
      <CreateChatButton token={session?.access_token || ""}/>
    </div>
  )
}