//app.js
App({
    globalData: {
        windowHeight: 0,
        windowWidth: 0
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

    
})
