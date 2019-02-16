module.exports = {
  baseUrl: "/",
  lintOnSave: undefined,
  productionSourceMap: false,
  pwa: {
    // configure the workbox plugin
    appleMobileWebAppCapable: true,
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      importWorkboxFrom: "local",
      exclude: [/(.*?)/],
      importScripts: ['/js/extend-sw.js'],
      navigateFallback: '/',
      directoryIndex: "index.html",
      runtimeCaching: [{
          // Match any same-origin request that contains 'api'.
          urlPattern: /(.*?)/,
          handler: 'cacheFirst',
          options: {
            cacheName: '2019-portfolio-shawn'
          },
      }]
    }
  }
};
