import React, { useState } from "react";
import ButtonLoading from "@/components/loading/ButtonLoading";
import { buttonClassName } from "@/components/button/buttonClassName";

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

  return (
    <>
      {/* ボタン */}
      <button
        type="button"
        className={buttonClassName(isWhite, widthFull)}
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