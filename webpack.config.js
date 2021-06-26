const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = env => {
    return {
        entry: {
            app: "./src/index.ts"
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js"
        },
        devtool: "inline-source-map",
        mode: env.mode,
        target: "node",
        node: {
            __dirname: false,
            __filename: false
        },
        externals: [
            nodeExternals()
        ],
        module: {
            rules: [{
                test: /\.(ts|js)?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/env",
                            ["@babel/preset-typescript", { "onlyRemoveTypeImports": true }]
                        ],
                        plugins: [
                            ["@babel/plugin-transform-runtime", {"corejs": 3, "regenerator": true}],
                            ["babel-plugin-transform-typescript-metadata"],
                            ["@babel/proposal-decorators", { "legacy": true }],
                            ["@babel/proposal-class-properties", { "loose" : true }],
                            ["@babel/proposal-private-methods", { "loose": true }],
                            ["@babel/proposal-object-rest-spread"]
                        ]
                    }
                },
                exclude: /node_modules/
            }]
        },
        resolve: {
            extensions: [".ts", ".js", ".json"],
            alias: {
                "@src": path.join(__dirname, "src")
            }
        }
    };
};
