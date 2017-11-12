/**
 * Created by Admin on 2017/11/12.
 */
import empty from './empty.vue'
// 这里是重点
const myEmpty = {
    install: function(Vue){
        Vue.component('myEmpty',empty)
    }
}

// 导出组件
export default myEmpty