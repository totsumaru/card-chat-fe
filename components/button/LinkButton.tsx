import { buttonClassName } from "@/components/button/buttonClassName";
import { ReactNode } from "react";

type Props = {
  label: string
  href: string
  widthFull?: boolean
  isWhite?: boolean
  icon?: ReactNode
}

/**
 * リンクボタンです
 */
export default function LinkButton({
  label, href, widthFull, isWhite, icon
}: Props) {
  return (
    <a
      href={href}
      className={buttonClassName(isWhite, widthFull)}
    >
      {icon}
      {label}
    </a>
  )
}