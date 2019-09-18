//app.js
App({
    globalData: {
        windowHeight: 0,
        windowWidth: 0,
        img_df: 'http://www.lfw66.com/tpl/cf_wap2019/images/img_default.svg',

        lazyStatus: []
    },
    onLaunch: function () {
        // console.log('小程序启动了');
        let _self = this

        wx.getSystemInfo({
            success: function (res) {
                _self.globalData.windowWidth = res.windowWidth,
                _self.globalData.windowHeight = res.windowHeight
            }
        })
    },
    onShow: function () {
        // console.log('小程序页面显示/切入前台');
    },
    onHide: function () {
        // console.log('小程序切入后台');
    },

    // 图片懒加载
    lazyLoadImg: function (number, fn, cls) {
        let arr = []
        for (let i = 0; i < number; i ++) {
            arr.push(false)
        }
        
        let clsName = cls ? '.' + cls + '-' : '.lazyItem-'

        for (let i in arr) {
            wx.createIntersectionObserver().relativeToViewport({ bottom: 20 }).observe(clsName + i, (ret) => {
                if (ret.intersectionRatio > 0) {
                    arr[i] = true
                }
                this.globalData.lazyStatus = arr
                fn && fn()
            })
        }
    }
})
