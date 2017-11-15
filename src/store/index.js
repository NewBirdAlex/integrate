import Vue from 'vue'
import Vuex from "vuex"
import axios from '../lib/myAxios'


Vue.use(Vuex)

const state = {
    showLoading:false,
    userMessage:{},
    baseInf:{},
    spOrder:{}
}

const mutations = {
    showLoading(state){
        state.showLoading = true;
    },
    getLocalUserMessage(state){
        state.userMessage = JSON.parse(localStorage.getItem('HXuserMessage'));
    },
    hideLoading(state){
        state.showLoading = false;
    },
    saveSporder(state,data){
        console.log(data)
        state.spOrder=data
    },
    getuserBaseInf(state){

        axios.post('/user/getUserInfo', {
            getInfoUserId:state.userMessage.userId
        })
            .then(function (response) {

                if(response.data.code=="200000"){
                    let data =JSON.parse(JSON.stringify(response.data.data)) ;
                    Vue.nextTick(()=>{
                        Vue.set(state,'baseInf', data)

                    })

                    console.log(response.data.data)
                    console.log( state.baseInf)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}



const actions = {
    showLoading:({commit})=>commit('showLoading'),
    hideLoading:({commit})=>commit('hideLoading'),
    saveSporder:({commit})=>commit('saveSporder'),
    getuserBaseInf:({commit})=>commit('getuserBaseInf')
}


const getters = {

    showLoading:state => state.showLoading,
    userMessage:state => state.userMessage,
    spOrder:state => state.spOrder,
    baseInf:state=>state.baseInf
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})