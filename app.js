
App({
	onLaunch(){
		//引入知晓云
		require("./sdk/sdk-v1.4.0.js");
		//初始化sdk
		let clientID = "138e3f47d5e3419ddac4";
		wx.BaaS.init(clientID);
	},
	globalData: {

	}
})