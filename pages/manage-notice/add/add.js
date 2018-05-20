var timeUtil = require("../../../utils/timeUtil.js");
var util = require("../../../utils/util.js");
var noticeDao = require("../../../sdk/noticeDao.js");
var constant = require("../../../data/constant.js");

Page({

	data: {
		startDate: null,
		startDateEnd: null,
		endDate: null,
		endDateEnd: null,
		title: null,
		content: null
	},

	onLoad: function () {
		this.initCurDate();
		this.setData({
			title: "通知"
		})
		wx.setNavigationBarTitle({
			title: wx.getStorageSync(constant.KEY_GYM_NAME)
		})
	},

	initCurDate: function () {
		let date = new Date();
		let start = timeUtil.formatDate(date, "-");
		date.setDate(date.getDate() + 7);
		let end = timeUtil.formatDate(date, "-");
		this.setData({
			startDate: start,
			startDateEnd: end,
			endDate: start,
			endDateEnd: end
		})
	},

	onStartDateChange: function (event) {
		this.setData({
			startDate: event.detail.value
		});

	},
	onEndDateChange: function (event) {
		this.setData({
			endDate: event.detail.value
		});
	},
	onInput: function (event) {
		this.setData({
			title: event.detail.value
		})
	},
	onTextarea: function (event) {
		this.setData({
			content: event.detail.value
		})
	},
	onAddTap: function () {
		if (this.data.content === null || !this.data.content.length) {
			wx.showToast({
				title: "通知内容不得为空",
				icon: "none"
			});
			return;
		}
		wx.showLoading({
			title: "操作执行中"
		});
		let startTime = this.data.startDate.replace(/-/g, "/") + " 00:00:00";
		let endTime = this.data.endDate.replace(/-/g, "/") + " 23:59:59";
		let values = {
			startTime: ((new Date(startTime)).toISOString()).toString(),
			endTime: ((new Date(endTime)).toISOString()).toString(),
			title: this.data.title,
			content: this.data.content,
			gymId: wx.getStorageSync(constant.KEY_GYM_ID)
		}
		noticeDao.addNotice(values,
			function (res) {
				wx.hideLoading();
				wx.showToast({
					title: "添加成功",
					icon: "none",
					complete: function () {
						setTimeout(function () {
							wx.navigateBack();
						}, 1000)
					}
				});
			},
			function (err) {
				wx.hideLoading();
				util.showErr(err);
			}
		)
	}
})