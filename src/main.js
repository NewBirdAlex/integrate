import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import vconsole from 'vconsole'
import "./assets/font/font1/iconfont.css"
import "./assets/font/font2/iconfont.css"


//reset css inport
import './assets/css/reset.css'

import './lib/adaptive'
//element-ui -------------------------------------------------
import {Upload,Dialog} from 'element-ui'
Vue.use(Upload);
Vue.use(Dialog);
// Vue.component(Upload.name, Upload)
// Vue.component(Dialog.name, Dialog)
//element-ui -------------------------------------------------
//mint-ui --------------------------------------------
import 'mint-ui/lib/style.css'
// import { Toast } from 'mint-ui';
// import { Swipe, SwipeItem } from 'mint-ui';
//
// import { DatetimePicker } from 'mint-ui';
//
// import { TabContainer, TabContainerItem } from 'mint-ui';
//
// Vue.component(TabContainer.name, TabContainer);
// Vue.component(TabContainerItem.name, TabContainerItem);
//
// Vue.component(DatetimePicker.name, DatetimePicker);
//
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
import MintUI from 'mint-ui'
//
Vue.use(MintUI);

// Vue.$toast = Vue.prototype.$toast = Toast;
//mint-ui --------------------------------------------

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
