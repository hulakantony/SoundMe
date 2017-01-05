var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './app/index'
  ],
  devtool: 'eval',
  output: {
    publicPath: 'http://localhost:8080/',
    filename: '/js/[name].js',
     // path: __dirname,
     // filename: 'bundle.js',
     // publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api/*': 'http://localhost:8081',
    },
    historyApiFallback: true
  },
};
