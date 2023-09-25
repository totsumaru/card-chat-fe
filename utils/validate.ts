import {
  companyMaxLength,
  displayNameMaxLength,
  emailMaxLength,
  headlineMaxLength,
  introMaxLength,
  memoMaxLength,
  nameMaxLength,
  passcodeLength,
  positionMaxLength,
  telMaxLength,
  urlMaxLength
} from "@/utils/variable";

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
export const validatePasscodeInput = (passcode: string): string => {
  if (!isNumericOnly(passcode)) {
    return "半角数字で入力してください"
  }
  if (passcode.length > passcodeLength) {
    return `パスコードは${passcodeLength}文字です`
  }
  return ""
}

/**
 * パスコードを検証します
 *
 * 送信時のチェックとして使用するため、6文字の場合のみOK
 */
export const validatePasscode = (passcode: string): string => {
  if (!isNumericOnly(passcode)) {
    return "半角数字で入力してください"
  }
  if (passcode.length !== passcodeLength) {
    return `パスコードは${passcodeLength}文字です`
  }
  return ""
}

/**
 * Emailを検証します
 */
export const validateEmail = (email: string): string => {
  // 空の値を許容します
  if (!email) {
    return ""
  }

  if (email.length > emailMaxLength) {
    return `最大文字数は${emailMaxLength}文字です`
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    return "メールアドレスの形式が不正です"
  }
  return ""
}

/**
 * 表示名の文字数を検証します
 */
export const validateDisplayName = (displayName: string): boolean => {
  return !(displayName.length > displayNameMaxLength)
}

/**
 * メモの文字数を検証します
 */
export const validateMemo = (memo: string): boolean => {
  return !(memo.length > memoMaxLength)
}

/**
 * 名前の文字数を検証します
 */
export const validateName = (name: string): string => {
  if (!name) {
    return "必須項目です"
  }

  if (name.length > nameMaxLength) {
    return `最大文字数は${headlineMaxLength}文字です`
  }
  return ""
}

/**
 * ヘッドラインを検証します
 */
export const validateHeadline = (headline: string): string => {
  if (headline.length > headlineMaxLength) {
    return `最大文字数は${headlineMaxLength}文字です`
  }
  return ""
}

/**
 * 自己紹介を検証します
 */
export const validateIntro = (intro: string): string => {
  if (intro.length > introMaxLength) {
    return `最大文字数は${introMaxLength}文字です`
  }
  return ""
}

/**
 * 会社名の文字数を検証します
 */
export const validateCompanyName = (companyName: string): string => {
  if (companyName.length > companyMaxLength) {
    return `最大文字数は${companyMaxLength}文字です`
  }
  return ""
}

/**
 * 所属を検証します
 */
export const validatePosition = (position: string): string => {
  if (position.length > positionMaxLength) {
    return `最大文字数は${positionMaxLength}文字です`
  }
  return ""
}

/**
 * telを検証します
 */
export const validateTel = (tel: string): string => {
  // 空の値を許容します
  if (!tel) {
    return ""
  }

  if (tel.length > telMaxLength) {
    return `最大文字数は${telMaxLength}文字です`
  }
  // 数字とハイフンのみを許容する正規表現
  const regex = /^[0-9-]+$/;
  if (!regex.test(tel)) {
    return "数字とハイフン(-)のみ使用可能です"
  }
  return ""
}

/**
 * URLを検証します
 */
export const validateURL = (url: string): string => {
  // 空の値を許容します
  if (!url) {
    return ""
  }

  if (url.length > urlMaxLength) {
    return `最大文字数は${urlMaxLength}文字です`
  }
  const regex = /^(https?:\/\/)?([\da-z-]+)\.([a-z]{2,6})([\/\w -]*)*\/?$/;
  if (!regex.test(url)) {
    return "URLの形式が不正です"
  }
  return ""
}
