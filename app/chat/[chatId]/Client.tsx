"use client"

import { Session } from "@supabase/gotrue-js";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GetChat } from "@/utils/api/getChat";
import { currentUserSession } from "@/utils/sample/Sample";
import { Chat, Message } from "@/utils/sample/Chat";
import Link from "next/link";
import Avatar from "@/components/avatar/Avatar";
import { pathDisplayNameEdit, pathProfile } from "@/utils/path";
import { User } from "@/utils/sample/User";
import Header from "@/components/header/Header";
import NoticeModalOpenButton from "@/components/button/NoticeModalOpenButton";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";
import PasscodeModal, { Status } from "@/components/modal/PasscodeModal";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { GetChatByPasscode } from "@/utils/api/getChatByPasscode";

type Props = {
  userId: string
  session: Session | null
  chatId: string
}

/**
 * チャットページのClientコンポーネントです
 *
 * TODO: ゲストは、memoや表示名を取得できないようにする
 */
export default function Client({ userId, session, chatId }: Props) {
  // パスコードModal
  const [passcodeModalOpen, setPasscodeModalOpen] = useState<boolean>(false)
  const [passcode, setPasscode] = useState<string>("")
  const [passcodeStatus, setPasscodeStatus] = useState<Status>("none")
  // チャット
  const [chat, setChat] = useState<Chat>() // ここはInfo用に使用します
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [host, setHost] = useState<User>()
  // その他
  const scrollBottomRef = useRef<HTMLDivElement | null>(null)
  const [myId, setMyID] = useState("")

  useEffect(() => {
    const auth = async () => {
      if (userId) {
        try {
          const res = await GetChat(chatId, currentUserSession)
          setChat(res.chat)
          setMessages(res.chat.messages)
          setHost(res.host)
          setMyID(userId)
        } catch (e) {
          console.log(e)
          setPasscodeModalOpen(true)
        }
      } else {
        setPasscodeModalOpen(true)
      }
    }
    auth().then()
  }, [])

  // メッセージが追加されたら一番下までスクロール
  useLayoutEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
  }, [messages]);

  const registeredEmail = "techstart35@gmail.com"

  // メッセージを送信
  const handleSend = () => {
    if (newMessage === "") {
      return
    }

    // 自分のメッセージを追加
    setMessages(prevMessages => [
      ...prevMessages,
      {
        content: newMessage,
        from: myId,
        date: "2023-01-23",
        isRead: true,
      },
    ]);

    // メッセージボックスをクリア
    setNewMessage("");

    // 500ミリ秒後に相手のメッセージを追加
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
          from: "other",
          date: "2023-01-23",
          isRead: true,
        },
      ]);
    }, 500);
  };

  // メッセージ送信フォームにに入力された時の挙動です
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: ここでPOSTリクエストを送信
    setNewMessage(e.target.value);
  };

  // パスコードを送信
  const handlePasscodeSend = async () => {
    if (!(/^[0-9]*$/.test(passcode) && passcode.length === 6)) {
      alert("数字6桁で入力してください")
      return
    }
    // statusをリセット
    setPasscodeStatus("none")

    await new Promise(resolve => setTimeout(resolve, 1000))
    try {
      const res = await GetChatByPasscode(chatId, passcode)
      setChat(res.chat)
      setMessages(res.chat.messages)
      setHost(res.host)
      setMyID(userId)
    } catch (e) {
      setPasscodeStatus("invalid")
      return
    } finally {
      setPasscode("")
    }

    setPasscodeStatus("success")
    setMyID(chatId)
  }

  /**
   * Header
   */
  const headerLink = host?.id === userId
    ? pathDisplayNameEdit(chatId, true)
    : pathProfile(chat?.hostId || "", chatId)

  const headerAvatarUrl = host?.id === userId ? "" : host?.avatarUrl

  const headerDisplayName = host?.id === userId
    ? chat?.guest.displayName || chat?.id
    : host?.name

  const headerLeft = (
    <Link href={headerLink}>
      <div className="flex items-center">
        <Avatar imageUrl={headerAvatarUrl}/>
        <p className="ml-2">{headerDisplayName}</p>
      </div>
    </Link>
  )

  return (
    <div className="relative h-screen overflow-hidden">
      {/* ヘッダー */}
      <Header
        left={headerLeft}
        right={<NoticeModalOpenButton registeredEmail={registeredEmail}/>}
        isHost={host?.id === userId}
      />

      {/* Modal */}
      <NoticeEmailModal registeredEmail={registeredEmail}/>

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

          {messages.map((message, index) => (
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

// URLの部分をaタグに変更
function urlToA(text: string) {
  const urlRegex = /(https?:\/\/\S+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (i % 2 === 0) {
      return part;
    } else {
      return (
        <a className="text-blue-600"
           href={part}
           target="_blank"
           rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    }
  });
}
