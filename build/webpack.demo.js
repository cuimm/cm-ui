const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const config = require('./config');

const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = {
  mode: process.env.NODE_ENV,
  devtool: isProd ? 'nosources-source-map' : 'eval-source-map',
  entry: path.resolve(__dirname, '../examples/index.js'),
  output: {
    path: path.resolve(process.cwd(), './examples/dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: config.alias,
    extensions: ['.jsx', '.js', '.vue', '.json'],
    modules: ['node_modules'],
  },
  devServer: {
    host: '0.0.0.0',
    port: 8088,
    hot: true,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|jsx?)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(jsx?)$/,
        exclude: config.jsexclude,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
        }
      },
    ],
  },
  plugins: [
    // 自动产出html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../examples/index.html'), // 指定模版文件
      filename: 'index.html', // 产出后的文件名
    }),
    // 分离css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css',
      chunkFilename: '[id].css',
    }),
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [],
  },
};

module.exports = webpackConfig;
