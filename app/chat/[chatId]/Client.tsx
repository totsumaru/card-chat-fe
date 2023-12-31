"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";
import PasscodeModal from "@/components/modal/PasscodeModal";
import ChatHeader from "@/components/header/ChatHeader";
import MessageArea from "@/app/chat/[chatId]/MessageArea";
import InputArea from "@/app/chat/[chatId]/InputArea";
import { ChatStatus, GetChat } from "@/utils/api/getChat";
import StartChatModal from "@/components/modal/StartChatModal";
import MustLoginModal from "@/components/modal/MustLoginModal";
import { Chat, Host, Kind, Message } from "@/utils/api/res";
import { PostSendTextMessage } from "@/utils/api/postSendTextMessage";
import { PostChangeToRead } from "@/utils/api/postChangeToRead";
import { PostSendImageMessage } from "@/utils/api/postSendImageMessage";

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
  const [chat, setChat] = useState<Chat>(props.chat)
  const [messages, setMessages] = useState<Message[]>(props.messages)
  const [newMessage, setNewMessage] = useState<string>("")
  const [host, setHost] = useState<Host>(props.host)
  // その他
  const scrollBottomRef = useRef<HTMLDivElement | null>(null)
  const [isScroll, setIsScroll] = useState<boolean>(false)
  const [myId, setMyId] = useState<string>(props.userId === host?.id
    ? props.userId : chat?.id || ""
  )

  // バックエンドから情報を取得し、stateを更新します
  const fetchData = async () => {
    let res;
    try {
      res = await GetChat(props.chatId, props.token);
      // 自分がhostの場合、既読処理を行います
      const isHost = res.host.id === props.userId;
      if (isHost && props.token) {
        PostChangeToRead(props.token, props.chatId);
      }

      // stateを更新します
      setChat(res.chat);
      setMessages(res.messages);
      setHost(res.host);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // 10秒ごとにデータフェッチを設定
    const intervalId = setInterval(fetchData, 10 * 1000)
    // // クリーンアップ関数を返す
    // // コンポーネントのアンマウント時や、依存関係が変更された際にインターバルをクリア
    return () => clearInterval(intervalId);
  }, [props.chatId, props.token, props.userId]);

  useEffect(() => {
    // ページリロード時に一番下までスクロール
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
  }, [])

  // 一番下までスクロールします
  // 送信者&自分のメッセージが追加された場合のみ
  useLayoutEffect(() => {
    if (isScroll && scrollBottomRef.current) {
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
    setIsScroll(false)
  }, [isScroll]);

  // メッセージ送信フォームにに入力された時の挙動です
  const handleInputChange = (inputValue: string) => {
    setNewMessage(inputValue);
  };

  // メッセージを送信します
  //
  // "text"と"image"で処理が分かれます
  const handleMessageSend = async ({ kind, image }: {
    kind: Kind
    image?: File
  }) => {
    let cashedNewMessage = ""
    if (kind === "text") {
      if (!newMessage) return
      // テキストエリアからすぐに文字を消すため、ここでキャッシュします
      cashedNewMessage = newMessage
      setNewMessage("")
    }

    // stateに追加
    setMessages(prevMessages => {
      const msg: Message = {
        id: "",
        chatId: chat.id,
        fromId: myId,
        content: {
          kind: kind,
          url: kind === "image" ? URL.createObjectURL(image!) : "",
          text: cashedNewMessage
        },
        created: new Date(),
      }
      if (!prevMessages) {
        return [msg];
      }
      return [msg, ...prevMessages];
    });

    setIsScroll(true)

    // バックエンドに送信
    try {
      await callSendMessageByKind({
        kind: kind,
        token: props.token,
        chatID: props.chatId,
        text: cashedNewMessage,
        image: image,
      })
    } catch (e) {
      console.error(e)
      alert("エラーが発生しました")
      setNewMessage(cashedNewMessage)
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* ヘッダー */}
      <ChatHeader
        setModalOpen={setNoticeModalOpen}
        isHost={host?.id === props.userId}
        chatId={props.chatId}
        chat={chat!}
        host={host!}
      />

      {/* 通知メールModal */}
      <NoticeEmailModal
        chatId={props.chatId}
        passcode={chat?.passcode}
        modalOpen={noticeModalOpen}
        setModalOpen={setNoticeModalOpen}
        registeredEmail={chat?.guest.email}
        setChat={setChat}
      />

      {/* 開始Modal */}
      <StartChatModal
        chatId={props.chatId}
        token={props.token}
        open={props.status === "first-is-login"}
        setMyId={setMyId}
        setChat={setChat}
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
          handleMessageSend={() => handleMessageSend({ kind: "text" })}
          imageSend={(image: File) => handleMessageSend({ kind: "image", image: image })}
        />
      </div>
    </div>
  )
}

// text|imageによってコールするAPIを変更します
const callSendMessageByKind = async ({ kind, token, chatID, text, image }: {
  kind: Kind
  token: string
  chatID: string
  text?: string
  image?: File
}) => {
  switch (kind) {
    case "text":
      await PostSendTextMessage({
        token: token,
        chatId: chatID,
        text: text || "",
      })
      break
    case "image":
      await PostSendImageMessage({
        token: token,
        chatId: chatID,
        image: image!,
      })
  }
}