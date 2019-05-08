// ****************************************************************************************************
// Init
// ****************************************************************************************************

// init native dependencies
const path = require('path');

// init dependencies
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const privateDir = "./private"
const publicDir = "./public"

// ****************************************************************************************************
// Export Config
// ****************************************************************************************************

// export config
module.exports = function (env, argv) {

  // show webpack mode
  console.log(`Webpack in ${argv.mode} mode`)

  // init config
  let config = {
    // entry file and context
    entry: {
      app: path.resolve(privateDir, 'js/index.js'),
    },
    context: path.resolve(privateDir),
    // aliases
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@': path.resolve(privateDir)
      }
    },
    // bundler modules
    module: {
      rules: [{
          test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [{
          loader: process.argv[1].includes("webpack-dev-server") ? 'style-loader' : MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [require('autoprefixer')];
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      }, {
        test: /\.(svg|png|jpe?g|gif|txt)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          }
        }]
      }]
    },
    // bundler plugins
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        hash: true,
        template: path.resolve('./private/index.html'),
        filename: path.resolve('./public/index.html')
      }),
      new HtmlBeautifyPlugin({
        config: {
          html: {
            indent_size: 2,
            indent_with_tabs: false,
            indent_inner_html: true
          }
        }
      }),
      new MiniCssExtractPlugin({
        filename: "css/index.css",
      })
    ],
    // js output
    output: {
      path: path.resolve(publicDir),
      filename: 'js/index.js'
    },
  }

  // init env config
  if (argv.mode === 'development') {
    config.performance = {
      hints: false
    },
    config.devtool = 'source-map';
    config.devServer = {
      open: true,
      port: 3001
    }
  } else if (argv.mode === 'production') {
    // production config additions
  }

  // return config
  return config;

};