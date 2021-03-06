'use strict';


var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var embedFileSize = 65536;

var config = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css?sourceMap'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.mp4/, loader: 'url?limit=' + embedFileSize + '&mimetype=video/mp4'},
      {test: /\.svg/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/svg+xml'},
      {test: /\.png$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/png'},
      {test: /\.jpg/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/jpeg'},
      {test: /\.gif/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/gif'},
      {
        test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=' + embedFileSize
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loaders: [/*'eslint'*/],
        include: [new RegExp(path.join(__dirname, 'src'))]
      }
    ]
  },
  node: {
    __filename: true
  },
  stats: {
    colors: true
  },
  // eslint: {
  //   configFile: 'src/.eslintrc'
  // }
};

var production = _.extend({}, config, {
  plugins: config.plugins.concat(new webpack.NoErrorsPlugin()),
  module: _.extend({}, config.module, {
    loaders: config.module.loaders.concat({
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: [new RegExp(path.join(__dirname, 'src'))]
    })
  }),
  // eslint: _.extend({}, config.eslint, {emitError: true})
});

var development = _.extend({}, config, {
  entry: config.entry.concat([
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ]),
  plugins: config.plugins.concat(new webpack.HotModuleReplacementPlugin()),
  module: _.extend({}, config.module, {
    loaders: config.module.loaders.concat({
      test: /\.js$/,
      loaders: ['babel', 'react-hot'],
      include: [new RegExp(path.join(__dirname, 'src'))]
    })
  }),
  devtool: 'eval'
});


module.exports = production;
module.exports.development = development;
