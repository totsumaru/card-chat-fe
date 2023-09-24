import { ReactNode } from "react";
import { pathDashboard } from "@/utils/path";
import LinkButton from "@/components/button/LinkButton";
import { ListBulletIcon } from "@heroicons/react/24/outline";

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
          <LinkButton
            label={"ダッシュボード"}
            href={dashboardUrl}
            isWhite
            icon={<ListBulletIcon className="h-5 w-5 mr-1"/>}
          />
        ) : right}
      </div>
    </div>
  )
}