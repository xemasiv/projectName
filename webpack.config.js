const webpack = require('webpack');
const Uglify = require('uglifyjs-webpack-plugin');

const client = {
  entry: [
    'whatwg-fetch',
    './src/client/index.js',
  ],
  output: {
    path: `${__dirname}/dist/client`,
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new Uglify({
        parallel: true,
        cache: true,
        uglifyOptions: {
          output: {
            comments: false,
          },
          compress: {
            dead_code: true,
          },
        },
      }),
    ],
  },
};

module.exports = [client];
