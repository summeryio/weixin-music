import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        id: null,
        singerList: [],
        nowPage: 1,
        finished: false
    },
    onLoad: function (option) {
        console.log(option);
        this.setData({id: option.id})
        this.getSingerList()
    },

    onReachBottom: function () {
        if (this.data.finished) return
        
        this.setData({
            nowPage: this.data.nowPage + 1
        });

        this.getSingerList()
    },

    onPullDownRefresh: function () {
        this.setData({nowPage: 1})

        this.getSingerList(true).then(() => {
            wx.stopPullDownRefresh()
        })
    },

    getSingerList: function (override) {
        let {nowPage} = this.data
        let {id, singerList} = this.data
        
        return get(`/artist/list?cat=${id}&offset=${(nowPage - 1) * 20}&limit=20`).then(res => {
            console.log(res);
            if (!res.data.more) {
                this.setData({finished: true})

                return
            }
            this.setData({
                singerList: override ? res.data.artists : singerList.concat(res.data.artists)
            })
        })
    },
})