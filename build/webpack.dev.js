const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const devConfig = {
  mode:'development',
  devtool:'cheap-module-eval-source-map', 
  devServer: {
    host: 'localhost', //可选
    publicPath:process.env.NODE_ENV === 'production'? './': '/',
    contentBase: '/',//热加载是存到缓存的，缓存路径不是物理路径，所以我要设置找到缓存路径的位置
    historyApiFallback: true, //页面重定向 true当路由不存在 重定向到 /的页面 
    open: true,
    // inline: true, //刷新浏览器
    hot:true, //刷新改变的部分
    hotOnly:true, //不支持热更新的情况下，不会刷新页面的情况下，在控制台输出热更新失败
    port: 9000,
    // proxy: {
    //   '/api': {
    //       target: 'http://localhost:8081',
    //       changeOrigin:true,
    //       pathRewrite: {
    //         '^/api': ''
    //       } //本来是反向代理去http://localhost:8081/api，rewrite之后就反向代理去http://localhost:8081/data
    //   }
    // },
    compress: false //可选，压缩
  }
}

module.exports = merge (common,devConfig)