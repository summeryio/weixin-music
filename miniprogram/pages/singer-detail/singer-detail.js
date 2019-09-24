import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        artist: {},
        songs: [],
        loaded: false,
        img_df: app.globalData.img_df
    },
    onLoad: function (options) {
        this.getData(options.id)
    },

    getData: function (id) {
        get(`/artists?id=${id}`).then(res => {
            this.setData({
                loaded: true,
                artist: res.data.artist,
                songs: res.data.hotSongs
            })
        })
    },
})