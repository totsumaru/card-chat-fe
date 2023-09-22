import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

type Props = {
  newMessage: string
  handleInputChange: (inputValue: string) => void
  handleMessageSend: () => void
}

export default function InputArea({
  newMessage, handleInputChange, handleMessageSend
}: Props) {
  return (
    <div className="flex-none bg-gray-200 px-4 py-3">
      <div className="flex items-end">
          <textarea
            className="w-full rounded p-2 resize-none text-sm"
            placeholder="メッセージを入力"
            value={newMessage}
            onChange={(e) => handleInputChange(e.target.value)}
            rows={3}
          />
        {/* 送信ボタン */}
        <div className="flex items-end">
          <button
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded h-10"
            onClick={handleMessageSend}
          >
            <PaperAirplaneIcon className="h-5 w-5"/>
          </button>
        </div>
      </div>
      <div className="mx-1 mt-1 mb-2 w-fit flex items-center">
        <p className="text-xs text-gray-600">
          ※こちらは簡易チャットです。
          <b><u>個人情報を送付する場合は、担当者のメールアドレス等に</u></b>送付してください。
        </p>
      </div>
    </div>
  )
}