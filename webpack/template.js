const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';

const genericConfig = {
  context: path.resolve(__dirname, 'src'),
  entry: path.resolve(__dirname, '../src/', 'index.ts'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '.../src/assets'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|gif)/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  }
}

module.exports = { genericConfig };