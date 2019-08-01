const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

const prodConfig = {
  mode:'production',
  devtool:'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'), //
    filename: '[name].js',
    publicPath:'./' //把路径打包成相对位置
  }
}

module.exports = merge(common,prodConfig)