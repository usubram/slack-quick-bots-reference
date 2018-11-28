'use strict';

const path = require('path');
const fs = require('fs');
const sampleTmpl = fs.readFileSync(path.join(__dirname, '../template/sample-tmpl.hbs'), 'utf8');
const { callGoogle } = require('../api');

const command = {
  order: 1,
  commandType: 'DATA',
  validation: [{
    schema: ['a', 'b'],
    default: ['a', 'b'],
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
  descriptionText: 'Command to show log metrics',
  helpText: '☞ this is log command',
  template: sampleTmpl,
  data: function (input, options, callback) {
    // input.command - for command name.
    // input.params - for params in array.
    // options.user.profile.email - email in slack.
    // options.hookUrl - custom webhook url.
    // options.channel - channel from which the command was fired.
    callGoogle(input.params, (err, response) => {
      callback(null, { api: response });
    });
  },
};

module.exports = {
  command
};
