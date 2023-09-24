"use client"

import React, { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import LoadingButton from "@/components/button/LoadingButton";
import BaseModal from "@/components/modal/BaseModal";
import { Session } from "@supabase/gotrue-js";
import { currentUserSession } from "@/utils/sample/Sample";
import { Chat, Message } from "@/utils/sample/Chat";
import { User } from "@/utils/sample/User";
import { PostStartChat } from "@/utils/api/postStartChat";
import { validatePasscode, validatePasscodeInput } from "@/utils/validate";

const displayNameMaxLength = 20

type Props = {
  chatId: string
  session: Session | null
  open: boolean
  // setter
  setChat: (chat: Chat | undefined) => void
  setMessages: (messages: Message[] | undefined) => void
  setHost: (host: User | undefined) => void
  setMyId: (myId: string) => void
}

/**
 * チャット開始のModalです
 *
 * チャットステータスが"first-is-login"の時にOPENします。
 */
export default function StartChatModal(props: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(props.open)
  const [displayName, setDisplayName] = useState<string>("")
  const [passcode, setPasscode] = useState<string>("")
  const [displayNameErrMsg, setDisplayNameErrMsg] = useState<string>("")
  const [passcodeErrMsg, setPasscodeErrMsg] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  // パスコードが変更された時の処理です
  const handlePasscodeChange = (value: string) => {
    validatePasscodeInput(value) && setPasscode(value)
    setPasscodeErrMsg("")
  }

  // 表示名が変更された時の処理です
  const handleDisplayNameChange = (value: string) => {
    value.length === 20
      ? setDisplayNameErrMsg("※上限は20文字です")
      : setDisplayNameErrMsg("")
    setDisplayName(value)
  }

  // 表示名を保存してチャットを開始
  const handleSaveDisplayName = async () => {
    setDisplayNameErrMsg("")
    setPasscodeErrMsg("")
    setError(false)

    if (!validatePasscode(passcode)) {
      setPasscodeErrMsg("数字6桁で入力してください")
      return
    }

    try {
      const res = await PostStartChat(
        props.chatId,
        currentUserSession,
        displayName,
        passcode,
      )
      props.setChat(res.chat)
      props.setMessages(res.chat.messages)
      props.setHost(res.host)
      props.setMyId(props.chatId)
      setModalOpen(false)
    } catch (e) {
      setError(true)
    } finally {
      setPasscode("")
    }
  }

  // フォーム, ボタン
  const body = (
    <>
      {/* 表示名のフォーム */}
      <div className="mt-3">
        <p className="text-gray-500 text-xs font-semibold ml-0.5">
          表示名（任意）
        </p>
        <input
          type="text"
          maxLength={displayNameMaxLength}
          className="block w-full rounded-md border-0 mt-0.5 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset
           ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
           focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="鈴木 様"
          onChange={(e) => handleDisplayNameChange(e.target.value)}
          value={displayName}
        />
        {displayNameErrMsg && (
          <p className="text-xs text-red-400 ml-1 mt-1">{displayNameErrMsg}</p>
        )}
      </div>

      {/* パスコードのフォーム */}
      <div className="mt-3">
        <p className="text-gray-500 text-xs font-semibold ml-0.5">
          パスコード
        </p>
        <input
          type="text"
          maxLength={6}
          pattern="[0-9]*" // 追加: 0-9の数字のみ許可
          name="passcode"
          id="passcode"
          className="block w-full rounded-md border-0 mt-0.5 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset
           ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
           focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-widest"
          placeholder="123456"
          onChange={(e) => handlePasscodeChange(e.target.value)}
          value={passcode}
        />
        {passcodeErrMsg && (
          <p className="text-xs text-red-400 ml-1 mt-1">{passcodeErrMsg}</p>
        )}
      </div>

      {/* ボタン */}
      <div className="mt-5 sm:mt-3 flex flex-col gap-2">
        <LoadingButton
          clickHandler={handleSaveDisplayName}
          label={"開始"}
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
          <span className="block mt-2">
            ※ 相手には表示されません<br/>
            ※ いつでも変更できます
          </span>
        </span>
      }
      body={body}
    />
  )
}