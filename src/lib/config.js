let install = (vue, options) => {
    vue.prototype.$config = {
        path: 'http://192.168.0.121:8888'
        // path: 'http://192.168.0.114:8888'
        // path: 'http://120.25.177.192/jfbApi'//test
        // path:'https://jfb.vshi5.com/jfbApi'//正式
    }
}

export const config = install