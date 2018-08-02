var constant = require("../../data/constant.js");
var common = require("../../data/common.js");
var miniLessonDao = require("../../sdk/miniLessonDao.js");
var miniLessonInfoDao = require("../../sdk/miniLessonInfoDao.js");
var gymDao = require("../../sdk/gymDao.js");
var util = require("../../utils/util.js");

Page({
	onShareAppMessage: function (options) {
		//setting nothing
	},
	
	data: {
		year: null,
		month: null,
		miniLesson: null,
		isInfoOn: false,
		infoArr: null
	},

	onLoad: function () {
		let that = this;
		this.initCurDate();
		gymDao.initGym(function () {
			that.loadMiniLesson(new Date());
			wx.setNavigationBarTitle({
				title: wx.getStorageSync(constant.KEY_GYM_NAME)
			})
		});
	},

	//初始化时间
	initCurDate: function () {
		let day = new Date();
		this.setData({
			year: day.getFullYear(),
			month: day.getMonth()
		});
	},

	//加载小团课列表
	loadMiniLesson: function (date) {
		wx.showLoading({
			title: "loading"
		});
		this.setData({
			miniLessonArr: null
		});
		let that = this;
		miniLessonDao.listMiniLesson(wx.getStorageSync(constant.KEY_GYM_ID), date,
			function (res) {
				console.log("miniLessonArr:")
				console.log(res);
				let miniLessonArr = new Array();
				for (let index in res.data.objects) {
					let data = res.data.objects[index];
					//处理强度数组
					let strength = new Array();
					for (let i = 0; i < data.strength; i++) {
						strength.push(1);
					}
					//处理日期
					let day = new Date(data["startTime"].substring(0, 10).replace(/-/g, "/"));
					//处理剩余时间
					let remainDay = Math.round(Math.abs(day - date) / (1000 * 60 * 60 * 24));
					let remain = "";
					switch (remainDay) {
						case 0:
							remain = "今天";
							break;
						case 1:
							remain = "明天";
							break;
						case 2:
							remain = "后天";
							break;
						default:
							remain = "还有" + remainDay + "天";
							break;
					}

					let lesson = {
						imgUrl: data["imgUrl"],
						name: data["name"],
						teacher: data["teacher"],
						startDate: data["startTime"].substring(5, 10) + " " + common.weekday[day.getDay()],
						startTime: data["startTime"].substring(11, 16),
						duration: data["duration"] + "min",
						remain: remain,
						strength: strength
					}
					miniLessonArr.push(lesson);
				}
				that.setData({
					miniLessonArr: miniLessonArr
				})
				console.log(miniLessonArr);
				wx.hideLoading();
			},
			function (err) {
				util.showErr(err);
			}
		)
	},

	onPullDownRefresh: function () {
		this.loadMiniLesson(new Date());
		wx.stopPullDownRefresh();
	},

	onSettingTap: function () {
		wx.showToast({
			title: "好像没什么可设置的",
			icon: "none"
		});
	},

	onInfoTap: function () {
		let infoFlag = !this.data.isInfoOn;
		let that = this;
		if (this.data.infoArr === null) {
			miniLessonInfoDao.listInfo(wx.getStorageSync(constant.KEY_GYM_ID), new Date(),
				function (res) {
					console.log("InfoArr:")
					console.log(res);
					let infoArr = new Array();
					for (let index in res.data.objects) {
						let data = res.data.objects[index];
						let info = {
							title: data["title"],
							content: data["content"],
						}
						infoArr.push(info);
					}
					if (!infoArr.length) {
						let info = {
							title: "暂无相关信息",
							content: ""
						}
						infoArr.push(info);
					}

					that.setData({
						infoArr: infoArr,
						isInfoOn: infoFlag
					})
				},
				function (err) {
					util.showErr(err);
				}
			)
		} else {
			that.setData({
				isInfoOn: infoFlag
			});
		}
	}


})