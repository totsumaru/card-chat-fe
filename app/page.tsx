import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const user = await supabase.auth.getUser()
  const session = await supabase.auth.getSession()

  console.log(user)
  console.log(session)

  return (
    <>hello</>
  )
}
