'use strict';

const SlackBot = require('slack-quick-bots');
const configPlugin = require('config');
const handlebars = require('handlebars');
const fs = require('fs');
const sampleTmpl = fs.readFileSync('./template/sample_tmpl.hbs', 'utf8');
const service = require('./lib/service');

var config = {
  'bots': [{
    'botCommand': {
      'getquote': {
        'commandType': 'DATA',
        'defaultParamValue': 'wmt',
        'template': function() {
          return handlebars.compile(sampleTmpl);
        },
        'data': function(command, param, callback) {
          service.getQuote(param, function(err, data) {
            callback(data);
          });
        }
      },
      'accessctl': {
        'commandType': 'RECURSIVE',
        'defaultParamValue': 1,
        'template': function() {
          return handlebars.compile(sampleTmpl);
        },
        'data': function(command, param, callback) {
          service.getQuote(param, function(err, data) {
            callback(data);
          });
        },
        'allowedUsers': ['slackUsername']
      },
      'copycat': {
        'commandType': 'DATA',
        'allowedParam': ['copy', 'cat'],
        'lowerLimit': 0,
        'upperLimit': 100,
        'defaultParamValue': 'copy',
        'template': function() {
          return handlebars.compile(sampleTmpl);
        },
        'data': function(command, param, callback) {
          callback({
            'copycat': true,
            'param': param
          });
        }
      },
      'alert': {
        'commandType': 'alert',
        'timeInterval': '1',
        'template': function() {
          return handlebars.compile(sampleTmpl);
        },
        'data': function(command, param, callback) {
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
      'graph': {
        'commandType': 'DATA',
        'responseType': {
          type: 'svg',
          ylabel: 'errors',
          timeUnit: 'm',
          title: 'Log data',
          logscale: false,
          style: 'lines'
        },
        'allowedParam': [1, 2],
        'defaultParamValue': 1,
        'data': function(command, param, callback) {
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
      }
    },
//    'blockDirectMessage': true,
    'botToken': configPlugin.has('botToken') ? configPlugin.get('botToken')[0] : ''
  }]
};
var slackBot = new SlackBot(config);
slackBot.start();
