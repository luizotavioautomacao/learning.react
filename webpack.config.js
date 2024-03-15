const path = require('path');

module.exports = {
    module: 'development',
    entry: './src/main/index.tsx',
    output: {
        path: path.join(__dirname, '/dist/js'),
        publicPath: '/dist/js',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
}