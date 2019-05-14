module.exports = {
    // 选项...
<<<<<<< HEAD
    publicPath:'',
=======
    publicPath:process.env.NODE_ENV === 'development'?'':'/home/distN',
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
    outputDir:'dist',
    assetsDir:'',
    indexPath: 'index.html',
    lintOnSave: true,
<<<<<<< HEAD
    productionSourceMap: true,
=======
    productionSourceMap: false,
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
    devServer: {// 环境配置
        host: 'localhost',
        port: 1234,
        https: false,
        hotOnly: false,
        open: false, //配置自动启动浏览器
        proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
<<<<<<< HEAD
            '/api': {
                target: 'http://192.168.8.104:9440',
                // target: 'http://192.168.8.104:9102',
=======
            '/api': { //辉哥
                target: 'http://192.168.8.20:9440',
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
                pathRewrite: { '^/api': '' },
                ws: true,
                changeOrigin: true,
                secure: false
            },
<<<<<<< HEAD
            '/lw': {
                target: 'http://192.168.8.104:9102',
=======
            '/lw': { //老王
                target: 'http://192.168.8.20:9102',
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
                pathRewrite: { '^/lw': '' },
                ws: true,
                changeOrigin: true,
                secure: false
            },
<<<<<<< HEAD
            // '/hui': {
            //     target: 'http://192.168.8.104:9440',
            //     pathRewrite: { '^/hui': '' },
            //     ws: true,
            //     changeOrigin: true,
            //     secure: false
            // },
            // '/foo': {
            //     target: '<other_url>'
            // }
=======
            '/xb': { //小白
                target: 'http://192.168.8.20:9330',
                pathRewrite: { '^/xb': '' },
                ws: true,
                changeOrigin: true,
                secure: false
            }
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
        }
    },
}