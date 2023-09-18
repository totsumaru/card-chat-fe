"use client"

import React, { useLayoutEffect, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function Chat() {
  const [messages, setMessages] = useState<{ text: string, sender: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none bg-blue-500 text-white p-3">
        Chat Room
      </div>

      {/* メッセージエリア */}
      <div ref={scrollBottomRef} className="flex-1 overflow-y-auto p-3" id="messageArea">
        {messages.map((message, index) => (
          <div key={index}
               className={`flex items-start mb-2 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >

            {/* 相手のアバター */}
            {message.sender !== 'me' && <AvatarImg/>}

            <div className={`rounded-3xl px-4 py-3 mb-2 inline-block ${message.sender === "me"
              ? "bg-lime-200 ml-5 md:ml-8 md:max-w-[60%]"
              : "bg-gray-100 mr-5 md:mr-8 md:max-w-[60%]"}`}
            >
              {message.text}
            </div>

            {/* 自分のアバター */}
            {message.sender === 'me' && <Avatar/>}
          </div>
        ))}
      </div>

      {/* 入力エリア */}
      <div className="flex-none bg-gray-200 p-2">
        <div className="flex">
        <textarea // <--- ここを変更
          className="w-full rounded p-2 resize-none"
          placeholder="メッセージを入力"
          value={newMessage}
          onChange={handleInputChange}
          rows={3} // 任意で行数を指定
        />
          <button className="ml-2 bg-blue-500 text-white p-5 rounded" onClick={handleSend}>
            <PaperAirplaneIcon className="h-5 w-5"/>
          </button>
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="ml-2">
      <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      </span>
    </div>

  )
}

function AvatarImg() {
  return (
    <div className="mr-2">
      <img
        className="inline-block h-10 w-10 rounded-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </div>
  )
}