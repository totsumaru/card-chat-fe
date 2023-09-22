"use client"

import React, { useLayoutEffect, useRef, useState } from "react";
import { Chat, Message } from "@/utils/sample/Chat";
import { User } from "@/utils/sample/User";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";
import PasscodeModal, { Status } from "@/components/modal/PasscodeModal";
import { GetChatByPasscode } from "@/utils/api/getChatByPasscode";
import ChatHeader from "@/components/header/ChatHeader";
import { validatePasscode } from "@/utils/validatePasscode";
import MessageArea from "@/app/chat/[chatId]/MessageArea";
import InputArea from "@/app/chat/[chatId]/InputArea";
import { sleep } from "@/utils/sample/sleep";

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

  // メッセージ送信フォームにに入力された時の挙動です
  const handleInputChange = (inputValue: string) => {
    setNewMessage(inputValue);
  };

  // メッセージを送信
  const handleMessageSend = () => {
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

  // パスコードを送信
  const handlePasscodeSend = async () => {
    validatePasscode(passcode) || alert("数字6桁で入力してください")
    // statusをリセット
    setPasscodeStatus("none")
    await sleep()

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

      {/* 通知Modal */}
      <NoticeEmailModal registeredEmail={chat?.guest.noticeEmail}/>

      {/* パスコードModal */}
      <PasscodeModal
        modalOpen={passcodeModalOpen}
        setModalOpen={setPasscodeModalOpen}
        passcode={passcode}
        setPasscode={setPasscode}
        handleSend={handlePasscodeSend}
        status={passcodeStatus}
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