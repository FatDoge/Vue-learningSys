import Vue from 'vue'
import Router from 'vue-router'
import Navbar from '@/components/Navbar'
import Index from '@/components/Index'
import Classes from '@/components/Classes'
import Commend from '@/components/Commend'
import Footer from '@/components/Footer'
import Hot from '@/components/Hot'
import Paper from '@/components/Paper'
import AboutAnswer from '@/components/AboutAnswer'
import SchoolClass from '@/components/SchoolClass'
import Lesson from '@/components/Lesson'
import SecondNavbar from '@/components/SecondNavbar'
//注册
import StuSign from '@/components/StuSign'
import TeaSign from '@/components/TeaSign'
//404
import Page404 from '@/components/Page404'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      components: {
        nav:Navbar,
        body:Index,
        footer:Footer
      }
    },
    {
      path: '/classes',
      components: {
        nav: Navbar,
        body: Classes,
        footer:Footer
      }
    },
    {
      path: '/circle',
      components: {
        nav: Navbar,
        body: SecondNavbar,
        footer:Footer
      }, children: [
        // 推荐主页
        { path: '/', component: Commend },
        { path: '/circle/hot', component: Hot },
        { path: '/circle/paper', component: Paper },
        { path: '/circle/aboutanswer', component: AboutAnswer },

        // ...其他子路由
      ]
    }, {
      path: '/schoolclass',
      components: {
        nav: Navbar,
        body: SchoolClass,
        footer: Footer
      }
    }, {
      path: '/lesson/:lessonid',
      components: {
        nav: Navbar,
        body: Lesson,
        footer: Footer
      }
    },
    {
      path: '/stusignup',
      components: {
        nav: Navbar,
        body: StuSign,
        footer: Footer
      }
    }, {
      path: '/teasignup',
      components: {
        nav: Navbar,
        body: TeaSign,
        footer: Footer
      }
    },{
      path:'/404',
      components:{
        nav: Navbar,
        body: Page404,

      }
    },
    { path: '*', redirect: '/404' }//重定向
  ]
})
