import axios from 'axios'
import store from '../store/index.js'
import router from '../router'


// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config){
    // 处理请求之前的配置
    store.dispatch('showLoading');
    config.data.token=store.state.userMessage.token;
    config.data.userId=store.state.userMessage.userId;
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
    console.log(response)
    //重新登录
    if(response.data.code=="400000"){
        router.push('/login');
    }
    return response;
}, function (error){
    // 处理响应失败
    store.dispatch('hideLoading');
    return Promise.reject(error);
});

axios.defaults.baseURL = 'http://192.168.0.121:8888';

export default axios