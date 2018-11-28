'use strict';

const url = require('url');
const http = require('http');
const _ = require('lodash');

const googleHost = 'https://www.google.com?query={query}';

const callApi = function (options, callback) {
  const req = http.request(options, function (response) {
    let responseStr = '';
    const handler = (data) => {
      let responseObj = {};

      try {
        /*
        * Json parse for a JSON response from api
        */
        // responseObj = JSON.parse(responseStr);
      } catch (err) {
        callback(err);
      }

      // return callback(null, responseObj);
      return callback(null, response.statusCode);
    };

    response.on('data', function (chunk) {
      responseStr += chunk;
    });

    response.on('end', handler.bind(this, responseStr));
  });

  req.end();
};

const callGoogle = function (param, callback) {
  const urlObj = url.parse(googleHost.replace('{query}', _.nth(param, 0)));
  const options = {
    host: urlObj.host,
    path: urlObj.path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return callApi(options, callback);
};

module.exports = {
  callGoogle
};
