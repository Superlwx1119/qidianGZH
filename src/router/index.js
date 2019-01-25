import Vue from 'vue'
import Router from 'vue-router'
import Registered from '@/pages/Registered'
import QrCode from '@/pages/QrCode'
import Home2 from '@/pages/components/Home2'
import UpPicture from '@/pages/components/UpPicture'
import Mine from '@/pages/components/PC/Mine'
import UploadRecord from '@/pages/components/PC/components/UploadRecord'
import BeAgent from '@/pages/components/PC/components/BeAgent'
import Agent from '@/pages/components/PC/components/agent/Agent'
import Integral from '@/pages/components/PC/components/agent/Integral'
import SchoolMsg from '@/pages/components/PC/components/agent/SchoolMsg'
import MemberDetails from '@/pages/components/PC/components/agent/MemberDetails'
import Members from '@/pages/components/PC/components/agent/Members'
import MemberUp from '@/pages/components/PC/components/agent/MemberUp'
import Benefits from '@/pages/components/PC/components/agent/Benefits'
import Shore from '@/pages/components/PC/components/agent/Shore'
import Bonus from '@/pages/components/PC/components/agent/Bonus'
import MyMsg from '@/pages/components/PC/components/agent/MyMsg'
import School from '@/pages/components/PC/components/School'
import Process from '@/pages/components/components/Process'
import Attention from '@/pages/components/components/Attention'
import Instructions from '@/pages/components/PC/components/Instructions'
import store from '@/store';
Vue.use(Router)


const router=new Router({
//	mode:'history',
  routes: [
    {
      path: '/',
      name: 'Registered',
      component: (resolve) => {
        require(['@/pages/Registered'], resolve)
      },
      meta: {
        title: '校园起点——注册'
      }
    },
    {
      path: '/qrCode',
      name: 'QrCode',
      component: (resolve) => {
        require(['@/pages/QrCode'], resolve)
      },
      meta: {
        title: '校园起点——关注公众号'
      }
    },
    {
    	path: '/home2',
      name: 'Home2',
      component: (resolve) => {
        require(['@/pages/components/Home2'], resolve)
      },
      meta: {
        title: '校园起点——首页'
      }
    },
    {
		path: '/mine',
      name: 'Mine',
      component: (resolve) => {
        require(['@/pages/components/PC/Mine'], resolve)
      },
      meta: {
        title: '校园起点——我的',
        requiresAuth:true//是否进行登录验证
      }
    },
    {
    	path: '/uploadRecord',
      name: 'UploadRecord',
      component: (resolve) => {
        require(['@/pages/components/PC/components/UploadRecord'], resolve)
      },
      meta: {
        title: '校园起点——我的上传记录'
      }
    },
    {
    	path: '/beAgent',
      name: 'BeAgent',
      component: (resolve) => {
        require(['@/pages/components/PC/components/BeAgent'], resolve)
      },
      meta: {
        title: '校园起点——申请成为合伙人',
	      
      }
    },
    {
    	path: '/school',
      name: 'School',
      component: (resolve) => {
        require(['@/pages/components/PC/components/School'], resolve)
      },
      meta: {
        title: '校园起点——选择学校'
      }
    },
    {
    	path: '/agent',
      name: 'Agent',
      component: (resolve) => {
        require(['@/pages/components/PC/components/agent/Agent'], resolve)
      },
      meta: {
        title: '校园起点——合伙人中心'
      }
    },
    {
    	path: '/myMsg',
      name: 'MyMsg',
      component: (resolve) => {
        require(['@/pages/components/PC/components/agent/MyMsg'], resolve)
      },
      meta: {
        title: '校园起点——个人详情'
      }
    },
    {
    	path: '/integral',
      name: 'Integral',
      component: (resolve) => {
        require(['@/pages/components/PC/components/agent/Integral'], resolve)
      },
      meta: {
        title: '校园起点——积分'
      }
    },
    {
    	path: '/bonus',
      name: 'Bonus',
      component: (resolve) => {
        require(['@/pages/components/PC/components/agent/Bonus'], resolve)
      },
      meta: {
        title: '校园起点——奖励金'
      }
    },
    {
    	path: '/members',
      name: 'Members',
      component: (resolve) => {
        require(['@/pages/components/PC/components/agent/Members'], resolve)
      },
      meta: {
        title: '校园起点——我的会员'
      }
    },
    {
    	path: '/memberDetails',
      name: 'MemberDetails',
      component: (resolve) => {
        require(['@/pages/components/PC/components/agent/MemberDetails'], resolve)
      },
      meta: {
        title: '校园起点——会员详情'
      }
    },
    {
    	path: '/memberUp',
      name: 'MemberUp',
      component: (resolve) => {
        require(['@/pages/components/PC/components/agent/MemberUp'], resolve)
      },
      meta: {
        title: '校园起点——会员上传记录'
      }
    },
    {
    	path: '/process',
      name: 'Process',
      component: (resolve) => {
        require(['@/pages/components/components/Process'], resolve)
      },
      meta: {
        title: '校园起点——办卡流程'
      }
    },
    {
    	path: '/attention',
      name: 'Attention',
      component: (resolve) => {
        require(['@/pages/components/components/Attention'], resolve)
      },
      meta: {
        title: '校园起点——注意事项'
      }
    },
    {
    	path: '/instructions',
      name: 'Instructions',
      component: (resolve) => {
        require(['@/pages/components/PC/components/Instructions'], resolve)
      },
      meta: {
        title: '校园起点——办卡须知'
      }
    },
    {
    	path: '/schoolMsg',
      name: 'SchoolMsg',
      component: (resolve) => {
        require(['@/pages/components/PC/components/agent/SchoolMsg'], resolve)
      },
      meta: {
        title: '校园起点——学校信息查询'
      }
    },
    {
    	path: '/upPicture',
      name: 'UpPicture',
      component: (resolve) => {
        require(['@/pages/components/UpPicture'], resolve)
      },
      meta: {
        title: '校园起点——上传截图'
      }
    },
    {
    	path: '/benefits',
      name: 'Benefits',
      component: (resolve) => {
        require(['@/pages/components/PC/components/agent/Benefits'], resolve)
      },
      meta: {
        title: '校园起点——合伙人权益'
      }
    },
    {
    	path: '/shore',
      name: 'Shore',
      component: (resolve) => {
        require(['@/pages/components/PC/components/agent/Shore'], resolve)
      },
      meta: {
        title: '校园起点——我的邀请码'
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
        //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
     if(to.path === '/mine')  {
     	var timer=null
     	if(window.sessionStorage.getItem('level')=='second'){
     		timer=setInterval(()=>{
     			clearInterval(timer)
     			next({ path: '/agent' })
     		},10)
     	}
     	next()
     	}  
     else {     //进入的不是个人中心
          if(to.meta.requiresAuth && window.sessionStorage.getItem('level')=='') {console.log(222),next({ path: '/mine' })} 
          //下一跳路由需要验证，并且还未转变身份，则路由定向到  会员中心路由
          else { next() }}  
     });
export default router;
