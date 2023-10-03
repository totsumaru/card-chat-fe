import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";
import { castToHost, Host } from "@/utils/api/res";

// レスポンスです
type Res = {
  host: Host
}

// ホストを作成します
export const PostCreateHost = async (
  token: string
): Promise<Res> => {
  const { data } = await axios.post(Endpoint("/api/host/create"), {}, {
    headers: createHeader({ token: token }),
  });

  return {
    host: castToHost(data.host)
  }
}