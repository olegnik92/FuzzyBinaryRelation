/// <binding ProjectOpened='Watch - Development' /> 

"use strict";

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var rimraf = require('rimraf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
require('es6-promise').polyfill();

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: "./main.js",
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-object-assign', 'transform-object-rest-spread'],
                    presets: ['es2015']
                },
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader?resolve url')
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            DEBUG: true,
        }),
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            title: 'Образ нечеткого множества'
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new WebpackNotifierPlugin()
    ],
    stylus: {
        use: [require('nib')()],
        import: ['~nib/lib/nib/index.styl']
    },
    devtool: 'source-map'
};