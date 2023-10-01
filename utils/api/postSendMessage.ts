import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";

type Req = {
  token?: string
  passcode?: string
  chatId: string
  content: string
}

/**
 * チャットの情報を変更します
 */
export const PostSendMessage = async ({
  token, passcode, chatId, content
}: Req) => {
  const formData = new FormData();
  formData.append('content', content);

  await axios.post(Endpoint(`/api/chat/${chatId}/message`), formData, {
    headers: createHeader({ token: token, passcode: passcode }),
  });
}