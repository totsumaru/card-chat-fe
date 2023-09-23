import React, { useState } from "react";
import ButtonLoading from "@/components/loading/ButtonLoading";

type Props = {
  clickHandler: () => Promise<void>
  label: string
  successMessage: string
  failureMessage: string
  widthFull?: boolean
}

/**
 * ボタンです
 *
 * 処理時にSpinnerが表示されます
 */
export default function LoadingButton({
  clickHandler, label, successMessage, failureMessage, widthFull
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
      <button
        type="button"
        className={`${widthFull && "w-full"} flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
         leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
         focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        onClick={handler}
      >
        {loading && <ButtonLoading/>}
        {label}
      </button>
      {result === "success" ? (
        <p className="text-gray-800 text-sm mt-2">
          {successMessage}
        </p>
      ) : result === "failure" && (
        <p className="text-red-600 text-sm mt-2">
          {failureMessage}
        </p>
      )}
    </>
  )
}