// import VUE_APP_BASE_URL from '.env.development.local';

// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            "^/api": {
                target: process.env.VUE_APP_BASE_URL,
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: { "^/api": "" }
            }
        }
    }
}
// options...