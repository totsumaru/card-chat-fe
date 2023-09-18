"use client"

import React, { useLayoutEffect, useRef, useState } from "react";
import { BellIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";

export default function Chat() {
  const [messages, setMessages] = useState<{ text: string, sender: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [open, setOpen] = useState(false)
  const [currentEmail, setCurrentEmail] = useState<string>("tech")
  const scrollBottomRef = useRef<HTMLDivElement | null>(null);

  // メッセージが追加されたら一番下までスクロール
  useLayoutEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage === "") {
      return
    }

    // 自分のメッセージを追加
    setMessages(prevMessages => [
      ...prevMessages,
      { text: newMessage, sender: "me" },
    ]);

    // メッセージボックスをクリア
    setNewMessage("");

    // TODO: 最終的に削除
    // 500ミリ秒後に相手のメッセージを追加
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "こんにちは、これは自動応答です。", sender: "other" },
      ]);
    }, 500);
  };

  // メッセージ送信フォームにに入力された時の挙動です
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  // 通知ボタンを押した時の挙動です
  const handleNoticeBtn = () => {
    setOpen(true)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Modal */}
      <NoticeEmailModal open={open} setOpen={setOpen} currentEmail={currentEmail}/>

      {/* ヘッダー */}
      <div className="flex justify-between items-center bg-blue-500 text-white px-5 py-3">
        {/* 左側 */}
        <div className="flex items-center">
          <AvatarImg href={`#`}/>
          <p className="">戸塚翔太</p>
        </div>
        {/* 右側 */}
        <div>
          <button
            type="button"
            className="flex rounded-md bg-indigo-50 px-3 py-2 text-sm text-gray-700
             shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handleNoticeBtn}
          >
            <BellIcon className="w-5 h-5 mr-1"/>
            <p className="">
              {currentEmail
                ? "登録済"
                : "受信通知を受け取る"
              }
            </p>
          </button>
        </div>
      </div>

      {/* メッセージエリア */}
      <div ref={scrollBottomRef} className="flex-1 overflow-y-auto px-4 py-3" id="messageArea">
        {messages.map((message, index) => (
          <div key={index}
               className={`flex items-start mb-2 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >

            {/* 相手のアバター */}
            {message.sender !== 'me' && <AvatarImg href={`#`}/>}

            {/* メッセージ */}
            <div className={`rounded-3xl px-4 py-3 mb-2 inline-block whitespace-pre-line ${message.sender === "me"
              ? "bg-lime-200 ml-5 md:ml-8 md:max-w-[60%]"
              : "bg-gray-100 mr-5 md:mr-8 md:max-w-[60%]"}`
            }>
              {linkify(message.text)}
            </div>

            {/* 自分のアバター */}
            {message.sender === 'me' && <Avatar href={""}/>}
          </div>
        ))}
      </div>

      {/* 入力エリア */}
      <div className="flex-none bg-gray-200 p-2">
        <div className="flex">
          <textarea
            className="w-full rounded p-2 resize-none"
            placeholder="返信を入力しよう"
            value={newMessage}
            onChange={handleInputChange}
            rows={3}
          />
          <button className="ml-2 bg-blue-500 text-white p-5 rounded" onClick={handleSend}>
            <PaperAirplaneIcon className="h-5 w-5"/>
          </button>
        </div>
        <div className="mx-1 mt-1 mb-2 w-fit flex items-center">
          <p className="text-sm text-gray-600">
            ※こちらは簡易チャットです。
            <b><u>個人情報を送付する場合は、担当者のメールアドレス等に</u></b>送付してください。
          </p>
        </div>
      </div>
    </div>
  );
}

// 無名アバター
function Avatar({ href }: { href: string }) {
  const content = (
    <div className="ml-2">
      <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      </span>
    </div>
  )

  return (
    <>
      {href ? (
        <Link href={`#`}>
          {content}
        </Link>
      ) : content}
    </>
  )
}

// 画像アバター
function AvatarImg({ href }: { href: string }) {
  const content = (
    <div className="mr-2">
      <img
        className="inline-block h-10 w-10 rounded-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </div>
  )
  return (
    <>
      {href ? (
        <Link href={`#`}>
          {content}
        </Link>
      ) : content}
    </>
  )
}

// URLの部分をaタグに変更
function linkify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (i % 2 === 0) {
      return part;
    } else {
      return <a className="text-blue-600" href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
    }
  });
}