import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import ChatImageIconButton from "@/components/button/ChatImageIconButton";
import { useRef } from "react";

type Props = {
  newMessage: string
  handleInputChange: (inputValue: string) => void
  handleMessageSend: () => void
}

/**
 * チャットの入力エリアです
 */
export default function InputArea({
  newMessage, handleInputChange, handleMessageSend
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSendAndFocus = () => {
    handleMessageSend();  // 既存の送信処理を呼び出す
    textareaRef.current?.focus()  // そしてtextareaにフォーカスを戻す
  };

  return (
    <div className="flex-none bg-gray-200 px-3 py-3">
      <div className="flex items-end">
        <ChatImageIconButton/>
        <textarea
          ref={textareaRef}
          className="w-full rounded ml-1 p-2 resize-none text-base"
          placeholder="メッセージを入力"
          value={newMessage}
          onChange={(e) => handleInputChange(e.target.value)}
          rows={3}
        />

        {/* 送信ボタン */}
        <div className="flex items-end">
          <button
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded h-10"
            onClick={handleSendAndFocus}
          >
            <PaperAirplaneIcon className="h-5 w-5"/>
          </button>
        </div>
      </div>

      {/* 備考 */}
      <div className="mx-1 mt-1 mb-2 w-fit flex items-center">
        <p className="text-xs text-gray-600">
          ※こちらは簡易チャットです。
          <b><u>個人情報を送付する場合は、担当者のメールアドレス等に送付</u></b>してください。
        </p>
      </div>

    </div>
  )
}