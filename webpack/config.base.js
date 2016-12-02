var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpack_config = {
    entry: {
        'ui-react-toolkit' : ['classnames','./src/widgets/index.js']
    },
    output: {
        path: './dist',
        filename: '[name]-bundle.js',
        "library": "UI_React_Toolkit",
        "libraryTarget": "umd"
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        }
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules)/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(png|gif|jpg)/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
                loader: "url-loader?limit=8192"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name]-bundle.css")/*,
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-bundle.js')*/
    ]
};


module.exports = webpack_config;