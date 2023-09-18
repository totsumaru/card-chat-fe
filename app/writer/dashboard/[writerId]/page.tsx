import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// ダッシュボードです
export default async function Index({
  params: { writerId }
}: {
  params: { writerId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      {writerId}
    </>
  )
}