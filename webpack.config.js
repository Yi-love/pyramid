'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode:'development',
    entry:{
        index:'./client/index.js'
    },
    module:{
        rules:[
        {
            test:/\.js$/,
            exclude: /node_modules/,
            loader:'babel-loader' //js编译 依赖.babelrc
        },
        {
            test: /\.s?[ac]ss$/,//postcss-loader 依赖 postcss-config.js
            use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader'] 
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader'
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader'
        }]
    },
    watch: true,
    watchOptions: { //不监听目录
        ignored: /node_modules/
    },
    output:{
        filename:'[name].js?v=[hash]',
        path:path.resolve(__dirname , './static/dist'),
        publicPath:'./dist/'
    },
    devtool: '#source-map',
    plugins:[
        new CleanWebpackPlugin([
            path.resolve(__dirname , './dist')
        ]),
        new webpack.optimize.SplitChunksPlugin({
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                'tui-chart': {
                    test: /[\\/]node_modules[\\/]tui-chart[\\/]/,
                    priority: -10,
                    name: 'tui-chart'
                }
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: './../index.html',
            chunks: ['tui-chart' , 'index'],
            template: path.resolve(__dirname , './client/index.html')
        }),
        new MiniCssExtractPlugin({ //提取css公共代码
            filename:'[name].css?v=[contenthash]'
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};