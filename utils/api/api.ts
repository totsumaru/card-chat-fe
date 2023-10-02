// ヘッダーのレスポンスです
type Header = {
  Authorization?: string;
  Passcode?: string
  "Content-Type"?: string
  hello?: string
}

// ヘッダーを作成します
export const createHeader = ({
  token, passcode, contentType, cookieHello
}: {
  token?: string;
  passcode?: string;
  contentType?: "json" | "multipart-form" | "form-urlencoded"
  cookieHello?: string
}): Header => {
  let res: Header = {};
  if (token) {
    res.Authorization = `Bearer ${token}`;
  }
  if (passcode) {
    res.Passcode = passcode
  }
  if (cookieHello) {
    res.hello = cookieHello
  }

  switch (contentType) {
    case "json":
      res["Content-Type"] = "application/json"
      break
    case "multipart-form":
      res["Content-Type"] = "multipart/form-data"
      break
    case "form-urlencoded":
      res["Content-Type"] = "application/x-www-form-urlencoded"
  }

  return res;
}

// バックエンドのURLを作成します(最初はスラッシュから始めます)
export const Endpoint = (path: string): string => {
  return `${process.env.NEXT_PUBLIC_BE_URL}${path}`
}
