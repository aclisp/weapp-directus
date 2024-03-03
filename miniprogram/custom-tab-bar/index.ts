Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    list: [
      {
        icon: "app",
        text: "报名",
        url: "pages/home/home",
      },
      {
        icon: "star",
        text: "会员",
        url: "pages/user/user",
      },
      {
        icon: "tools",
        text: "测试",
        url: "pages/logs/logs",
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event: any) {
      this.setData({ active: event.detail.value });
      wx.switchTab({
        url: this.data.list[event.detail.value].url.startsWith("/")
          ? this.data.list[event.detail.value].url
          : `/${this.data.list[event.detail.value].url}`,
      });
    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split("?")[0] : "";
      const active = this.data.list.findIndex(
        (item) =>
          (item.url.startsWith("/") ? item.url.substr(1) : item.url) ===
          `${route}`
      );
      this.setData({ active });
    },
  },
});
