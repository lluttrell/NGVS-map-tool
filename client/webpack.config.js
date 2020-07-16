const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 8085,
    disableHostCheck: true,
    historyApiFallback: true
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    publicPath: '/NGVS',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test:/\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test:/\.(csv|tsv)$/,
        use: [
          {
            loader: 'csv-loader',
            options: {
              header: false,
              dynamicTyping: true,
              skipEmptyLines: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/downzip/dist/downzip-sw.js',
          to: '.'
        }
      ]
    })
  ]
};
