const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

//css公共loader提取
const commonCssLoader = [
    'style-loader',
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
    devtool: 'inline-source-map',
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

           
        ]
    },

    plugins: [],

    mode: 'development',

    devServer: {
        contentBase: path.resolve(__dirname, '..','build'),
        compress: true,
        port: 2000,
        open: true,
        hot: true,//启用HRM功能
    }
}

module.exports =merge(common,configuration) 
