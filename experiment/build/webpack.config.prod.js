var webpack = require('webpack');
var CleanWebpackPlugin = require("clean-webpack-plugin");

var path = require('path');
var dist = path.resolve(__dirname, "../dist");

module.exports = {

  output: {
    filename: "static/js/[name].[hash:6].prod.min.js",
    path: dist
  },

  plugins: [

    // production build of react / react-dom
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    // defines the sequence of injection
    new webpack.optimize.CommonsChunkPlugin({
      name: ["app", "vendor", "polyfills"]
    }),

    new CleanWebpackPlugin(
      [
        "./static",
        "./*",
      ], {
        root: dist,
        verbose: true
      }
    ),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    }),
  ]
}