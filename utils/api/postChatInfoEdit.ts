import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";

/**
 * チャットの情報を変更します
 */
export const PostChatInfoEdit = async (
  token: string,
  chatId: string,
  displayName: string,
  memo: string,
) => {
  const formData = new FormData();
  formData.append('display_name', displayName);
  formData.append('memo', memo);

  await axios.post(Endpoint(`/api/chat/${chatId}/edit`), formData, {
    headers: createHeader({ token: token }),
  });
}