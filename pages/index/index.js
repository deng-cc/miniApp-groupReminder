var lessonDao = require("../../sdk/lessonDao.js");
var common = require("../../data/common.js")

Page({
	onShareAppMessage:function(options){
		//setting nothing
	},

	data: {
		hebdomad: null,
		year: null,
		month: null,
		dayOfMonth: null,
		lessonArr: null
	},

	onLoad: function () {
		wx.showLoading({
			title: "loading"
		})
		this.initCurDate();
		this.loadLesson(new Date());
	},

	initCurDate: function () {
		let day = new Date();
		this.setData({
			year: day.getFullYear(),
			month: day.getMonth(),
			dayOfMonth: day.getDate()
		})
		let hebdomad = new Array();
		for (let i = 0; i < 7; i++) {
			hebdomad[i] = {
				dayOfWeek: common.weekday[day.getDay()],
				dayOfMonth: day.getDate()
			}
			day.setDate(day.getDate() + 1);
		}
		this.setData({
			hebdomad: hebdomad
		})
	},

	loadLesson: function (date) {
		this.setData({
			lessonArr: null
		});
		let that = this;
		lessonDao.listLesson(date,
			function (res) {
				console.log("res:");
				let lessonArr = new Array();
				for (let index in res.data.objects) {
					let data = res.data.objects[index];
					let lesson = {
						imgUrl: data['imgUrl'],
						name: data['courseType_name'],
						teacher: data['teacher_name'],
						time: data['startTime'].substring(11, 16),
						duration: data['duration']
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

	onDayTap: function (event) {
		wx.showLoading({
			title: "loading"
		})
		let dayOfMonthSelected = event.currentTarget.dataset.dayOfMonthSelected;
		this.setData({
			dayOfMonth: dayOfMonthSelected
		})
		this.loadLessonBySelectedDay();
	},

	loadLessonBySelectedDay: function () {
		let day = new Date();
		day.setFullYear(this.data.year);
		day.setMonth(this.data.month);
		day.setDate(this.data.dayOfMonth);
		this.loadLesson(day);
	},

	onSettingTap: function () {
		wx.showToast({
			title: "还没想好干啥呢",
			icon: "none"
		});
	},

	onMineTap: function () {
		wx.showToast({
			title: "还没想好干啥呢",
			icon: "none"
		});
	}

})
