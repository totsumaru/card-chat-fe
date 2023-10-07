import { PlusIcon } from "@heroicons/react/24/outline";
import InputImageBase from "@/components/image/InputImageBase";

type Props = {
  setImage: (image: File) => void
}

/**
 * アバターを選択するボタンです
 */
export default function AvatarSelectButton({ setImage }: Props) {
  return (
    <div className="flex items-center ml-7 sm:ml-10">
      {/* ファイルを選択ボタン */}
      <label
        htmlFor={"dropzone-file"}
        className="inline-flex rounded-full w-fit bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white
               shadow-sm gap-x-1 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
               focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
      >
        <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true"/>
        ファイルを選択
        {/* 画像選択のinput(hidden) */}
        <InputImageBase id_html_for={"dropzone-file"} setImage={setImage}/>
      </label>
    </div>
  )
}