module.exports = {
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
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
}
