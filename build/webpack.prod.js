 const merge = require('webpack-merge')
 const path = require('path')
 const webpack = require('webpack')
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js')
 const CleanWebpackPlugin = require('clean-webpack-plugin')
 const MiniCssExtractPlugin = require('mini-css-extract-plugin')
 var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
 const DropConsoleWebpackPlugin = require('drop-console-webpack-plugin')

 module.exports = merge(common, {
   mode: 'production',
   devtool: false,
   module: {
     rules: [{
       test: /\.less|scss|sass$/,
       use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
       exclude: /node_modules/
     }, {
       test: /\.styl$/,
       use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'stylus-loader'],
       exclude: /node_modules/
     }, ]
   },
   plugins: [
     new CleanWebpackPlugin(['dist'], {
       root: path.resolve(__dirname, '../'), //根目录
       //其他配置按需求添加
     }),
     //  new UglifyJSPlugin({
     //    sourceMap: true
     //  }),
     new DropConsoleWebpackPlugin({
       drop_log: true,
       drop_info: true,
       drop_warn: false,
       drop_error: false,
       exclude: ['manifest'],
     }),
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
     }),
     new MiniCssExtractPlugin({
       filename: '[name]-[contenthash].css'
     }),
     new ParallelUglifyPlugin({
       cacheDir: '.cache/',
       uglifyJS: {
         output: {
           comments: false
         },
         compress: {
           warnings: false
         }
       }
     })
   ],
   optimization: {
     splitChunks: { // 打包 node_modules里的代码
       chunks: 'all'
     },
     runtimeChunk: true, // 打包 runtime 代码
   }
 });