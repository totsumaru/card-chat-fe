import { buttonClassName } from "@/components/button/buttonClassName";
import Link from "next/link";

type Props = {
  label: string
  href: string
  widthFull?: boolean
  isWhite?: boolean
}

/**
 * リンクボタンです
 *
 * aタグやLinkとして使用します。
 */
export default function LinkButton({
  label, href, widthFull, isWhite
}: Props) {
  return (
    <Link
      href={href}
      className={buttonClassName(isWhite, widthFull)}
    >
      {label}
    </Link>
  )
}