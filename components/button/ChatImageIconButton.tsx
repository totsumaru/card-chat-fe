import { PhotoIcon } from "@heroicons/react/24/outline";
import InputImageBase from "@/components/image/InputImageBase";

type Props = {
  setImage: (image: File) => void
}

// 画像選択&送信ボタンです
export default function ChatImageIconButton({ setImage }: Props) {
  const id_html_for = "image-input"

  return (
    <div>
      <label htmlFor={id_html_for}>
        {/* 画像アイコン */}
        <PhotoIcon
          className="w-8 h-8 p-1 bg-gray-50 text-gray-500 rounded-full
          hover:bg-gray-100 hover:cursor-pointer"
        />
        {/* 画像選択のinput(hidden) */}
        <InputImageBase id_html_for={id_html_for} setImage={setImage}/>
      </label>
    </div>
  );
}
