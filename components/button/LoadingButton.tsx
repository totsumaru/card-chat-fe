import React, { useState } from "react";
import ButtonLoading from "@/components/loading/ButtonLoading";
import { buttonClassName } from "@/components/button/buttonClassName";

type Props = {
  clickHandler: () => Promise<void>
  label: string
  widthFull?: boolean
  isWhite?: boolean
  disabled?: boolean
}

/**
 * Loading付きのボタンです
 *
 * 処理時にSpinnerが表示されます
 */
export default function LoadingButton({
  clickHandler, label, widthFull, isWhite, disabled
}: Props) {
  const [loading, setLoading] = useState<boolean>(false)

  const handler = async () => {
    setLoading(true)
    await clickHandler()
    setLoading(false)
  }

  return (
    <button
      type="button"
      className={buttonClassName(isWhite, widthFull)}
      onClick={handler}
      disabled={disabled}
    >
      {loading && <ButtonLoading/>}
      {label}
    </button>
  )
}