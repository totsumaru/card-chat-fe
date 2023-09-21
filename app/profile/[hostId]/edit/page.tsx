import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ReturnLink from "@/components/link/ReturnLink";
import Container from "@/components/container/Container";
import { pathDashboard } from "@/utils/path";
import Header from "@/components/header/Header";
import HostProfileForm from "@/app/profile/[hostId]/edit/HostProfileForm";
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

  const host = await GetUserByID(currentUserId)

  // inputへの引数です
  const inputProps = {
    name: host?.name || "",
    headline: host?.headline || "",
    introduction: host?.introduction || "",
    company: {
      name: host?.company.name || "",
      position: host?.company.position || "",
      tel: host?.company.tel || "",
      email: host?.company.email || "",
      website: host?.company.website || "",
    },
    imageUrl: host?.avatarUrl || "",
  }

  return (
    <>
      <Header left={""} right={""} isHost={hostId === currentUserId}/>
      <Container>
        {/* 戻るリンク */}
        <ReturnLink text={"ダッシュボード"} url={pathDashboard()} textWhite={false}/>

        <h1 className="text-lg font-bold mt-2">プロフィールの編集</h1>

        <HostProfileForm {...inputProps}/>
      </Container>
    </>
  )
}

