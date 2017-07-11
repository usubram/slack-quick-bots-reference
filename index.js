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
      getquote: {
        commandType: 'DATA',
        allowedParam: ['*'],
        helpText: '    → This is help message',
        template: sampleTmpl,
        data: function(input, options, callback) {
          service.getQuote(input.params, function(err, data) {
            callback(data);
          });
        }
      },
      auto: {
        commandType: 'RECURSIVE',
        lowerLimit: 0,
        upperLimit: 100,
        defaultParamValue: 1,
        template: sampleTmpl,
        data: function (input, options, callback) {
          callback({
            'param': input.params
          });
        }
      },
      accessctl: {
        commandType: 'RECURSIVE',
        defaultParamValue: 1,
        template: sampleTmpl,
        data: function(input, options, callback) {
          callback({ copycat: true });
        },
        allowedUsers: ['slackUsername'],
      },
      copycat: {
        commandType: 'DATA',
        allowedParam: ['copy', 'cat'],
        lowerLimit: 0,
        upperLimit: 100,
        defaultParamValue: 'copy',
        template: sampleTmpl,
        data: function(input, options, callback) {
          callback({
            copycat: true,
            param: input.params
          });
        }
      },
      alert: {
        commandType: 'ALERT',
        timeInterval: 1,
        data: function(input, options, callback) {
          var dataArr = [ // Sample data
            [100, 120, 130, 110, 123, 90],
            [1, 120, 130, 110, 90, 85],
            [1, 120, 130, 1010, 140, 145],
            [100, 120, 130, 250, 140, 145],
            [100, 120, 130, 300, 140, 145],
            [100, 400, 130, 300, 140, 145],
            [100, 90, 130, 300, 140, 145],
            [100, 120, 130, 1010, 150, 90]
          ];
          var rand = dataArr[Math.floor(Math.random() * dataArr.length)];
          callback(rand);
        }
      },
      graph: {
        commandType: 'DATA',
        responseType: {
          type: 'png',
          ylabel: 'errors',
          xlabel: 'title errors',
          timeUnit: 'm',
          title: 'Log data',
          logscale: false,
          style: 'lines',
          exec: { encoding: 'utf16' }
        },
        allowedParam: [1, 2],
        defaultParamValue: 1,
        data: function(input, options, callback) {
          var dataArr = [ // Sample data
            [100, 120, 130, 110, 123, 90],
            [1, 120, 130, 110, 90, 85],
            [1, 120, 130, 1010, 140, 145],
            [100, 120, 130, 250, 140, 145],
            [100, 120, 130, 300, 140, 145],
            [100, 400, 130, 300, 140, 145],
            [100, 90, 130, 300, 140, 145],
            [100, 120, 130, 1010, 150, 90]
          ];
          var rand = dataArr[Math.floor(Math.random() * dataArr.length)];
          var data = {
            response: rand,
            responseType: {
              xlabel: 'hello',
              type: 'png',
              ylabel: 'devil',
              title: 'this is title from me',
              style: 'lines'
            }
          }
          callback(data);
        }
      }
    },
    slackApi: {
      user: {
        exclude: true
      }
    },
    schedule: true,
    webHook: true,
    botToken: args[0] || ''
  }],
  server: {
    port: 9000,
    webHook: true
  },
  // proxy: {
  //   url: 'http://youproxy.com:8080'
  // },
  logger: logger
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
