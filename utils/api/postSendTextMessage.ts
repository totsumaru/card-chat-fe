import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";

type Req = {
  token?: string
  chatId: string
  text: string
}

/**
 * テキストメッセージを送信します
 */
export const PostSendTextMessage = async ({
  token, chatId, text
}: Req) => {
  const formData = new FormData();
  formData.append('text', text);

  await axios.post(Endpoint(`/api/chat/${chatId}/message?kind=text`), formData, {
    headers: createHeader({
      token: token,
      contentType: "multipart/form-data",
    }),
    withCredentials: true,
  });
}