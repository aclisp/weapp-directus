// 会员服务
// 会员是小程序的用户，与directus_user是1:1的关系

import { logDebug } from "./logger";
import { httpGet } from "./transport";
import { URLSearchParams } from "./url-search-params-polyfill";

export async function fetchUserInfo() {
  const params = new URLSearchParams();
  params.append("fields", "id,first_name,last_name,email,avatar");
  const user = await httpGet("/users/me", { params });
  if (user.ok && user.id) {
    const ext = await fetchUserInfoExt(user.id);
    user.ext = ext;
  }
  return user;
}

async function fetchUserInfoExt(userId: string) {
  const params = new URLSearchParams();
  params.append("fields", "*");
  params.append("filter", JSON.stringify({ sys_user: { _eq: userId } }));
  params.append("limit", 1);
  const { ok, msg, data } = await httpGet("/items/joy_user", { params });
  return ok && data.length > 0 ? data[0] : undefined;
}
