'use strict';

const _ = require('lodash');
const SlackBot = require('slack-quick-bots');
const winston = require('winston');
const { config } = require('./config');

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


console.log('Logs are at', logFile);

_.set(config, 'logger', logger)
_.set(config, 'bots.0.botToken', args[0])

const slackBot = new SlackBot(config);

slackBot.start().then((botEvt) => {
  botEvt[0].on('message', (response) => {
    // console.log('Messages to bot', response);
  });

  botEvt[0].on('connect', () => {
    // console.log('Bot connected successfully');
  });
});
