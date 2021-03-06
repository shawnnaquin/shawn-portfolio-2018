module.exports = {
  baseUrl: "/",
  lintOnSave: undefined,
  productionSourceMap: false,
  pwa: {
    appleMobileWebAppCapable: true,
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      importWorkboxFrom: "local",
      include: [
        /\.(js|css|json|html|svg|txt|xml|map|ico)/,
        /mobile\.(vert|horiz)/,
        /_redirects/
      ],
      importScripts: ['/js/extend-sw.js'],
      navigateFallback: '/index.html',
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [{
          urlPattern: /^((?!mobile\.(vert|horiz)).)*(png|jpe?g|webp)(\?player)?$/,
          handler: 'cacheFirst',
          options: {
            cacheName: '2019-portfolio-shawn'
          },
      }]
    }
  }
};
