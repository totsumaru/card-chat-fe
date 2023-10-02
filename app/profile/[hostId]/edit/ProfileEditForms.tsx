"use client"

import classnames from "classnames";
import InputImage from "@/components/image/InputImage";
import React, { useState } from "react";
import LoadingButton from "@/components/button/LoadingButton";
import { PostProfileEdit, Req } from "@/utils/api/postProfileEdit";
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
import { useFileInputState, useInputState } from "@/app/profile/[hostId]/edit/state";
import { Input, Textarea } from "@/app/profile/[hostId]/edit/Form";
import { Host } from "@/utils/api/res";

type Props = {
  token: string
  host: Host
}

/**
 * プロフィール編集のInputです
 *
 * clientでの処理のためのコンポーネントです。
 */
export default function ProfileEditForms({ token, host }: Props) {
  const [avatar, setAvatar] = useFileInputState(host.avatarUrl)
  const [name, setName, nameErr, setNameErr] = useInputState(host.name)
  const [headline, setHeadline, headlineErr, setHeadlineErr] = useInputState(host.headline)
  const [intro, setIntro, introErr, setIntroErr] = useInputState(host.introduction)
  const [companyName, setCompanyName, companyNameErr, setCompanyNameErr] = useInputState(host.company.name)
  const [position, setPosition, positionErr, setPositionErr] = useInputState(host.company.position)
  const [tel, setTel, telErr, setTelErr] = useInputState(host.company.tel)
  const [email, setEmail, emailErr, setEmailErr] = useInputState(host.company.email)
  const [website, setWebsite, websiteErr, setWebsiteErr] = useInputState(host.company.website)
  // 結果
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  // 全ての入力値のバリデーションを行います
  const validate = (): boolean => {
    const list: {
      validateFunc: (value: string) => string,
      value: string,
      setErrMsg: (err: string) => void,
    }[] = [
      { validateFunc: validateName, value: name, setErrMsg: setNameErr },
      { validateFunc: validateHeadline, value: headline, setErrMsg: setHeadlineErr },
      { validateFunc: validateIntro, value: intro, setErrMsg: setIntroErr },
      { validateFunc: validateCompanyName, value: companyName, setErrMsg: setCompanyNameErr },
      { validateFunc: validatePosition, value: position, setErrMsg: setPositionErr },
      { validateFunc: validateTel, value: tel, setErrMsg: setTelErr },
      { validateFunc: validateEmail, value: email, setErrMsg: setEmailErr },
      { validateFunc: validateURL, value: website, setErrMsg: setWebsiteErr },
    ]
    let isValid = true
    list.forEach(({ validateFunc, value, setErrMsg }) => {
      // エラーメッセージを最初に初期化します
      setErrMsg("")
      const err = validateFunc(value)
      if (err) {
        setErrMsg(err)
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

    const req: Req = {
      token: token,
      hostId: host?.id!,
      avatar: typeof avatar === "string" ? undefined : avatar,
      name: name,
      headline: headline,
      introduction: intro,
      companyName: companyName,
      position: position,
      tel: tel,
      email: email,
      website: website,
    }

    try {
      await PostProfileEdit(req)
      setSuccess(true)
    } catch (e) {
      setSuccess(false)
    }
  }

  return (
    <div className="bg-white p-3 sm:p-7 mt-5 shadow-md rounded-md w-full mx-auto">
      <div className="mt-5 ml-2">
        <InputImage image={avatar} setImage={setAvatar}/>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          {/* 名前 */}
          <Input
            label={"名前（必須）"}
            placeholder={"鈴木 太郎"}
            value={name} setValue={setName}
            errMsg={nameErr}
          />
          {/* 会社名 */}
          <Input
            label={"会社名"}
            placeholder={"株式会社〇〇"}
            value={companyName} setValue={setCompanyName}
            isGridColSpan3
            errMsg={companyNameErr}
          />
          {/* 所属 */}
          <Input
            label={"所属"}
            placeholder={"営業部 営業一課"}
            value={position} setValue={setPosition}
            isGridColSpan3
            errMsg={positionErr}
          />
          {/*　メールアドレス */}
          <Input
            label={"メールアドレス"}
            placeholder={"mail@example.com"}
            value={email} setValue={setEmail}
            type={"email"}
            errMsg={emailErr}
          />
          {/*　電話番号 */}
          <Input
            label={"電話番号"}
            placeholder={"090-xxxx-xxxx"}
            value={tel} setValue={setTel}
            type={"tel"}
            errMsg={telErr}
          />
          {/*　Webサイト */}
          <Input
            label={"ホームページ"}
            placeholder={"https://example.com"}
            value={website} setValue={setWebsite}
            type={"url"}
            errMsg={websiteErr}
          />
          {/*　ヘッドライン */}
          <Textarea
            label={"ヘッドライン"}
            placeholder={"私たちは、お客様を笑顔にするお手伝いをしています。"}
            value={headline} setValue={setHeadline}
            rows={2}
            errMsg={headlineErr}
          />
          {/*　自己紹介 */}
          <Textarea
            label={"自己紹介"}
            placeholder={""}
            value={intro} setValue={setIntro}
            rows={7}
            errMsg={introErr}
          />
        </div>

        {/* 保存ボタン */}
        <div className="mt-6">
          <LoadingButton
            clickHandler={handleSaveButtonClick}
            label={"保存する"}
          />
          {/* 結果 */}
          <p className={classnames("text-sm ml-0.5 mt-1", {
            "text-gray-600": success === true,
            "text-red-500 mt-0.5": success === false,
          })}>
            {success === true
              ? "保存しました！" :
              success == false && "エラーが発生しました"
            }
          </p>
        </div>

      </div>
    </div>
  )
}