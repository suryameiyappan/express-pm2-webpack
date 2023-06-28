const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const ManifestPlugin = require("webpack-manifest-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env) => {
  return {
    mode: env && env.WEBPACK_BUILD === true ? "production" : "development",
    entry: {
      home: "./public/javascripts/index",
      vendor: ["jquery"],
    },
    output: {
      path: path.resolve(__dirname, "public/bundle"),
      publicPath: "/bundle/",
      filename:
        env && env.WEBPACK_BUILD === true ? "[name]-[hash].js" : "[name].js",
    },
    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: "babel-loader",
        //     options: {
        //       presets: ["@babel/preset-env"],
        //     },
        //   },
        // },
        {
          test: /\.(css|sass|scss)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif|mp4|pdf|webp)$/,
          use: ["file-loader"],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),
      new MiniCssExtractPlugin({
        filename:
          env && env.WEBPACK_BUILD === true
            ? "[name]-[hash].css"
            : "[name].css",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public/images/",
            to: "assets/images",
          },
        ],
        options: {
          // Additional options if needed
        },
      }),
      // new CleanWebpackPlugin(),
      // new UglifyJsPlugin(),
      new WebpackManifestPlugin({
        fileName: "manifest.json",
        publicPath: "/bundle/",
      }),
      // new OptimizeCSSAssetsPlugin(),
    ],
  };
};
