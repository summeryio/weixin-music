import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        rankList: [],
        loaded: false
    },
    onLoad: function () {
        this.getRankList()
    },

    getRankList: function () {
        get('/toplist').then(res => {
            this.setData({
                rankList: res.data.list,
                loaded: true
            })
        })
    },
})
