var webpack = require('webpack');

var webpackConfig = require('./config.base');

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        DEBUG: false,
        PRODUCTION: true,
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    })
);

webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin()
);

webpackConfig.plugins.push(
   new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        },
        output: {
            comments: false
        }
    })
);

webpackConfig.plugins.push(
    new webpack.optimize.AggressiveMergingPlugin()
);

module.exports = webpackConfig;