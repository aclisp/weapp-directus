import { assetsUrl, getAccessToken, httpGet } from "../../common/transport";
import { URLSearchParams } from "../../common/url-search-params-polyfill";

// pages/campaign-detail/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: [],
    posterUrl: "",
    products: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(query: any) {
    const accessToken = await getAccessToken();
    const params = new URLSearchParams();
    params.append("fields", "*,products.joy_product_id.*");
    const campaign = await httpGet(`/items/joy_campaign/${query.id}`, {
      params,
      accessToken,
    });
    this.setData({
      title: campaign.name.split(/\s+/),
      posterUrl: assetsUrl(campaign.poster, accessToken),
      products: campaign.products.map((x: any) => ({
        id: x.joy_product_id.id,
        name: x.joy_product_id.name,
        price: x.joy_product_id.price,
        picture: assetsUrl(x.joy_product_id.picture, accessToken),
      })),
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
