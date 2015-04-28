module.exports = {

  entry: './src/Extension.coffee',

  output: {
    filename: 'build/data/js/filter.js',
    pathinfo: true
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?+compact', exclude: /node_modules/ },
      { test: /\.coffee$/, loader: 'coffee' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.gif$/, loader: 'url' },
      { test: /\.jade$/, loader: 'jade' }
    ]
  },

  resolve: {
    extensions: ['', '.coffee', '.js'],
    alias: {
      'jquery': __dirname + '/src/lib/node-jquery-1.7.2.js',
      'jquery-ui': __dirname + '/src/lib/jquery-ui-1.8.16.custom.min.js',
      'knockout': __dirname + '/src/lib/knockout-3.3.0.js',
      'knockout.persist': __dirname + '/src/lib/knockout.persist.js',
      'tipsy': __dirname + '/src/lib/tipsy/tipsy.js'
    }
  },

  //devtool: '#inline-source-map',
  //devtool: '#eval',

  recordsPath: './webpack.cache.json'

}
