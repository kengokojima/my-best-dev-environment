const path = require('path');
const MODE = process.env.NODE_ENV;
const DEBUG = MODE === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjqeg = require('imagemin-mozjpeg');

const urlLoader = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: 'url-loader',
  options: {
    esModule: false,
  },
};

const fileLoader = {
  test: /\.(png|jpe?g|gif|svg)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: (path) => {
          return `img/${path}`;
        },
        publicPath: (path) => {
          return `./img/${path}`;
        },
        esModule: false,
      },
    },
  ],
};

const imgLoader = DEBUG ? urlLoader : fileLoader;

module.exports = {
  mode: MODE,

  entry: {
    main: './src/ts/main.ts',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          DEBUG ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: DEBUG,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  grid: true,
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: DEBUG,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
      imgLoader,
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/pug/index.pug',
      filename: './index.html',
      minify: false,
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '65-80',
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 1,
        colors: 256,
      },
      svgo: {},
      plugins: [
        ImageminMozjqeg({
          quality: 85,
          progressive: true,
        }),
      ],
    }),
  ],
};
