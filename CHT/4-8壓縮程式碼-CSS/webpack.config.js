﻿const path = require('path');
const {WebPlugin} = require('web-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './main.js'// Chunk app 的 JS 執行入口檔案
  },
  output: {
    filename: '[name]_[chunkhash:8].js',// 給輸出的檔名稱加上 hash 值
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目錄下的檔案，node_modules 目錄下的檔案都是采用的 ES5 語法，沒必要再透過 Babel 去轉換
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.css/,// 增加對 CSS 檔案的支援
        // 分析出 Chunk 中的 CSS 程式碼到單獨的檔案中
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize'] // 壓縮 CSS 程式碼
        }),
      },
    ]
  },
  plugins: [
    // 用 WebPlugin 產生對應的 HTML 檔案
    new WebPlugin({
      template: './template.html', // HTML 模版檔案所在的檔案路徑
      filename: 'index.html' // 輸出的 HTML 的檔名稱
    }),
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css`,// 給輸出的 CSS 檔名稱加上 hash 值
    }),
  ],
};
