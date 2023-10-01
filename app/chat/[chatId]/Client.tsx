"use client"

import React, { useLayoutEffect, useRef, useState } from "react";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";
import PasscodeModal from "@/components/modal/PasscodeModal";
import ChatHeader from "@/components/header/ChatHeader";
import MessageArea from "@/app/chat/[chatId]/MessageArea";
import InputArea from "@/app/chat/[chatId]/InputArea";
import { ChatStatus } from "@/utils/api/getChat";
import StartChatModal from "@/components/modal/StartChatModal";
import MustLoginModal from "@/components/modal/MustLoginModal";
import { Chat, Host, Message } from "@/utils/api/res";
import { PostSendMessage } from "@/utils/api/postSendMessage";

type Props = {
  userId: string
  chatId: string
  token: string
  chat: Chat
  messages: Message[]
  host: Host
  status: ChatStatus | undefined
}


/**
 * チャットページのClientコンポーネントです
 */
export default function Client(props: Props) {
  // 通知Modal
  const [noticeModalOpen, setNoticeModalOpen] = useState<boolean>(false)
  // チャット
  const [chat, setChat] = useState<Chat>(props.chat) // ここはInfo用に使用します
  const [messages, setMessages] = useState<Message[]>(props.messages)
  const [newMessage, setNewMessage] = useState<string>("")
  const [host, setHost] = useState<Host>(props.host)
  // その他
  const scrollBottomRef = useRef<HTMLDivElement | null>(null)
  const [myId, setMyId] = useState<string>(props.userId === host?.id
    ? props.userId  // 自分がhostの場合
    : chat?.id
      ? chat.id     // cookieでチャットが取得できている場合
      : ""          // チャットが取得できていない場合
  )

  // メッセージが追加されたら一番下までスクロール
  useLayoutEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
  }, [messages]);

  // メッセージ送信フォームにに入力された時の挙動です
  const handleInputChange = (inputValue: string) => {
    setNewMessage(inputValue);
  };

  // メッセージを送信
  const handleMessageSend = async () => {
    if (!newMessage) return
    // stateに追加
    setMessages(prevMessages => {
      const msg: Message = {
        id: "",
        chatId: chat.id,
        fromId: myId,
        content: newMessage,
        created: new Date(),
      }
      if (!prevMessages) {
        return [msg];
      }
      return [msg, ...prevMessages];
    });

    // バックエンドに送信
    try {
      await PostSendMessage({
        token: props.token,
        chatId: chat.id,
        content: newMessage,
      })
    } catch (e) {
      console.error(e)
    }

    setNewMessage("");
  };

  // TODO: 定期的にバックエンドに情報を取得しに行く

  return (
    <div className="relative h-screen overflow-hidden">
      {/* ヘッダー */}
      <ChatHeader
        setModalOpen={setNoticeModalOpen}
        isHost={host?.id === props.userId}
        chat={chat!}
        host={host!}
      />

      {/* 通知Modal */}
      <NoticeEmailModal
        chatId={props.chatId}
        passcode={chat?.passcode}
        modalOpen={noticeModalOpen}
        setModalOpen={setNoticeModalOpen}
        registeredEmail={chat?.guest.email}
      />

      {/* 開始Modal */}
      <StartChatModal
        chatId={props.chatId}
        token={props.token}
        open={props.status === "first-is-login"}
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