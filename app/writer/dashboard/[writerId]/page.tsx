import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import BaseHeader from "@/components/header/BaseHeader";
import Container from "@/components/container/Container";
import Avatar from "@/components/avatar/Avatar";
import { pathChat } from "@/utils/path";

const configLink = "/writer/dashboard/w-123/m-123"

/**
 * `/writer/dashboard/[writer-id]`
 *
 * ユーザーの一覧(ダッシュボード)ページです。
 */
export default async function Index({
  params: { writerId }
}: {
  params: { writerId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
      {/* ヘッダー */}
      <BaseHeader left={""} right={""}/>

      <Container>
        <h1 className="text-gray-900 font-bold text-lg">
          チャット一覧
        </h1>

        <ul role="list" className="mt-5 divide-gray-100">
          {comments.map((comment) => (
            <div className="flex">
              <Link href={pathChat(comment.id)}>
                <li key={comment.id} className="flex gap-x-4 p-5 hover:bg-gray-100 border-b border-b-gray-200">
                  {/* アバター */}
                  <Avatar/>

                  <div className="flex-auto">
                    {/* 上側(表示名+時間) */}
                    <div className="flex items-baseline justify-between gap-x-4">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{comment.name}</p>
                      <p className="flex-none text-xs text-gray-600">
                        {comment.date}
                      </p>
                    </div>
                    {/* 下側(コメント) */}
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
                      {comment.content}
                    </p>
                  </div>

                </li>
              </Link>

              {/* 設定アイコン */}
              <div className="flex items-center">
                <Link
                  href={configLink}
                  type="button"
                  className="p-2 text-gray-900 hover:text-blue-600"
                >
                  <Cog6ToothIcon className="w-5 h-5"/>
                </Link>
              </div>

            </div>
          ))}
        </ul>
      </Container>
    </div>
  )
}

const comments = [
  {
    id: "2883a5d2-f6be-4908-be04-e1da147f05ef",
    name: "鈴木様",
    content: "今日はありがとうございました",
    date: '1d ago',
    dateTime: '2023-03-04T15:54Z',
  }, {
    id: "d115dca9-2168-445f-8a45-991e748a0665",
    name: "吉田様",
    content: "今日はありがとうございました",
    date: '2d ago',
    dateTime: '2023-03-03T14:02Z',
  }, {
    id: "6a3c8a8e-f158-4ee3-a3dc-a6c626349c7a",
    name: "斉藤様",
    content: "今日はありがとうございました",
    date: '2d ago',
    dateTime: '2023-03-03T13:23Z',
  }, {
    id: "4f250703-023e-4523-81a7-702a9f847e45",
    name: "田中 和樹",
    content: "今日はありがとうございました",
    date: '3d ago',
    dateTime: '2023-03-02T21:13Z',
  },
]