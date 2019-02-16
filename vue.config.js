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
      include: [
        /offline\.png$/,
        /\.(js|css|json|html|svg|ico|txt|xml|map)/,
        /_redirects/
      ],
      importScripts: ['/js/extend-sw.js'],
      navigateFallback: '/index.html',
      skipWaiting:true,
      clientsClaim: true,
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
