import { createHeader, Endpoint } from "@/utils/api/api";
import axios from "axios";
import { castToChatRes, Chat } from "@/utils/api/res";

// レスポンスです
type Res = {
  chat: Chat
}

/**
 * チャットを開始します
 */
export const PostStartChat = async (
  chatId: string,
  token: string,
  displayName: string,
): Promise<Res> => {
  const formData = new FormData();
  formData.append('display_name', displayName);

  const { data } = await axios.post(Endpoint(`/api/chat/${chatId}/start`), formData, {
    headers: createHeader({
      token: token,
      contentType: "form-urlencoded",
    }),
  });

  return {
    chat: castToChatRes(data.chat)
  }
}