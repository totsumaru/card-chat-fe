import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";
import { castToChatRes, Chat } from "@/utils/api/res";

// レスポンスです
type Res = {
  chat: Chat
}

/**
 * チャットの情報を変更します
 */
export const PostChatInfoEdit = async (
  token: string,
  chatId: string,
  displayName: string,
  memo: string,
): Promise<Res> => {
  const formData = new FormData();
  formData.append('display_name', displayName);
  formData.append('memo', memo);

  const { data } = await axios.post(Endpoint(`/api/chat/${chatId}/edit`), formData, {
    headers: createHeader({
      token: token,
      contentType: "form-urlencoded",
    }),
  });

  return {
    chat: castToChatRes(data.chat)
  }
}