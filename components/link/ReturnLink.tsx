import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  text: string
  url: string
  textWhite?: boolean
}

/**
 * 「戻る」リンクのコンポーネントです
 */
export default function ReturnLink({ text, url, textWhite }: Props) {
  const link = (
    <Link href={url} className="flex items-center w-fit">
      <ChevronLeftIcon className="w-4 h-4 mr-1"/>
      {text}
    </Link>
  )

  return (
    <div className={`py-1 w-fit ${
      textWhite ? "text-white" : " text-blue-600"
    }`}
    >
      {link}
    </div>
  )
}