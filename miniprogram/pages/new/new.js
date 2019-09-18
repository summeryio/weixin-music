import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        songList: [],
        loaded: false,
        lazyStatus: []
    },

    onShow: function () {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            })
        }
    },
    
    onLoad: function () {
        this.getSongList()
    },

    getSongList: function () {
        get('/playlist/detail?id=3779629').then(res => {
            res.data.playlist.tracks = res.data.playlist.tracks.filter((item, index) => {
                return index < 20
            })
            
            this.setData({
                songList: res.data.playlist.tracks,
                loaded: true
            })
        })
    },
})
