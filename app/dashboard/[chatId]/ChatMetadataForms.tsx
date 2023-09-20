"use client"

import React, { useState } from "react";
import ButtonLoading from "@/components/loading/ButtonLoading";

type Props = {
  displayName: string
  memo: string
}

/**
 * 表示名,メモのフォームコンポーネントです
 */
export default function ChatMetadataForms(props: Props) {
  const [displayName, setDisplayName] = useState<string>(props.displayName)
  const [memo, setMemo] = useState<string>(props.memo)
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  // 保存ボタンをクリックした時の挙動です
  const handleClick = () => {
    setLoading(true)
    setResult("")

    // TODO: 一時的にSleep
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      setLoading(false)
      setResult("保存が完了しました。")
    })
  }

  return (
    <>
      <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

        {/* id */}
        <div className="sm:col-span-4">
          <Label text={"id"}/>
          <p className="text-gray-500 text-sm">12306f9e-56a0-11ee-8c99-0242ac120002</p>
        </div>

        {/* 表示名 */}
        <div className="sm:col-span-4">
          <Label text={"表示名"}/>
          <div className="mt-2">
            <input
              type="text"
              placeholder="鈴木 様"
              className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
               shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
               focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>

        {/*　メモ */}
        <div className="sm:col-span-4">
          <Label text={"メモ"}/>
          <div className="mt-2">
                <textarea
                  rows={7}
                  placeholder="メモを記入"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900
                   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
          </div>
        </div>

      </div>

      {/* 保存ボタン */}
      <button
        type="button"
        className="flex items-center justify-center rounded-md bg-indigo-600 mt-3 px-3 py-2 text-sm font-semibold
               leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleClick}
      >
        {loading && <ButtonLoading/>}
        保存する
      </button>

      <p className="text-gray-800 text-sm mt-2">{result}</p>
    </>
  )
}

// ラベルです
const Label = ({ text }: { text: string }) => {
  return (
    <label htmlFor="first-name" className="block text-sm leading-6 text-gray-900">
      {text}
    </label>
  )
}
