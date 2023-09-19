import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  text: string
  url: string
}

export default function ReturnLink({ text }: Props) {
  return (
    <div className="flex items-center py-1">
      <ChevronLeftIcon className="w-4 h-4 text-white mr-1"/>
      <Link href={`/chat/123`} className="text-white">
        チャットへ戻る
      </Link>
    </div>
  )
}