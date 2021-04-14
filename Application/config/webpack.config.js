const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const resolve = (dir) => path.join(__dirname, "../", dir);

const env = process.env.NODE_ENV || "development";
const isDev = env === "development";

const WebpackDefinePluginConfig = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify(env),
  },
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: resolve("client/index.html"),
  filename: "index.html",
  inject: "body",
});

const CleanWebpackPluginConfig = new CleanWebpackPlugin({
  verbose: true,
  cleanStaleWebpackAssets: false,
});

module.exports = {
  devtool: "source-map",
  entry: [
    "./client/styles/index.scss",
    "./client/assets/index.js",
    "./client/index.js",
  ],
  output: {
    filename: isDev ? "[name].js" : "[name].[hash].js",
    path: resolve("dist"),
    publicPath: "/",
  },
  resolve: {
    alias: {
      _client: resolve("./client"),
      _assets: resolve("./client/assets/"),
      _styles: resolve("./client/styles/"),
      _utils: resolve("./client/utils/"),
      _api: resolve("./client/api/"),
      _hooks: resolve("./client/hooks/"),
      _pages: resolve("./client/pages/"),
      _store: resolve("./client/store/"),
      _actions: resolve("./client/store/actions/"),
      _reducers: resolve("./client/store/reducers/"),
      _thunks: resolve("./client/store/thunks/"),
      _components: resolve("./client/components/"),
      _widgets: resolve("./client/widgets/"),
      _entry: resolve("./client/entry/"),
      _forms: resolve("./client/forms/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: [resolve("client")],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              optipng: { optimizationLevel: 7 },
              pngquant: { quality: [0.75, 0.9], speed: 3 },
              mozjpeg: { progressive: true },
              gifsicle: { interlaced: false },
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          name: "fonts/[name].[ext]",
          limit: 8192,
          mimetype: "application/font-woff",
        },
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: { name: "icons/[name].[ext]" },
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: { name: "fonts/[name].[ext]" },
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    WebpackDefinePluginConfig,
    CleanWebpackPluginConfig,
  ],
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 5000,
  },
};
