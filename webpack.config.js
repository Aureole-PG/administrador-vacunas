const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin= require('mini-css-extract-plugin')

module.exports ={
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js'
    },
    resolve:{
        extensions: ['.js', '.jsx']
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:[
                    {loader: 'babel-loader'}
                ]
            },
            {
                test: /\.html$/,
                use:[{loader: 'html-loader'}]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({template: './public/index.html'}),
        new MiniCssExtractPlugin({filename: 'assets/[name].css'})
    ],
    devServer: {
        compress: true,
        historyApiFallback: true,
        port: 3005,
        host: '192.168.100.10'
    }

}