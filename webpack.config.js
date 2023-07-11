const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
      ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Output Management',
        template: './src/index.html'
      }),
  ]
};

module.exports = config;