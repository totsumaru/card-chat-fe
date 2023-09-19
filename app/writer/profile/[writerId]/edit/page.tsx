import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import InputImage from "@/components/image/InputImage";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

// Writerのプロフィールの編集画面です
export default async function Index({
  params: { writerId }
}: {
  params: { writerId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl py-20">

        {/* 戻るリンク */}
        <div>
          <Link
            href={`/writer/profile/w-123`}
            className="text-blue-600 flex items-center"
          >
            <ChevronLeftIcon className="inline w-4 h-4 mr-1"/>
            戻る
          </Link>
        </div>

        <div className="mt-5">
          <InputImage/>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

            {/* 名前 */}
            <div className="sm:col-span-4">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                名前
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="鈴木 太郎"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
                   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 会社名 */}
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                会社名
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="株式会社ABC"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
                   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 所属 */}
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                所属
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="営業部 営業一課"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
                   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/*　メールアドレス */}
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                メールアドレス
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="abc@example.com"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
                   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/*　電話番号 */}
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                電話番号
              </label>
              <div className="mt-2">
                <input
                  name="tel"
                  type="tel"
                  autoComplete="tel"
                  placeholder="090-1234-5678"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
                   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/*　Webサイト */}
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                ホームページ
              </label>
              <div className="mt-2">
                <input
                  type="url"
                  placeholder="https://example.com"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
                   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/*　コメント */}
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                コメント
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  placeholder="コメントを記入"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
                   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          </div>

          {/* 保存ボタン */}
          <div className="mt-6">
            <Link
              href={`/writer/profile/w-123`}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm shadow-sm
               font-semibold text-white hover:bg-indigo-500 focus-visible:outline
               focus-visible:outline-2 focus-visible:outline-offset-2
               focus-visible:outline-indigo-600"
            >
              保存する
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}