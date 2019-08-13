const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={
    entry: {
        mian:path.resolve(__dirname, '../src/index.js')//可以设置多个入口
    },
    module:{
      rules:[
        {
          test:/\.css$/,
          use:['style-loader', 'css-loader'],
          // exclude: path.resolve(__dirname, '../node_modules'),
        },
        {
          test:/\.scss$/,
          use:['style-loader', 'css-loader','sass-loader'],
          // exclude: path.resolve(__dirname, '../node_modules'),
        },
        {
          test: /\.jsx?$/,
          // exclude: path.resolve(__dirname, '../node_modules'),
          // include:path.resolve(__dirname,'src'),
          use: {
            loader: 'babel-loader',
             options: {
               presets:[
              //    ['@babel/preset-env',{
              //    targets:{
              //      chrome:'67',
              //      ie:'11'
              //    },
              //   //  "useBuiltIns": "usage"
              //  }],
                "@babel/preset-react"
              ],
              "plugins": [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    "corjs":2,
                    "helpers": true,
                    "regenerator": true,
                    "useESModules": false
                  }
                ],
                '@babel/plugin-proposal-class-properties',
                ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
              ]
            }
          }
        },
        {
          test: /\.(png|jpg|gif)$/,
          exclude: path.resolve(__dirname, '../node_modules'),
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
      new ExtractTextPlugin({ filename: '[name].[contenthash].css', allChunks: false }),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
    // optimization:{ //tree shaking 单引单用 packafe.json里设置了"sideEffects":false
    //   usedExports:true
    // }
  };