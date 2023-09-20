import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Container from "@/components/container/Container";
import Avatar from "@/components/avatar/Avatar";
import { pathChat, pathDisplayNameEdit } from "@/utils/path";
import Header from "@/components/header/Header";
import { GetDashboard } from "@/utils/sample/API";

/**
 * `/writer/dashboard/[writer-id]`
 *
 * ダッシュボードページです。
 */
export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  // 自分が管理する全てのチャットを取得します
  const chats = GetDashboard()

  return (
    <div>
      {/* ヘッダー */}
      <Header left={""} right={""}/>

      <Container>
        <h1 className="text-gray-900 font-bold text-lg">
          チャット一覧
        </h1>

        {/**
         * TODO: このへんに自分のプロフィールを表示する
         */}

        <ul role="list" className="mt-5">
          {chats && chats.map((chat) => {
            const latestMessage = chat.messages[chat.messages.length - 1]

            return (
              <div className="flex hover:bg-gray-100 border-b border-b-gray-200">

                <Link href={pathChat(chat.id)} className="flex-1">
                  <li key={chat.id} className="flex gap-x-4 p-5 w-full">
                    {/* アバター */}
                    <Avatar unreadFlg={!latestMessage.isRead}/>

                    <div className="w-full">
                      {/* 上側(表示名+時間) */}
                      <div className="flex items-baseline justify-between gap-x-4">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {chat.reader.displayName || chat.id}
                        </p>
                        <p className="flex-none text-xs text-gray-600">{latestMessage.date}</p>
                      </div>
                      {/* 下側(コメント) */}
                      <p className={`mt-1 line-clamp-1 text-sm leading-6
                       ${latestMessage.isRead ? "text-gray-400" : "text-gray-600 font-bold"}`}
                      >
                        {latestMessage.content}
                      </p>
                    </div>

                  </li>
                </Link>

                {/* 設定アイコン */}
                <div className="flex items-center">
                  <Link
                    href={pathDisplayNameEdit(chat.id)}
                    type="button"
                    className="p-2 text-gray-900 hover:text-blue-600"
                  >
                    <Cog6ToothIcon className="w-5 h-5"/>
                  </Link>
                </div>

              </div>
            )
          })}
        </ul>
      </Container>
    </div>
  )
}