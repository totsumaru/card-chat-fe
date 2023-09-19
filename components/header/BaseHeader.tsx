import { ReactNode } from "react";

type Props = {
  left: ReactNode
  right: ReactNode
}

// Headerのベースです
export default function BaseHeader({ left, right }: Props) {
  return (
    <div className="flex justify-between items-center bg-indigo-500
     text-white px-5 py-3 min-h-[30px]"
    >
      {/* 左側 */}
      <div>
        {left || <a href="/" className="text-lg">ChatCard</a>}
      </div>
      {/* 右側 */}
      <div>{right}</div>
    </div>
  )
}