'use strict';

const command = {
  order: 6,
  commandType: 'ALERT',
  timeInterval: 1,
  helpText: '    → this a alert command',
  algo: 'CUMULATIVE_DIFFERENCE',
  data: function (input, options, callback) {
    const dataArr = [ // Sample data
      {
        time: +new Date() - 1000,
        value: 400,
      },
      {
        time: +new Date(),
        value: 120,
      },
    ];
    callback(null, dataArr);
  },
};

module.exports = {
  command,
};
