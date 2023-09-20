import { ReactNode } from "react";
import Link from "next/link";
import { pathDashboard } from "@/utils/path";

type Props = {
  left: ReactNode
  right: ReactNode
  myWriterId?: string // Writerとしてログインしている場合のみ
}

/**
 * Headerのベースです
 *
 * ログイン済み(myWriterId) & rightが指定されていない場合は右側にダッシュボードのURLを入れます。
 */
export default function BaseHeader({ left, right, myWriterId }: Props) {
  let dashboardUrl: string = ""
  if (myWriterId && !right) {
    dashboardUrl = pathDashboard(myWriterId)
  }

  return (
    <div className="flex justify-between items-center bg-indigo-500
     text-white px-5 py-3 min-h-[30px]"
    >
      {/* 左側 */}
      <div>
        {left || <a href="/" className="text-lg">ChatCard</a>}
      </div>
      {/* 右側 */}
      <div>
        {dashboardUrl ? (
          <Link
            href={dashboardUrl}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold
             text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            ダッシュボード
          </Link>
        ) : right}
      </div>
    </div>
  )
}