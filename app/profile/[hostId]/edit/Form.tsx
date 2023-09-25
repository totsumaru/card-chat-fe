import React, { ReactNode } from "react";
import InputErrMsg from "@/components/text/InputErrMsg";

// 共通のPropsです
type CommonProps = {
  label: string
  placeholder: string
  value: string
  setValue: (value: string) => void
  errMsg: string
  isGridColSpan3?: boolean
}

// InputのPropsです
type InputProps = CommonProps & {
  type?: "email" | "tel" | "url"
}

// TextareaのPropsです
type TextareaProps = CommonProps & {
  rows: number
}

/**
 * プロフィール入力のフォームです
 */

// Inputです
export function Input(props: InputProps) {
  return (
    <Container
      label={props.label}
      errMsg={props.errMsg}
      isGridColSpan3={props.isGridColSpan3}
    >
      <input
        type={props.type || "text"}
        // 以下共通
        name={props.type}
        placeholder={props.placeholder}
        className={formClassName}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </Container>
  )
}

// Textareaです
export const Textarea = (props: TextareaProps) => {
  return (
    <Container
      label={props.label}
      errMsg={props.errMsg}
      isGridColSpan3={props.isGridColSpan3}
    >
      <textarea
        rows={props.rows || 3}
        // 以下共通
        placeholder={props.placeholder}
        className={formClassName}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </Container>
  )
}

const Container = ({
  children, label, errMsg, isGridColSpan3,
}: {
  children: ReactNode
  label: string,
  errMsg: string,
  isGridColSpan3?: boolean
}) => {
  return (
    <div className={`${isGridColSpan3 ? "sm:col-span-3" : "sm:col-span-4"}`}>
      <Label text={label}/>
      <div className="mt-2">
        {children}
      </div>
      {errMsg && <InputErrMsg errMsg={errMsg}/>}
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