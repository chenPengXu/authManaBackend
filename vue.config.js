const isOnline = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: './',
  outputDir: './dist',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].minify = isOnline
        // args[0].externals = {
        //   'vue': 'Vue',
        //   'vue-router': 'Router'
        // }
        return args
      })
  },
  devServer: {
    proxy: 'http://localhost:8080',
    disableHostCheck: true
  },
  productionSourceMap: true,
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      // 'ivew': 'iview',
    },
  }
}
