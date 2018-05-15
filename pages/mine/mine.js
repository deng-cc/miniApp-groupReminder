var userDao = require("../../sdk/userDao.js");

Page({
	data: {
		isAuthed: false
	},

	onLoad: function () {
		this.checkAuth();
	},

	checkAuth: function () {
		let that = this;
		wx.showLoading({
			title: "checking",
			icon: "none"
		});
		wx.BaaS.login().then(
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
						wx.showToast({
							title: "Error:" + err.message,
							icon: "none"
						})
					}
				);
			},
			err => {
				wx.hideLoading();
				wx.showToast({
					title: "Error:" + err.message,
					icon: "none"
				})
			}
		)
	},

	onUnlockTap:function(){
		wx.showToast({
			title: "申请通道暂未开放",
			icon: "none"
		});
	},

	onNoticeTap:function(){
		wx.navigateTo({
			url: "/pages/manage-notice/manage-notice",
		})
	}

})