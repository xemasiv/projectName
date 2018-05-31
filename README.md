# simple-setups
Simplified project setups.


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
  const webpack = require('webpack');
  const uglify = require('uglifyjs-webpack-plugin'); //++
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
  module.exports = [client];
  ```


## Babel [done]
* Add `babel`'s dev dependencies


  ```
  yarn add babel-cli babel-loader babel-preset-env -D
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

## React
```
react
react-dom
babel-preset-react
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

## Immutable
```
immutable
```
