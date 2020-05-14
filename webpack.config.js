const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');//css文件进行压缩
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// process.env.NODE_ENV ='production'

//css公共loader提取
const commonCssLoader = [
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
    }
]

module.exports = {
    entry: {
        index: './src/pages/index.js'
    },

    output: {
        filename: '[name].[hash:10].js',
        path: path.resolve(__dirname + '/build')
    },

    module: {
        rules: [
            //解析css
            {
                test: /\.css$/i,
                //把css提取出来一个单独的文件
                // use: [...commonCssLoader]
                use: ['style-loader', 'css-loader']

            },
            //解析less
            {
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        // '@babel/preset-env'
                        [
                            '@babel/preset-env',//预设：指示babel做怎么样的处理
                            {
                                useBuiltIns: 'usage',
                                corejs: {version: 3},
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17',
                                }
                            }
                        ]
                    ]
                }
            },

            //解析css、less等文件中img的url地址
            {
                test: /\.(png|jpg|gif|jpeg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 8,//小于这个数值则已base64的方式存在
                            name: '[name].[hash:5].[ext]',
                            outputPath: 'imgs',
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },

            {   //把一些不需要打包的资源原封不动的放进去
                exclude: /\.(js|html|css|less|png|jpg|gif|jpeg)/,
                loader: 'file-loader',
                options: {
                    outputPath: 'media',
                    name: '[name].[ext]'
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: {
                // collap
            }
        }),

        new MiniCssExtractPlugin({
            filename: 'css/build.css'
        }),

        new OptimizeCssAssetsWebpackPlugin(),



    ],

    mode: 'development',

    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 2000,
        open: true,
        hot: true,//启用HRM功能，
    }
}
