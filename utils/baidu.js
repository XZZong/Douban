'use strict';

var URI = 'https://api.map.baidu.com';
var fetch = require('./fetch');

function fetchApi (type, params) {
  return fetch(URI, type, params);
}

function getCityName () {
  var latitude = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 39.90403;
  var longitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 116.407526;
  
  console.log(latitude + ',' + longitude);
  var params = { location: latitude + ',' + longitude, output: 'json', ak: 'fCjOI0cVuMTKZgjLBeuUFpuZpgO0GoiB'};
  return fetchApi('geocoder/v2', params).then( function (res) {
    console.log(res);
    return res.data.result.addressComponent.city;
  });
}

module.exports = { getCityName : getCityName };