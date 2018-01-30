var webpack = require('webpack');

var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, '..', dir);
}

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const environment = (process.env.NODE_ENV || "development").trim();

console.log("------------------------------------------------------");
console.log("Build: ", environment.toUpperCase());
console.log("------------------------------------------------------");

var commons = {

  devtool: "source-map",

  performance: {
    hints: false
  },

  entry: {
    "app": "./src/startup.tsx",
    "vendor": "./src/vendor.ts",
    "polyfills": "./src/polyfills.ts"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".less", ".scss"],
    alias: {
      '@': resolve('src')
    }
  },

  module: {
    rules: [{
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader", "source-map-loader"]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }]
        })
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      // {
      //   test: /\.html$/,
      //   use: "raw-loader"
      // },
      // {
      //   test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
      //   exclude: /node_modules/,
      //   loader: "file-loader?name=assets/[name]-[hash:6].[ext]"
      // }
    ]
  },

  plugins: [

    new ExtractTextPlugin("styles.[hash:6].css"),

    new HtmlWebpackPlugin({
      chunks: ["app", "vendor", "polyfills"],
      template: "./resources/index.html",
      inject: true,
      filename: "./index.html",
    }),

    new CopyWebpackPlugin([{
        from: "resources/css/*.*",
        to: "static/css/",
        flatten: true
      },
      {
        from: "resources/fonts/*.*",
        to: "static/fonts/",
        flatten: true
      },
      {
        from: "resources/imgs/*.*",
        to: "static/imgs/",
        flatten: true
      },
      {
        from: "resources/js/*.*",
        to: "static/js/",
        flatten: true
      },
      {
        from: "resources/root/*",
        to: ".",
        flatten: true
      }
    ])
  ]

};

var configs = {};
if (environment === "development") {
  configs = require("./webpack.config.dev.js");
} else {
  configs = require("./webpack.config.prod.js");
}

var merge = require('webpack-merge');
module.exports = merge(commons, configs);