const environment = (process.env.NODE_ENV || "development").trim();

const webpack = require('webpack');
const path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, '..', dir);
}

const AppSource = resolve('src');
const Resources = resolve('resources');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ExtractTextPluginGlobal = new ExtractTextPlugin("static/css/styles.global.[hash:6].css");
const ExtractTextPluginLocal = new ExtractTextPlugin("static/css/styles.local.[hash:6].css");

console.log("------------------------------------------------------");
console.log(" Build: ", environment.toUpperCase());
console.log("------------------------------------------------------");

var commons = {

  devtool: "source-map",

  performance: {
    hints: false
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".less", ".scss"],
    alias: {
      "@": AppSource,
      "@/app": resolve("src/app")
    }
  },

  entry: {
    "app": "@/startup.tsx",
    "vendor": "@/vendor.ts",
    "polyfills": "@/polyfills.ts"
  },

  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      include: [AppSource],
      use: ["ts-loader", "source-map-loader"]
    },
    {
      test: /\.(png|jp(e*)g|svg|gif)$/,
      include: [AppSource, Resources],
      use: [{
        loader: "url-loader",
        options: {
          limit: "100",
          name: "static/images/[name].[hash:6].[ext]"
        }
      }]
    },
    {
      test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
      include: [Resources],
      use: [{
        loader: "url-loader",
        options: {
          limit: "100",
          name: "static/fonts/[name].[hash:5].[ext]"
        }
      }]
    },
    {
      test: /\.css$/,
      include: [Resources, /node_modules/],
      use: ExtractTextPluginGlobal.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader",
          options: {
            minimize: true,
            sourceMap: true
          }
        }]
      })
    },
    {
      test: /\.css$/,
      include: [AppSource],
      use: ExtractTextPluginLocal.extract({
        fallback: "style-loader",
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
            modules: true,
            sourceMap: 1,
            // localIdentName: "[local]"
            localIdentName: "[name]__[local]__[hash:3]"
          }
        }]
      })
    }, 
    {
      test: /\.less$/,
      include: [Resources, /node_modules/],
      use: ExtractTextPluginGlobal.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader",
          options: {
            minimize: true,
            sourceMap: true
          }
        }, "less-loader" // compiles Less to CSS
        ]
      })
    },  
      {
        test: /\.less$/,
        include: [AppSource],
        use: ExtractTextPluginLocal.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              minimize: true,
              modules: true,
              importLoaders: 1,
              sourceMap: true,
              localIdentName: "[name]__[local]__[hash:3]"
            }
          }, "less-loader" // compiles Less to CSS
          ]
        })
      },
      // {
      //   test: /^((?!\.scoped).)*scss$/,
      //   include: [Resources, /node_modules/],
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: [{
      //       loader: "css-loader",
      //       options: {
      //         minimize: true,
      //         sourceMap: true
      //       }
      //     }]
      //   }, {
      //     loader: "sass-loader" // compiles scss to CSS
      //   })
      // }
    ]
  },

  plugins: [

    ExtractTextPluginGlobal,

    ExtractTextPluginLocal,

    new HtmlWebpackPlugin({
      chunks: ["app", "vendor", "polyfills"],
      template: "./resources/index.html",
      inject: true,
      filename: "./index.html",
    }),

    // new CopyWebpackPlugin([{
    //     from: "resources/css/*.*",
    //     to: "static/css/",
    //     flatten: true
    //   },
    //   {
    //     from: "resources/fonts/*.*",
    //     to: "static/fonts/",
    //     flatten: true
    //   },
    //   {
    //     from: "resources/imgs/*.*",
    //     to: "static/imgs/",
    //     flatten: true
    //   },
    //   {
    //     from: "resources/js/*.*",
    //     to: "static/js/",
    //     flatten: true
    //   },
    //   {
    //     from: "resources/root/*",
    //     to: ".",
    //     flatten: true
    //   }
    // ])
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