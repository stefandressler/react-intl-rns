// var webpack = require('webpack');
let webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.externals = {};

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'], // run in PhantomJS, Chrome, ...
    singleRun: true, // just run once by default
    frameworks: [
      'chai',
      'mocha'
    ],
    // colors: true, // enable / disable colors in the output (reporters and logs)
    // logLevel: config.LOG_INFO, // level of logging - possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    plugins: [
      'karma-spec-reporter',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    files: [ // just load this file
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ // preprocess with webpack and our sourcemap loader
        'webpack',
        'sourcemap'
      ]
    },
    reporters: ['spec'], // report results in this format - ex. dots, progress
    webpack: webpackConfig,
    phantomjsLauncher: {
      exitOnResourceError: true // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
    },
    webpackServer: {
      noInfo: true // please don't spam the console when running in karma!
    }
  });
};
