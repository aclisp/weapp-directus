import { assetsUrl, getAccessToken, httpGet } from "../../common/transport";
import { URLSearchParams } from "../../common/url-search-params-polyfill";
import { login } from "../../common/auth";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    actIdList: [],
    swiperList: [],
  },

  async loadPage(accessToken: string) {
    const params = new URLSearchParams();
    params.append("fields", "id,name,poster");
    params.append("filter", JSON.stringify({ status: { _eq: "published" } }));
    const data = await httpGet("/items/joy_campaign", {
      params,
      accessToken,
    });
    this.setData({
      actIdList: data.data.map((x: any) => x.id),
      swiperList: data.data.map((x: any) => assetsUrl(x.poster, accessToken)),
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const accessToken = await login();
    if (accessToken) {
      this.loadPage(accessToken);
    }
  },

  async onPullDownRefresh() {
    wx.stopPullDownRefresh();
    const accessToken = await getAccessToken();
    this.loadPage(accessToken);
  },

  onTapAct(e: any) {
    const actId = this.data.actIdList[e.detail];
    wx.navigateTo({url: `/pages/campaign-detail/index?id=${actId}`});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
