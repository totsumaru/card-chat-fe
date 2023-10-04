import React, { ReactNode, useState } from "react";
import ButtonLoading from "@/components/loading/ButtonLoading";
import { buttonClassName } from "@/components/button/buttonClassName";

type Props = {
  label: string
  clickHandler: () => Promise<void>
  widthFull?: boolean
  isWhite?: boolean
  disabled?: boolean
  icon?: ReactNode
}

/**
 * Loading付きのボタンです
 *
 * 処理時にSpinnerが表示されます
 */
export default function LoadingButton({
  label, clickHandler, widthFull, isWhite, disabled, icon
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
      className={buttonClassName(isWhite, widthFull, disabled)}
      onClick={handler}
      disabled={loading || disabled}
    >
      {loading && <ButtonLoading/>}
      {icon}
      {label}
    </button>
  )
}