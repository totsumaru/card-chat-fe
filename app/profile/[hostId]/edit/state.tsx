import { Dispatch, SetStateAction, useState } from "react";

/**
 * Stateです
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

/**
 * File型を含んだStateです
 */
export function useFileInputState(initialValue: string): [
    string | File,
  Dispatch<SetStateAction<string | File>>,
  string,
  Dispatch<SetStateAction<string>>
] {
  const [value, setValue] = useState<string | File>(initialValue);
  const [errMsg, setErrMsg] = useState<string>("")

  return [value, setValue, errMsg, setErrMsg];
}
