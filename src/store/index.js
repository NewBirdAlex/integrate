import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
    count:0,
    showLoading:false,
    userMessage:{}
}

const mutations = {
    increment(state){
        state.count++
    },
    decrement(state){
        state.count--
    },
    showLoading(state){
        state.showLoading = true;
    },
    getLocalUserMessage(state){
        state.userMessage = JSON.parse(localStorage.getItem('HXuserMessage'));
    },
    hideLoading(state){
        state.showLoading = false;
    }
}



const actions = {
    increment:({commit})=>commit('increment'),
    decrement:({commit})=>commit('decrement'),
    showLoading:({commit})=>commit('showLoading'),
    hideLoading:({commit})=>commit('hideLoading'),
    incrementIfOdd:({commit,state})=>{
        if((state.count+1)%2==0){
            commit("increment")
        }
    },
    incrementAsync ({ commit }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('increment')
                resolve()
            }, 1000)
        })
    }
}


const getters = {
    evenOrOdd:state => state.count % 2 === 0 ? 'even' : 'odd',
    showLoading:state => state.showLoading,
    userMessage:state => state.userMessage
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})