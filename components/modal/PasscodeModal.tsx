"use client"

import React, { useState } from 'react'
import { CheckIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { validatePasscode, validatePasscodeInput } from "@/utils/validate";
import { GetChatByPasscode } from "@/utils/api/getChatByPasscode";
import LoadingButton from "@/components/button/LoadingButton";
import BaseModal from "@/components/modal/BaseModal";
import { passcodeLength } from "@/utils/variable";
import { Chat, Host, Message } from "@/utils/api/res";

type Props = {
  chatId: string
  open: boolean
  // setter
  setChat: (chat: Chat) => void
  setMessages: (messages: Message[]) => void
  setHost: (host: Host) => void
  setMyId: (myId: string) => void
}

/**
 * パスコードのModalです
 *
 * チャットステータスが"visitor"の時にOPENします。
 */
export default function PasscodeModal(props: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(props.open)
  const [passcode, setPasscode] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>("")

  // Inputが入力された時の挙動です
  const handlePasscodeChange = (value: string) => {
    const passcodeInputErrMsg = validatePasscodeInput(value)
    if (passcodeInputErrMsg) {
      setErrMsg(passcodeInputErrMsg)
    } else {
      setPasscode(value)
      setErrMsg("")
    }
  };

  // パスコードを送信
  const handlePasscodeSend = async () => {
    const passcodeErrMsg = validatePasscode(passcode)
    if (passcodeErrMsg) {
      setErrMsg(passcodeErrMsg)
      return
    }

    try {
      const res = await GetChatByPasscode(props.chatId, passcode)

      props.setChat(res.chat)
      props.setMessages(res.messages)
      props.setHost(res.host)
      props.setMyId(props.chatId)
      setSuccess(true)
      setErrMsg("")
    } catch (e) {
      console.error(e)
      setErrMsg("ログインできません")
    } finally {
      setPasscode("")
    }
  }

  // アイコン
  const icon = (success ? (
      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
    ) : (
      <LockClosedIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
    )
  )

  // Form & Button
  const body = (
    <>
      {/* フォーム */}
      {success || (
        <div className="mt-3">
          <input
            type="text"
            maxLength={passcodeLength}
            pattern="[0-9]*" // 追加: 0-9の数字のみ許可
            className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset
                      ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                      focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-widest"
            placeholder="123456"
            onChange={(e) => handlePasscodeChange(e.target.value)}
            value={passcode}
          />
          {errMsg && (
            <p className="text-red-500 text-sm ml-0.5">{errMsg}</p>
          )}
        </div>
      )}

      {/* ボタン */}
      <div className="mt-2 sm:mt-3">
        {success ? (
          <LoadingButton
            clickHandler={async () => setModalOpen(false)}
            label={"OK"}
            widthFull
          />
        ) : (
          <LoadingButton
            clickHandler={handlePasscodeSend}
            label={"送信"}
            widthFull
          />
        )}
      </div>
    </>
  )

  return (
    <BaseModal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      icon={icon}
      title={success ? "認証しました" : "パスコードを入力してください"}
      description={success
        ? "認証が完了しました。チャットの内容を確認してみましょう。"
        : "このチャットを見るには、最初のみパスコードが必要です。パスコードは「カードの表面」に書いてあります。"
      }
      body={body}
    />
  )
}