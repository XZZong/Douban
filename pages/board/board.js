// pages/border/border.js
'use strict'
// 获取全局应用程序实例对象
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    boards: [
      {key: 'in_theaters'},
      {key: 'coming_soon'},
      {key: 'top250'}
    ],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    var _this = this;
    var promises = this.data.boards.map(function (board) {
      return app.douban.find(board.key, 1, 10)
        .then(function (d) {
          board.title = d.title;
          board.movies = d.subjects;
          return board;
        });
    });
    Promise.all(promises).then(function (boards) {
      return _this.setData({boards: boards, loading: false});
    });
  }
})