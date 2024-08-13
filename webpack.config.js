const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = (env = {}, argv) => {
  const webpackMode = argv.mode;
  const isProd = webpackMode === 'production';
  const processEnv = dotenv.parsed;

  const plugins = [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash].css',
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(processEnv),
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/index.ejs',
      scriptLoading: 'blocking',
      filename: 'index.html',
      isProd,
    }),
  ];

  const rules = [
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.(ts|js)$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false,
            modules: false,
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false,
            modules: false,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('autoprefixer')
              ]
            },
          },
        },
        {
          loader: 'sass-loader',
        }
      ],
    },
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
    {
      test: /\.(jpeg|jpg|png|docx)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[name].[ext]',
            outputPath: 'assets/',
          },
        },
      ],
    },
    { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['url-loader?limit=100000'] },
    {
      test: /\.ejs$/,
      use: [
        {
          loader: 'ejs-loader',
          options: {
            esModule: false,
          }
        }
      ]
    },
  ];

  const buildDir = path.join(__dirname, 'dist');

  return {
    entry: ['./src/index.ts'],
    mode: webpackMode,
    devtool: !isProd ? 'eval-source-map' : false,
    devServer: {
      static: [
        buildDir,
      ],
      port: 3000,
      historyApiFallback: true,
      allowedHosts: 'all',
      liveReload: true,
      client: {
        overlay: {
          warnings: false,
          errors: false,
        }
      },
      devMiddleware: {
        writeToDisk: true, // without this there is an error in a browser: cannot get /
      },
    },
    output: {
      publicPath: './',
      path: buildDir,
      filename: '[name]_[contenthash].js',
    },
    target: !isProd ? 'web' : ['web', 'es5'],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'],
      modules: [
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, './node_modules'),
      ],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, './assets'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
      fallback: {
        crypto: false,
      },
    },
    module: {
      rules: rules,
    },
    plugins: plugins,
    optimization: {
      minimizer: [new TerserPlugin({ extractComments: false })],
    },
  };
};
