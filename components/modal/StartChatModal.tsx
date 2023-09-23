"use client"

import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import ButtonLoading from "@/components/loading/ButtonLoading";
import { validatePasscodeInput } from "@/utils/validatePasscode";
import { GetChatByPasscode } from "@/utils/api/getChatByPasscode";
import { Chat, Message } from "@/utils/sample/Chat";
import { User } from "@/utils/sample/User";

type Props = {
  chatId: string
  open: boolean
  // setter
  setChat: (chat: Chat | undefined) => void
  setMessages: (messages: Message[] | undefined) => void
  setHost: (host: User | undefined) => void
  setMyId: (myId: string) => void
}

// 表示名の最大文字数
const displayNameLength = 20

/**
 * チャット開始のModalです
 *
 * チャットステータスが"first-is-login"の時にOPENします。
 */
export default function PasscodeModal(props: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(props.open)
  const [displayName, setDisplayName] = useState<string>("")

  // Inputが入力された時の挙動です
  const handlePasscodeChange = (value: string) => {
    validatePasscodeInput(value) && setDisplayName(value)
  };

  // 開始ボタンを送信
  const handleStart = async () => {
    try {
      const res = await GetChatByPasscode(props.chatId, displayName)
      props.setChat(res.chat)
      props.setMessages(res.chat.messages)
      props.setHost(res.host)
      props.setMyId(props.chatId)
      setModalOpen(false)
    } catch (e) {
      return
    } finally {
      setDisplayName("")
    }
  }

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {
      }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  {/* アイコン */}
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    {/* タイトル */}
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      チャットを開始します
                    </Dialog.Title>
                    {/* 説明 */}
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 text-left">
                        カードを渡す相手が分かっている場合、表示名を設定すると見やすくなります。
                      </p>
                    </div>
                  </div>
                </div>

                {/* フォーム */}
                <div className="mt-3">
                  <input
                    type="text"
                    maxLength={displayNameLength}
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset
                      ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                      focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-widest"
                    placeholder="鈴木 様"
                    onChange={(e) => handlePasscodeChange(e.target.value)}
                    value={displayName}
                  />
                  <p className="text-sm text-red-600 ml-0.5">
                    {/* alertを入れる場合は、ここに入れる */}
                  </p>
                </div>

                {/* ボタン */}
                <div className="mt-2 sm:mt-3">
                  <SendButton label={"Start"} clickHandler={handleStart}/>
                  <SendButton label={"スキップ"} clickHandler={() => setModalOpen(false)}/>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

// 送信ボタン
const SendButton = ({ label, clickHandler }: {
  label: string
  clickHandler: () => void
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <button
      type="button"
      className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
        leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={async () => {
        setLoading(true)
        await clickHandler()
        setLoading(false)
      }}
      disabled={loading}
    >
      {loading && <ButtonLoading/>}
      {label}
    </button>
  )
}