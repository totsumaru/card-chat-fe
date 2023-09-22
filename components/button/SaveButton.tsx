import React, { useState } from "react";
import ButtonLoading from "@/components/loading/ButtonLoading";

type Props = {
  clickHandler: () => Promise<void>
  customLabel?: string
}

/**
 * 保存ボタンです
 */
export default function SaveButton({ clickHandler, customLabel }: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<"success" | "failure">()

  const handler = async () => {
    setLoading(true)
    setResult(undefined)

    try {
      await clickHandler()
      setResult("success")
    } catch (e) {
      setResult("failure")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
         leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
         focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handler}
      >
        {loading && <ButtonLoading/>}
        {customLabel || "保存する"}
      </button>
      {result === "success" ? (
        <p className="text-gray-800 text-sm mt-2">
          保存しました
        </p>
      ) : result === "failure" && (
        <p className="text-red-600 text-sm mt-2">
          保存に失敗しました
        </p>
      )}
    </>
  )
}