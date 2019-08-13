const path = require('path');
const webPackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
console.log(process.env.NODE_ENV)
module.exports = {
  mode:process.env.NODE_ENV==='development'?'development':'production',
  devtool:process.env.NODE_ENV==='development'?'cheap-module-eval-source-map':'none', 
  //映射 报错位置 none表示打包文件的报错位置 source-map表示未打包前的文件报错位置
  entry: {
    mian:'./src/index.js' //可以设置多个入口
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //
    filename: '[name].js',
    publicPath:'./' //把路径打包成相对位置
  },
  devServer: {
    host: 'localhost', //可选
    publicPath:process.env.NODE_ENV === 'production'? './': '/',
    contentBase: '/',//热加载是存到缓存的，缓存路径不是物理路径，所以我要设置找到缓存路径的位置
    historyApiFallback: { //historyApiFallback:true 时任意的 404 响应都可能需要被替代为 index.html
      index:'build/index.html',
      // rewrites: [
      //     { from: /^\/admin/, to: 'build/admin.html' }
      // ],
    },
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
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader', 'css-loader'],
        // exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test:/\.scss$/,
        use:['style-loader', 'css-loader','sass-loader'],
        // exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'), 
        // include:path.resolve(__dirname,'src'),
        use: {
          loader: 'babel-loader',
           options: {
             presets:[
               ['@babel/preset-env',{
               targets:{
                 chrome:'67',
                 ie:'8'
               }
             }],
              "@babel/preset-react"
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
      }
    ]
  },
  resolve:{
    extensions:['.scss','.js',".css",'jsx'] //自动补全识别后缀
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  optimization:{ //tree shaking 单引单用 packafe.json里设置了"sideEffects":false
    usedExports:true
  }
};