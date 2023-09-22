/**
 * パスコードが数字のみで構成されているかどうかを検証します
 */
const isNumericOnly = (input: string): boolean => {
  return /^[0-9]*$/.test(input);
}

/**
 * パスコード入力を検証します
 *
 * 入力時のチェックとして使用するため、6文字以下の場合のみOK
 */
export const validatePasscodeInput = (inputValue: string): boolean => {
  return isNumericOnly(inputValue) && inputValue.length <= 6;
}

/**
 * パスコードを検証します
 *
 * 送信時のチェックとして使用するため、6文字の場合のみOK
 */
export const validatePasscode = (passcode: string): boolean => {
  return isNumericOnly(passcode) && passcode.length === 6;
}
