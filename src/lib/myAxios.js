import axios from 'axios'
import store from '../store/index.js'


// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config){
    // 处理请求之前的配置
    console.log(config)
    store.dispatch('showLoading');
    return config;
}, function (error){
    // 请求失败的处理
    store.dispatch('hideLoading');
    return Promise.reject(error);
});

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response){
    // 处理响应数据
    store.dispatch('hideLoading');
    return response;
}, function (error){
    // 处理响应失败
    store.dispatch('hideLoading');
    return Promise.reject(error);
});

axios.defaults.baseURL = 'http://192.168.0.121:8888';

export default axios