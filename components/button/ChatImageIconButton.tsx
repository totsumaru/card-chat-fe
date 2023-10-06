import { useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

type Props = {
  imageSend: (image: File) => void
}

// 画像選択&送信ボタンです
export default function ChatImageIconButton({ imageSend }: Props) {
  // input要素への参照を作成
  const fileInputRef = useRef(null);

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      imageSend(file)
    }
  };

  return (
    <div>
      <label htmlFor={"image-input"}>
        <PhotoIcon
          className="w-8 h-8 p-1 bg-gray-50 text-gray-500 rounded-full
         hover:bg-gray-100 hover:cursor-pointer"
        />
        <input
          id="image-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </label>

    </div>
  );
}
