import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ReturnLink from "@/components/link/ReturnLink";
import Container from "@/components/container/Container";
import { pathDashboard } from "@/utils/path";
import Header from "@/components/header/Header";
import EditForms from "@/app/profile/[hostId]/edit/EditForms";
import { currentUserId } from "@/utils/sample/Sample";
import GetUserByID from "@/utils/api/getUserByID";

// Hostのプロフィールの編集画面です
export default async function Index({
  params: { hostId }
}: {
  params: { hostId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = await supabase.auth.getSession()

  const host = await GetUserByID(currentUserId)

  return (
    <>
      <Header left={""} right={""} isHost={hostId === currentUserId}/>
      <Container>
        {/* 戻るリンク */}
        <ReturnLink text={"ダッシュボード"} url={pathDashboard()} textWhite={false}/>

        <h1 className="text-lg font-bold mt-2">プロフィールの編集</h1>

        <EditForms session={session} host={host}/>
      </Container>
    </>
  )
}

