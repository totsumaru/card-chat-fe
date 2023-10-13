import axios from "axios";
import { createHeader, Endpoint } from "./api";

// レスポンスです
type Res = {
  chatId: string
  passcode: string
}

// チャットを作成します
//
// [管理者]のみコールできます。
export const PostCreateChat = async (token: string): Promise<Res> => {
  const path = `/api/chat/create`
  const { data } = await axios.post(Endpoint(path), {}, {
    headers: createHeader({ token: token }),
  });

  return {
    chatId: data.chat_id,
    passcode: data.passcode,
  }
}