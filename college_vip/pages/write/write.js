// pages/write/write.js
import { chooseImage,upload} from '../../util/image.js';
let apps = getApp();
var openid;
var avatarUrl;
var nickName;
var topicId;


Page({
  /**
   * 页面的初始数据
   */
  data: {
    text:'',
    topicId:'',
    nickName:'',
	openid:'',
	commentText:'', 
    avatarUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    this.setData({  
     avatarUrl: options.avatarUrl,
     nickName: options.nickName,
     topicId: options.topicId
    })
  },

  
 //获取区域颜色数据
 bindTextAreaBlur: function(event) {
   //console.log('bindTextAreaBlur:' + event.detail.value)
   //console.log(event.detail.value)
   this.setData({
     text: event.detail.value
   })
 }, 
  
  

  submitData:function(event){	  
	 		if (this.data.text == '' ) {
	 		      wx.showToast({
	 		        icon: 'none',
	 		        title: '请写点东西吧',
	 		      })
	 		      }else{
	 		        this.uploadComment();
	 		      }
	 		    
	  
  },
  
  uploadComment:function(){
	   var that = this;
	  var commentText = that.data.text;
	  console.log(commentText)
	   
	      var topicId = that.data.topicId;	
	  	wx.getUserInfo({
	  		  success: function(res) {
	  			// console.log(res)
	  		   //wx.hideLoading()
	  	that.data.avatarUrl = res.userInfo.avatarUrl	
	  	that.data.userName = res.userInfo.nickName	
	  	apps.util.request({
	  		  'url': 'entry/wxapp/getComments',
	  		  header: {
	  		    'content-type': 'application/json' // 默认值
	  		  },
	  	data:{
	  	  topicId:that.data.topicId,
	     commentText:that.data.text,
	  	  openid:wx.getStorageSync('userid'),
	  	  avatarUrl:that.data.avatarUrl,
	  	  userName:that.data.userName,
	  	},
	  		  success(res) {
	  		      console.log(res)		 			  
	  		   	 that.setData({
	  		   				commentText:'',
	  						topicId:''
	  				    
	  		       })								 
	  				 
	  	      }
	  	   })			  			
	  			
	       }
	  	  })
	  	 
	  
	  
  }
  
  
})