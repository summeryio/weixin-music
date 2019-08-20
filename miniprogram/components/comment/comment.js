import {get} from '../../common/util/util'

const app = getApp()

Component({
	properties: {
		pageId: {
			type: Number,
			value: null
		}
	},
	data: {
		comment: {}
	},
	
	ready: function () {
		this.getData(this.properties.pageId)
	},
	methods: {
		getData: function (id) {
			get(`/comment/playlist?id=${id}`).then(res => {
				if (res.data.code === 200) {
					this.setData({
						comment: res.data
					})
				}
			})
		},
	}
})