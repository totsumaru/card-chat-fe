import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";

/**
 * チャットを既読にします
 *
 * この処理はasync/awaitで待機する必要はありません。
 * 非同期で実行します。
 */
export const PostChangeToRead = (
  token: string,
  chatId: string,
) => {
  axios.post(Endpoint(`/api/chat/${chatId}/read`), {}, {
    headers: createHeader({ token: token }),
  });
}