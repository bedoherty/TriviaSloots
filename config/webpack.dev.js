const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    mode: "development",
    devtool: "source-map",
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".jsx" ],
        plugins: [
            new TsconfigPathsPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            }
        ]
    },
    output: {
        path: resolvePath("build")
    },
    devServer: {
        contentBase: resolvePath("build"),
        hot: true,
        open: true,
        port: 3000,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolvePath("src/Templates/index.html")
        })
    ]
}