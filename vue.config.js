// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
module.exports = {
  //cli提供的属性
  outputDir: './build',
  // publicPath:'/',
  //开发环境中url跨域
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'http://152.136.185.210:5000',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // },
  configureWebpack: {
    resolve: {
      alias: {
        component: '@/component'
      }
    }
  }
  // configureWebpack: (config) => {
  //   //  webpack 配置方式二
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // }
  // chainWebpack: (config) => {
  //   //webpack配置方式三  链式修改webpack配置
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
