"use client"

import React, { useEffect, useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import LoadingButton from "@/components/button/LoadingButton";
import BaseModal from "@/components/modal/BaseModal";
import { Session } from "@supabase/gotrue-js";
import { currentUserSession } from "@/utils/sample/Sample";
import { Chat, Message } from "@/utils/sample/Chat";
import { User } from "@/utils/sample/User";
import { PostStartChat } from "@/utils/api/postStartChat";

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
  const [errMsg, setErrMsg] = useState<string>("")

  useEffect(() => {
    displayName.length === 20
      ? setErrMsg("※上限は20文字です")
      : setErrMsg("")
  }, [displayName])

  // 表示名を保存してチャットを開始
  const handleSaveDisplayName = async () => {
    if (!displayName) {
      setErrMsg("表示名が入力されていません。")
      return
    }

    try {
      const res = await PostStartChat(props.chatId, currentUserSession, displayName)
      props.setChat(res.chat)
      props.setMessages(res.chat.messages)
      props.setHost(res.host)
      props.setMyId(props.chatId)
      setModalOpen(false)
    } catch (e) {
      console.error(e)
      return
    } finally {
      setDisplayName("")
    }
  }

  // フォーム, ボタン
  const body = (
    <>
      {/* フォーム */}
      <div className="mt-3">
        <input
          type="text"
          maxLength={displayNameMaxLength}
          className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset
           ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
           focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-widest"
          placeholder="鈴木 様"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
        {errMsg && (
          <p className="text-xs text-red-400 ml-1 mt-1">{errMsg}</p>
        )}
      </div>

      {/* ボタン */}
      <div className="mt-2 sm:mt-3 flex flex-col gap-2">
        <LoadingButton
          clickHandler={handleSaveDisplayName}
          label={"設定して開始"}
          successMessage={""}
          failureMessage={""}
          widthFull
        />
        <LoadingButton
          clickHandler={async () => setModalOpen(false)}
          label={"スキップ"}
          successMessage={""}
          failureMessage={""}
          widthFull
          isWhite
        />
      </div>
    </>
  )

  return (
    <BaseModal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      icon={<CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>}
      title={"相手の表示名を設定"}
      description={
        <>渡す相手が分かっている場合は、表示名を設定しておくと見やすくなります。（相手には表示されません）</>
      }
      body={body}
    />
  )
}