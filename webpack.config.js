

var path = require('path'),
    HtmlPlugin = require('html-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin');

module.exports = env => {

    let mode = env ? env.mode : 'development',
        prod = mode == 'production';

    return {
        mode: 'development',
        entry: {
            EaseUrl: './src/parse.ts'
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: `[name].js`,
            libraryTarget: 'umd',
            library: 'EaseUrl'
        },
        resolve: {
            extensions: ['webpack.js', '.web.js', '.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'source-map-loader'
                }
            ]
        },
        devtool: prod ? '' : 'source-map',
        mode: mode
    }
};