import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Writerのプロフィールの編集画面です
export default async function Index({
  params: { writerId }
}: {
  params: { writerId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <h1>プロフィールの編集画面です</h1>
      {writerId}
    </>
  )
}