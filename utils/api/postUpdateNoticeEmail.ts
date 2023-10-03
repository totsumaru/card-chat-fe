import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";
import { castToChatRes, Chat } from "@/utils/api/res";

// レスポンスです
type Res = {
  chat: Chat
}

/**
 * 通知用のEmailアドレスを登録/更新します
 */
export const PostUpdateNoticeEmail = async (
  chatId: string,
  email: string,
): Promise<Res> => {
  const formData = new FormData();
  formData.append('email', email);

  const { data } = await axios.post(Endpoint(`/api/chat/${chatId}/email`), formData, {
    headers: createHeader({ contentType: "form-urlencoded" }),
    withCredentials: true,
  });

  return {
    chat: castToChatRes(data.chat)
  }
}