import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";

type Req = {
  token?: string
  chatId: string
  content: string
}

/**
 * チャットの情報を変更します
 */
export const PostSendMessage = async ({
  token, chatId, content
}: Req) => {
  const formData = new FormData();
  formData.append('content', content);

  await axios.post(Endpoint(`/api/chat/${chatId}/message`), formData, {
    headers: createHeader({
      token: token,
      contentType: "form-urlencoded",
    }),
    withCredentials: true,
  });
}