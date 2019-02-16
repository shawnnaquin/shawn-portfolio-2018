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
        }, {
          // To match cross-origin requests, use a RegExp that matches
          // the start of the origin:
          urlPattern: new RegExp('^https://cors\.example\.com/'),
          handler: 'staleWhileRevalidate',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
    }
  }
};
