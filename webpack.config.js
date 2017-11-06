﻿const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    bundle: "./src_js/Index.tsx"
  },
  output: {
    path: path.join(__dirname, "./dist/js/"),
    filename: "[name].js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.ts[x]?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
      { test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' }
    ]
  }
};