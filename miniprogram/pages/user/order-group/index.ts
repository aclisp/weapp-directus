Component({
  externalClasses: ["title-class", "icon-class", "number-class"],
  options: {
    multipleSlots: true,
  },
  properties: {
    orderTagInfos: {
      type: Array,
      value: [],
    },
    title: {
      type: String,
      value: "订单",
    },
    desc: {
      type: String,
      value: "全部订单",
    },
    isTop: {
      type: Boolean,
      value: true,
    },
    classPrefix: {
      type: String,
      value: "",
    },
  },
  methods: {
    onClickItem(e: any) {
      this.triggerEvent("onClickItem", e.currentTarget.dataset.item);
    },

    onClickTop() {
      this.triggerEvent("onClickTop", {});
    },
  },
});
