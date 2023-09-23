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
import StartChatModal from "@/components/modal/StartChatModal";
import { Session } from "@supabase/gotrue-js";
import MustLoginModal from "@/components/modal/MustLoginModal";

type Props = {
  userId: string
  chatId: string
  session: Session | null
  chat: Chat | undefined
  host: User | undefined
  status: ChatStatus | undefined
}

/**
 * チャットページのClientコンポーネントです
 *
 * TODO: ゲストは、memoや表示名を取得できないようにする
 */
export default function Client(props: Props) {
  // チャット
  const [chat, setChat] = useState<Chat | undefined>(props.chat) // ここはInfo用に使用します
  const [messages, setMessages] = useState<Message[] | undefined>(props.chat?.messages)
  const [newMessage, setNewMessage] = useState<string>("")
  const [host, setHost] = useState<User | undefined>(props.host)
  // その他
  const scrollBottomRef = useRef<HTMLDivElement | null>(null)
  const [myId, setMyId] = useState<string>(props.userId === host?.id
    ? props.userId    // 自分がhostの場合
    : chat?.id
      ? chat.id // cookieでチャットが取得できている場合
      : ""      // チャットが取得できていない場合
  )

  // console.log(props.status)

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
        from: myId === props.userId ? props.chatId : props.userId,
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
      <ChatHeader isHost={host?.id === props.userId} chat={chat!} host={host!}/>

      {/* 通知Modal */}
      <NoticeEmailModal registeredEmail={chat?.guest.noticeEmail}/>

      {/* 開始Modal */}
      <StartChatModal
        chatId={props.chatId}
        session={props.session}
        open={props.status === "first-is-login"}
        setChat={setChat}
        setMessages={setMessages}
        setHost={setHost}
        setMyId={setMyId}
      />
      {/* ログイン催促Modal */}
      <MustLoginModal open={props.status === "first-not-login"}/>

      {/* パスコードModal */}
      <PasscodeModal
        chatId={props.chatId}
        open={props.status === "visitor"}
        setChat={setChat}
        setMessages={setMessages}
        setHost={setHost}
        setMyId={setMyId}
      />

      {/* チャット */}
      <div className="flex flex-col h-screen bg-lineBlue">
        <MessageArea
          userId={props.userId}
          chatId={props.chatId}
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