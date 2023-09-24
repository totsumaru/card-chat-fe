"use client"

import React, { useState } from "react";
import LoadingButton from "@/components/button/LoadingButton";
import { PostChatInfo } from "@/utils/api/postChatInfo";
import { Session } from "@supabase/gotrue-js";
import { currentUserSession } from "@/utils/sample/Sample";

type Props = {
  chatId: string
  session: Session | null
  displayName: string
  memo: string
}

/**
 * 表示名,メモのフォームコンポーネントです
 */
export default function ChatMetadataForms(props: Props) {
  const [displayName, setDisplayName] = useState<string>(props.displayName)
  const [memo, setMemo] = useState<string>(props.memo)

  // 保存ボタンをクリックした時の挙動です
  // ボタンコンポーネント側で、エラーメッセージを表示します
  const handleSave = async () => {
    try {
      await PostChatInfo(currentUserSession, props.chatId, displayName, memo)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
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
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
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
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        </div>

      </div>

      {/* 保存ボタン */}
      <div className="mt-3">
        <LoadingButton
          clickHandler={handleSave}
          label={"保存する"}
          successMessage={"保存しました"}
          failureMessage={"保存に失敗しました"}
        />
      </div>
    </>
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
