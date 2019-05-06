'use strict';

const command = {
  order: 5,
  commandType: 'DATA',
  helpText: '☞ this a file post command',
  data: function (input, options, callback) {
    callback(null, {
      responseType: {
        type: 'xml',
        name: 'hello',
      },
      response: '<xml></xml>',
    });
  },
};

module.exports = {
  command,
};
