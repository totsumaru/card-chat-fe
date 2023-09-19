import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

// ダッシュボードです
export default async function Index({
  params: { writerId }
}: {
  params: { writerId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="mx-auto max-w-7xl">
      {/* ヘッダー */}
      <div className="flex justify-between items-center bg-blue-500 text-white px-5 py-3">
        {/* 左側 */}
        <Link href={"#"}>
          <div className="flex items-center">
            <p className="">戸塚翔太</p>
          </div>
        </Link>

        {/* 右側 */}
        <div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-3 py-10">
        <h1 className="text-gray-900 font-bold text-lg">
          チャット一覧
        </h1>

        <ul role="list" className="mt-5 divide-y divide-gray-100">
          {comments.map((comment) => (
            <div className="flex">
              <Link href={`/chat/m-123`}>
                <li key={comment.id} className="flex gap-x-4 p-5 hover:bg-gray-100 border-b border-b-gray-200">
                  {/* アイコン */}
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50"
                       src={comment.imageUrl} alt=""
                  />

                  <div className="flex-auto">
                    {/* 上側(名前+時間) */}
                    <div className="flex items-baseline justify-between gap-x-4">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{comment.name}</p>
                      <p className="flex-none text-xs text-gray-600">
                        <time dateTime={comment.dateTime}>{comment.date}</time>
                      </p>
                    </div>
                    {/* 下側(コメント) */}
                    <div>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </li>
              </Link>
              <div className="flex items-center">
                <Link
                  href={`/writer/dashboard/w-123/m-123`}
                  type="button"
                  className="p-2 text-gray-900 hover:text-blue-600"
                >
                  <Cog6ToothIcon className="w-5 h-5"/>
                </Link>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.',
    date: '1d ago',
    dateTime: '2023-03-04T15:54Z',
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Laudantium quidem non et saepe vel sequi accusamus consequatur et. Saepe inventore veniam incidunt cumque et laborum nemo blanditiis rerum. A unde et molestiae autem ad. Architecto dolor ex accusantium maxime cumque laudantium itaque aut perferendis.',
    date: '2d ago',
    dateTime: '2023-03-03T14:02Z',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Quia animi harum in quis quidem sint. Ipsum dolorem molestias veritatis quis eveniet commodi assumenda temporibus. Dicta ut modi alias nisi. Veniam quia velit et ut. Id quas ducimus reprehenderit veniam fugit amet fugiat ipsum eius. Voluptas nobis earum in in vel corporis nisi.',
    date: '2d ago',
    dateTime: '2023-03-03T13:23Z',
  },
  {
    id: 4,
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Unde dolore exercitationem nobis reprehenderit rerum corporis accusamus. Nemo suscipit temporibus quidem dolorum. Nobis optio quae atque blanditiis aspernatur doloribus sit accusamus. Sunt reiciendis ut corrupti ab debitis dolorem dolorem nam sit. Ducimus nisi qui earum aliquam. Est nam doloribus culpa illum.',
    date: '3d ago',
    dateTime: '2023-03-02T21:13Z',
  },
]