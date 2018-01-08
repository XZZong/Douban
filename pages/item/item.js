'use strict';

// 获取全局应用程序实例对象
var app = getApp();

Page({
  data: {
    title: '',
    loading: true,
    movie: {}
  },

  onLoad: function onLoad(params) {
    var _this = this;

    app.douban.findOne(params.id).then(function (d) {
      _this.setData({title: d.title, movie: d, loading: false});
      wx.setNavigationBarTitle({
        title: '豆瓣 >> 电影 >> ' + d.title })
    }).catch(function (e) {
      _this.setData({ title: '获取数据异常', movie: {}, loading: false });
      console.error(e);
    })
  },

  onReady: function onRead() {
    wx.setNavigationBarTitle({
      title: '豆瓣 >> 电影 >> ' + this.data.title
    })
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/pages/item?id=' + this.data.id
    }
  }
})