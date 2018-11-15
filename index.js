'use strict';

const SlackBot = require('slack-quick-bots');
const path = require('path');
const fs = require('fs');
const sampleTmpl = fs.readFileSync(path.join(__dirname, 'template/sample_tmpl.hbs'), 'utf8');
const service = require('./lib/service');
const winston = require('winston');

const args = process.argv.slice(2);
const logFile = 'bot.log';

const logger = new winston.Logger({
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: logFile,
      timestamp: true
    })
  ]
});

const config = {
  bots: [{
    botCommand: {
      log: {
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
          callback(null, {
            param: input.params + ' log',
          });
        },
      },
      logme: {
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
      },
      trend: {
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
      },
      error: {
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
      },
      alert: {
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
      },
      file: {
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
      },
    },
    schedule: true,
    blockDirectMessage: false,
    webHook: true,
    slackApi: {
      user: {
        exclude: true,
        presence: false,
        limit: 1000,
      },
      channel: {
        exclude: true,
      },
    },
    mock: {
      self: {
        name: 'testbot1',
        id: 'U1234567',
      },
    },
    botToken: args[0],
  }],
  // proxy: {
  //   url: 'http://proxy.socketproxy.com:8080/'
  // },
  logger: console, // you could pass a winston logger.
  server: {
    port: 9090,
    webHook: false,
  },
};

const slackBot = new SlackBot(config);

console.log('Logs are at', logFile);

slackBot.start().then((botEvt) => {
  botEvt[0].on('message', (response) => {
    // console.log('Messages to bot', response);
  });

  botEvt[0].on('connect', () => {
    // console.log('Bot connected successfully');
  });
});
