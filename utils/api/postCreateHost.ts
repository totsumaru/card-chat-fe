import axios from "axios";
import { createHeader, Endpoint } from "./api";
import { castToHost, Host } from "@/utils/api/res";

// レスポンスです
type Res = {
  host: Host
}

// ホストを作成します
export const PostCreateHost = async (
  token: string,
  name: string
): Promise<Res> => {
  const path = `/api/host/create?name=${name}`
  const { data } = await axios.post(Endpoint(path), {}, {
    headers: createHeader({ token: token }),
  });

  return {
    host: castToHost(data.host)
  }
}