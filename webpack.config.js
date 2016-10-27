module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  entry: {
    hello: './src/index',
  },
  output: {
    filename: 'dist/index.js',
  },
}
