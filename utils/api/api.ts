// ヘッダーのレスポンスです
type Header = {
  Authorization?: string;
  Passcode?: string
}

// ヘッダーを作成します
export const createHeader = ({
  token, passcode
}: {
  token?: string;
  passcode?: string;
}): Header => {
  let res: Header = {};
  if (token) {
    res.Authorization = `Bearer ${token}`;
  }
  if (passcode) {
    res.Passcode = passcode
  }

  return res;
}

// バックエンドのURLを作成します(最初はスラッシュから始めます)
export const Endpoint = (path: string): string => {
  return `${process.env.NEXT_PUBLIC_BE_URL}${path}`
}