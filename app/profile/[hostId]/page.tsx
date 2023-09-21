import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { EnvelopeIcon, GlobeAsiaAustraliaIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ReturnToChatLink from "@/components/link/ReturnToChatLink";
import React from "react";
import Header from "@/components/header/Header";
import Avatar from "@/components/avatar/Avatar";
import { currentUserId } from "@/utils/sample/Sample";
import GetUserByID from "@/utils/api/getUserByID";

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

  const host = await GetUserByID(hostId)

  return (
    <div className="bg-gradient-to-r from-amber-50 to-violet-50">
      {/* ヘッダー */}
      <Header
        left={<ReturnToChatLink textWhite={true}/>}
        right={""}
        isHost={hostId === currentUserId}
      />

      {/* 本体 */}
      <div className="mx-auto max-w-7xl pt-5 px-4 sm:px-6 lg:px-8 min-h-screen">
        <section className="isolate overflow-hidden px-6 lg:px-8">
          <div className="relative mx-auto max-w-2xl py-24 sm:py-20 lg:max-w-4xl">

            <figure className="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">

              {/*　ヘッドライン */}
              <div className="relative col-span-2 lg:col-start-1 lg:row-start-2">
                <blockquote className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                  <p>{host?.headline}</p>
                </blockquote>
              </div>

              {/*　PFP画像(SP表示の順番のため、タイトルの下に記述) */}
              <div className="col-end-1 w-16 lg:row-span-4 lg:w-52">
                {host?.avatarUrl ? (
                  <Avatar width={"full"} height={"full"} imageUrl={host.avatarUrl}/>
                ) : (
                  <Avatar width={"full"} height={"full"}/>
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

// 背景の引用符号のSVGです
function BackgroundSVG() {
  return (
    <svg
      viewBox="0 0 162 128"
      fill="none"
      aria-hidden="true"
      className="absolute -top-12 left-0 -z-10 h-32 stroke-gray-900/10"
    >
      <path
        id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
        d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
      />
      <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x={86}/>
    </svg>
  )
}

// Gridのアイテムです
function InfoGrid({
  icon,
  kind,
  value
}: {
  icon: React.ReactNode,
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
      link = `tel:${value}`;
      break;
    case "Webサイト":
      link = value;
      isExternal = true;
      break;
  }

  return (
    <div
      className="relative flex items-center space-x-3 rounded-lg border border-gray-300 px-3 py-3 shadow-sm hover:border-gray-400">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        {link ? (
          <Link href={link} className="focus:outline-none" target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}>
            <span className="absolute inset-0" aria-hidden="true"/>
            <p className="text-sm font-medium text-gray-900">{kind}</p>
            <p className="truncate text-gray-500">{value}</p>
          </Link>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-900">{kind}</p>
            <p className="truncate text-gray-500">{value}</p>
          </>
        )}
      </div>
    </div>
  );
}
