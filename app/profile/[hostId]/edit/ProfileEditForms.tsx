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
  host: User
}

type inputState = {
  value: string
  errMsg?: string
}

/**
 * プロフィール編集のInputです
 *
 * clientでの処理のためのコンポーネントです。
 */
export default function ProfileEditForms({ session, host }: Props) {
  const [avatar, setAvatar] = useState<inputState>({ value: host.avatarUrl })
  const [name, setName] = useState<inputState>({ value: host.name })
  const [headline, setHeadline] = useState<inputState>({ value: host.headline })
  const [intro, setIntro] = useState<inputState>({ value: host.introduction })
  const [companyName, setCompanyName] = useState<inputState>({ value: host.company.name })
  const [position, setPosition] = useState<inputState>({ value: host.company.position })
  const [tel, setTel] = useState<inputState>({ value: host.company.tel })
  const [email, setEmail] = useState<inputState>({ value: host.company.email })
  const [website, setWebsite] = useState<inputState>({ value: host.company.website })
  // 結果
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  // 全ての入力値のバリデーションを行います
  const validate = (): boolean => {
    let isValid = true
    const list = [
      { validateFunc: validateName, obj: name, setObj: setName },
      { validateFunc: validateHeadline, obj: headline, setObj: setHeadline },
      { validateFunc: validateIntro, obj: intro, setObj: setIntro },
      { validateFunc: validateCompanyName, obj: companyName, setObj: setCompanyName },
      { validateFunc: validatePosition, obj: position, setObj: setPosition },
      { validateFunc: validateTel, obj: tel, setObj: setTel },
      { validateFunc: validateEmail, obj: email, setObj: setEmail },
      { validateFunc: validateURL, obj: website, setObj: setWebsite },
    ]

    list.forEach(({ validateFunc, obj, setObj }) => {
      const err = validateFunc(obj.value)
      if (err) {
        setObj(prevState => ({ ...prevState, errMsg: err }))
        isValid = false
      }
    })

    return isValid
  }

  // 保存ボタンがクリックされた時の処理です
  const handleSaveButtonClick = async () => {
    setSuccess(undefined)
    if (!validate()) {
      setSuccess(false)
      return
    }

    const req: User = {
      id: host?.id!,
      name: name.value,
      avatarUrl: avatar.value,
      headline: headline.value,
      introduction: intro.value,
      company: {
        name: companyName.value,
        position: position.value,
        tel: tel.value,
        email: email.value,
        website: website.value,
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
        <InputImage
          image={avatar.value}
          setImage={(value) => setAvatar(prevState => ({
            ...prevState, value: value
          }))}
        />
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
                value={name.value}
                onChange={(e) => setName(prevState => ({
                  ...prevState, value: e.target.value
                }))}
              />
            </div>
            {name.errMsg && <InputErrMsg errMsg={name.errMsg}/>}
          </div>

          {/* 会社名 */}
          <div className="sm:col-span-3">
            <Label text={"会社名"}/>
            <div className="mt-2">
              <input
                type="text"
                placeholder="株式会社ABC"
                className={inputClassName}
                value={companyName.value}
                onChange={(e) => setCompanyName(prevState => ({
                  ...prevState, value: e.target.value
                }))}
              />
            </div>
            {companyName.errMsg && <InputErrMsg errMsg={companyName.errMsg}/>}
          </div>

          {/* 所属 */}
          <div className="sm:col-span-3">
            <Label text={"所属"}/>
            <div className="mt-2">
              <input
                type="text"
                placeholder="営業部 営業一課"
                className={inputClassName}
                value={position.value}
                onChange={(e) => setPosition(prevState => ({
                  ...prevState, value: e.target.value
                }))}
              />
            </div>
            {position.errMsg && <InputErrMsg errMsg={position.errMsg}/>}
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
                value={email.value}
                // ここでは検証せず、ボタンクリックの時に検証
                onChange={(e) => setEmail(prevState => ({
                  ...prevState, value: e.target.value
                }))}
              />
            </div>
            {email.errMsg && <InputErrMsg errMsg={email.errMsg}/>}
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
                value={tel.value}
                // ここでは検証せず、ボタンクリックの時に検証
                onChange={(e) => setTel(prevState => ({
                  ...prevState, value: e.target.value
                }))}
              />
            </div>
            {tel.errMsg && <InputErrMsg errMsg={tel.errMsg}/>}
          </div>

          {/*　Webサイト */}
          <div className="sm:col-span-4">
            <Label text={"ホームページ"}/>
            <div className="mt-2">
              <input
                type="url"
                placeholder="https://example.com"
                className={inputClassName}
                value={website.value}
                onChange={(e) => setWebsite(prevState => ({
                  ...prevState, value: e.target.value
                }))}
              />
            </div>
            {website.errMsg && <InputErrMsg errMsg={website.errMsg}/>}
          </div>

          {/*　ヘッドライン */}
          <div className="sm:col-span-4">
            <Label text={"ヘッドライン"}/>
            <div className="mt-2">
              <textarea
                rows={2}
                placeholder="私たちは、お客様を笑顔にするお手伝いをしています。"
                className={inputClassName}
                value={headline.value}
                onChange={(e) => setHeadline(prevState => ({
                  ...prevState, value: e.target.value
                }))}
              />
            </div>
            {headline.errMsg && <InputErrMsg errMsg={headline.errMsg}/>}
          </div>

          {/*　自己紹介 */}
          <div className="sm:col-span-4">
            <Label text={"自己紹介"}/>
            <div className="mt-2">
              <textarea
                rows={7}
                className={inputClassName}
                value={intro.value}
                onChange={(e) => setIntro(prevState => ({
                  ...prevState, value: e.target.value
                }))}
              />
            </div>
            {intro.errMsg && <InputErrMsg errMsg={intro.errMsg}/>}
          </div>

        </div>

        {/* 保存ボタン */}
        <div className="mt-6">
          <LoadingButton
            clickHandler={handleSaveButtonClick}
            label={"保存する"}
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
