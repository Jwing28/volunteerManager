const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './js/App/Index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.API_HOST': JSON.stringify('http://localhost:3000'),
      'process.env.TWO': JSON.stringify('it works')
    })
  ]
};

// plugins: [
//   HtmlWebpackPluginConfig,
//   new webpack.HotModuleReplacementPlugin(),
//   new webpack.NoEmitOnErrorsPlugin(),
//   new webpack.DefinePlugin({
//     'process.env.NODE_ENV': JSON.stringify('development'),
//     'process.env.API_HOST': JSON.stringify('http://localhost:3000')
//   })
// ]
