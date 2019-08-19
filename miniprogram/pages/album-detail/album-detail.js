import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        album: {},
        songs: [],
        loaded: false
    },
    onLoad: function (options) {
        this.getData(options.id)
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
})