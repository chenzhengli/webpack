**webpack只能识别打包js，json文件进行打包，所以需要一些loader对css、img等其他资源进行转义**
### 对css文件的处理，在使用loader的时侯，都是从后往前解析的
- css文件需要:css-loader,style-loader;
- less文件需要：less,less-loader;
- 问题：以上都是把css样式提取到style的js中，我们要把这些样式提取到一个单独的css文件中
- 提取单独css文件使用：mini-css-extract-plugin
- css的兼容性问题，不同的浏览器要加上不同的前缀
- 需要使用到的postcss postcss-preset-env postcss-loader
- 对css文件进行压缩：需要--> optimize-css-assets-webpack-plugin

### 对js文件进行兼容性处理
- 需要babel-loader @babel/preset-env @babel/core 以上只是对es6新语法的部分兼容性处理
- 还需要 @babel/polyfill 只需要在入口文件引入即可，但是打包的内容太大
- 要按需加载则需要core-js;配置如下
```$xslt
 {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        presets: [
            // '@babel/preset-env'
            [
                '@babel/preset-env',//预设：只是babel做怎么样的处理
                {
                    useBuiltIns: 'usage',
                    corejs: {version: 3},
                    targets:{
                        chrome:'60',
                        firefox:'60',
                        ie:'9',
                        safari:'10',
                        edge:'17',
                    }
                }
            ]
        ]
    }
},
```
### 对img资源的处理
- 需要使用url-loader

### 对html里面的img资源的处理
- 需要使用html-loader

### 对一些不需要打包资源的处理
- 需要file-loader

### 性能优化
- 开发环境:
    1.css要用style-loader，因为在启用HRM热模块更新功能时，在style-loader中内部已经实现了





