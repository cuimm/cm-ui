const path = require('path');

exports.alias = {
  '@src': path.resolve(__dirname, '../src'),
  '@packages': path.resolve(__dirname, '../packages'),
  '@examples': path.resolve(__dirname, '../examples'),
};

exports.jsexclude = /node_modules/;
