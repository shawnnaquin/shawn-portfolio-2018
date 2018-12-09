module.exports = {
  baseUrl: "/",
  lintOnSave: undefined,
  pluginOptions: {
    critical: {
      width: 375,
      height: 565
    }
  },
  pwa: {
    // configure the workbox plugin
    // workboxPluginMode: "InjectManifest",
    appleMobileWebAppCapable: true,
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      skipWaiting: true,
      clientsClaim:true,
      importWorkboxFrom: "local",
      importScripts: ['/js/extend-sw.js'],
      navigateFallback: "/index.html"
      // swSrc: "src/service-worker.js"
      // ...other Workbox options...
    }
  }
};
