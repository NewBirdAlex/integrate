let install = (vue, options) => {
    vue.prototype.$config = {
        path: 'http://192.168.0.121:8888'
        // path: 'http://192.168.0.114:8888'
        // path: '120.25.177.192'
        // path:'http://tm.mefelive.com/tmkl'
    }
}

export const config = install