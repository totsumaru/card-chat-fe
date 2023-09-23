import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];

type Props = {
  image: string
  setImage: (img: string) => void
}

/**
 * 画像の選択フォームです
 *
 * 既に登録されている画像がある場合は、そのURLを表示。
 * アップロードされたら、stateに入れる&表示。
 */
export default function InputImage({ image, setImage }: Props) {
  const [errMsg, setErrMsg] = useState<string>("")

  // 画像はアップロードされた時の挙動
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMsg("")
    const file = e.target.files?.[0];
    if (file) {
      // 拡張子を確認します
      if (!allowedTypes.includes(file.type)) {
        setErrMsg("許可されていない拡張子です")
        return
      } else {
        setErrMsg("")
      }

      const guest = new FileReader();
      guest.onloadend = () => {
        setImage(guest.result as string);
      };
      guest.readAsDataURL(file);
    }
  };

  // 画像の選択です
  return (
    <div className="col-span-full">
      <div className="mt-2 flex">
        {/* 画像 */}
        <div>
          <label
            className="flex flex-col bg-cover items-center justify-center h-32 w-32
             sm:h-64 sm:w-64 border-2 ring-gray-300 rounded-full hover:bg-gray-100"
            style={{ backgroundImage: `url(${image})` }}
          >
          </label>
        </div>
        {/* 右側 */}
        <div className="flex items-center ml-7 sm:ml-10">
          <div>
            {/* ファイルを選択ボタン */}
            <label
              htmlFor={"dropzone-file"}
              className="inline-flex rounded-full w-fit bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white
               shadow-sm gap-x-1 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
               focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true"/>
              ファイルを選択
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept={allowedTypes.join(", ")}
              />
            </label>

            {/* ERROR */}
            <div className="mt-1 ml-2 text-sm text-red-500">
              {errMsg}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}