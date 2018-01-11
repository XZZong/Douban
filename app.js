//app.js
'use strict';

/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
var wechat = require('./utils/wechat.js');

/**
 * Douban API 模块
 */
var douban = require('./utils/douban.js');

/**
 * Baidu API 模块
 */
var baidu = require('./utils/baidu.js');

App({
  //定义在整个应用中分享的成员
  data: {
    name: 'Douban Movie',
    version: '0.1.0',
    currentCity: '武汉'
  },
  // WeChat API
  wechat: wechat,
  //Douban API
  douban: douban,
  //Baidu API
  baidu: baidu,
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function onLanch() {
    var _this = this;

    wechat.getLocation().then(function (res) {
      var latitude = res.latitude,
        longitude = res.longitude;
      
      wx.request({
        url: 'https://api.map.baidu.com/geocoder/v2/?ak=fCjOI0cVuMTKZgjLBeuUFpuZpgO0GoiB&location=' + latitude + ',' + longitude + '&output=json',
        data: {},
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          // success    
          var city = res.data.result.addressComponent.city;
          _this.data.currentCity = city.replace('市', '');
        },
        fail: function () {
          _this.data.currentCity = '获取定位失败';
        }
      })
    })
  }
})