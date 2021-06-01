const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  entry: './assets/index.js',
  module: {
    rules: [
      // Compile CSS
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          // Extract CSS into its own file
          MiniCssExtractPlugin.loader,

          // Run CSS loader
          {
            loader: "css-loader",
            options: {
              // how many loaders before css-loader should be applied
              importLoaders: 2,

              // don't do weird webpack things to the urls
              url: false,
            },
          },

          // Run postcss for adding browser prefixes
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // can add more options in the {}
                plugins: [["autoprefixer", {}]],
              },
            },
          },

          // Compiles Sass to CSS
          "sass-loader",
        ],
      },

      // Compile SVGs
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: "../images/sprite.svg"
        }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/[name].css"
    }),
    new SpriteLoaderPlugin()
  ],
  output: {
    path: path.resolve(__dirname, '_site/assets/js'),
    filename: 'main.js',
  },
};
