import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        album: {},
        songs: [],
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
        get(`/album?id=${id}`).then(res => {
            this.setData({
                album: res.data.album,
                songs: res.data.songs,
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