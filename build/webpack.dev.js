 const merge = require('webpack-merge');
 const common = require('./webpack.common.js')

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   module: {
     rules: [{
       test: /\.less|scss|sass$/,
       loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
       exclude: /node_modules/
     },{
      test: /\.styl$/,
      loader: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
      exclude: /node_modules/
    }, ]
   },
   devServer: {
     contentBase: './dist',
     port: '8904',
     watchContentBase: true,
     proxy: {
       "/api": {
         target: "http://localhost:3000",
         pathRewrite: {
           "^/api": ""
         }
       }
     }
   }
 });