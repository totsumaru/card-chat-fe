"use client"

import React, { useLayoutEffect, useRef, useState } from "react";
import { Chat, Message } from "@/utils/sample/Chat";
import Avatar from "@/components/avatar/Avatar";
import { pathDisplayNameEdit, pathProfile } from "@/utils/path";
import { User } from "@/utils/sample/User";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";
import PasscodeModal, { Status } from "@/components/modal/PasscodeModal";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { GetChatByPasscode } from "@/utils/api/getChatByPasscode";
import ChatHeader from "@/components/header/ChatHeader";
import { validatePasscode } from "@/utils/validatePasscode";
import { urlToA } from "@/utils/urlToA";

type Props = {
  userId: string
  chatId: string
  chat: Chat | undefined
  host: User | undefined
}

/**
 * チャットページのClientコンポーネントです
 *
 * TODO: ゲストは、memoや表示名を取得できないようにする
 */
export default function Client({
  userId, chatId, chat: propsChat, host: propsHost
}: Props) {
  // パスコードModal
  const [passcodeModalOpen, setPasscodeModalOpen] = useState<boolean>(!propsChat)
  const [passcode, setPasscode] = useState<string>("")
  const [passcodeStatus, setPasscodeStatus] = useState<Status>("none")
  // チャット
  const [chat, setChat] = useState<Chat | undefined>(propsChat) // ここはInfo用に使用します
  const [messages, setMessages] = useState<Message[] | undefined>(propsChat?.messages)
  const [newMessage, setNewMessage] = useState<string>("")
  const [host, setHost] = useState<User | undefined>(propsHost)
  // その他
  const scrollBottomRef = useRef<HTMLDivElement | null>(null)
  const [myId, setMyID] = useState<string>(userId === host?.id
    ? userId    // 自分がhostの場合
    : chat?.id
      ? chat.id // cookieでチャットが取得できている場合
      : ""      // チャットが取得できていない場合
  )

  // メッセージが追加されたら一番下までスクロール
  useLayoutEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
  }, [messages]);

  // 自動返信を送信します
  const autoReply = () => {
    setMessages(prevMessages => {
      const msg: Message = {
        content: "これは自動返信です",
        from: myId === userId ? chatId : userId,
        date: "2023-01-23",
        isRead: true,
      }

      if (!prevMessages) {
        return [msg];
      }

      return [...prevMessages, msg];
    });
  }

  // メッセージを送信
  const handleSend = () => {
    if (!newMessage) return

    // 自分のメッセージを追加
    setMessages(prevMessages => {
      const msg: Message = {
        content: newMessage,
        from: myId,
        date: "2023-01-23",
        isRead: true,
      }
      if (!prevMessages) {
        return [msg];
      }
      return [...prevMessages, msg];
    });

    // メッセージボックスをクリア
    setNewMessage("");
    // 500ミリ秒後に相手のメッセージを追加
    setTimeout(() => autoReply(), 500);
  };

  // メッセージ送信フォームにに入力された時の挙動です
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: ここでPOSTリクエストを送信
    setNewMessage(e.target.value);
  };

  // パスコードを送信
  const handlePasscodeSend = async () => {
    validatePasscode(passcode) || alert("数字6桁で入力してください")
    // statusをリセット
    setPasscodeStatus("none")

    await new Promise(resolve => setTimeout(resolve, 1000))
    try {
      const res = await GetChatByPasscode(chatId, passcode)
      setChat(res.chat)
      setMessages(res.chat.messages)
      setHost(res.host)
      setMyID(chatId)
    } catch (e) {
      setPasscodeStatus("invalid")
      return
    } finally {
      setPasscode("")
    }

    setPasscodeStatus("success")
    setMyID(chatId)
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* ヘッダー */}
      <ChatHeader isHost={host?.id === userId} chat={chat!} host={host!}/>

      {/* Modal */}
      <NoticeEmailModal registeredEmail={chat?.guest.noticeEmail}/>

      {/* チャット */}
      <div className="flex flex-col h-screen bg-lineBlue">
        {/* メッセージエリア */}
        <div ref={scrollBottomRef} className="flex-1 overflow-y-auto px-4 pt-24 pb-3">
          {host?.id === userId || (
            <PasscodeModal
              modalOpen={passcodeModalOpen}
              setModalOpen={setPasscodeModalOpen}
              passcode={passcode}
              setPasscode={setPasscode}
              handleSend={handlePasscodeSend}
              status={passcodeStatus}
            />
          )}

          {messages && messages.map((message, index) => (
            <div key={index}
                 className={`flex items-start mb-2 ${message.from === myId
                   ? 'justify-end' : 'justify-start'}`}
            >

              { /**
               * 相手のアバター
               * - メッセージの送信者が相手の場合に表示
               * - 自分がHostの場合は、相手はデフォルトのアバター&URL
               * - 自分がGuestの場合は、相手は 画像&URL を付与
               */}
              {message.from !== myId && (
                <div className="mr-2 flex-shrink-0">
                  {host?.id === userId ? (
                    <Avatar href={pathDisplayNameEdit(chatId, true)}/>
                  ) : (
                    <Avatar
                      imageUrl={host?.avatarUrl}
                      href={pathProfile(host?.id!, chatId)}
                    />
                  )}
                </div>
              )}

              {/* メッセージ */}
              <div className={`rounded-3xl text-sm px-4 py-3 mb-2 inline-block whitespace-pre-line
            ${message.from === myId
                ? "bg-lineGreen max-w-[70%] md:ml-8 md:max-w-[60%]"
                : "bg-gray-100 max-w-[70%] md:mr-8 md:max-w-[60%]"}`
              }>
                {urlToA(message.content)}
              </div>

              { /**
               * 自分のアバター
               * - メッセージの送信者が自分の場合に表示
               * - 自分がHostの場合は 画像&URL を付与
               * - 自分がGuestの場合はデフォルトのアバター(URLなし)
               */}
              {message.from === myId && (
                <div className="ml-2 flex-shrink-0">
                  {host?.id === userId ? (
                    <Avatar
                      imageUrl={host?.avatarUrl}
                      href={pathProfile(host?.id!, chatId)}
                    />
                  ) : (
                    <Avatar/>
                  )}
                </div>
              )}

            </div>
          ))}
        </div>

        {/* 入力エリア */}
        <div className="flex-none bg-gray-200 px-4 py-3">
          <div className="flex items-end">
          <textarea
            className="w-full rounded p-2 resize-none text-sm"
            placeholder="メッセージを入力"
            value={newMessage}
            onChange={handleInputChange}
            rows={3}
          />
            {/* 送信ボタン */}
            <div className="flex items-end">
              <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded h-10" onClick={handleSend}>
                <PaperAirplaneIcon className="h-5 w-5"/>
              </button>
            </div>
          </div>
          <div className="mx-1 mt-1 mb-2 w-fit flex items-center">
            <p className="text-xs text-gray-600">
              ※こちらは簡易チャットです。
              <b><u>個人情報を送付する場合は、担当者のメールアドレス等に</u></b>送付してください。
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}