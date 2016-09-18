'use strict';

const url = require('url');
const http = require('http');
const _ = require('lodash');

const yahooFinance = 'http://query.yahooapis.com/v1/public/yql?' +
  'q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20'+
  '(%22{quote}%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';

const internals = {};

module.exports.getQuote = function (param, callback) {
  var urlObj = url.parse(yahooFinance.replace('{quote}', _.nth(param, 0) || 'YHOO'));
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
