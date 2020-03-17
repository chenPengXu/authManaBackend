module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // ['import', {
    //   libraryName: 'iview',
    //   libraryDirectory: 'src/components',
    //   // styleLibraryDirectory: "src/styles/components",
    //   style: false,
    // }, 'iview'],
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
