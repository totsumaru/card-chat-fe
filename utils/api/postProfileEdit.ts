import { createHeader, Endpoint } from "@/utils/api/api";
import axios from "axios";
import { castToHost, Host } from "@/utils/api/res";

export type Req = {
  token: string,
  hostId: string
  avatar?: File
  name: string
  headline: string
  introduction: string
  companyName: string
  position: string
  tel: string
  email: string
  website: string
}

type Res = {
  host: Host
}

/**
 * プロフィールの情報を変更します
 */
export const PostProfileEdit = async (req: Req): Promise<Res> => {
  const formData = new FormData();
  if (req.avatar) {
    formData.append('avatar', req.avatar);
  }
  formData.append('name', req.name);
  formData.append('headline', req.headline);
  formData.append('introduction', req.introduction);
  formData.append('company_name', req.companyName);
  formData.append('position', req.position);
  formData.append('tel', req.tel);
  formData.append('email', req.email);
  formData.append('website', req.website);

  const { data } = await axios.post(Endpoint(`/api/host/${req.hostId}/edit`), formData, {
    headers: createHeader({
      token: req.token,
      contentType: "multipart-form",
    }),
  });

  return {
    host: castToHost(data.host)
  }
}