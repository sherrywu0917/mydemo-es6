const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        index : "./src/js/index.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
       // new HtmlWebpackPlugin({
       //          inject: false,
       //          template: 'template.html',
       //          filename: 'index.html'
       //      }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
              sourceMap: false,
              mangle: {
                screw_ie8: false //是否删除IE8兼容代码
              },
              output: {
                comments: false,
                screw_ie8: false
              },
              compress: {
                warnings: false,
                screw_ie8: false
              }
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname),
                "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test:/\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader', options: {minimize: true}},
                            {loader: 'postcss-loader', options: {
                                  plugins: function () {
                                      return [
                                          require('autoprefixer')
                                      ];
                                  }
                              }
                            },
                            {loader: 'sass-loader'}]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader', options: {minimize: true}},
                            {loader: 'postcss-loader', options: {
                                  plugins: function () {
                                      return [
                                          require('autoprefixer')
                                      ];
                                  }
                              }
                            }]
                })
            },
            {test: /\.(png|jpg|gif|TTF|eot)$/, use: "url-loader?limit=8192&name=image/[name].[ext]"}
        ]
    }
}
