const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'js/game.js',
  },
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/phaser.min.js', to: 'js/phaser.min.js' },
        { from: 'src/site.webmanifest', to: 'site.webmanifest' },
        { from: 'src/images', to: 'images' },
        { from: 'src/sounds', to: 'sounds' },
        { from: 'icons', to: '.' },
      ],
    }),
  ]
}