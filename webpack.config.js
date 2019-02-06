const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  entry: {
    content: './lib/content.js',
    background: './lib/background.js',
    options: './lib/options.js',
    page_action: './lib/page_action.js',
    browser_action: './lib/browser_action.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!shields\.io)/,
        loader: 'babel-loader',
        options: {
          babelrc: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
      test: /\.ya?ml$/,
      use: 'js-yaml-loader',
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      './lib/manifest.json',
      {
        from: 'assets/images',
        to: 'images',
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'browser_action.html',
      template: './template.html',
      chunks: ['browser_action'],
    }),
    new HtmlWebpackPlugin({
      filename: 'page_action.html',
      template: './template.html',
      chunks: ['page_action'],
    })
  ],
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  optimization: {
    usedExports: true,
  },
};
