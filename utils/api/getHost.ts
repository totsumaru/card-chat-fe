import { castToHost, Host } from "@/utils/api/res";
import axios from "axios";
import { Endpoint } from "@/utils/api/api";

type Res = {
  host: Host
}

/**
 * IDでホストを取得します
 */
export default async function GetHost(
  hostId: string
): Promise<Res> {
  const { data } = await axios.get(
    Endpoint(`/api/host/${hostId}`), {}
  );

  return {
    host: castToHost(data.host)
  }
}