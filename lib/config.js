'use strict';

const { botCommand } = require('./commands');

const config = {
  bots: [{
    botCommand,
    schedule: false,
    blockDirectMessage: false,
    slackApi: {
      user: {
        exclude: true,
      },
      channel: {
        exclude: true,
      },
    },
  }],
  // proxy: {
  //   url: 'http://proxy.socketproxy.com:8080/'
  // }
};

module.exports = {
  config,
};
