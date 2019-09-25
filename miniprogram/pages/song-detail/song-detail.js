import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        song: {},
        loaded: false,
        img_df: app.globalData.img_df,
        pageId: null
    },
    onLoad: function (options) {
        this.getData(options.id)

        this.setData({
            pageId: options.id
        })
    },

    getData: function (id) {
        get(`/song/detail?ids=${id}`).then(res => {
            this.setData({
                song: res.data.songs[0],
                loaded: true
            })
        })
    },

    handlerGobackClick: function () {
        app.navigationBack()
    },
    handlerGohomeClick: function () {
        wx.switchTab({
            url: '/pages/index/index'
        })
    }
})