import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { EnvelopeIcon, GlobeAsiaAustraliaIcon, PhoneIcon } from "@heroicons/react/24/outline";
import ReturnToChatLink from "@/components/link/ReturnToChatLink";
import Header from "@/components/header/Header";
import Avatar from "@/components/image/Avatar";
import GetHost from "@/utils/api/getHost";
import { ReactNode } from "react";

export const dynamic = 'force-dynamic'

/**
 * ホストのプロフィールページです
 */
export default async function Index({
  params: { hostId }
}: {
  params: { hostId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  let host
  try {
    const res = await GetHost(hostId)
    host = res.host
  } catch (e) {
    console.error(e)
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-violet-50">
      {/* ヘッダー */}
      <Header left={""} right={""} isHost={hostId === user?.id}/>

      {/* 本体 */}
      <div className="mx-auto max-w-7xl pt-5 px-4 sm:px-6 lg:px-8 min-h-screen">
        <section className="isolate overflow-hidden px-6 lg:px-8">
          <div className="relative mx-auto max-w-2xl py-16 sm:py-16 lg:max-w-4xl">
            <ReturnToChatLink/>

            <figure className="grid grid-cols-1 items-center mt-5 gap-x-6 gap-y-8 lg:gap-x-10">
              {/*　ヘッドライン */}
              <div className="relative col-span-2 lg:col-start-1 lg:row-start-2">
                <blockquote className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                  <p>{host?.headline}</p>
                </blockquote>
              </div>

              {/*　PFP画像(SP表示の順番のため、タイトルの下に記述) */}
              <div className="col-end-1 w-16 lg:row-span-4 lg:w-52">
                {host?.avatarUrl ? (
                  <Avatar widthHeight={"full"} imageUrl={host.avatarUrl} ring/>
                ) : (
                  <Avatar widthHeight={"full"} ring/>
                )}
              </div>

              {/* 概要 */}
              <figcaption className="text-base lg:col-start-1 lg:row-start-3">
                <div className="text-gray-500 gap-2">
                  <p className="">{host?.company.name}</p>
                  <p className="text-sm">{host?.company.position}</p>
                </div>
                <p className="font-semibold text-gray-900 mt-1 sm:mt-3 sm:text-lg">
                  {host?.name}
                </p>
              </figcaption>
            </figure>

            {/* 情報 */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* 電話番号 */}
              <InfoGrid icon={(
                <PhoneIcon className="w-4 h-4"/>
              )} kind={"電話番号"} value={host?.company.tel || ""}/>

              {/* メールアドレス */}
              <InfoGrid icon={(
                <EnvelopeIcon className="w-4 h-4"/>
              )} kind={"メールアドレス"} value={host?.company.email || ""}/>

              {/* ホームページ */}
              <InfoGrid icon={(
                <GlobeAsiaAustraliaIcon className="w-4 h-4"/>
              )} kind={"Webサイト"} value={host?.company.website || ""}/>
            </div>

            {/* 備考 */}
            <div className="text-gray-600 mt-7">
              <p>{host?.introduction}</p>
            </div>

          </div>
        </section>
      </div>
    </div>
  )
}

// Gridのアイテムです
function InfoGrid({ icon, kind, value }: {
  icon: ReactNode,
  kind: "電話番号" | "メールアドレス" | "Webサイト",
  value: string,
}) {
  let link: string | undefined;
  let isExternal: boolean = false;

  switch (kind) {
    case "メールアドレス":
      link = undefined; // メールはリンクもクリックでコピーも無し
      break;
    case "電話番号":
      link = value && `tel:${value}`;
      break;
    case "Webサイト":
      link = value;
      isExternal = true;
      break;
  }

  return (
    <div className="relative flex items-center space-x-3 rounded-lg border
     border-gray-300 px-3 py-3 shadow-sm hover:border-gray-400"
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        {link ? (
          <a href={link} className="focus:outline-none" target={isExternal ? "_blank" : undefined}
             rel={isExternal ? "noopener noreferrer" : undefined}>
            <span className="absolute inset-0" aria-hidden="true"/>
            <p className="text-sm font-medium text-gray-900">{kind}</p>
            <p className="truncate text-gray-500">{value}</p>
          </a>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-900">{kind}</p>
            <p className="truncate text-gray-500">{value || "-"}</p>
          </>
        )}
      </div>
    </div>
  );
}
