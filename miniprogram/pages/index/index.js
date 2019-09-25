import {get} from '../../common/util/util'

const app = getApp()


let listArr = []
for (let i = 0; i < 9; i ++) {
    listArr.push(i)
}


let bannerOption = {
    banners: [],
    indicatorDots: true,
    autoplay: false,
    duration: 400,

    swiperError: 0,
    preIndex: 0,
    goodsIndex: 1
}

Page({
    data: {
        bannerOption: bannerOption,
        playList: listArr,
        loaded: false,
        showSkeleton: true,
        albums: [],
        mvs: [],
        lazyStatus: [],
        img_df: app.globalData.img_df
    },

    onShow: function () { // 底部tab切换时，设置正确下标
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
            })
        }
    },

    onLoad: function () {
        this.getBannerData()
        this.getPlatlistData()
    },

    changeGoodsSwip: function (detail) { // 解决滑动卡死问题
        let {swiperError, goodsIndex, preIndex} = this.data.bannerOption
        
        if (detail.detail.source == "touch") {
            //当页面卡死的时候，current的值会变成0 
            if(detail.detail.current == 0){
                //有时候这算是正常情况，所以暂定连续出现3次就是卡了
                // let swiperError = this.data.swiperError
                swiperError += 1
                this.setData({'bannerOption.swiperError': swiperError })

                if (swiperError >= 3) { //在开关被触发3次以上
                    console.error(this.data.swiperError)
                    this.setData({'bannerOption.goodsIndex': preIndex });//，重置current为正确索引
                    this.setData({'bannerOption.swiperError': 0})
                }
            }else {//正常轮播时，记录正确页码索引
                this.setData({ 'bannerOption.preIndex': detail.detail.current });
                //将开关重置为0
                this.setData({'bannerOption.swiperError': 0})
            }
        }
    },

    getBannerData: function () {
        get('/banner').then(res => {
            res.data.banners = res.data.banners.filter(banner => {
                let type = parseInt(banner.targetType)

                switch(type) {
                    case 1:
                        banner.url = `/pages/song-detail/song-detail?id=${banner.targetId}`
                        return true
                    break;
                    case 10:
                        banner.url = `/pages/album-detail/album-detail?id=${banner.targetId}`
                        return true
                    break;
                    case 1000:
                        banner.url = `/pages/playlist-detail/playlist-detail?id=${banner.targetId}`
                        return true
                    break;
                }
            })

            this.setData({
                'bannerOption.banners': res.data.banners,
                loaded: true
            })
        }).catch(err => {
            console.log(err);
        })
    },

    getPlatlistData: function () {
        get('/personalized?limit=6').then(res => {
            this.setData({
                playList: res.data.result,
                showSkeleton: false
            }, () => {
                this.getAlbumData()
                this.getMVData()
            })
        })
    },
    
    getAlbumData: function () {
        let _self = this
        
        get('/top/album?limit=6').then(res => {
            this.setData({
                albums: res.data.albums
            })
        })
    },
    
    getMVData: function () {
        let _self = this
        
        get('/top/mv?limit=6').then(res => {
            this.setData({
                mvs: res.data.data
            }, () => {
                app.lazyLoadImg(12, () => {
                    _self.setData({lazyStatus: app.globalData.lazyStatus})
                })
            })
        })
    },

    handleSearch: function () {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    }
})