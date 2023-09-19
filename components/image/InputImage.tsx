"use client"

import React, { useState } from "react";

const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif'];

// 画像の選択フォームです
export default function InputImage() {
  const [image, setImage] = useState<string>("")
  const [isImageErr, setImageErr] = useState<boolean>(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageErr(false)
    const file = e.target.files?.[0];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setImageErr(true)
        return
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 画像の選択です
  return (
    <div className="col-span-full">
      <div className="mt-2">
        {/* Input */}
        <label htmlFor="dropzone-file"
               className="flex flex-col bg-cover items-center justify-center h-64 w-64 border-2 ring-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
               style={{ backgroundImage: `url(${image})` }}
        >
          <div className="flex flex-col items-center justify-center p-5 bg-gray-50 bg-opacity-80">
            <p className="my-2 text-sm text-gray-900">
              クリックして画像をアップロードしてください。
            </p>
            <p className="mt-2 text-xs text-gray-900">
              「SVG, PNG, JPG, GIF」のみ選択できます。
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept={allowedTypes.join(", ")}
          />
        </label>
        {isImageErr && (
          <p className="text-red-500 text-sm font-bold">
            svg,png,jpg,gif以外の画像は選択できません。
          </p>
        )}
      </div>
    </div>
  )
}