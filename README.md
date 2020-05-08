**webpack只能识别打包js，json文件进行打包，所以需要一些loader对css、img等其他资源进行转义**

- css的处理,在使用loader的时侯，都是从后往前解析的
- css文件需要:css-loader,style-loader;
- less文件需要：less,less-loader;
- 问题：以上都是把css样式提取到style的js中，我们要把这些样式提取到一个单独的css文件中
- 提取单独css文件使用：mini-css-extract-plugin
- css的兼容性问题，不同的浏览器要加上不同的前缀
- 需要使用到的postcss





