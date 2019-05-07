module.exports = {
    // 选项...
    publicPath:'',
    outputDir:'dist',
    assetsDir:'',
    indexPath: 'index.html',
    lintOnSave: true,
    productionSourceMap: true,
    devServer: {// 环境配置
        host: 'localhost',
        port: 1235,
        https: false,
        hotOnly: false,
        open: false, //配置自动启动浏览器
        // proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
        //     '/api': {
        //         target: '<url>',
        //         ws: true,
        //         changeOrigin: true
        //     },
        //     '/foo': {
        //         target: '<other_url>'
        //     }
        // }
    },
}