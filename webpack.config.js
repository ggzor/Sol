const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const cssLoader = {
    loader: 'css-loader',
    options: {
        minimize: false,
        sourceMap: true
    }
};

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
};

const scssLoading = (firstLoaders) => ({
    test: /\.(sc|sa|c)ss$/,
    use: [
        ...firstLoaders,
        cssLoader,
        sassLoader
    ]
});

const config = {
    entry: './src/index.ts',
    module: {
        rules: [{
            use: 'ts-loader',
            test: /\.tsx?$/,
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname)
    },
    serve: {
        hotClient: {
            host: {
                client: '*',
                server: '0.0.0.0',
            }
        }
    },
    plugins: []
};

module.exports = (_, argv) => {
    const devMode = argv ? argv.mode !== 'production' : true;
    const analyze = argv ? argv.analyze : false;

    if (analyze) {
        config.plugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: true,
                analyzerMode: 'static'
            })
        );
    }

    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    );

    if (devMode) {
        config.devtool = 'inline-source-map';
        config.mode = 'development';
        config.module.rules.push(scssLoading(['style-loader']));
    } else {
        cssLoader.options.minimize = true;
        cssLoader.options.sourceMap = false;
        sassLoader.options.sourceMap = false;

        config.module.rules.push(scssLoading([MiniCssExtractPlugin.loader]));

        config.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        };
    }

    return config;
};