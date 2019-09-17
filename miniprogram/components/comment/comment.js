import {get} from '../../common/util/util'

const app = getApp()

Component({
	properties: {
		pageId: {
			type: Number,
			value: null
		},
		cat: {
			type: String,
			value: null
		}
	},
	data: {
		comment: {}
	},
	
	ready: function () {
		this.getData(this.properties.pageId, this.properties.cat)
	},
	methods: {
		getData: function (id, cat) {
			get(`/comment/${cat}?id=${id}`).then(res => {
				if (res.data.code === 200) {
					this.setData({
						comment: res.data
					})
				}
			})
		},
	}
})