import Vue from 'vue'
import Router from 'vue-router'
import VueRouterTitle from 'vue-router-title'

const Home = () => import('../pages/Home.vue');//首页
const List = () => import('../pages/list.vue');
const Upload = () => import('../pages/upload.vue');
const Count = () => import('../pages/count.vue');
const Record = () => import('../pages/record.vue');//申请记录
const OrderDetail = () => import('../pages/orderDetail.vue');//订单详情
const Praise = () => import('../pages/praise.vue');//领导表扬
const ManagePraise = () => import('../pages/managePraise.vue');//管理奖扣
const Apply = () => import('../pages/apply.vue');//管理奖扣
const SpList = () => import('../pages/spList.vue');//审批列表
const SpDetail = () => import('../pages/spDetail.vue');//审批
const Work = () => import('../pages/work.vue');//工作台
const PublicMission = () => import('../pages/publicMission.vue');//发布任务
const Announcement = () => import('../pages/announcement.vue');//发布公告
const AnnouncementList = () => import('../pages/announcementList.vue');//公告列表
const Person = () => import('../pages/person.vue');//个人中心
const Board = () => import('../pages/board.vue');//个人公告
const Infor = () => import('../pages/infor.vue');//个人信息
const BaseInfor = () => import('../pages/baseInfor.vue');//基本信息
const MissionList = () => import('../pages/missionList.vue');//我的任务
const PersonalData = () => import('../pages/personalData.vue');//个人资料
const ManageDiary = () => import('../pages/manageDiary.vue');//管理日记
const Structure = () => import('../pages/structure.vue');//组织架构
const Love = () => import('../pages/love.vue');//爱心点赞
const LoveRank = () => import('../pages/loveRank.vue');//爱心点赞

Vue.use(Router);
const router = new Router({
    routes: [
        {
            path: '/',
            name: '',
            component: Home,
            meta:{
                title:'我的首页'
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta:{
                title:'我的首页'
            }
        },
        {
            path: '/managePraise',
            name: 'ManagePraise',
            component: ManagePraise,
            meta:{
                title:'管理奖扣'
            }
        },
        {
            path: '/apply',
            name: 'Apply',
            component: Apply,
            meta:{
                title:'积分申请'
            }
        },
        {
            path: '/loveRank',
            name: 'LoveRank',
            component: LoveRank
        },
        {
            path: '/love',
            name: 'Love',
            component: Love
        },
        {
            path: '/structure',
            name: 'Structure',
            component: Structure
        },
        {
            path: '/manageDiary',
            name: 'ManageDiary',
            component: ManageDiary
        },
        {
            path: '/personalData',
            name: 'PersonalData',
            component: PersonalData
        },
        {
            path: '/missionList',
            name: 'MissionList',
            component: MissionList
        },
        {
            path: '/baseInfor',
            name: 'BaseInfor',
            component: BaseInfor
        },
        {
            path: '/infor',
            name: 'Infor',
            component: Infor
        },
        {
            path: '/board',
            name: 'Board',
            component: Board
        },
        {
            path: '/person',
            name: 'Person',
            component: Person
        },
        {
            path: '/publicMission',
            name: 'PublicMission',
            component: PublicMission
        },
        {
            path: '/announcement',
            name: 'Announcement',
            component: Announcement,
            meta:{
                title:'发布公告'
            }
        },
        {
            path: '/announcementList',
            name: 'AnnouncementList',
            component: AnnouncementList,
            meta:{
                title:'企业公告'
            }
        },
        {
            path: '/spList',
            name: 'SpList',
            component: SpList
        },
        {
            path: '/spDetail',
            name: 'SpDetail',
            component: SpDetail
        },
        {
            path: '/record',
            name: 'Record',
            component: Record
        },
        {
            path: '/work',
            name: 'Work',
            component: Work,
            meta:{
                title:'工作台'
            }
        },
        {
            path: '/praise',
            name: 'Praise',
            component: Praise
        },
        {
            path: '/orderDetail',
            name: 'OrderDetail',
            component: OrderDetail
        },
        {
            path: "/list",
            name: "list",
            component: List
        },
        {
            path: "/upload",
            name: "upload",
            component: Upload
        },
        {
            path: "/count",
            name: "count",
            component: Count
        }
    ]
})
Vue.use(VueRouterTitle,{router});

export default router
