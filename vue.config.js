// const path = require('path')
module.exports = {
  //cli提供的属性
  // outputDir: "./build",
  // publicPath:'/',
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views'
      }
    }
  }
  // configureWebpack: (config) => {   //  webpack 配置方式二
  //   config.resolve.alias = {
  //     "@": path.resolve(__dirname, "src"),
  //     views: "@/views"
  //   };
  // }
  // chainWebpack: (config) => {    //webpack配置方式三  链式修改webpack配置
  //   config.resolve.alias.set("@", path.resolve(__dirname, "src"))
  //     .set("components", "@/components");
  // }
}
