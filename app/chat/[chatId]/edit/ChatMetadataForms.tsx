"use client"

import React, { useState } from "react";
import LoadingButton from "@/components/button/LoadingButton";
import { PostChatInfoEdit } from "@/utils/api/postChatInfoEdit";
import { validateDisplayName, validateMemo } from "@/utils/validate";
import InputErrMsg from "@/components/text/InputErrMsg";
import { displayNameMaxLength, memoMaxLength } from "@/utils/variable";

type Props = {
  chatId: string
  token: string
  displayName: string
  memo: string
}

/**
 * 表示名,メモのフォームコンポーネントです
 */
export default function ChatMetadataForms(props: Props) {
  const [displayName, setDisplayName] = useState<string>(props.displayName)
  const [memo, setMemo] = useState<string>(props.memo)
  const [displayNameErrMsg, setDisplayNameErrMsg] = useState<string>("")
  const [memoErrMsg, setMemoErrMsg] = useState<string>("")
  const [success, setSuccess] = useState<boolean | undefined>(undefined)

  // 保存ボタンをクリックした時の挙動です
  // ボタンコンポーネント側で、エラーメッセージを表示します
  const handleSave = async () => {
    setSuccess(undefined)

    try {
      const apiChatRes = await PostChatInfoEdit(props.token, props.chatId, displayName, memo)
      setDisplayName(apiChatRes.chat.guest.displayName)
      setMemo(apiChatRes.chat.guest.memo)
      setSuccess(true)
    } catch (e) {
      setSuccess(false)
    }
  }

  return (
    <div className="bg-white p-3 sm:p-7 mt-5 shadow-md rounded-md w-full mx-auto">
      <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
        {/* id */}
        <div className="sm:col-span-4">
          <Label text={"id"}/>
          <p className="text-gray-500 text-sm">{props.chatId}</p>
        </div>

        {/* 表示名 */}
        <div className="sm:col-span-4">
          <Label text={"表示名"}/>
          <div className="mt-2">
            <input
              type="text"
              placeholder="鈴木 様"
              className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
               shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
               focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={displayName}
              onChange={(e) => {
                validateDisplayName(e.target.value)
                  ? setDisplayNameErrMsg("")
                  : setDisplayNameErrMsg(`上限は${displayNameMaxLength}文字です`)
                setDisplayName(e.target.value)
                setSuccess(undefined) // エラー表示を削除
              }}
            />
          </div>
          <InputErrMsg errMsg={displayNameErrMsg}/>
        </div>

        {/*　メモ */}
        <div className="sm:col-span-4">
          <Label text={"メモ"}/>
          <div className="mt-2">
            <textarea
              rows={7}
              placeholder="メモを記入"
              className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
               shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
               focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={memo}
              onChange={(e) => {
                validateMemo(e.target.value)
                  ? setMemoErrMsg("")
                  : setMemoErrMsg(`上限は${memoMaxLength}文字です`)
                setMemo(e.target.value)
                setSuccess(undefined) // エラー表示を削除
              }}
            />
          </div>
          <InputErrMsg errMsg={memoErrMsg}/>
        </div>

      </div>

      {/* 保存ボタン */}
      <div className="mt-3">
        <LoadingButton
          clickHandler={handleSave}
          label={"保存する"}
          disabled={!!displayNameErrMsg || !!memoErrMsg}
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
  )
}

// ラベルです
const Label = ({ text }: { text: string }) => {
  return (
    <label htmlFor="first-name" className="block text-sm leading-6 text-gray-900">
      {text}
    </label>
  )
}
