import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        rankList: [],
        loaded: false
    },
    onShow: function () {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            })
        }
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
