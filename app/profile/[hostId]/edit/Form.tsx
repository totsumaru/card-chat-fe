import React from "react";
import InputErrMsg from "@/components/text/InputErrMsg";

type Props = {
  label: string
  placeholder: string
  value: string
  setValue: (value: string) => void
  errMsg: string
  isGridColSpan3?: boolean
  type?: "email" | "tel" | "url"
  textarea?: boolean
  textareaRows?: number
}

/**
 * プロフィール入力のフォームです
 */
export default function Input(props: Props) {
  return (
    <div className={`${props.isGridColSpan3 ? "sm:col-span-3" : "sm:col-span-4"}`}>
      <Label text={props.label}/>
      <div className="mt-2">
        {props.textarea ? (
          <textarea
            name={props.type}
            rows={props.textareaRows || 3}
            // 以下共通
            placeholder={props.placeholder}
            className={formClassName}
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
          />
        ) : (
          <input
            type={props.type || "text"}
            // 以下共通
            name={props.type}
            placeholder={props.placeholder}
            className={formClassName}
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
          />
        )}
      </div>
      {props.errMsg && <InputErrMsg errMsg={props.errMsg}/>}
    </div>
  )
}

// ラベルです
function Label({ text }: { text: string }) {
  return (
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {text}
    </label>
  )
}

// input/textareaに共通のクラス名です
const formClassName = `
block w-full rounded-md border-0 px-3 py-2 text-gray-900
shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
`