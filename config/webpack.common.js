const paths = require('./paths')
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')

module.exports = {
    // Where webpack looks to start building the bundle
    entry: [paths.src + '/index.js'],

    // Where webpack outputs the assets and bundles
    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@src': path.resolve(__dirname, '../src'),
        },
    },

    // Customize the webpack build process
    plugins: [
        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                },
            ],
        }),

        // Generates an HTML file from a template
        // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            favicon: paths.src + '/images/favicon.png',
            template: paths.public + '/index.html', // template file
            filename: 'index.html', // output file
            inject: 'body',
            minify: {
                // 压缩HTML文件
                removeComments: true, //去除注释
                collapseWhitespace: true, //去除空格
            },
        }),

        /* 多线程编译*/
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory=true'],
        }),
    ],

    // Determine how modules within the project are treated
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            { test: /\.js|jsx$/, exclude: /node_modules/, use: ['happypack/loader?id=babel'] },

            // Styles: Inject CSS into the head with source maps
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },

            // Images: Copy image files to build folder
            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

            // Fonts and SVGs: Inline files
            { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
        ],
    },
}
