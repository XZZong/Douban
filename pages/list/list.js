'use strict';

// 获取全局应用程序实例对象
var app = getApp();

Page({
  data: {
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasMore: true,
    page: 1,
    size: 20,
    movies: []
  },

  loadMore: function loadMore() {
    var _this = this;
    if (!this.data.hasMore)
      return;
    this.setData({subtitle:'加载中...', loading: true});

    return app.douban.find(this.data.type, this.data.page++, this.data.size).then(function (d) {
      if (d.subjects.length) {
        _this.setData({subtitle: d.title, movies: _this.data.movies.concat(d.subjects), loading: false});
      }
      else {
        _this.setData({subtitle: d.title, hasMore: false, loading: false});
      }
    }).catch(function (e) {
      _this.setData({subtitle: '获取数据异常', loading: false});
      console.error(e);
    })
  },

  onLoad: function onLoad(params) {
    this.data.title = params.title || this.data.title;
    this.data.type = params.type || this.data.type;  
    this.loadMore();
  },

  onReady: function onReady() {
    wx.setNavigationBarTitle({
      title: '豆瓣 >> 电影 >> ' + this.data.title,
    });
  },

  onPullDownRefresh: function onPullDownRefresh() {
    this.setData({movies: [], page: 1, hasMore: true});
    this.loadMore().then(function () {
      return app.wechat.original.stopPullDownRefresh();
    });
  },

  onReachBottom: function onReachBottom() {
    this.loadMore();
  }
})