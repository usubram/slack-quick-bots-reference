'use strict';

var url = require('url');
var http = require('http');
var config = require('config');
var _ = require("lodash");

var dashboard = config.get('yahooFinance');

var internals = {};

module.exports.getQuote = function (param, callback) {
  var urlObj = url.parse(dashboard.replace('{quote}', param));
  var options = {
    host: urlObj.host,
    path: urlObj.path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  internals.callApi(options, callback);
};

internals.callApi = function(options, callback) {
  var req = http.request(options, function(response) {
    var responseStr = '';
    response.on('data', function(chunk) {
      responseStr += chunk;
    });
    response.on('end', function() {
      var responseObj = {};
      try {
        responseObj = JSON.parse(responseStr);
      } catch (err) {
        callback(err);
      }
      callback(null, responseObj);
    });
  });
  req.end();
};
