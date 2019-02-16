module.exports = {
  baseUrl: "/",
  lintOnSave: undefined,
  productionSourceMap: false,
  pwa: {
    // configure the workbox plugin
    appleMobileWebAppCapable: true,
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      importScripts: ['/js/extend-sw.js'],
      navigateFallback: '/',
      directoryIndex: "index.html"
    }
  }
};
