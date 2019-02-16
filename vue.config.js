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
      exclude: [/\.(webp|png|jpe?g)$/],
      importScripts: ['/js/extend-sw.js'],
      navigateFallback: '/index.html',
      runtimeCaching: [{
          // Match any same-origin request that contains 'api'.
          urlPattern: /\.(webp|png|jpe?g)$/,
          handler: 'cacheFirst',
          options: {
            cacheName: '2019-portfolio-shawn'
          },
      }]
    }
  }
};
