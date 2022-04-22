const ESLintPlugin = require('eslint-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const path = require('path')
const MODE = process.env.NODE_ENV
const DEBUG = MODE === 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ImageminMozjqeg = require('imagemin-mozjpeg')
const StylelintPlugin = require('stylelint-webpack-plugin')
const Globule = require('globule')

const STYLELINT = ['./src/scss/**/*.scss']

const generatePug = () => {
  const documents = Globule.find('./src/pug/**/*.pug', {
    ignore: ['./src/pug/**/_*.pug'],
  })

  documents.forEach((document) => {
    const fileName = document.replace('./src/pug/', '').replace('.pug', '.html')
    app.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${fileName}`,
        template: document,
      })
    )
  })
}

const app = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  mode: MODE,

  devServer: {
    // open: true,
    // openPage: 'index.html',
    static: [
      path.resolve(__dirname, 'dist'),
      {
        directory: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        serveIndex: true,
        watch: true,
      },
    ],
  },

  entry: {
    main: './src/ts/main.ts',
  },

  output: {
    assetModuleFilename: 'img/[name][ext]',
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
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
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    grid: true,
                  }),
                ],
              },
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
      {
        test: /\.(png|jpg|svg)$/,
        type: 'asset',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new ESLintPlugin({
      fix: true,
      extensions: ['ts', 'js'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new StylelintPlugin({
      files: STYLELINT,
      customSyntax: 'postcss-scss',
      fix: true,
    }),

    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['mozjpeg', { quality: 85, progressive: true }],
            [
              'pngquant',
              {
                quality: [0.6, 0.8],
              },
            ],
            [
              'svgo',
              {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        },
      },
    }),
  ],
}

generatePug()
module.exports = app
