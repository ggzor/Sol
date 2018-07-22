const path = require('path')

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
    }
}

module.exports = (env, argv) => {
    if (argv === undefined || argv.mode !== 'production') {
        config.devtool = 'inline-source-map'
        config.mode = 'development'
    }

    return config
}