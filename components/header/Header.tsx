import { ReactNode } from "react";
import { pathDashboard } from "@/utils/path";
import Link from "next/link";

type Props = {
  left: ReactNode
  right: ReactNode
  isHost?: boolean
}

/**
 * Headerのベースです
 *
 * Hostの場合は、右側にダッシュボードのURLを入れます。
 *
 * `isHost`が`right`よりも優先となるため、
 * rightを優先させたい場合は`isHost`は指定しないでください。
 */
export default function Header({ left, right, isHost }: Props) {
  let dashboardUrl: string = ""
  if (isHost) {
    dashboardUrl = pathDashboard()
  }

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center bg-indigo-500
     text-white px-5 py-3 z-10 min-h-[30px]"
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
            className="block rounded-md bg-white px-3 py-2 text-sm font-semibold
             text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            ダッシュボード
          </Link>
        ) : right}
      </div>
    </div>
  )
}