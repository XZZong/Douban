// pages/celebrity/celebrity.js
'use strict';

// 获取全局应用程序实例对象
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAll: false,
    title: '',
    avatar: '',
    celebrity: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    var avatar = params.avatar;
    var _this = this;
    this.setData({'avatar': avatar});

    app.douban.findCelebrity(params.id).then(function (d) {
      console.log(d);
      _this.setData({celebrity: d});
      wx.setNavigationBarTitle({
        title: '豆瓣 >> 电影 >> 影人 >> ' + d.name,
      })
    }).catch(function (e) {
      _this.setData({ title: '获取数据异常', celebrity: {} });
      console.error(e);
    })
  },

  handleExtensiontap: function handleExtensiontap() {
    var readyData = { "showAll": true };
    this.setData(readyData);
  },

  handleIntensiontap: function handleIntensiontap() {
    var readyData = { "showAll": false };
    this.setData(readyData);
  }
})