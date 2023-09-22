"use client"

import InputImage from "@/components/image/InputImage";
import React, { useState } from "react";
import SaveButton from "@/components/button/SaveButton";
import { User } from "@/utils/sample/User";
import { PostProfileEdit } from "@/utils/api/postProfileEdit";
import { Session } from "@supabase/gotrue-js";
import { currentUserSession } from "@/utils/sample/Sample";

type Props = {
  session: Session | null
  host: User | undefined
}

/**
 * プロフィール編集のInputです
 *
 * clientでの処理のためのコンポーネントです。
 */
export default function EditForms({ host }: Props) {
  const [avatarImageByte, setAvatarImageByte] = useState<string>(host?.avatarUrl || "")
  const [name, setName] = useState<string>(host?.name || "")
  const [headline, setHeadline] = useState<string>(host?.headline || "")
  const [intro, setIntro] = useState<string>(host?.introduction || "")
  const [companyName, setCompanyName] = useState<string>(host?.company.name || "")
  const [position, setPosition] = useState<string>(host?.company.position || "")
  const [tel, setTel] = useState<string>(host?.company.tel || "")
  const [email, setEmail] = useState<string>(host?.company.email || "")
  const [website, setWebsite] = useState<string>(host?.company.website || "")

  // 保存ボタンがクリックされた時の処理です
  const handleSaveButtonClick = async () => {
    const req: User = {
      id: host?.id!,
      name: name,
      avatarUrl: avatarImageByte,
      headline: headline,
      introduction: intro,
      company: {
        name: companyName,
        position: position,
        tel: tel,
        email: email,
        website: website,
      }
    }
    await PostProfileEdit(currentUserSession, req)
  }

  return (
    <>
      <div className="mt-5">
        <InputImage image={avatarImageByte} setImage={setAvatarImageByte}/>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
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
                value={position}
                onChange={(e) => setPosition(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={tel}
                onChange={(e) => setTel(e.target.value)}
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
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
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
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
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
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
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
