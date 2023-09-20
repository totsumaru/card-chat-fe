import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ReturnLink from "@/components/link/ReturnLink";
import Container from "@/components/container/Container";
import { pathProfile } from "@/utils/path";
import Header from "@/components/header/Header";
import { SampleData } from "@/utils/sample/Sample";
import WriterProfileForm from "@/app/writer/profile/[writerId]/edit/WriterProfileForm";

// Writerのプロフィールの編集画面です
export default async function Index({
  params: { writerId }
}: {
  params: { writerId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  const mock = SampleData

  // inputへの引数です
  const inputProps = {
    name: mock.writer.name,
    headline: mock.writer.headline,
    introduction: mock.writer.introduction,
    company: {
      name: mock.writer.company.name,
      position: mock.writer.company.position,
      tel: mock.writer.company.tel,
      email: mock.writer.company.email,
      website: mock.writer.company.website,
    },
    imageUrl: mock.writer.avatarUrl,
  }

  return (
    <>
      <Header left={""} right={""}/>
      <Container>
        {/* 戻るリンク */}
        <ReturnLink text={"戻る"} url={pathProfile(writerId)} textWhite={false}/>

        <h1 className="text-lg font-bold mt-2">プロフィールの編集</h1>

        <WriterProfileForm {...inputProps}/>
      </Container>
    </>
  )
}

