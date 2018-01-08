// pages/splash/splash.js
'use strict';

// 获取全局应用程序实例对象
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: '立即体验',
    movies: [],
    loading: true
  },

  getCache: function getCache() {
    return new Promise(function (resolve) {
      app.wechat.getStorage('last_splash_data').then(function (res) {
        //有缓存，判断是否过期
        if (res.data.expires < Date.now()) {
          //已过期
          console.log('storage expired');
          return resolve(null);
        }
        return resolve(res.data);
      }).catch(function (e) {
        return resolve(null);
      })
    })
  },

  handleStart: function handleStart() {
    wx.switchTab({
      url: '../board/board',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    var _this = this;

    this.getCache().then(function (cache) {
      if (cache) {
        return _this.setData({movies: cache.movies, loading: false});
      }

      app.douban.find('coming_soon',1,5).then(function (d) {
        _this.setData({movies: d.subjects, loading: false});
        return app.wechat.setStorage('last_splash_data', {
          movies: d.subjects,
          expires: Date.now() + 1 * 24 * 60 * 60 * 1000
        })
      }).then(function () {
        return console.log('storage last splash data');
      })
    })
  }
})