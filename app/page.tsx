import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LogoutButton from "@/components/button/LogoutButton";

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <>
      hello
      <p>userID: {user?.id}</p>
      <p>token: {session?.access_token}</p>
      <LogoutButton/>
    </>
  )
}
