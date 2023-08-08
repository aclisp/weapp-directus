import { logDebug } from './logger';
import { httpGet, saveToken } from './transport';
import { URLSearchParams } from './url-search-params-polyfill';
import { reportError } from './errors';

const authLoginUrl = 'http://localhost:8055/auth/login/wechatminiprogram';

export function login() {
  logDebug('auth.login.start');
  wx.login({
    success: (res) => doLogin(res),
    fail: (err) => reportError(err),
  });
}

export function logout() {
  // TODO
}

/**
 * 处理 wx.login 成功
 * @param {WechatMiniprogram.LoginSuccessCallbackResult} res
 */
function doLogin(res) {
  logDebug(`wx.login:code=${res.code}`);
  // 发送 res.code 到后台换取 openId, sessionKey, unionId
  wx.request({
    url: authLoginUrl,
    data: {
      code: res.code,
    },
    method: 'GET',
    success: async (res) => {
      logDebug(`wx.request:url=${authLoginUrl},res=%o`, res.data);
      // 开发者服务器返回自定义登录态，存入storage
      saveToken(res.data.data);
      // 获取用户信息
      const params = new URLSearchParams();
      params.append('fields', 'id,first_name,last_name,avatar');
      const data = await httpGet('/users/me', { params });
      logDebug(`获取用户信息=%o`, data);
    },
    fail: (err) => {
      reportError(err);
    },
  });
}
