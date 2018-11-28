'use strict';

const path = require('path');
const fs = require('fs');
const sampleTmpl = fs.readFileSync(path.join(__dirname, '../template/sample-tmpl.hbs'), 'utf8');
const { callGoogle } = require('../api');

const command = {
  order: 6,
  commandType: 'ALERT',
  timeInterval: 1,
  helpText: '    → this a alert command',
  algo: 'CUMULATIVE_DIFFERENCE',
  data: function (input, options, callback) {
    const dataArr = [ // Sample data
      {
        time: moment().unix() - 1000,
        value: 400,
      },
      {
        time: moment().unix(),
        value: 120,
      },
    ];
    callback(null, dataArr);
  },
};

module.exports = {
  command
};
