const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { 
        test: /\.html$/,
        use: ['html-loader']
      },
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
  }
};
