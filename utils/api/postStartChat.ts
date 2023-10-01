import { createHeader, Endpoint } from "@/utils/api/api";
import axios from "axios";

/**
 * チャットを開始します
 */
export const PostStartChat = async (
  chatId: string,
  token: string,
  displayName: string,
) => {
  const formData = new FormData();
  formData.append('display_name', displayName);

  await axios.post(Endpoint(`/api/chat/${chatId}/start`), formData, {
    headers: createHeader({
      token: token,
      contentType: "form-urlencoded",
    }),
  });
}