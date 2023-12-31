Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0,
    autoplay: false,
    duration: 500,
    interval: 5000,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e: any) {
      const { index } = e.detail;
      this.triggerEvent("tap-act", index);
    },
  },
});
