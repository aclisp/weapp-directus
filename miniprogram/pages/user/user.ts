const orderTagInfos = [
  {
    title: "待付款",
    iconName: "wallet",
    orderNum: 1,
    tabType: 5,
    status: 1,
  },
  {
    title: "退款/售后",
    iconName: "refresh",
    orderNum: 0,
    tabType: 0,
    status: 1,
  },
];

const menuData = [
  [
    {
      title: "积分",
      tit: "",
      url: "",
      type: "point",
    },
    {
      title: "客服热线",
      tit: "",
      url: "",
      type: "service",
      icon: "service",
    },
  ],
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderTagInfos,
    menuData,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

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
