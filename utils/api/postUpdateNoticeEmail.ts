import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";

/**
 * 通知用のEmailアドレスを登録/更新します
 */
export const PostUpdateNoticeEmail = async (
  chatId: string,
  email: string,
) => {
  const formData = new FormData();
  formData.append('email', email);

  await axios.post(Endpoint(`/api/chat/${chatId}/email`), formData, {
    headers: createHeader({ contentType: "form-urlencoded" }),
  });
}