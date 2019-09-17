const app = getApp()

Component({
	properties: {
		songList: {
			type: Array,
			value: []
		}
	},
	data: {
        lazyStatus: [],
        img_df: app.globalData.img_df
	},
	
	ready: function () {
		let _self = this
		
		if (this.properties.songList.length > 0) {
			app.lazyLoadImg(19, () => {
				_self.setData({lazyStatus: app.globalData.lazyStatus})
			}, 'lazySongList')

			console.log();
		}
	},
	methods: {

	}

})