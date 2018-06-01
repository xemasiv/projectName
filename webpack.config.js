/*
  eslint-disable
  no-console, no-unused-vars
*/
const Uglify = require('uglifyjs-webpack-plugin');

const client = (env, argv) => {
  console.log('mode:', env.mode);
  return {
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
};

module.exports = [client];
