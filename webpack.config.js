const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

console.log(path.join(__dirname, 'dist'))
module.exports = {
    entry: {
      index : "./src/js/index.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].bundle.js",
        publicPath: '/dist/'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './src/',
        index: 'index.html',
        port: 9010
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
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
                    use: [ { loader: 'css-loader'},
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
