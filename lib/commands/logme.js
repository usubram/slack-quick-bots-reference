'use strict';

const path = require('path');
const fs = require('fs');
const sampleTmpl = fs.readFileSync(path.join(__dirname,
  '../template/sample-tmpl.hbs'), 'utf8');

const command = {
  order: 2,
  commandType: 'DATA',
  validation: [{
    schema: [/[1]/, /[1]/],
    default: [1, 1],
    help: [{
      sample: '{firstArg}',
      recommend: '1',
      error: '{{arg}} is incorrect',
    }, {
      sample: '{secondArg}',
      recommend: '1',
      error: '{{arg}} is incorrect',
    }],
  }, {
    schema: [/[2]/, /[2]/],
    default: [2],
    help: [{
      sample: '{firstArg}',
      recommend: ['2', '2'],
      error: '{{arg}} is incorrect',
    }, {
      sample: '{secondArg}',
      recommend: '2',
      error: '{{arg}} is incorrect',
    }],
  }],
  helpText: '☞ this is log command',
  template: sampleTmpl,
  data: function (input, options, callback) {
    // input.command - for command name.
    // input.params - for params in array.
    // options.user.profile.email - email in slack.
    // options.hookUrl - custom webhook url.
    // options.channel - channel from which the command was fired.
    callback(null, {
      param: input.params + ' log',
    });
  },
};

module.exports = {
  command,
};
