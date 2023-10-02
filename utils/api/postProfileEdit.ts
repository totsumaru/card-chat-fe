import { createHeader, Endpoint } from "@/utils/api/api";
import axios from "axios";

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

/**
 * プロフィールの情報を変更します
 */
export const PostProfileEdit = async (req: Req) => {
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

  await axios.post(Endpoint(`/api/host/${req.hostId}/edit`), formData, {
    headers: createHeader({
      token: req.token,
      contentType: "multipart-form",
    }),
  });
}