import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        hotKeys: [],
        showSuggest: false,
        showResult: false,
        suggestList: [],
        inputValue: '',
        result: null,
        history: null
    },

    onShow: function () {
        this.setData({
            history: wx.getStorageSync('history') || null
        })
    },

    onLoad: function () {
        this.getHotKey()
    },

    handlerGobackClick: function () {
        app.navigationBack()
    },

    getHotKey: function () { // 热门搜索标签
        get('/search/hot').then(res => {
            this.setData({
                hotKeys: res.data.result.hots
            })
        })
    },

    getInputKey: function (e) { // 输入框输入事件
        let _self = this
        
        if (e.detail.cursor !== _self.data.cursor) {
            this.setData({
                inputValue: e.detail.value,
                showSuggest: true,
                showResult: false,
            })
        }

        if (e.detail.value !== '') {
            this.getSuggest()

            this.setData({
                showSuggest: true
            })
        } else {
            this.setData({
                showSuggest: false,
                suggestList: []
            })
        }
    },

    clearInput: function () { // 清空输入框
        this.setData({
            inputValue: '',
            showSuggest: false,
            showResult: false,
            result: null
        })
    },

    searchByKeyborad: function () {

    },
    
    getSuggest: function () { // 搜索输入反馈
        get(`/search/suggest?keywords=${this.data.inputValue}&type=mobile`).then(res => {
            this.setData({
                suggestList: res.data.result.allMatch
            })
        })
    },

    handleSearch: function (e) {
        let val = e.currentTarget.dataset.value

        if (val === '') return
        
        this.setData({
            inputValue: val,
            showResult: true
        })

        get(`/search/suggest?keywords=${this.data.inputValue}`).then(res => {
            this.setData({
                result: res.data.result
            })
        })

        // 添加搜索记录
        let history = wx.getStorageSync('history') || []

        history.unshift(val)

        history = history.filter((item, i) => {
            return history.indexOf(item) === i
        })

        if (history.length > 6) {
            history.pop()
        }

        wx.setStorageSync('history', history)

        this.setData({
            history
        })
    },

    clearHistory: function () {
        this.setData({
            history: null
        })
        
        wx.setStorageSync("history", null)
    }
})