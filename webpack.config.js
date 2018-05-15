'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(options , articles = []){
    return {
        mode: options.mode,
        entry:{
            pyramid:path.resolve(__dirname , './client/index.js')
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
        watch: !!options.watch || false,
        watchOptions: { //不监听目录
            ignored: /node_modules/
        },
        output:{
            filename: options.hashFile ? '[name]-[hash].js' : '[name].js?v=[hash]',
            path:options.cache,
            publicPath:options.url
        },
        devtool: options.mode === 'development' ? '#source-map' : false,
        plugins:[
            options.autoClear ? new CleanWebpackPlugin([options.cache]) : ()=>{},
            new webpack.DefinePlugin({
                ARTICLES: JSON.stringify(articles || [])
            }),
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
            options.mode === 'development' ? ()=>{} :
            new UglifyJsPlugin({
                uglifyOptions:{
                    compress: {
                        warnings: false,
                        drop_console: true,
                    }
                }
            }),
            new HtmlWebpackPlugin({
                inject: true,
                filename: options.filename,
                blogName: options.blogName,
                chunks: ['tui-chart' , 'pyramid'],
                template: path.resolve(__dirname , './client/index.html')
            }),
            new MiniCssExtractPlugin({ //提取css公共代码
                filename: options.hashFile ? '[name]-[contenthash].css' : '[name].css?v=[contenthash]'
            }),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    };
}