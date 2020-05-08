const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
;
module.exports = {
    entry: {
        index: './src/pages/index.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname + '/build')
    },

    module: {
        rules: [
            //解析css
            {
                test: /\.css$/i,
                //把css提取出来一个单独的文件
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    'css-loader'
                ]

            },
            //解析less
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),

        new MiniCssExtractPlugin('index.css')

    ],

    mode: 'development'

}
