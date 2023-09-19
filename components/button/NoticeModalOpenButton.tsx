"use client"

import { BellIcon } from "@heroicons/react/24/outline";
import { useNoticeModalStore } from "@/store/store";

type Props = {
  registeredEmail?: string
}

/**
 * 通知モーダルを開くボタンです
 */
export default function NoticeModalOpenButton({ registeredEmail }: Props) {
  const store = useNoticeModalStore()

  // 通知ボタンを押した時の挙動です
  const handleNoticeBtn = () => {
    store.setOpen(true)
  }

  return (
    <button
      type="button"
      className="flex rounded-md bg-indigo-50 px-3 py-2 text-sm text-gray-700
       shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      onClick={handleNoticeBtn}
    >
      <BellIcon className="w-5 h-5 mr-1"/>
      <p>
        {registeredEmail ? "登録済" : "受信通知を受け取る"}
      </p>
    </button>
  )
}