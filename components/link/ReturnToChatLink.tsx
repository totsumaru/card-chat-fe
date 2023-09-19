"use client"

import ReturnLink from "@/components/link/ReturnLink";
import { useSearchParams } from "next/navigation";

// プロフィール画面からチャットへ戻るリンクです
export default function ReturnToChatLink() {
  const searchParams = useSearchParams();
  const messageId = searchParams.get("message-id");

  return (
    <ReturnLink text={"チャットへ戻る"} url={`/chat/${messageId}`}/>
  )
}