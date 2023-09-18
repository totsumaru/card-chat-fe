"use client"

import React, { useLayoutEffect, useRef, useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<{ text: string, sender: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollBottomRef = useRef<HTMLDivElement | null>(null);

  // メッセージが追加されたら一番下までスクロール
  useLayoutEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    // 自分のメッセージを追加
    setMessages(prevMessages => [
      ...prevMessages,
      { text: newMessage, sender: 'me' },
    ]);

    // メッセージボックスをクリア
    setNewMessage('');

    // 500ミリ秒後に相手のメッセージを追加
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'こんにちは、これは自動応答です。', sender: 'other' },
      ]);
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
               className={`rounded-lg p-2 mb-2 inline-block clear-both ${message.sender === 'me' ? 'bg-green-100 float-right' : 'bg-blue-100 float-left'}`}>
            {message.text}
          </div>
        ))}
      </div>

      {/* 入力エリア */}
      <div className="flex-none bg-gray-200 p-2">
        <div className="flex">
          <input
            className="w-full rounded p-2"
            type="text"
            placeholder="メッセージを入力"
            value={newMessage}
            onChange={handleInputChange}
          />
          <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={handleSend}>
            送信
          </button>
        </div>
      </div>
    </div>
  );
}
