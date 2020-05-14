const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');//css文件进行压缩
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

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

const configuration = {
    module: {
        rules: [
            //解析css
            {
                test: /\.css$/i,
                //把css提取出来一个单独的文件
                use: [...commonCssLoader]

            },
            //解析less
            {
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            },

           
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/build.css'
        }),
    ],

    mode: 'production',

}

module.exports =merge(common,configuration) 
