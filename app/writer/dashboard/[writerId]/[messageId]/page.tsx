import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

// チャットの登録情報を表示/編集する画面です
export default async function Index({
  params: { writerId, messageId }
}: {
  params: { writerId: string, messageId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <div className="mx-auto max-w-7xl ">

        {/* ヘッダー */}
        <div className="flex justify-between items-center bg-blue-500 text-white px-5 py-3">
          {/* 左側 */}
          <Link href={"#"}>
            <div className="flex items-center">
              <p className="">戸塚翔太</p>
            </div>
          </Link>

          {/* 右側 */}
          <div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <div className="border-b border-gray-900/10 pb-12">

            <div className="w-fit mt-5">
              <Link
                href={`/writer/dashboard/w-123`}
                className="text-blue-600 flex items-center"
              >
                <ChevronLeftIcon className="inline w-4 h-4 mr-1"/>
                戻る
              </Link>
            </div>

            <h2 className="font-bold mt-5">
              この内容は、相手には表示されません。<br/>
              自分の表示のみで利用します。
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

              {/* id */}
              <div className="sm:col-span-4">
                <label htmlFor="first-name" className="block text-sm leading-6 text-gray-900">
                  id
                </label>
                <p className="text-gray-500 text-sm">12306f9e-56a0-11ee-8c99-0242ac120002</p>
              </div>

              {/* 表示名 */}
              <div className="sm:col-span-4">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  表示名
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="鈴木 様"
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
                   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/*　メモ */}
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  メモ
                </label>
                <div className="mt-2">
                <textarea
                  rows={7}
                  placeholder="メモを記入"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
                   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
              </div>

            </div>

            {/* 保存ボタン */}
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 mt-3 text-sm font-semibold text-white
               shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
               focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              保存する
            </button>

          </div>
        </div>
      </div>
    </>
  )
}