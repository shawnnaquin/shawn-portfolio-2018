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
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      importWorkboxFrom: "local",
      importScripts: ['/js/extend-sw.js']
      // swSrc: "src/service-worker.js"r
      // ...other Workbox options...
    }
  }
};
