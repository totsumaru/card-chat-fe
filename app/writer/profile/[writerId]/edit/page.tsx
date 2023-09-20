import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import InputImage from "@/components/image/InputImage";
import ReturnLink from "@/components/link/ReturnLink";
import BaseHeader from "@/components/header/BaseHeader";
import Container from "@/components/container/Container";
import { pathProfile } from "@/utils/path";

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
      <BaseHeader left={""} right={""}/>
      <Container>
        {/* 戻るリンク */}
        <ReturnLink text={"戻る"} url={pathProfile(writerId)} textWhite={false}/>

        <h1 className="text-lg font-bold mt-2">プロフィールの編集</h1>

        <div className="mt-5">
          <InputImage/>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

            {/* 名前 */}
            <div className="sm:col-span-4">
              <Label text={"表示名"}/>
              <div className="mt-2">
                <input type="text" placeholder="鈴木 太郎" className={inputClassName}/>
              </div>
            </div>

            {/* 会社名 */}
            <div className="sm:col-span-3">
              <Label text={"会社名"}/>
              <div className="mt-2">
                <input type="text" placeholder="株式会社ABC" className={inputClassName}/>
              </div>
            </div>

            {/* 所属 */}
            <div className="sm:col-span-3">
              <Label text={"所属"}/>
              <div className="mt-2">
                <input type="text" placeholder="営業部 営業一課" className={inputClassName}/>
              </div>
            </div>

            {/*　メールアドレス */}
            <div className="sm:col-span-4">
              <Label text={"メールアドレス"}/>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="abc@example.com"
                  className={inputClassName}
                />
              </div>
            </div>

            {/*　電話番号 */}
            <div className="sm:col-span-4">
              <Label text={"電話番号"}/>
              <div className="mt-2">
                <input name="tel" type="tel" placeholder="090-1234-5678" className={inputClassName}/>
              </div>
            </div>

            {/*　Webサイト */}
            <div className="sm:col-span-4">
              <Label text={"ホームページ"}/>
              <div className="mt-2">
                <input type="url" placeholder="https://example.com" className={inputClassName}/>
              </div>
            </div>

            {/*　標題 */}
            <div className="sm:col-span-4">
              <Label text={"標題"}/>
              <div className="mt-2">
                <textarea rows={4} placeholder="私たちは、お客様を笑顔にするお手伝いをしています。" className={inputClassName}/>
              </div>
            </div>

            {/*　コメント */}
            <div className="sm:col-span-4">
              <Label text={"コメント"}/>
              <div className="mt-2">
                <textarea rows={4} className={inputClassName}/>
              </div>
            </div>

          </div>

          {/* 保存ボタン */}
          <div className="mt-6">
            <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm shadow-sm
               font-semibold text-white hover:bg-indigo-500 focus-visible:outline
               focus-visible:outline-2 focus-visible:outline-offset-2
               focus-visible:outline-indigo-600"
            >
              保存する
            </button>
          </div>

        </div>
      </Container>
    </>
  )
}

// ラベルです
function Label({ text }: { text: string }) {
  return (
    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
      {text}
    </label>
  )
}

// inputのクラス名です
const inputClassName = `
block w-full rounded-md border-0 px-3 py-2 text-gray-900
 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
`