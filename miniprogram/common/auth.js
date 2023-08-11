import { logDebug } from "./logger";
import { promisify } from "./promisify";
import {
  httpGet,
  saveToken,
  getAccessToken,
  directusHostUrl,
} from "./transport";
import { URLSearchParams } from "./url-search-params-polyfill";
import { reportError } from "./errors";

const authLoginUrl = directusHostUrl() + "/auth/login/wechatminiprogram";

/**
 * @returns {Promise<string>} accessToken
 */
export async function login() {
  logDebug("auth.login.start");

  // 避免频繁调用 wx.login
  try {
    const accessToken = await getAccessToken();
    return accessToken;
  } catch (err) {
    logDebug("auth.login.getAccessToken:err=%o", err);
    try {
      const res = await promisify(wx.login)({});
      const accessToken = await doLogin(res.code);
      return accessToken;
    } catch (err) {
      reportError(err);
    }
  }
}

export function logout() {
  // TODO
}

/**
 * 处理 wx.login 成功
 * @param {string} code
 * @returns {Promise<string>} accessToken
 */
async function doLogin(code) {
  logDebug(`wx.login:code=${code}`);
  // 发送 code 到后台换取 openId, sessionKey, unionId
  const res = await promisify(wx.request)({
    url: authLoginUrl,
    data: { code },
    method: "GET",
  });
  logDebug(`wx.request:url=${authLoginUrl},res=%o`, res.data);
  // 开发者服务器返回自定义登录态，存入storage
  saveToken(res.data.data);
  return res.data.data.access_token;
}
