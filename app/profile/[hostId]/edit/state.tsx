import { Dispatch, SetStateAction, useState } from "react";

/**
 * フォームのStateです
 */
export function useInputState(initialValue: string): [
  string,
  Dispatch<SetStateAction<string>>,
  string,
  Dispatch<SetStateAction<string>>
] {
  const [value, setValue] = useState<string>(initialValue);
  const [errMsg, setErrMsg] = useState<string>("")

  return [value, setValue, errMsg, setErrMsg];
}
