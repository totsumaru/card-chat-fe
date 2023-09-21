"use client"

import ReturnLink from "@/components/link/ReturnLink";
import { useSearchParams } from "next/navigation";
import { paramChatId, pathChat } from "@/utils/path";

type Props = {
  textWhite: boolean
}

/**
 *  プロフィール画面からチャットへ戻るリンクです
 *
 *  クエリパラメーターを取得するため、clientとして切り出しています。
 */
export default function ReturnToChatLink({ textWhite }: Props) {
  const searchParams = useSearchParams();
  const chatId = searchParams.get(paramChatId);

  return (
    <>
      {chatId && (
        <ReturnLink
          text={"チャットへ戻る"}
          url={pathChat(chatId)}
          textWhite={textWhite}
        />
      )}
    </>
  )
}