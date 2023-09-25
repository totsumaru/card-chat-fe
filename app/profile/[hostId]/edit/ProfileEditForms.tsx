"use client"

import InputImage from "@/components/image/InputImage";
import React, { useState } from "react";
import LoadingButton from "@/components/button/LoadingButton";
import { User } from "@/utils/sample/User";
import { PostProfileEdit } from "@/utils/api/postProfileEdit";
import { Session } from "@supabase/gotrue-js";
import { currentUserSession } from "@/utils/sample/Sample";
import InputErrMsg from "@/components/text/InputErrMsg";
import {
  validateCompanyName,
  validateEmail,
  validateHeadline,
  validateIntro,
  validateName,
  validatePosition,
  validateTel,
  validateURL
} from "@/utils/validate";

type Props = {
  session: Session | null
  host: User | undefined
}

/**
 * プロフィール編集のInputです
 *
 * clientでの処理のためのコンポーネントです。
 */
export default function ProfileEditForms({ host }: Props) {
  // 入力フォームの内容
  const [avatarImageByte, setAvatarImageByte] = useState<string>(host?.avatarUrl || "")
  const [name, setName] = useState<string>(host?.name || "")
  const [headline, setHeadline] = useState<string>(host?.headline || "")
  const [intro, setIntro] = useState<string>(host?.introduction || "")
  const [companyName, setCompanyName] = useState<string>(host?.company.name || "")
  const [position, setPosition] = useState<string>(host?.company.position || "")
  const [tel, setTel] = useState<string>(host?.company.tel || "")
  const [email, setEmail] = useState<string>(host?.company.email || "")
  const [website, setWebsite] = useState<string>(host?.company.website || "")
  // エラーメッセージ
  const [nameErrMsg, setNameErrMsg] = useState<string>("")
  const [headlineErrMsg, setHeadlineErrMsg] = useState<string>("")
  const [introErrMsg, setIntroErrMsg] = useState<string>("")
  const [companyNameErrMsg, setCompanyNameErrMsg] = useState<string>("")
  const [positionErrMsg, setPositionErrMsg] = useState<string>("")
  const [telErrMsg, setTelErrMsg] = useState<string>("")
  const [emailErrMsg, setEmailErrMsg] = useState<string>("")
  const [websiteErrMsg, setWebsiteErrMsg] = useState<string>("")
  // 結果
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  // 全ての入力値のバリデーションを行います
  const isValid = (): boolean => {
    let isvalid = false

    const name_err = validateName(name)
    setNameErrMsg(name_err)

    const headline_err = validateHeadline(headline)
    setHeadlineErrMsg(headline_err)

    const intro_err = validateIntro(intro)
    setIntroErrMsg(intro_err)

    const company_name_err = validateCompanyName(companyName)
    setCompanyNameErrMsg(company_name_err)

    const position_err = validatePosition(position)
    setPositionErrMsg(position_err)

    const tel_err = validateTel(tel)
    setTelErrMsg(tel_err)

    const email_err = validateEmail(email)
    setEmailErrMsg(email_err)

    const website_err = validateURL(website)
    setWebsiteErrMsg(website_err)

    return (
      !name_err &&
      !headline_err &&
      !intro_err &&
      !company_name_err &&
      !position_err &&
      !tel_err &&
      !email_err &&
      !website_err
    )
  }

  // 保存ボタンがクリックされた時の処理です
  const handleSaveButtonClick = async () => {
    setSuccess(undefined)
    if (!isValid()) {
      setSuccess(false)
      return
    }

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

    try {
      await PostProfileEdit(currentUserSession, req)
      setSuccess(true)
    } catch (e) {
      setSuccess(false)
    }
  }

  return (
    <div className="bg-white p-3 sm:p-7 mt-5 shadow-md rounded-md w-full mx-auto">
      <div className="mt-5 ml-2">
        <InputImage image={avatarImageByte} setImage={setAvatarImageByte}/>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

          {/* 名前 */}
          <div className="sm:col-span-4">
            <Label text={"名前（必須）"}/>
            <div className="mt-2">
              <input
                type="text"
                placeholder="鈴木 太郎"
                className={inputClassName}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <InputErrMsg errMsg={nameErrMsg}/>
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
            <InputErrMsg errMsg={companyNameErrMsg}/>
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
            <InputErrMsg errMsg={positionErrMsg}/>
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
                // ここでは検証せず、ボタンクリックの時に検証
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <InputErrMsg errMsg={emailErrMsg}/>
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
                // ここでは検証せず、ボタンクリックの時に検証
                onChange={(e) => setTel(e.target.value)}
              />
            </div>
            <InputErrMsg errMsg={telErrMsg}/>
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
            <InputErrMsg errMsg={websiteErrMsg}/>
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
            <InputErrMsg errMsg={headlineErrMsg}/>
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
            <InputErrMsg errMsg={introErrMsg}/>
          </div>

        </div>

        {/* 保存ボタン */}
        <div className="mt-6">
          <LoadingButton
            clickHandler={handleSaveButtonClick}
            label={"保存する"}
            isValid={isValid}
          />
          {success === true ? (
            <p className="text-gray-600 text-sm ml-0.5 mt-1">保存しました！</p>
          ) : (
            success === false && (
              <p className="text-red-500 text-sm mt-0.5">エラーが発生しました</p>
            )
          )}
        </div>

      </div>
    </div>
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
