module.exports = {
    /*devServer:{
        open:true,
        proxy:{
            "/api":{
                target:"",
                changeOrigin: true,
                pathRewrite:{
                    "^/api":"/"
                }
            }
        }
    }*/
    devServer: {
        open:true,
        proxy: {
            '/api': {
                target: 'https://music.163.com/',
                ws:true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api':'/'
                }
            }
        }
    }
};
