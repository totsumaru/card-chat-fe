import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ReturnLink from "@/components/link/ReturnLink";
import Container from "@/components/container/Container";
import { pathDashboard } from "@/utils/path";
import Header from "@/components/header/Header";
import { SampleData } from "@/utils/sample/Sample";
import HostProfileForm from "@/app/profile/[hostId]/edit/HostProfileForm";

// Hostのプロフィールの編集画面です
export default async function Index({
  params: { hostId }
}: {
  params: { hostId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  const mock = SampleData

  // inputへの引数です
  const inputProps = {
    name: mock.host.name,
    headline: mock.host.headline,
    introduction: mock.host.introduction,
    company: {
      name: mock.host.company.name,
      position: mock.host.company.position,
      tel: mock.host.company.tel,
      email: mock.host.company.email,
      website: mock.host.company.website,
    },
    imageUrl: mock.host.avatarUrl,
  }

  return (
    <>
      <Header left={""} right={""}/>
      <Container>
        {/* 戻るリンク */}
        <ReturnLink text={"ダッシュボード"} url={pathDashboard()} textWhite={false}/>

        <h1 className="text-lg font-bold mt-2">プロフィールの編集</h1>

        <HostProfileForm {...inputProps}/>
      </Container>
    </>
  )
}

