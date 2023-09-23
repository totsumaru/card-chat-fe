"use client"

import React, { useLayoutEffect, useRef, useState } from "react";
import { Chat, Message } from "@/utils/sample/Chat";
import { User } from "@/utils/sample/User";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";
import PasscodeModal from "@/components/modal/PasscodeModal";
import ChatHeader from "@/components/header/ChatHeader";
import MessageArea from "@/app/chat/[chatId]/MessageArea";
import InputArea from "@/app/chat/[chatId]/InputArea";
import { sleep } from "@/utils/sample/sleep";
import { ChatStatus } from "@/utils/api/getChat";

type Props = {
  userId: string
  chatId: string
  chat: Chat | undefined
  host: User | undefined
  status: ChatStatus | undefined
}

/**
 * チャットページのClientコンポーネントです
 *
 * TODO: ゲストは、memoや表示名を取得できないようにする
 */
export default function Client({
  userId, chatId, chat: propsChat, host: propsHost, status
}: Props) {
  // チャット開始Modal(status: "first-is-login")
  const [chatStartModalOpen, setChatStartModalOpen] = useState<boolean>(status === "first-is-login")
  // ログイン催促Modal(status: "first-not-login")
  const [mustLoginModalOpen, setMustLoginModalOpen] = useState<boolean>(status === "first-not-login")
  // チャット
  const [chat, setChat] = useState<Chat | undefined>(propsChat) // ここはInfo用に使用します
  const [messages, setMessages] = useState<Message[] | undefined>(propsChat?.messages)
  const [newMessage, setNewMessage] = useState<string>("")
  const [host, setHost] = useState<User | undefined>(propsHost)
  // その他
  const scrollBottomRef = useRef<HTMLDivElement | null>(null)
  const [myId, setMyId] = useState<string>(userId === host?.id
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
      }
      if (!prevMessages) {
        return [msg];
      }
      return [...prevMessages, msg];
    });
  }

  // メッセージ送信フォームにに入力された時の挙動です
  const handleInputChange = (inputValue: string) => {
    setNewMessage(inputValue);
  };

  // メッセージを送信
  const handleMessageSend = async () => {
    if (!newMessage) return
    // 自分のメッセージを追加
    setMessages(prevMessages => {
      const msg: Message = { content: newMessage, from: myId }
      if (!prevMessages) {
        return [msg];
      }
      return [...prevMessages, msg];
    });

    setNewMessage("");

    // 自動返信
    await sleep()
    autoReply()
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* ヘッダー */}
      <ChatHeader isHost={host?.id === userId} chat={chat!} host={host!}/>

      {/* 通知Modal */}
      <NoticeEmailModal registeredEmail={chat?.guest.noticeEmail}/>

      {/* パスコードModal */}
      <PasscodeModal
        chatId={chatId}
        open={status === "visitor"}
        setChat={setChat}
        setMessages={setMessages}
        setHost={setHost}
        setMyId={setMyId}
      />

      {/* チャット */}
      <div className="flex flex-col h-screen bg-lineBlue">
        <MessageArea
          userId={userId}
          chatId={chatId}
          myId={myId}
          host={host}
          messages={messages}
          scrollBottomRes={scrollBottomRef}
        />

        {/* 入力エリア */}
        <InputArea
          newMessage={newMessage}
          handleInputChange={handleInputChange}
          handleMessageSend={handleMessageSend}
        />
      </div>
    </div>
  )
}