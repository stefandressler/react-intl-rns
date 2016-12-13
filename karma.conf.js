// var webpack = require('webpack');
let webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.externals = {};

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'], // run in PhantomJS, Chrome, ...
    singleRun: false, // true = just run once by default
    autoWatch: true,
    basePath: '',
    frameworks: [
      'intl-shim',
      'tap'
    ],
    colors: true, // enable / disable colors in the output (reporters and logs)
    logLevel: config.LOG_DISABLE, // level of logging - possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    plugins: [
      'karma-spec-reporter',
      'karma-tap-pretty-reporter',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-tap',
      'karma-intl-shim',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    files: [ // just load this file
      'node_modules/babel-polyfill/dist/polyfill.js',
      'webpack.config.tests.js'
    ],
    preprocessors: {
      'webpack.config.tests.js': [ // preprocess with webpack and our sourcemap loader
        'webpack',
        'sourcemap'
      ]
    },
    reporters: ['tap-pretty'], // report results in this format - ex. dots, progress, spec, tap-pretty
    tapReporter: {
      prettify: require('faucet'), // default 'standard TAP' output
      separator: '======= rerun tests'
    },
    // webpack: webpackConfig,
    webpack: {
      externals: {
        // Allow Enzyme to work with webpack
        // 'jsdom': 'window',
        // 'cheerio': 'window',
        'react/addons': true, // important!!
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      node: {
        fs: 'empty'
      },
      devtool: 'sourcemap',
      resolve: {
        extensions: ['', '.js', '.jsx', '.json']
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
              presets: [
                "react",
                "es2015",
                "stage-0"
              ],
              plugins: [
                'react-html-attrs'
              ]
            }
          },
          // Allow Enzyme to work with webpack
          {
            test: /\.json$/,
            loader: 'json-loader'
          }
        ]
      }

    },

    phantomjsLauncher: {
      exitOnResourceError: true // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
    },
    webpackServer: {
      noInfo: true // please don't spam the console when running in karma!
    }
  });
};
