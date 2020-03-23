// pages/detail/detail.js
//const AV = require('../../libs/av-weapp-min.js');
//const moment = require('../../utils/moment.js')
//const app = getApp()
let apps = getApp();
var topicId = '';
var imageUrl = '';
var userinfo = [];
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
	username:'',
	userpic:'',

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
	    _self.setData({
	 		newsdata:res.data.data.newsdetail
	    })	 											
	    }
	 				
	 })	
	 
  },



  onShow: function () {
	
  },

  /* getuser:function(event){
	//console.log(event)
	 var that = this;
	 var openid = wx.getStorageSync('openid');	 
	if(openid){
	apps.util.request({
	  'url': 'entry/wxapp/getuserprofile',
	  header: {
	    'content-type': 'application/json' // 默认值
	  },
	  success(res){
		console.log(res)
		  var userdata = [];
		  for(var i=0;i<res.data.data.userprofile.length;i++){
			  userdata = res.data.data.userprofile[i];
		  }	   
		 that.setData({
		    userinfo:userdata
		  }) 		 	  	  
	  }					   
	  })     
	}else{
		wx.switchTab({
			 url: '/college_vip/pages/login/login',
		})
	}
	
}, 
 */

 bindFormSubmit: function(e) {
	var that = this
	that.setData({
	        commenttext: e.detail.value, 		
	})  
  },

judesubmit: function(event){
	  //console.log(event)
    var that = this;

	var commenttext = that.data.commenttext;

	const openid = wx.getStorageSync('openid');
	// console.log(openid);
	if(openid){
		apps.util.request({
		  'url': 'entry/wxapp/getComments',
		  header: {
		    'content-type': 'application/json' // 默认值
		  },
		data: {
			commenttext:this.data.commenttext
		  }, 
		  success(res) {
		      console.log(res)
		   	 that.setData({
		   				commenttext:''
				    //userinfo:wx.clearStorageSync("userinfo",that.data.userinfo)	
		                 })		      
	    }
	 })		
  }else{
	wx.reLaunch({
	  url: '/college_vip/pages/login/login',
	})
	}
	
   },
   
   
  jumpToDetailCmt:function(options){
	  var that =this;
	      
   }
	
  

})