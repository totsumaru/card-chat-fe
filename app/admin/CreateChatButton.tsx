"use client"

import LoadingButton from "@/components/button/LoadingButton";
import { PostCreateChat } from "@/utils/api/postCreateChat";
import { useState } from "react";

type Props = {
  token: string
}

// チャット作成ボタンです
export default function CreateChatButton({ token }: Props) {
  const [chatId, setChatID] = useState<string>("")
  const [passcode, setPasscode] = useState<string>("")

  const handle = async () => {
    try {
      const res = await PostCreateChat(token)
      setChatID(res.chatId)
      setPasscode(res.passcode)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <LoadingButton
        label={"チャットを作成"}
        clickHandler={handle}
      />
      <p>チャットID: {chatId}</p>
      <p>パスコード: {passcode}</p>
    </div>
  )
}