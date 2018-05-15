var lessonDao = require("../../sdk/lessonDao.js");
var noticeDao = require("../../sdk/noticeDao.js");
var common = require("../../data/common.js")

Page({
	onShareAppMessage: function (options) {
		//setting nothing
	},

	data: {
		hebdomad: null,
		year: null,
		month: null,
		dayOfMonth: null,
		lessonArr: null,
		noticeArr: null
	},

	onLoad: function () {
		this.initCurDate();
		this.loadNotice(new Date());
		this.loadLesson(new Date());
	},

	//初始化当前时间
	initCurDate: function () {
		let day = new Date();
		let hebdomad = new Array();
		for (let i = 0; i < 7; i++) {
			hebdomad[i] = {
				year: day.getFullYear(),
				month: day.getMonth(),
				dayOfMonth: day.getDate(),
				dayOfWeek: common.weekday[day.getDay()],
			}
			day.setDate(day.getDate() + 1);
		}
		this.setData({
			hebdomad: hebdomad,
			year: hebdomad[0].year,
			month: hebdomad[0].month,
			dayOfMonth: hebdomad[0].dayOfMonth
		});
		console.log(hebdomad);
	},

	//加载课程列表
	loadLesson: function (date) {
		wx.showLoading({
			title: "loading"
		});
		this.setData({
			lessonArr: null
		});
		let that = this;
		lessonDao.listLesson(date,
			function (res) {
				console.log("lessonArr:")
				console.log(res);
				let lessonArr = new Array();
				for (let index in res.data.objects) {
					let data = res.data.objects[index];
					let lesson = {
						imgUrl: data["imgUrl"],
						name: data["courseType_name"],
						teacher: data["teacher_name"],
						time: data["startTime"].substring(11, 16),
						duration: data["duration"]
					}
					lessonArr.push(lesson);
				}
				that.setData({
					lessonArr: lessonArr
				})
				wx.hideLoading();
			},
			function (err) {
				console.log(err);
				wx.showToast({
					title: "Error:" + err.message,
					icon: "none"
				})
			})
	},

	//加载通知列表
	loadNotice: function (date) {
		wx.showLoading({
			title: "loading"
		});
		this.setData({
			noticeArr: null
		});
		let that = this;
		noticeDao.listNotice(date,
			function (res) {
				console.log("noticeArr:")
				console.log(res);
				let noticeArr = new Array();
				for (let index in res.data.objects) {
					let data = res.data.objects[index];
					let notice = {
						title: data["title"],
						content: data["content"],
					}
					noticeArr.push(notice);
				}
				that.setData({
					noticeArr: noticeArr
				})
				wx.hideLoading();
			},
			function (err) {
				console.log(err);
				wx.showToast({
					title: "Error:" + err.message,
					icon: "none"
				})
			})
	},

	onDayTap: function (event) {
		wx.showLoading({
			title: "loading"
		})
		let dayOfMonthSelected = event.currentTarget.dataset.dayOfMonthSelected;
		let arrIndex = event.currentTarget.dataset.arrIndex;
		this.setData({
			year: this.data.hebdomad[arrIndex].year,
			month: this.data.hebdomad[arrIndex].month,
			dayOfMonth: dayOfMonthSelected
		})
		this.loadDataByHebdomad(arrIndex);
	},

	loadDataByHebdomad: function (arrIndex) {
		let date = this.data.hebdomad[arrIndex];
		let day = new Date();
		day.setDate(date.dayOfMonth);
		day.setMonth(date.month);
		day.setFullYear(date.year);
		this.loadLesson(day);
		this.loadNotice(day)
	},

	onSettingTap: function () {
		wx.showToast({
			title: "暂未开通",
			icon: "none"
		});
	},

	onMineTap: function () {
		wx.navigateTo({
			url: "/pages/mine/mine",
		})
	}

})
