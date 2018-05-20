var userDao = require("../../sdk/userDao.js");
var util = require("../../utils/util.js");
var constant = require("../../data/constant.js");

Page({
	data: {
		isAuthed: false
	},

	onLoad: function () {
		this.checkAuth();
		wx.setNavigationBarTitle({
			title: wx.getStorageSync(constant.KEY_GYM_NAME)
		})
	},

	checkAuth: function () {
		let that = this;
		wx.showLoading({
			title: "checking"
		});
		wx.BaaS.login(false).then(
			res => {
				let userId = res.id;
				userDao.findUser(userId,
					function (res) {
						if (res.data.isAuthed) {
							that.setData({
								isAuthed: true
							})
							wx.hideLoading();
						}
					},
					function (err) {
						wx.hideLoading();
						util.showErr(err);
					}
				);
			},
			err => {
				wx.hideLoading();
				util.showErr(err);
			}
		)
	},

	onUnlockTap: function () {
		wx.showToast({
			title: "申请通道暂未开放",
			icon: "none"
		});
	},

	onNoticeTap: function () {
		wx.navigateTo({
			url: "/pages/manage-notice/manage-notice",
		})
	}

})