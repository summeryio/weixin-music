Component({
  data: {
    selected: 0,
    color: "#707070",
    selectedColor: "#e4002b",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "推荐",
        iconPath: "/common/img/recommend.png",
        selectedIconPath: "/common/img/recommend_active.png"
      },
      {
        pagePath: "/pages/new/new",
        text: "新歌",
        iconPath: "/common/img/new.png",
        selectedIconPath: "/common/img/new_active.png"
      },
      {
        pagePath: "/pages/rank/rank",
        text: "排行榜",
        iconPath: "/common/img/rank.png",
        selectedIconPath: "/common/img/rank_active.png"
      },
      {
        pagePath: "/pages/singer/singer",
        text: "歌手",
        iconPath: "/common/img/singer.png",
        selectedIconPath: "/common/img/singer_active.png"
      }
    ],
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})

      this.setData({
        selected: data.index
      })

      console.log(data);
    }
  }
})