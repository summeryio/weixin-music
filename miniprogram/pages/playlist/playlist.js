import {get} from '../../common/util/util'

const app = getApp()

let arr = []
let pageSize = 20

for (let i = 0; i < pageSize; i ++) {
    arr.push(false)
}

Page({
    data: {
        playlist: [],
        nowPage: 1,
        finished: true,
        statusArr: arr,
        arrHeight: [],
        itemHeight: 0,
        img_df: app.globalData.img_df
    },
    onLoad: function () {
        this.getPlaylist()
    },
    onReady: function () {
        setTimeout(() => {
            this.getRect()
        }, 1000)
    },

    onReachBottom: function () {
        this.setData({
            nowPage: this.data.nowPage + 1
        });

        this.getPlaylist()
    },

    getPlaylist: function (override) {
        let {nowPage} = this.data
        let _self = this
        
        return get(`/top/playlist?limit=${pageSize}&order=hot&cat=全部&offset=${(nowPage - 1) * pageSize}`).then(res => {
            if (!res.data.more) {
                this.setData({finished: false})
            }
            
            this.setData({
                playlist: override ? res.data.playlists : this.data.playlist.concat(res.data.playlists)
            })

            for (let i = 0; i < pageSize; i ++) {
                _self.data.statusArr.push(false)
            }

            this.getRect()
        })
    },

    getRect: function () {
        let _self = this

        wx.createSelectorQuery().select('.item').boundingClientRect(function (rect) {
            _self.setData({itemHeight: rect.height})
            _self.init(rect.height)
        }).exec()
    },
    init: function (itemHeight) {
        let index = parseFloat(app.globalData.windowHeight / itemHeight)

        for (let i = 0; i < index * 2; i ++) {
            this.data.statusArr[i] = true
        }
        this.setData({statusArr: this.data.statusArr})

        for (let i = 0; i < this.data.statusArr.length; i ++) {
           this.data.arrHeight[i] = Math.floor(i / 2) * (itemHeight) 
        }
    },
    onPageScroll: function (ev) { // 滚动改变图片是否显示
        for (let i = 0; i < this.data.arrHeight.length; i ++) {
            if (this.data.arrHeight[i] < ev.scrollTop + app.globalData.windowHeight) {
                if (this.data.statusArr[i] === false) {
                    this.data.statusArr[i] = true
                }
            }
        }

        this.setData({statusArr: this.data.statusArr})
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