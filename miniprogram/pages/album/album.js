import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        albums: [],
        nowPage: 1,
        finished: false,
        isFoot: true,
    },
    onLoad: function () {
        this.getAlbum()
    },

    onReachBottom: function () {
        this.setData({
            isFoot: false,
            nowPage: this.data.nowPage + 1
        });

        this.getAlbum()
    },

    onPullDownRefresh: function () {
        this.setData({nowPage: 1})

        this.getAlbum(true).then(() => {
            wx.stopPullDownRefresh()
        })
    },

    getAlbum: function (override) {
        let {nowPage, finished, isFoot} = this.data
        
        return get(`/top/album?offset=${(nowPage - 1) * 20}&limit=20`).then(res => {
            this.setData({
                albums: override ? res.data.albums : this.data.albums.concat(res.data.albums)
            })
        })
    },
})
