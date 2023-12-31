"use client"

import Avatar from "@/components/image/Avatar";
import { pathDisplayNameEdit, pathProfile } from "@/utils/path";
import { Host, Message } from "@/utils/api/res";
import { urlToA } from "@/utils/urlToA";

type Props = {
  userId: string
  chatId: string
  myId: string
  host: Host
  messages: Message[]
  scrollBottomRes: any
}

/**
 * メッセージ表示エリアのコンポーネントです
 */
export default function MessageArea({
  userId, chatId, host, messages, myId, scrollBottomRes
}: Props) {
  return (
    <div ref={scrollBottomRes} className="flex-1 overflow-y-auto px-4 pt-24 pb-3">
      {messages && [...messages].reverse().map((message, index) => (
        <div key={index}
             className={`flex items-start mb-2 ${message.fromId === myId
               ? 'justify-end' : 'justify-start'}`}
        >

          { /**
           * 相手のアバター
           * - メッセージの送信者が相手の場合に表示
           * - 自分がHostの場合は、相手はデフォルトのアバター&URL
           * - 自分がGuestの場合は、相手は 画像&URL を付与
           */}
          {message.fromId !== myId && (
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
          {message.content.kind === "text" ? (
            // Text
            <div className={`rounded-3xl text-sm px-4 py-3 mb-2 inline-block whitespace-pre-line
              ${message.fromId === myId
              ? "bg-lineGreen max-w-[70%] md:ml-8 md:max-w-[60%]"
              : "bg-gray-100 max-w-[70%] md:mr-8 md:max-w-[60%]"}`
            }>
              {urlToA(message.content.text)}
            </div>
          ) : (
            // 画像
            <img src={message.content.url} alt="画像" className={message.fromId === myId
              ? "bg-lineGreen max-w-[60%] md:ml-8 md:max-w-[30%] rounded-2xl"
              : "bg-gray-100 max-w-[60%] md:mr-8 md:max-w-[30%] rounded-2xl"
            }/>
          )}

          { /**
           * 自分のアバター
           * - メッセージの送信者が自分の場合に表示
           * - 自分がHostの場合は 画像&URL を付与
           * - 自分がGuestの場合はデフォルトのアバター(URLなし)
           */}
          {message.fromId === myId && (
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
  )
}