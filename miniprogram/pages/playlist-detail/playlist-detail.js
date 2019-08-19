import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        playlist: {},
        loaded: false
    },
    onLoad: function (options) {
        this.getData(options.id)
    },

    getData: function (id) {
        get(`/playlist/detail?id=${id}`).then(res => {
            this.setData({
                playlist: res.data.playlist,
                loaded: true
            })
        })
    },
})