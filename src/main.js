import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import vconsole from 'vconsole'
import "./assets/font/font1/iconfont.css"


//reset css inport
import './assets/css/reset.css'

import './lib/adaptive'
import 'mint-ui/lib/style.css'
import { Toast } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';

import { DatetimePicker } from 'mint-ui';

import { TabContainer, TabContainerItem } from 'mint-ui';

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

Vue.component(DatetimePicker.name, DatetimePicker);

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// import MintUI from 'mint-ui'
//
// Vue.use(MintUI);

// Vue.$toast = Vue.prototype.$toast = Toast;
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
