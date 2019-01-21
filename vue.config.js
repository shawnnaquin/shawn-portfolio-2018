module.exports = {
  baseUrl: "/",
  lintOnSave: undefined,
  productionSourceMap: false,
  pluginOptions: {
    critical: {
      width: 375,
      height: 565
    }
  },
  pwa: {
    // configure the workbox plugin
    appleMobileWebAppCapable: true,
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      importWorkboxFrom: "local",
      importScripts: ['/js/extend-sw.js']
    }
  }
};
