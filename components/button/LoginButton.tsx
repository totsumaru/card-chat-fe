"use client"

import { useState } from "react";
import ButtonLoading from "@/components/loading/ButtonLoading";
import { useRouter } from "next/navigation";
import { pathDashboard } from "@/utils/path";
import { sleep } from "@/utils/sample/sleep";

type Props = {
  email: string
  password: string
}

/**
 * ログインボタンのコンポーネントです
 */
export default function LoginButton({ email, password }: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>("ログインできません")
  const router = useRouter()

  const clickHandler = async () => {
    // email, passwordを送信
    setLoading(true)
    setErrMsg("")

    // TODO: 一時的にSleep
    await sleep()
    setLoading(false)
    router.push(pathDashboard())
  }

  return (
    <div>
      {/* ボタン */}
      <button
        type="submit"
        className="flex items-center justify-center w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
               leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={clickHandler}
        disabled={loading}
      >
        {loading && <ButtonLoading/>}
        ログイン
      </button>

      {/* エラーメッセージ */}
      <p className="text-sm text-red-500 mt-1">{errMsg}</p>
    </div>
  )
}