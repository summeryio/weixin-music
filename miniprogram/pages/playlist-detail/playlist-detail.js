import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        playlist: {},
        loaded: false,
        img_df: app.globalData.img_df,
        pageId: null
    },
    onLoad: function (options) {
        this.getData(options.id)
    },

    getData: function (id) {
        get(`/playlist/detail?id=${id}`).then(res => {
            app.changeWXtitle(res.data.playlist.name)
            
            if (res.data.playlist.tracks.length > 20) {
                res.data.playlist.tracks = res.data.playlist.tracks.filter((song, i) => {
                  return i < 20
                })
            }
            
            this.setData({
                playlist: res.data.playlist,
                loaded: true,
                pageId: id
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