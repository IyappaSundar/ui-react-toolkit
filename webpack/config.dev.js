var webpack = require('webpack');

var webpackConfig = require('./config.base');

/*webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:3000");*/

/*webpackConfig.entry.app.unshift("webpack/hot/dev-server");*/

webpackConfig.devtool = "eval";

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        DEBUG: true,
        PRODUCTION: false
    })
);

/*webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);*/

module.exports = webpackConfig;


