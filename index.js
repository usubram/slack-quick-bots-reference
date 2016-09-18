'use strict';

const SlackBot = require('slack-quick-bots');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const sampleTmpl = fs.readFileSync(path.join(__dirname, 'template/sample_tmpl.hbs'), 'utf8');
const service = require('./lib/service');

var args = process.argv.slice(2);

var config = {
  bots: [{
    botCommand: {
      getquote: {
        commandType: 'DATA',
        allowedParam: ['*'],
        template: function() {
          return handlebars.compile(sampleTmpl);
        },
        data: function(input, options, callback) {
          console.log('input.params', input.params);
          console.log(JSON.stringify(options));
          service.getQuote(input.params, function(err, data) {
            callback(data);
          });
        }
      },
      accessctl: {
        commandType: 'RECURSIVE',
        defaultParamValue: 1,
        template: function() {
          return handlebars.compile(sampleTmpl);
        },
        data: function(input, options, callback) {
          service.getQuote(input.params, function(err, data) {
            callback(data);
          });
        },
        allowedUsers: ['slackUsername']
      },
      copycat: {
        commandType: 'DATA',
        allowedParam: ['copy', 'cat'],
        lowerLimit: 0,
        upperLimit: 100,
        defaultParamValue: 'copy',
        template: function() {
          return handlebars.compile(sampleTmpl);
        },
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
    schedule: true,
    botToken: args[0] || ''
  }]
};
var slackBot = new SlackBot(config);
slackBot.start();
