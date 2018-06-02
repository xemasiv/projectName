# projectName
Web-app boilerplate that fits my needs.


## Atom Editor Installs (if using Atom)
* Settings -> Packages
  * `language-babel` (for js)
  * `linter` (for js style guide)
  * `linter-ui-default` (for js style guide)
  * `linter-eslint` (for js style guide)
  * `linter-flow` (for using flow)
  * `city-lights-icons` (optional, beautiful icons)
  * `minimap` (optional, minimap navigation)
* Settings -> Theme
  * `City Lights` (UI Theme)
  * `Monokai Shade` (Syntax Theme)
* Settings -> Editor
  * `Operator Mono` (Font Family, Light)

## Creating The Project [done]
* Create and enter project directory


  ```
  mkdir projectName && cd projectName
  ```


* Initialize with `yarn`


  ```
  yarn init
  ```


## Webpack [done]
* Add `webpack`'s dev dependencies


  ```
  yarn add webpack webpack-cli -D
  ```


* Create `webpack.config.js`


  ```js
  const webpack = require('webpack');
  const client = {
    entry: [
      './src/client/index.js'
    ],
    output: {
      path: __dirname + '/dist/client',
      filename: '[name].js',
    },
    module: {
      rules: [
        { test: /\.(js)$/, use: 'babel-loader', exclude: /node_modules/ }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "true"
      })
    ],
  };
  module.exports = [client];
  ```


#### Webpack UglifyJS Plugin [done]


* Add dev dependencies


  ```
  yarn add uglifyjs-webpack-plugin -D
  ```


* Modify `webpack.config.js`


  ```js
  const uglify = require('uglifyjs-webpack-plugin'); //++
  const client = (env, argv) => {
    return {
      entry: [
        './src/client/index.js'
      ],
      output: {
        path: __dirname + '/dist/client',
        filename: '[name].js',
      },
      module: {
        rules: [
          { test: /\.(js)$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
      },
      optimization: { //++
        minimize: true, //++
        minimizer: [ //++
          new uglify({ //++
            parallel: true, //++
            cache: true, //++
            uglifyOptions: { //++
              output: { //++
                comments: false //++
              }, //++
              compress: { //++
                dead_code: true //++
              } //++
            } //++
          }) //++
        ] //++
      } //++
    };
  };
  module.exports = [client];
  ```


* Modify `scripts` at `package.json`:


  ```
  "scripts": {
    "debug": "webpack --mode=development --env.mode=development --watch",
    "build": "webpack --mode=production --env.mode=production"
  },
  ```


## Babel [done]
* Add `babel`'s dev dependencies


  ```
  yarn add babel-loader babel-core babel-preset-env -D
  ```


* Create `.babelrc`


  ```js
  {
  "presets": [
      [
        "env",
        {
          "targets": {
            "chrome": 50,
            "explorer": 11,
            "firefox": 45
          },
        }
      ],
    ],
    "plugins": []
  }
  ```


## Eslint [done]
* Install `eslint` dependencies


  ```
  yarn add eslint babel-eslint -D
  ```


## Airbnb Javascript Style Guide [done]

* Add dev dependencies


  ```
  yarn add babel-preset-airbnb -D
  ```


* At `.babelrc`, replace `env` with `airbnb`


  ```js
  {
  "presets": [
      [
        "airbnb", // ++
        {
          "targets": {
            "chrome": 50,
            "explorer": 11,
            "firefox": 45
          },
        }
      ],
    ],
    "plugins": []
  }
  ```


* Get list of peer dependencies for eslint config


  ```
  npm info "eslint-config-airbnb@latest" peerDependencies
  ```


* Install peer dependencies (example below)


  ```
  yarn add eslint-plugin-import@^2.7.0 eslint-plugin-jsx-a11y@^6.0.2 eslint-plugin-react@^7.4.0 -D
  ```


* Install `eslint`-related dependencies


  ```
  yarn add eslint-config-airbnb -D
  ```


* Create `.eslintrc.js` file


  ```js
  module.exports = {
    "parser": "babel-eslint" ,
    "rules": {
      "strict": 0
    },
    "extends": "airbnb"
  };
  ```


## Flow [done]
* Install dependencies


  ```
  yarn add babel-preset-flow -D
  ```


* Add `flow` in `.babelrc`


  ```js
  {
    "presets": ["flow"]
  }
  ```


* Create `.flowconfig` file


  ```
  [ignore]

  [include]

  [libs]

  [lints]

  [options]

  [strict]

  ```


* Add `flow-bin`


  ```
  yarn add flow-bin -D
  ```


* Run `flow`


  ```
  yarn run flow
  ```


## Babel Polyfill [done]
* Add dev dependencies


  ```
  yarn add babel-polyfill
  ```


* Modify `.babelrc`


  ```js
  {
  "presets": [
      [
        "env", // or "airbnb"
        {
          "targets": { },
          "useBuiltIns": true, // ++
          "modules": false // ++
        }
      ],
    ],
    "plugins": []
  }
  ```


* Add line in your entry file:


  ```js
  import 'babel-polyfill';
  ```


## WhatWG Fetch [done]
* Add dependencies


  ```
  yarn add whatwg-fetch
  ```


* Modify `entry` at `webpack.config.js`


  ```js
  const webpack = require('webpack');
  const client = {
    entry: [
      'whatwg-fetch', // ++
      './src/client/index.js'
    ],
  };
  module.exports = [client];
  ```


## Jest
  ```
  jest
  babel-jest
  ```

## Joi
```
joi
```

## Enzyme

## React [done]
```
yarn add react react-dom
yarn add babel-preset-react
babel-plugin-transform-class-properties -D
```

```js
// .babelrc
{
  "presets": [
    "flow",
    ["airbnb", {
      "targets": {
        "chrome": 49,
        "explorer": 11,
        "firefox": 45,
        "edge": 14,
        "safari": 10
      },
      "modules": false,
      "useBuiltIns": true,
      "debug": true
    }],
    "react" //++
  ],
  "plugins": [ //++
    "transform-class-properties" //++
  ] //++
}
```

## Express [done]
```
yarn add express cors compression express-force-ssl
yarn add webpack-node-externals -D
```

```js
// package.json
{
  "main": "./dist/server/main.js" //++
}

// src/server/index.js
/* eslint-disable no-console */
import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import forceSSL from 'express-force-ssl';

const app = express();
app.use(cors());
app.use(compression({
  level: 9,
  strategy: 1,
  memLevel: 9,
}));
app.use(forceSSL);
app.use('*', (req, res) => {
  res.status(200).json({ message: 'Hello world!' });
});

const readAsUTF8 = path => fs.readFileSync(path, 'utf8');
const SSL = {
  key: readAsUTF8('./credentials/private.key'),
  cert: readAsUTF8('./credentials/certificate.crt'),
  ca: [
    readAsUTF8('./credentials/ca_bundle.crt'),
  ],
};
console.log('Starting..');
http.createServer(app).listen(
  80,
  () => console.log('Running @ port 80!'),
);
https.createServer(SSL, app).listen(
  443,
  () => console.log('Running @ port 443!'),
);

// webpack.config.js
const NodeExternals = require('webpack-node-externals'); //++

const server = { //++
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

module.exports = [
  client,
  server, //++
];
```

## React Router
```
react-router-dom
```

## React Loadable
```
react-loadable
babel-plugin-syntax-dynamic-import -D
```

* https://babeljs.io/docs/plugins/syntax-dynamic-import/

## Immutable
```
immutable
```

## Reference Links
* webpack env vars https://webpack.js.org/guides/environment-variables/
