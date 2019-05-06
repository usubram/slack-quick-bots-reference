'use strict';

const _ = require('lodash');
const { readdirSync } = require('fs');

const botCommand = _.keyBy(_.sortBy(_.compact(
  _.map(readdirSync(__dirname), (filename) => {
    const commandName = _.lowerCase(_.nth(_.split(filename, '.'), 0));

    if (commandName !== 'index') {
      const command = require(`./${filename}`).command;
      command.name = commandName;
      return command;
    }
  })), 'order'), 'name');

module.exports = {
  botCommand,
};
