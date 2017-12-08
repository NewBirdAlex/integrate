import Vue from 'vue'
import Vuex from "vuex"
import axios from '../lib/myAxios'


Vue.use(Vuex)

const state = {
    showLoading:false,
    userMessage:{},
    baseInf:{},
    spOrder:{},
    subList:[
        {
            name:"发布任务",
            icon:'icon-faburenwu',
            color:'#fa6e77',
            router:'/publicMission'
        },
        {
            name:"领导表扬",
            icon:'icon-zhicheng',
            color:'#fec170',
            router:'/praise/1'
        },
        {
            name:"管理奖扣",
            icon:'icon-guanli',
            color:'#50bee6',
            router:'/praise/2'
        },
        {
            name:"发布公告",
            icon:'icon-gonggao',
            color:'#fd8f64',
            router:'/announcement'
        }
    ],
    thirList:[
        {
            name:"考勤",
            icon:'icon-dingweikaoqin',
            color:'#3da5d0',
            moduleCover:'http://image.vshi5.com/img_jfb/2017/10/13/e4550a4ba9814c519601e2b3c525fb90.png',
            router:'/checkingin',
            show:false
        },
        {
            name:"工作日志",
            icon:'icon-rizhi',
            color:'#84d76f',
            router:'/workDiary',
            show:false
        },
        {
            name:"悬赏任务",
            icon:'icon-renwuxuanshang',
            color:'#feaa3b',
            router:'/missionList/1',
            show:false
        },
        {
            name:"申报积分",
            icon:'icon-daiban',
            color:'#fe6973',
            router:'jfSelect',
            show:false
        },
        {
            name:"公告",
            icon:'icon-gonggao1',
            color:'#feaa3b',
            router:'/announcementList',
            show:false
        },
        {
            name:"爱心点赞",
            //icon:'icon-hongxin',
            icon:'icon-zuanaixinkong',
            color:'#fb3333',
            router:'love',
            show:false
        },
        {
            name:"积分申诉",
            icon:'icon-shensuzhongxin',
            color:'black',
            router:'/shensuList',
            show:false
        },
        {
            name:"自由奖扣",
            icon:'icon-moneychange',
            color:'#5bb3d3',
            router:'/freePrize',
            show:false
        },
        {
            name:"经营哲学",
            icon:'icon-kaohe',
            color:'#8ddfb9',
            router:'/philosophy',
            show:false
        },
        {
            name:"水平考核",
            icon:'icon-kaohe',
            color:'#78c7e3',
            router:'/kpi',
            show:false
        },
        {
            name:"积分商城",
            icon:'icon-lianmengkeyongjifen',
            color:'#fa6e77',
            router:'/shop',
            show:false
        },
        {
            name:"积分抽奖",
            icon:'icon-choujiang',
            color:'#feaa3b',
            router:'/lottery',
            show:false
        },
    ],
    initPage:true,
    mission:false
}

const mutations = {
    showLoading(state){
        state.showLoading = true;
    },
    //获取工作台
    getWorkStation(state){
        if(!state.initPage) {
            state.initPage=false;
            return
        }
        axios.post('/module/listModuleByUser',{})
            .then(function (response) {
                state.thirList.forEach(item=>{
                    for(let i = 0 ; i<response.data.data.length;i++){
                        if(response.data.data[i].moduleTitle==item.name){

                            item.show=response.data.data[i].status==1?true:false;
                            item.moduleCover=response.data.data[i].moduleCover;
                            break;
                        }
                    }
                })
                state.subList.forEach(item=>{
                    for(let i = 0 ; i<response.data.data.length;i++){
                        if(response.data.data[i].moduleTitle==item.name){

                            item.show=response.data.data[i].status==1?true:false;
                            item.moduleCover=response.data.data[i].moduleCover;
                            break;
                        }
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getLocalUserMessage(state){
        state.userMessage = JSON.parse(localStorage.getItem('HXuserMessage'));
    },
    logOut(state){
        state.userMessage = {};
        localStorage.removeItem('HXuserMessage')
    },
    hideLoading(state){
        state.showLoading = false;
    },
    saveSporder(state,data){
        state.spOrder=data
    },
    getuserBaseInf(state){
        axios.post('/user/getUserInfo', {
            getInfoUserId:state.userMessage.userId
        })
            .then(function (response) {

                if(response.data.code=="200000"){
                    let data =JSON.parse(JSON.stringify(response.data.data)) ;
                    state.baseInf=response.data.data;

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
    getWorkStation:({commit})=>commit('getWorkStation'),
    getuserBaseInf:({commit})=>commit('getuserBaseInf'),
    logOut:({commit})=>commit('logOut')
}


const getters = {

    showLoading:state => state.showLoading,
    userMessage:state => state.userMessage,
    spOrder:state => state.spOrder,
    thirList:state => state.thirList,
    mission:state => state.mission,
    baseInf:state=>state.baseInf,
    subList:state=>state.subList,
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})