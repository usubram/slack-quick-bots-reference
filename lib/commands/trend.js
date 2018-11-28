'use strict';

const path = require('path');
const fs = require('fs');
const sampleTmpl = fs.readFileSync(path.join(__dirname, '../template/sample-tmpl.hbs'), 'utf8');
const { callGoogle } = require('../api');

const command = {
  order: 4,
  commandType: 'DATA',
  responseType: {
    type: 'png',
    ylabel: 'errors',
    timeUnit: 'm',
    title: 'Log data',
    logscale: false,
    style: 'lines',
    exec: {
      encoding: 'utf16',
    },
  },
  validation: [{
    schema: [1, 2],
    default: [1, 2],
    help: [{
      sample: '{firstArg}',
      recommend: '1',
      error: '{{arg}} is incorrect',
    }, {
      sample: '{secondArg}',
      recommend: '1',
      error: '{{arg}} is incorrect',
    }],
  }],
  helpText: '☞ this is trend command',
  data: function (input, options, callback) {
    const dataArr = [ // Sample data
      [100, 120, 130, 110, 123, 90],
      [1, 120, 130, 110, 90, 85],
      [1, 120, 130, 1010, 140, 145],
      [100, 120, 130, 250, 140, 145],
      [100, 120, 130, 300, 140, 145],
      [100, 400, 130, 300, 140, 145],
      [100, 90, 130, 300, 140, 145],
      [100, 120, 130, 1010, 150, 90],
    ];
    const rand = dataArr[Math.floor(Math.random() * dataArr.length)];
    callback(null, rand);
  },
};

module.exports = {
  command
};
