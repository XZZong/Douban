'use strict';

// 获取全局应用程序实例对象
var app = getApp();

Page({
  data: {
    title: '关于',
    userInfo: {
      wechat: '',
      nickName: '武汉理工大学',
      avatarUrl: '../../images/hdImg.jpg'
    }
  },

  getUserInfo: function getUserInfo() {
    var _this = this;
    app.wechat.getUserInfo().then(function (res) {
      return _this.setData({userInfo: res.userInfo});
    })
  },

  onLoad: function onLoad () {
    app.wechat.login().then(function (res) {
      if(res.code) {
        console.log('登录成功！' + res.code);
      }
      else {
        console.error('获取用户登录态失败！' + res.errMsg);
      }
    })
  }
})