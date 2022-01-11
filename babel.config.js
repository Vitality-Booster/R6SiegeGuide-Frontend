module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  // Was trying to use it in order to get rid of hints while the prod build
  // But this should be put to "webpack.config.js" that i seem not to have have
  // performance: {
  //   maxEntrypointSize: 512000,
  //   maxAssetSize: 512000
  // },
}
