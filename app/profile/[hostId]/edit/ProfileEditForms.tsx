"use client"

import InputImage from "@/components/image/InputImage";
import React, { useState } from "react";
import LoadingButton from "@/components/button/LoadingButton";
import { User } from "@/utils/sample/User";
import { PostProfileEdit } from "@/utils/api/postProfileEdit";
import { Session } from "@supabase/gotrue-js";
import { currentUserSession } from "@/utils/sample/Sample";
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
import Form from "@/app/profile/[hostId]/edit/Form";

type Props = {
  session: Session | null
  host: User
}

export type InputState = {
  value: string
  errMsg?: string
}

/**
 * プロフィール編集のInputです
 *
 * clientでの処理のためのコンポーネントです。
 */
export default function ProfileEditForms({ session, host }: Props) {
  const [avatar, setAvatar] = useState<InputState>({ value: host.avatarUrl })
  const [name, setName] = useState<InputState>({ value: host.name })
  const [headline, setHeadline] = useState<InputState>({ value: host.headline })
  const [intro, setIntro] = useState<InputState>({ value: host.introduction })
  const [companyName, setCompanyName] = useState<InputState>({ value: host.company.name })
  const [position, setPosition] = useState<InputState>({ value: host.company.position })
  const [tel, setTel] = useState<InputState>({ value: host.company.tel })
  const [email, setEmail] = useState<InputState>({ value: host.company.email })
  const [website, setWebsite] = useState<InputState>({ value: host.company.website })
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
      // エラーメッセージを最初に初期化します
      setObj(prevState => ({ ...prevState, errMsg: "" }))

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
          <Form
            label={"名前（必須）"}
            placeholder={"鈴木 太郎"}
            state={name} setState={setName}
          />
          {/* 会社名 */}
          <Form
            label={"会社名"}
            placeholder={"株式会社〇〇"}
            state={companyName} setState={setCompanyName}
            isGridColSpan3={true}
          />
          {/* 所属 */}
          <Form
            label={"所属"}
            placeholder={"営業部 営業一課"}
            state={position} setState={setPosition}
            isGridColSpan3={true}
          />
          {/*　メールアドレス */}
          <Form
            label={"メールアドレス"}
            placeholder={"mail@example.com"}
            state={email} setState={setEmail}
            type={"email"}
          />
          {/*　電話番号 */}
          <Form
            label={"電話番号"}
            placeholder={"090-xxxx-xxxx"}
            state={tel} setState={setTel}
            type={"tel"}
          />
          {/*　Webサイト */}
          <Form
            label={"ホームページ"}
            placeholder={"https://example.com"}
            state={website} setState={setWebsite}
            type={"url"}
          />
          {/*　ヘッドライン */}
          <Form
            label={"ヘッドライン"}
            placeholder={"私たちは、お客様を笑顔にするお手伝いをしています。"}
            state={headline} setState={setHeadline}
            textarea textareaRows={2}
          />
          {/*　自己紹介 */}
          <Form
            label={"自己紹介"}
            placeholder={""}
            state={intro} setState={setIntro}
            textarea textareaRows={7}
          />
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
    <label className="block text-sm font-medium leading-6 text-gray-900">
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
