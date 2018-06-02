/*
  eslint-disable
  no-console, no-unused-vars
*/
const Uglify = require('uglifyjs-webpack-plugin');
const NodeExternals = require('webpack-node-externals');

const client = (env, argv) => {
  console.log('mode:', env.mode);
  return {
    entry: [
      'whatwg-fetch',
      './src/client/index.jsx',
    ],
    output: {
      path: `${__dirname}/dist/client`,
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
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

const server = {
  entry: [
    './src/server/index.js',
  ],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [
    NodeExternals(),
  ],
  output: {
    path: `${__dirname}/dist/server`,
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = [client, server];
