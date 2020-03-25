// pages/detail/detail.js
//const AV = require('../../libs/av-weapp-min.js');
//const moment = require('../../utils/moment.js')
//const app = getApp()
let apps = getApp();
var topicId = '';
var imageUrl = '';
var userInfo;
var commenttext;
var openid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    commenttext:'',
    topicId:'',
	openid:'',	
    userInfo:[],
	newsid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	 //console.log(options) 
	 let newsid = options.id;
	 var _self=this;
	    apps.util.request({
	    'url': 'entry/wxapp/Newsdetails',
	    header: {
	      'content-type': 'application/json'
	    },	
	 		data:{
	 			id:newsid,		
	 		} ,		 
	    success(res) { 
		 // console.log(res)
	    _self.setData({
	 		newsdata:res.data.data.newsdetail
	    })	 											
	    }
	 				
	 })	
	 
  },



  onShow: function () {
	
  },

/* getuserinfo:function(event){
	//console.log(event)
	  var that = this;
	const openid = wx.getStorageSync('openid');
	// console.log(openid);
	if(openid){
			apps.util.request({
			  'url': 'entry/wxapp/getuser',
			  header: {
			    'content-type': 'application/json' // 默认值
			  },			
		  success(res) {
			   	  wx.setStorageSync('userinfo', res.data.data.userdata) 		
		        }
		   })		
	  }else{
		wx.reLaunch({
		  url: '/college_vip/pages/login/login',
		})
	}
	
}, */
 

 bindFormSubmit: function(e) {
	var that = this
	that.setData({
	        commenttext: e.detail.value, 		
	})  
  }, 


jumpToWrite: function(event){
	 // console.log(event)
    var that = this;
	var topicId = event.currentTarget.dataset.topicid;

/* 	const user = wx.getStorageSync('userinfo'); 
	var openid =user.userid; */
	 wx.showLoading({
	   title: '获取登录状态',
	 })
	 //获取登录用户信息
	wx.getUserInfo({
		  success: function(res) {
			  //console.log(res)
		   wx.hideLoading()
		  var nickName = res.userInfo.nickName	  
		  var avatarUrl = res.userInfo.avatarUrl	
		wx.navigateTo({
		url: '/college_vip/pages/write/write?topicId=' + event.currentTarget.dataset.topicid + '&nickName=' + res.userInfo.nickName + '&avatarUrl=' + res.userInfo.avatarUrl
		 })		
		 },fail: (error)=>{
        console.error(error)
        wx.hideLoading()
      }	
	  
 })
	 
	
 },
   
   
jumpToDetailCmt:function(event){
    console.log(event)
    var commenttext = event.currentTarget.dataset.commenttext
    var createdate = event.currentTarget.dataset.createdate
    var username = event.currentTarget.dataset.username
    var userAvatar = event.currentTarget.dataset.useravatar
    wx.navigateTo({
      url: '../comment/comment?commenttext=' + commenttext + '&createdate=' + createdate + '&username=' + username + '&userAvatar=' + userAvatar
    })
  }

	
  

})