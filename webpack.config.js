const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/phaser.min.js', to: 'phaser.min.js' },
        { from: 'src/images', to: '../images' },
        { from: 'src/sounds', to: '../sounds' },
        { from: 'icons', to: '../' },
      ],
    }),
  ],
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 9000
  // }
}