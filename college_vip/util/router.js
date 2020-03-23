

// 简单封装 跳转 方法
function index() {
  console.log('to home');
  wx.switchTab({
    url: 'we7_college_vip/pages/home/home',
  });
}


export default {index}

