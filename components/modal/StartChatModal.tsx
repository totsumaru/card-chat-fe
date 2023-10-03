"use client"

import React, { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import LoadingButton from "@/components/button/LoadingButton";
import BaseModal from "@/components/modal/BaseModal";
import { PostStartChat } from "@/utils/api/postStartChat";
import { validateDisplayName } from "@/utils/validate";
import { Chat } from "@/utils/api/res";

type Props = {
  chatId: string
  token: string
  open: boolean
  // setter
  setMyId: (myId: string) => void
  setChat: (chat: Chat) => void
}

/**
 * チャット開始のModalです
 *
 * チャットステータスが"first-is-login"の時にOPENします。
 */
export default function StartChatModal(props: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(props.open)
  const [displayName, setDisplayName] = useState<string>("")
  const [displayNameErrMsg, setDisplayNameErrMsg] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  // 表示名が変更された時の処理です
  const handleDisplayNameChange = (value: string) => {
    validateDisplayName(value)
      ? setDisplayNameErrMsg("")
      : setDisplayNameErrMsg("※上限は20文字です")
    setDisplayName(value)
  }

  // 表示名を保存してチャットを開始
  const handleStartChat = async () => {
    setDisplayNameErrMsg("")
    setError(false)

    try {
      const apiChatRes = await PostStartChat(props.chatId, props.token, displayName)
      props.setMyId(props.chatId)
      props.setChat(apiChatRes.chat)
      setModalOpen(false)
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }

  // フォーム, ボタン
  const body = (
    <>
      {/* 表示名のフォーム */}
      <div className="mt-3">
        <p className="text-gray-500 text-sm font-semibold ml-0.5">
          表示名（任意）
        </p>
        <input
          type="text"
          className={inputClassName}
          placeholder="鈴木 様"
          onChange={(e) => handleDisplayNameChange(e.target.value)}
          value={displayName}
        />
        {displayNameErrMsg && (
          <p className="text-xs text-red-400 ml-1 mt-0.5">{displayNameErrMsg}</p>
        )}
        <span className="block text-xs text-gray-500 font-thin ml-1 mt-0.5">
          ※相手には表示されず、いつでも変更できます
        </span>
      </div>

      {/* ボタン */}
      <div className="mt-5 sm:mt-3 flex flex-col gap-2">
        <LoadingButton
          clickHandler={handleStartChat}
          label={"開始"}
          disabled={!!displayNameErrMsg}
          widthFull
        />
        {error && (
          <p className="text-xs text-red-400 ml-1 mt-1">
            エラーが発生しました。<br/>※ パスコードが違う可能性があります。
          </p>
        )}
      </div>
    </>
  )

  return (
    <BaseModal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      icon={<CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>}
      title={"チャットを開始します"}
      description={
        <span>
          渡す相手が分かっている場合は、表示名を設定しておくと見やすくなります。
        </span>
      }
      body={body}
    />
  )
}

// inputのクラス名です
const inputClassName = `
block w-full rounded-md border-0 mt-0.5 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset
ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
focus:ring-indigo-600 sm:text-sm sm:leading-6
`