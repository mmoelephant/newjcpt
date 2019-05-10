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
        port: 1234,
        https: false,
        hotOnly: false,
        open: false, //配置自动启动浏览器
        proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
            '/api': {
                target: 'http://192.168.8.104:9440',
                pathRewrite: { '^/api': '' },
                ws: true,
                changeOrigin: true,
                secure: false
            },
            // '/foo': {
            //     target: '<other_url>'
            // }
        }
    },
}