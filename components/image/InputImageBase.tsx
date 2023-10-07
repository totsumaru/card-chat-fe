import React from "react";

const allowedTypes = ["image/png", "image/jpeg"];

type Props = {
  id_html_for: string
  setImage: (img: File) => void
}

/**
 * 画像の選択です
 */
export default function InputImageBase({ id_html_for, setImage }: Props) {
  // 画像はアップロードされた時の挙動
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        alert("許可されていない拡張子です")
        return
      }

      // 5MBを超えていたらエラーを返します
      // 5MB = 5 * 1024 * 1024 bytes
      if (file.size > 5 * 1024 * 1024) {
        alert("ファイルのサイズは5MB以下である必要があります");
        return;
      }

      setImage(file);
    }
  };

  // 画像の選択です
  return (
    <input
      id={id_html_for}
      type="file"
      className="hidden"
      onChange={handleImageChange}
      accept={allowedTypes.join(", ")}
    />
  )
}