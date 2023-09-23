import React, { useState } from "react";
import ButtonLoading from "@/components/loading/ButtonLoading";

type Props = {
  clickHandler: () => Promise<void>
  label: string
  successMessage: string
  failureMessage: string
  // option
  widthFull?: boolean
  isWhite?: boolean
}

/**
 * ボタンです
 *
 * 処理時にSpinnerが表示されます
 */
export default function LoadingButton({
  clickHandler, label, successMessage, failureMessage, widthFull, isWhite
}: Props) {
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

  // ボタンのクラス名
  let colorClassName: string
  if (isWhite) {
    colorClassName = `bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50`
  } else {
    colorClassName = `bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`
  }

  return (
    <>
      {/* ボタン */}
      <button
        type="button"
        className={`${widthFull && "w-full"} ${colorClassName} flex items-center
         justify-center rounded-md px-3 py-2 text-sm font-semibold leading-6 shadow-sm`}
        onClick={handler}>
        {loading && <ButtonLoading/>}
        {label}
      </button>

      {/* 結果 */}
      {result === "success" && successMessage && (
        <p className="text-gray-800 text-sm mt-2">{successMessage}</p>
      )}
      {result === "failure" && failureMessage && (
        <p className="text-red-600 text-sm mt-2">{failureMessage}</p>
      )}
    </>
  )
}