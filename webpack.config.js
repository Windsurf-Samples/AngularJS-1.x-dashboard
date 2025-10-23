const path = require('path');

module.exports = {
  entry: './src/angular/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'angular-bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    minimize: false
  }
};
