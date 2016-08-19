var webpack = require('webpack');
var path = require('path');
//var bootstrap = require("bootstrap");

module.exports = {
    entry: './src/main.js',
    output: {
        path: './dist',
        publicPath: 'dist/',
        filename: 'build.js'
    },
    //配置自动刷新,如果打开会使浏览器刷新而不是热替换
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        grogress: true
    },
    module: {
        loaders: [
            //转化ES6语法
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            //解析.vue文件
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            //图片转化，小于8K自动转化为base64的编码
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf$/,
                loader: "file-loader"
            }, {
                test: /\.eot$/,
                loader: "file-loader"
            }, {
                test: /\.svg$/,
                loader: "file-loader"
            }
        ]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    },
    //这里用于安装babel，如果在根目录下的.babelrc配置了，这里就不写了
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    // 如果要全部都用jQuery，就用插件的方法加载jQuery，代码在下面👇
    plugins: [
        /*new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })*/
    ],
    resolve: {
        // require时省略的扩展名，如：require('app') 不需要app.js
        extensions: ['', '.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            filter: path.join(__dirname, './src/filters'),
            components: path.join(__dirname, './src/components')
        }
    }
};