"use client";
import { useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function ChatImageIconButton() {
  // input要素への参照を作成
  const fileInputRef = useRef(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // TODO: 画像を送信
      console.log(file);
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
