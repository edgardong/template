const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const htmlWebpack = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html'
})

module.exports = {
  mode: 'development',
  // webpack 插件
  plugins: [
    htmlWebpack
  ],
  // webpack 模块
  module: {
    rules: [{
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'url-loader',
        include: [
          path.join(__dirname, './src/assets/fonts/')
        ]
      }, {
        test: /\.js|jsx.js$/,
        loader: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: /node_modules\/antd/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules:false
            },
          },
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules\/antd/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules:true,
              localIdentName:'[name]-[local]-[hash:base64:8]',
            },
          },
        ]
      },
      // {
      //   test: /\.css$/,
      //   loader: ['style-loader', 'css-loader']
      // }, {
      //   test: /\.css$/,
      //   loader: 'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!',
      //   exclude: /node_modules/
      // },
      {
        test: /\.less|scss|sass$/,
        loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.jpg|png|jpeg$/,
        loader: ['url-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: ['svg-sprite-loader'],
        include: [
          path.join(__dirname, './src/assets/images/')
        ]
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: ['json-loader'],
        exclude: /node_modules/
      },
    ]
  },
  // webpack 的解析
  resolve: {
    extensions: [".js", ".jsx", ".json", ".scss", ".styl"],
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  devServer: {
    // 本地服务器所加载页面所在目录
    contentBase: './',
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
}