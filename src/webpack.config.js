//webpack.config.js
const path = require('path')
const webpack = require('webpack')

module.exports = {
    resolve: {
        fallback: { "crypto": require.resolve("crypto-browserify") }
    }
}

// Polyfill fix using node-polyfill-webpack-plugin
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
// module.exports = {
//     entry: './src/index.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js'
//     },
//     plugins: [
//         new NodePolyfillPlugin()
//     ]
// }
