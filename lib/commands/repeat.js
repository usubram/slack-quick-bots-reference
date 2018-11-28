'use strict';

const path = require('path');
const fs = require('fs');
const sampleTmpl = fs.readFileSync(path.join(__dirname, '../template/sample-tmpl.hbs'), 'utf8');
const { callGoogle } = require('../api');

const command = {
  order: 3,
  commandType: 'RECURSIVE',
  validation: [{
    schema: [/^(?:[1-9]\d?|100)$/],
    default: [1],
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
  helpText: '☞ this is error command',
  template: sampleTmpl,
  data: function (input, options, callback) {
    callback(null, {
      param: input.params,
    });
  },
};

module.exports = {
  command
};
