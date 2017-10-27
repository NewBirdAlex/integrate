import Vue from 'vue'
import Router from 'vue-router'
import VueRouterTitle from 'vue-router-title'

const Home = () => import('../pages/Home.vue');//首页
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
const Checkingin = () => import('../pages/checkingin.vue');//考勤
const ClockIn = () => import('../pages/clockIn.vue');//打卡
const CheckingRec = () => import('../pages/checkingRec.vue');//打卡记录
const Complain = () => import('../pages/complain.vue');//积分申诉
const FreePrize = () => import('../pages/freePrize.vue');//自由奖扣
const Philosophy = () => import('../pages/philosophy.vue');//经济哲学
const PhilosophyDetail = () => import('../pages/philosophyDetail.vue');//经济哲学详情
const Kpi = () => import('../pages/kpi.vue');//水平考核
const KpiDetail = () => import('../pages/kpiDetail.vue');//水平考核详情
const Shop = () => import('../pages/shop.vue');//积分商城
const Product = () => import('../pages/product.vue');//商品
const Exchange = () => import('../pages/exchange.vue');//员工兑换
const ExchangeRec = () => import('../pages/exchangeRec.vue');//兑换记录
const WorkDiary = () => import('../pages/workDiary.vue');//兑换记录
const Menu = () => import('../pages/menu.vue');//写日志菜单
const DiaryCount = () => import('../pages/diaryCount.vue');//日志统计
const Watch = () => import('../pages/watch.vue');//看日记
const Diary = () => import('../pages/diary.vue');//日记详情
const Write = () => import('../pages/write.vue');//写日记

Vue.use(Router);
const router = new Router({
    routes: [
        {
            path: '/',
            redirect:'/home'
        },
        {
            path: '/checkingin',
            // name: 'Checkingin',
            component: Checkingin,
            meta:{
                navShow: false,
                title:'考勤'
            },
            children:[
                {
                    path: '',
                    redirect:'/checkingin/clockIn'
                },
                {
                    path: '/checkingin/clockIn',
                    name:'ClockIn',
                    component: ClockIn
                },
                {
                    path: '/checkingin/checkingRec',
                    name:'CheckingRec',
                    component: CheckingRec
                }
            ]
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta:{
                navShow: true,
                title:'我的首页'
            }
        },
        {
            path: '/workDiary',
            // name: 'WorkDiary',
            component: WorkDiary,
            meta:{
                navShow: false,
                title:'工作日志'
            },
            children:[
                {
                    path:'',
                    redirect:'/workDiary/menu'
                },
                {
                    path:'/workDiary/menu',
                    name: 'Menu',
                    component: Menu
                },

                {
                    path:'/workDiary/write',
                    name: 'Write',
                    component: Write,
                    meta:{
                        diaryNav:true
                    }
                },
                {
                    path:'/workDiary/watch',
                    name: 'Watch',
                    component: Watch
                },
                {
                    path:'/workDiary/diary',
                    name: 'Diary',
                    component: Diary,
                    meta:{
                        diaryNav:true
                    }
                },
                {
                    path:'/workDiary/diaryCount',
                    name: 'DiaryCount',
                    component: DiaryCount
                }
            ]
        },
        {
            path: '/shop',
            name: 'Shop',
            component: Shop,
            meta:{
                navShow: false,
                title:'积分商城'
            }
        },
        {
            path: '/exchange',
            name: 'Exchange',
            component: Exchange,
            meta:{
                navShow: false,
                title:'兑换记录'
            }
        },
        {
            path: '/exchangeRec',
            name: 'ExchangeRec',
            component: ExchangeRec,
            meta:{
                navShow: false,
                title:'兑换记录'
            }
        },
        {
            path: '/product',
            name: 'Product',
            component: Product,
            meta:{
                navShow: false,
                title:'商品详情'
            }
        },
        {
            path: '/kpi',
            name: 'Kpi',
            component: Kpi,
            meta:{
                navShow: false,
                title:'水平考核'
            }
        },
        {
            path: '/kpiDetail',
            name: 'KpiDetail',
            component: KpiDetail,
            meta:{
                navShow: false,
                title:'水平考核'
            }
        },
        {
            path: '/philosophyDetail',
            name: 'PhilosophyDetail',
            component: PhilosophyDetail,
            meta:{
                navShow: false,
                title:'详情'
            }
        },
        {
            path: '/philosophy',
            name: 'Philosophy',
            component: Philosophy,
            meta:{
                navShow: false,
                title:'经济哲学'
            }
        },
        {
            path: '/freePrize',
            name: 'FreePrize',
            component: FreePrize,
            meta:{
                navShow: false,
                title:'自由奖扣'
            }
        },
        {
            path: '/complain',
            name: 'Complain',
            component: Complain,
            meta:{
                navShow: false,
                title:'积分申诉'
            }
        },
        {
            path: '/managePraise',
            name: 'ManagePraise',
            component: ManagePraise,
            meta:{
                navShow: false,
                title:'管理奖扣'
            }
        },
        {
            path: '/apply',
            name: 'Apply',
            component: Apply,
            meta:{
                navShow: false,
                title:'积分申请'
            }
        },
        {
            path: '/loveRank',
            name: 'LoveRank',
            component: LoveRank,
            meta:{
                navShow: false,
                title:'爱心点赞'
            }
        },
        {
            path: '/love',
            name: 'Love',
            component: Love,
            meta:{
                navShow: false,
                title:'爱心点赞'
            }
        },
        {
            path: '/structure',
            name: 'Structure',
            component: Structure,
            meta:{
                navShow: false,
                title:'公司架构'
            }
        },
        {
            path: '/manageDiary',
            name: 'ManageDiary',
            component: ManageDiary,
            meta:{
                navShow: false,
                title:'管理日志'
            }
        },
        {
            path: '/personalData',
            name: 'PersonalData',
            component: PersonalData,
            meta:{
                navShow: false,
                title:'个人信息'
            }
        },
        {
            path: '/missionList',
            name: 'MissionList',
            component: MissionList,
            meta:{
                navShow: false,
                title:'任务列表'
            }
        },
        {
            path: '/baseInfor',
            name: 'BaseInfor',
            component: BaseInfor,
            meta:{
                navShow: false,
                title:'个人信息'
            }
        },
        {
            path: '/infor',
            name: 'Infor',
            component: Infor,
            meta:{
                navShow: true,
                title:'个人中心'
            }
        },
        {
            path: '/board',
            name: 'Board',
            component: Board,
            meta:{
                navShow: true,
                title:'积分榜'
            }
        },
        {
            path: '/person',
            name: 'Person',
            component: Person,
            meta:{
                navShow: true,
                title:'个人中心'
            }
        },
        {
            path: '/publicMission',
            name: 'PublicMission',
            component: PublicMission,
            meta:{
                navShow: false,
                title:'发布任务'
            }
        },
        {
            path: '/announcement',
            name: 'Announcement',
            component: Announcement,
            meta:{
                navShow: false,
                title:'发布公告'
            }
        },
        {
            path: '/announcementList',
            name: 'AnnouncementList',
            component: AnnouncementList,
            meta:{
                navShow: false,
                title:'企业公告'
            }
        },
        {
            path: '/spList',
            name: 'SpList',
            component: SpList,
            meta:{
                navShow: false,
                title:'审批列表'
            }
        },
        {
            path: '/spDetail',
            name: 'SpDetail',
            component: SpDetail,
            meta:{
                navShow: false,
                title:'审批详情'
            }
        },
        {
            path: '/record',
            name: 'Record',
            component: Record,
            meta:{
                navShow: false,
                title:'审批日记'
            }
        },
        {
            path: '/work',
            name: 'Work',
            component: Work,
            meta:{
                navShow: true,
                title:'工作台'
            }
        },
        {
            path: '/praise',
            name: 'Praise',
            component: Praise,
            meta:{
                navShow: false,
                title:'领导奖励'
            }
        },
        {
            path: '/orderDetail',
            name: 'OrderDetail',
            component: OrderDetail,
            meta:{
                navShow: false,
                title:'订单'
            }
        }
    ]
})
Vue.use(VueRouterTitle,{router});

export default router
