import React, { useState } from "react";
import ButtonLoading from "@/components/loading/ButtonLoading";
import { buttonClassName } from "@/components/button/buttonClassName";

type Props = {
  label: string
  clickHandler: () => Promise<void>
  isValid?: () => boolean
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
  label, clickHandler, isValid, widthFull, isWhite, disabled
}: Props) {
  const [loading, setLoading] = useState<boolean>(false)

  if (!isValid) {
    return
  }

  const handler = async () => {
    setLoading(true)
    await clickHandler()
    setLoading(false)
  }

  return (
    <button
      type="button"
      className={buttonClassName(isWhite, widthFull, disabled)}
      onClick={handler}
      disabled={loading || disabled}
    >
      {loading && <ButtonLoading/>}
      {label}
    </button>
  )
}