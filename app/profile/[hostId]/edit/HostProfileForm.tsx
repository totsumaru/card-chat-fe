"use client"

import InputImage from "@/components/image/InputImage";
import React, { useState } from "react";
import SaveButton from "@/components/button/SaveButton";
import { sleep } from "@/utils/sample/sleep";

type Props = {
  name: string
  headline: string,
  introduction: string,
  company: {
    name: string,
    position: string,
    tel: string,
    email: string,
    website: string,
  }
  imageUrl: string
}

/**
 * プロフィール編集のInputです
 *
 * clientでの処理のためのコンポーネントです。
 */
export default function HostProfileForm(props: Props) {
  const [values, setValues] = useState<Props>(props)
  const [image, setImage] = useState<string>(props.imageUrl || "")

  const handleSaveButtonClick = async () => {
    await sleep()
  }

  return (
    <>
      <div className="mt-5">
        <InputImage image={image} setImage={setImage}/>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

          {/* 名前 */}
          <div className="sm:col-span-4">
            <Label text={"表示名"}/>
            <div className="mt-2">
              <input
                type="text"
                placeholder="鈴木 太郎"
                className={inputClassName}
                value={values.name}
                onChange={(e) => setValues((prevState) => (
                  { ...prevState, name: e.target.value })
                )}
              />
            </div>
          </div>

          {/* 会社名 */}
          <div className="sm:col-span-3">
            <Label text={"会社名"}/>
            <div className="mt-2">
              <input
                type="text"
                placeholder="株式会社ABC"
                className={inputClassName}
                value={values.company.name}
                onChange={(e) => setValues((prevState) => (
                  {
                    ...prevState,
                    company: { ...prevState.company, name: e.target.value }
                  })
                )}
              />
            </div>
          </div>

          {/* 所属 */}
          <div className="sm:col-span-3">
            <Label text={"所属"}/>
            <div className="mt-2">
              <input
                type="text"
                placeholder="営業部 営業一課"
                className={inputClassName}
                value={values.company.position}
                onChange={(e) => setValues((prevState) => (
                  {
                    ...prevState,
                    company: { ...prevState.company, position: e.target.value }
                  })
                )}
              />
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
                value={values.company.email}
                onChange={(e) => setValues((prevState) => (
                  {
                    ...prevState,
                    company: { ...prevState.company, email: e.target.value }
                  })
                )}
              />
            </div>
          </div>

          {/*　電話番号 */}
          <div className="sm:col-span-4">
            <Label text={"電話番号"}/>
            <div className="mt-2">
              <input
                name="tel"
                type="tel"
                placeholder="090-1234-5678"
                className={inputClassName}
                value={values.company.tel}
                onChange={(e) => setValues((prevState) => (
                  {
                    ...prevState,
                    company: { ...prevState.company, tel: e.target.value }
                  })
                )}
              />
            </div>
          </div>

          {/*　Webサイト */}
          <div className="sm:col-span-4">
            <Label text={"ホームページ"}/>
            <div className="mt-2">
              <input
                type="url"
                placeholder="https://example.com"
                className={inputClassName}
                value={values.company.website}
                onChange={(e) => setValues((prevState) => (
                  {
                    ...prevState,
                    company: { ...prevState.company, website: e.target.value }
                  })
                )}
              />
            </div>
          </div>

          {/*　ヘッドライン */}
          <div className="sm:col-span-4">
            <Label text={"ヘッドライン"}/>
            <div className="mt-2">
              <textarea
                rows={2}
                placeholder="私たちは、お客様を笑顔にするお手伝いをしています。"
                className={inputClassName}
                value={values.headline}
                onChange={(e) => setValues((prevState) => (
                  { ...prevState, headline: e.target.value }
                ))}
              />
            </div>
          </div>

          {/*　自己紹介 */}
          <div className="sm:col-span-4">
            <Label text={"自己紹介"}/>
            <div className="mt-2">
              <textarea
                rows={7}
                className={inputClassName}
                value={values.introduction}
                onChange={(e) => setValues((prevState) => (
                  { ...prevState, introduction: e.target.value }
                ))}
              />
            </div>
          </div>

        </div>

        {/* 保存ボタン */}
        <div className="mt-6">
          <SaveButton clickHandler={handleSaveButtonClick}/>
        </div>

      </div>
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
