const path = require('path');

module.exports = {
  getModule: function () {
    return {
      rules: [{
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          loader: 'url-loader',
          include: [
            path.join(__dirname, '../src/assets/fonts/')
          ]
        }, {
          test: /\.js|jsx.js$/,
          loader: ["babel-loader?cacheDirectory=true"],
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
                modules: false
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
                modules: true,
                localIdentName: '[name]-[local]-[hash:base64:8]',
              },
            },
          ]
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
            path.join(__dirname, '../src/assets/images/')
          ]
        },
         {
          test: /\.json$/,
          loader: ['json-loader'],
          exclude: /node_modules/
        },
      ]
    }

  }
}