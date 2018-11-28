'use strict';

const _ = require('lodash');
const { config } = require('../lib/config');
const { expect } = require('chai');
const SlackBot = require('slack-quick-bots');
const sinon = require('sinon');
const uuid = require('uuid');

_.set(config, 'bots.0.botToken', '12345');
_.set(config, 'bots.0.mock', {
  self: {
    name: 'testbot1',
    id: 'U1234567',
  }
});

describe('Slack quick bots reference bot test', function() {
  let slackBot;
  let sandbox;
  let slackMessage;

  beforeEach(function() {
    sandbox = sinon.createSandbox();
    slackBot = new SlackBot(config, {
      isMock: true,
    });
    slackMessage = {
      id: uuid.v4(),
      type: 'message',
      channel: 'D0GL06JD7',
      user: 'U0GG92T45',
      text: 'ping',
      ts: '1453007224.000007',
      team: 'T0GGDKVDE',
    };
  });

  afterEach(function() {
    sandbox.restore();
    slackBot = null;
  });

  it('api command - should call google', function (done) {
    slackMessage.text = 'api a b';

    const onMessageSpy = sandbox.spy((response) => {
      setTimeout(() => {
        expect(response.message).to.equal('Google returned 200\n');
        done();
      }, 1);
    });

    slackBot.start().then((botEvt) => {
      botEvt[0].on('message', onMessageSpy);

      botEvt[0].on('connect', () => {
        botEvt[0].injectMessage(slackMessage);
      });
    });
  });
});
