// pages/poster/poster.js
var app = getApp();
Page({
  data: {
    poster: '',
    windowWidth: 0,
    windowHeight: 0
  },

  onLoad: function onLoad(params) {
    var posterUrl = params.posterUrl;
    this.setData({"poster": posterUrl})
    var windowWidth;
    var windowHeight;
    wx.getSystemInfo({
      success: function(res) {
        windowHeight = res.windowHeight;
        windowWidth = res.windowWidth;
      },
    });
    // 使用设备可视宽高
    this.setData({
      "windowWidth": windowWidth,
      "windowHeight": windowHeight
    });
  }
})