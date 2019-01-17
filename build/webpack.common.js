const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const util = require('./utils')

const htmlWebpack = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../src/index.html'),
  filename: 'index.html',
  title: 'React Music Dev'
})

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, '../src/index.jsx')],
  plugins: [
    htmlWebpack
  ],
  module: util.getModule(),
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist/')
  },
  // webpack 的解析
  resolve: {
    extensions: [".js", ".jsx", ".json", ".scss", ".styl"],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
};