module.exports = {
    // 选项...
    publicPath:process.env.NODE_ENV === 'development'?'':'/home/distN',
    outputDir:'dist',
    assetsDir:'',
    indexPath: 'index.html',
    lintOnSave: true,
    productionSourceMap: false,
    devServer: {// 环境配置
        host: 'localhost',
        port: 1234,
        https: false,
        hotOnly: false,
        open: false, //配置自动启动浏览器
        proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
            // '/api': { //辉哥
            //     target: 'http://192.168.8.20:9440',
            //     pathRewrite: { '^/api': '' },
            //     ws: true,
            //     changeOrigin: true,
            //     secure: false
            // },
            '/api': { //辉哥
                target: 'http://192.168.8.20:9440',
                pathRewrite: { '^/api': '' },
                ws: true,
                changeOrigin: true,
                secure: false
            },
            '/lw': { //老王
                target: 'http://192.168.8.20:9220',
                pathRewrite: { '^/lw': '' },
                ws: true,
                changeOrigin: true,
                secure: false
            },
            '/xb': { //小白
                target: 'http://192.168.8.20:9220',
                pathRewrite: { '^/xb': '' },
                ws: true,
                changeOrigin: true,
                secure: false
            }
        }
    },
}