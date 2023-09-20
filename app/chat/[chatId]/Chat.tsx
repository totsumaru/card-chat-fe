"use client"

import React, { useLayoutEffect, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { pathDisplayNameEdit, pathProfile } from "@/utils/path";
import { SampleAvatarUrl } from "@/utils/sample/Sample";
import Avatar from "@/components/avatar/Avatar";

// const writerProfileUrl = `/writer/profile/w-123`

type Props = {
  chatId: string
  isWriter: boolean
  writer: {
    id: string
    name: string
    imageUrl: string
  }
  reader: {
    displayName: string
  }
}

// チャットコンポーネントです
export default function Chat({ chatId, isWriter, writer, reader }: Props) {
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
        {
          text: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
          sender: "other"
        },
      ]);
    }, 500);
  };

  // メッセージ送信フォームにに入力された時の挙動です
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-[#8cacdc]">
      {/* メッセージエリア */}
      <div ref={scrollBottomRef} className="flex-1 overflow-y-auto px-4 py-3" id="messageArea">
        {messages.map((message, index) => (
          <div key={index}
               className={`flex items-start mb-2 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >

            { /**
             * 相手のアバター
             * - メッセージの送信者が相手の場合に表示
             * - 相手がWriterの場合は 画像&URL を付与
             * - 相手がReaderの場合はデフォルトのアバター&URL
             */}
            {message.sender !== 'me' && (
              <div className="mr-2 flex-shrink-0">
                {isWriter ? (
                  <Avatar href={pathDisplayNameEdit(writer.id, chatId)}/>
                ) : (
                  <Avatar
                    imageUrl={SampleAvatarUrl}
                    href={pathProfile(writer.id, chatId)}
                  />
                )}
              </div>
            )}

            {/* メッセージ */}
            <div className={`rounded-3xl text-sm px-4 py-3 mb-2 inline-block whitespace-pre-line
            ${message.sender === "me"
              ? "bg-[#6fe57d] max-w-[70%] md:ml-8 md:max-w-[60%]"
              : "bg-gray-100 max-w-[70%] md:mr-8 md:max-w-[60%]"}`
            }>
              {urlToA(message.text)}
            </div>

            { /**
             * 自分のアバター
             * - メッセージの送信者が自分の場合に表示
             * - 自分がWriterの場合は 画像&URL を付与
             * - 自分がReaderの場合はデフォルトのアバター(URLなし)
             */}
            {message.sender === 'me' && (
              <div className="ml-2 flex-shrink-0">
                {isWriter ? (
                  <Avatar
                    imageUrl={SampleAvatarUrl}
                    href={pathProfile(writer.id, chatId)}
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
            className="w-full rounded p-2 resize-none"
            placeholder="返信を入力しよう"
            value={newMessage}
            onChange={handleInputChange}
            rows={3}
          />
          {/* 送信ボタン */}
          <div className="flex items-end">
            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded h-10" onClick={handleSend}>
              <PaperAirplaneIcon className="h-5 w-5"/>
            </button>
          </div>
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

// URLの部分をaタグに変更
function urlToA(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
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