type Props = {
  errMsg: string
}

/**
 * Inputの下のエラーメッセージです
 */
export default function InputErrMsg({ errMsg }: Props) {
  return (
    <>
      {errMsg && (
        <p className="text-xs text-red-500 mt-1">※{errMsg}</p>
      )}
    </>
  )
}