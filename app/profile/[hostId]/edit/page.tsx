import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ReturnLink from "@/components/link/ReturnLink";
import Container from "@/components/container/Container";
import { pathDashboard } from "@/utils/path";
import Header from "@/components/header/Header";
import ProfileEditForms from "@/app/profile/[hostId]/edit/ProfileEditForms";
import { currentUserId } from "@/utils/sample/Sample";
import GetUserByID from "@/utils/api/getUserByID";
import { User_x } from "@/utils/sample/User_x";
import NotFound from "@/components/error/404";

export const dynamic = 'force-dynamic'

// Hostのプロフィールの編集画面です
export default async function Index({
  params: { hostId }
}: {
  params: { hostId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = await supabase.auth.getSession()

  let host: User_x | undefined
  try {
    host = await GetUserByID(currentUserId)
  } catch (e) {
    console.error(e)
  }

  return (
    <>
      <Header left={""} right={""} isHost={hostId === currentUserId}/>
      <Container>
        {/* 戻るリンク */}
        <ReturnLink text={"ダッシュボード"} url={pathDashboard()} textWhite={false}/>

        <h1 className="text-lg font-bold mt-3">プロフィールの編集</h1>

        {host
          ? <ProfileEditForms session={session} host={host}/>
          : <NotFound/>
        }

      </Container>
    </>
  )
}

