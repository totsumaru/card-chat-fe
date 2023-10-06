import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";

type Req = {
  token?: string
  chatId: string
  image: File
}

/**
 * 画像メッセージを送信します
 */
export const PostSendImageMessage = async ({
  token, chatId, image
}: Req) => {
  const formData = new FormData();
  formData.append('image', image);

  await axios.post(Endpoint(`/api/chat/${chatId}/message?kind=image`), formData, {
    headers: createHeader({
      token: token,
      contentType: "form-urlencoded",
    }),
    withCredentials: true,
  });
}