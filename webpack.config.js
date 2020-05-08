const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// process.env.NODE_ENV ='production'
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
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-preset-env')()
                            ]
                        }
                    },
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
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-preset-env')()
                            ]
                        }
                    },
                    'less-loader',
                ]
            },

            //解析css、less等文件中img的url地址
            {
               test:/\.(png|jpg|gif|jpeg)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options: {
                            limit:1024*8,//小于这个数值则已base64的方式存在
                            name:'[name].[hash:5].[ext]',
                            publicPath: '../',
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'css/build.css'
        })

    ],

    mode: 'development'

}
