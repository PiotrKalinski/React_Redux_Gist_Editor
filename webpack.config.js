var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './app/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devServer: {
    historyApiFallback: true
},
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, loader: "eslint-loader", exclude: /node_modules/ }
    ],
    loaders: [
      {
        test: /.jsx?$/,
        loaders: [ 'react-hot', 'babel-loader' ],
        include: path.resolve(__dirname, 'app'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
        ]
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader', 
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
};
