import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";

// ホストを作成します
export const PostCreateHost = async (
  token: string
) => {
  await axios.post(Endpoint("/api/host/create"), {}, {
    headers: createHeader({ token: token }),
  });
}