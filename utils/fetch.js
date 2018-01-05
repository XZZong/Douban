'use strict';

/**
 * 抓取远端API的结构
 * @param {String} api      api根路径
 * @param {String} path     请求路径
 * @param {Object} params   参数
 * @return {Promise}        包含抓取任务的Promise
 */
module.exports = function (api, path, params) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: api + '/' + path,
      data: Object.assign({}, params),
      header: {'Content-Type' : 'json'},
      success: resolve,
      fail: reject
    });
  });
};