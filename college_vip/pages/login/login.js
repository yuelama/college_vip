// pages/login/login.js
let apps = getApp();
var openid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userInfo:[],
	 openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
	
 updateUserInfo: function (result) {
   //console.log(result)
   //var openid = wx.getStorageSync('userid');
 // var userInfo = wx.setStorageSync('openid');
   var that = this;
   
    apps.util.request({
      'url': 'entry/wxapp/reguser',
      header: {
        'content-type': 'application/json' // 默认值
      },
    data: {
        headimg: result.detail.userInfo.avatarUrl,
        nickname: result.detail.userInfo.nickName  
      }, 
      success(res) {
        console.log(res)	
        if (res.data.data.status == 0) {
		/* 	that.setData({
				openid:res.data.data.userid
			}) */
          wx.setStorageSync('openid', res.data.data.userid)	  
          wx.reLaunch({
            url: '/college_vip/pages/home/home',
          })
       } else{
		   wx.reLaunch({
			   url: '/college_vip/pages/login/login',
		   })
	   }     
	 }
    })
   
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
	
	
	
	
})

  
