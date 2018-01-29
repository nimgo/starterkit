var webpack = require('webpack');

var path = require('path');
var dist = path.resolve(__dirname, "../dist");

module.exports = {

  performance: {
    hints: false //"warning"
  },

  output: {
    filename: "static/js/[name].[hash:6].dev.min.js",
    path: dist
  },

  devServer: {
    contentBase: dist,
    inline: true,
    open: true,
    port: 5000
  }
}