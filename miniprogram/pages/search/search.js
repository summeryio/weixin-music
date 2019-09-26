import {get} from '../../common/util/util'

const app = getApp()

Page({
    data: {
        hotKeys: [],
        searchKey: '',
        showSuggest: false,
        showResult: false,
        suggestList: [],
        inputValue: '',
        result: {}
    },

    onLoad: function () {
        this.getHotKey()
    },

    getHotKey: function () { // 热门搜索
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
                inputValue: e.detail.value
            })
        }

        if (e.detail.value !== '') {
            this.getSuggest()

            this.setData({
                showSuggest: true
            })
        } else {
            this.setData({
                showSuggest: false
            })
        }
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
        
        this.setData({
            inputValue: val,
            showResult: true
        })

        this.doSearch()
    },

    doSearch: function () {
        get(`/search/suggest?keywords=${this.data.inputValue}`).then(res => {
            this.setData({
                result: res.data.result
            })
        })
    }
})