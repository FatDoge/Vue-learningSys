<template>
 <div id="navBar">  
     <el-dialog
  title="搜索结果"
  :visible.sync="dialogVisible"
  width="50%"
  >
  <el-button v-for="result in results"  @click="openLesson(result.id)" :key="result.id">{{result.classname}}</el-button>
</el-dialog>
   <!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title text-center" id="myModalLabel">用户登录</h4>
                </div>
                <div class="modal-body">
                    <form method="GET">
                        <input type="text" class="form-control" placeholder="邮箱/账号/手机号" v-model='username'>
                        <input type="password" class="form-control" placeholder="6-12位密码，不可用空格，区分大小写" v-model='password'>
                    </form>
                </div>
                <div class="modal-footer"> 
                    <button type="button" class="btn btn-default" @click='userLogin(username,password)'>登录</button>
                </div>
            </div>
        </div>
    </div>
    
    <a duration="1000" easing="smooth" scrollTo="header" class="scrollOnClick">
        <span class="zhiding" style="cursor: pointer;cursor: hand;"></span>
    </a>
    <div class="header" id="header">
        <div class="logo">
            <a href="#" title="首页">
                <router-link to="/">
                <img src="/static/img/LOGO.png">
                </router-link>
            </a>
        </div>
        <ul>
            <li v-for="(nav,index) in navBar" :key="index">
                <router-link :to="nav.path">{{nav.text}}</router-link>
            </li>
        </ul>
        <form action="" method="get" class="input-group">
            <div class="serch">
                <form>
                    <input type="text" class="form-control" v-model="queryLesson" placeholder="输入课程关键字">
                </form>
            </div>
            <div class="serchBu">
                <form>
                    <input type="button" class="input-group-addon" @click="search">
                </form>
            </div>
        </form>
        <div  v-show="!isLogin">
            <img id="userPhoto" src="/static/img/photo.png" class="img-circle"/>
            <div class="login">
                <a href="#" data-toggle="modal" data-target="#myModal">登录</a>
                <a>/</a>
                <a href="#/stusignup">注册</a>
            </div>
        </div>
        <div  v-show="isLogin" style="z-index:9999999">
            <img id="userPhoto" :src="picUrl" class="img-circle"/>
            <div class="login">
                <a href="#" id="nickname">{{nickname}}
                    <div class="list">
                    <ul>
                        <li><a :href="'#/user/'+userid+'/'">个人中心</a></li> 
                        <li><a :href="'#/user/'+userid+'/setting'">设置</a></li>
                    </ul>
                </div>
            
                </a>
                 <a>/</a>
                <a href="#" @click="userExit()">退出</a>
                </div>
        </div>
    </div>
 </div>
</template>

<script>
import Vue from 'Vue'
import Bus from './Bus'
export default {
  name: 'Navbar',
  data () {
    return {
      navBar:[{
          path:'/',
          text:'首页'
      },{
          path:'/classes/',
          text:'课程'
      },{
          path:'/circle/',
          text:'学友圈'
      }],
      username:'',
      password:'',
      picUrl:'',
      nickname:'',
      isLogin:false,
      userid:'',
      queryLesson:'',
      dialogVisible: false,
      results:[]
    }
  },methods:{
      search(){
          if(this.queryLesson.trim()!==''){
            this.$api.searchLessons(this.queryLesson)
          .then(
              (response)=>{
                  if(response.data.status===200){
                      console.log(response.data)
                    console.log(this.queryLesson)
                    console.log(response.data)
                    this.results=response.data.data;
                    this.dialogVisible = true;
                  }else{
                      console.log(response.data)
                    Vue.prototype.$notify({
                    title: '查询成功',
                    message: '未找到相应课程',
                    type: 'info',
                    offset:50,
                    duration: 1000
                })
                  }                  
                  this.queryLesson='';
              }
          )
          .catch(
              (reject)=>{
                  Vue.prototype.$notify({
                    title: '查询失败',
                    message: '服务端错误',
                    type: 'error',
                    offset:50,
                    duration: 1000
                })
              }
          )
          }else{
              this.queryLesson='';
              Vue.prototype.$notify({
                    title: '查询失败',
                    message: '请输入关键字',
                    type: 'error',
                    offset:50,
                    duration: 1000
                })
          }
          
      },
      openLesson(id){
          window.open(`#/lesson/${id}`);
      },
        userLogin(username,password){
            //本地api
            if(this.username&&this.password){
                this.$api.login(username,password);
                $('#myModal').modal('hide');
                //个人信息存入sessionStorage中，当前会话有效
            }else{
            this.$options.methods.Notice.bind(this)({
                title:'校验失败',
                message:"请填写完整",
                type:'error',
            });
            return false;
            }
            console.log(username,password);       
        },
        userExit(){
            this.$options.methods.Notice.bind(this)({
                title:'已登出',
                message:"部分功能将失效",
                type:'success',
            });
            this.isLogin=false;
            sessionStorage.removeItem('yzInfo');
            console.log(this.$route.path.indexOf('user')>-1);
            this.$route.path.indexOf('user')>-1?this.$router.push({path:'/'}):0;//其中login是你定义的一个路由模块
        },
        Notice(obj){
            this.$notify({
          title: obj.title,
          message: obj.message,
          position: 'top-right',
          type:obj.type,
          duration: 1000,
          offset: 50
        });
        }
    },mounted: function () {
        this.$nextTick(function () {
            if(sessionStorage.getItem('yzInfo')){
            let info1=JSON.parse(sessionStorage.getItem('yzInfo'));
            this.picUrl=info1.headlogo||"http://p9wmpwieh.bkt.clouddn.com/yzedu/img/headlogo/robot.png";
            this.nickname=info1.nickname;
            this.isLogin=true;
            this.userid=info1.userid;
            }
        })
        let self = this
        Bus.$on('yzInfo', (e) => {
            self.$nextTick(function () {
            if(sessionStorage.getItem('yzInfo')){
            let info1=JSON.parse(sessionStorage.getItem('yzInfo'));
            self.picUrl=info1.headlogo||"http://p9wmpwieh.bkt.clouddn.com/yzedu/img/headlogo/robot.png";
            self.nickname=info1.nickname;
            self.isLogin=true;
            self.userid=info1.userid;
            }
        })
　　　　　console.log(`传来的数据是：${e}`)
       })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-dialog{
    top:20%;
}
#nickname{
    height: 52px;
    display: inline-block
}
#nickname .list{
    opacity:0;
    position: fixed;
    z-index: 9999999;
    background: #fff;
    width: 90px;
    border-radius: 4px;
    right: 45px;
    height: 100px;
    margin-top: -5px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    transition: .4s ease-in-out;
    transform:translate3d(0,-92px,0); 
    font-weight: lighter;
}
#nickname:hover .list{
    display: block;
    opacity: 1;
    transition:.4s ease-in-out;
    transform:translate3d(0,0,0); 
}
.list ul{
    width: 90px;
    margin: 0;
    padding: 0;
    height: 100px;
}
.list ul li{
    margin: 0;
    width: 90px;
    height: 50px;
}
.list ul li a{
    margin:auto;
    transition: .3s ease-in-out;
    width: 100%;
    display: inline-block;
    line-height: 40px;
    color: #555;
}
.list ul li a:hover{
    color: #48cfad;
    transition: .3s ease-in-out;
}
li .router-link-exact-active{
   color:#48cfad;
}
</style>
