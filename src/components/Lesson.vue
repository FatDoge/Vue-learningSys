<template>
  <div id="lesson">
      <div class="main-class mc">
        <div class="crumb">
            <ul class="breadcrumb">
                <li>
                    <a href="#/">首页</a>
                    <span class="divider"></span>
                </li>
                <li>
                    <a href="#/classes">全部课程</a>
                    <span class="divider"></span>
                </li>
                <li>
                    <a href="#/classes">计算机</a>
                    <span class="divider"></span>
                </li>
            </ul>
        </div>
        <center>
            <h2>{{classInfo.className}}</h2>
            <!-- <vue-star animate="animated rubberBand" color="rgb(152, 138, 222)" :active='true'>
                <a slot="icon" class="fa fa-heart collect" @click="handleClick"></a>
            </vue-star> -->
              <vue-star-plus v-model="classInfo.favourite" color="#ff0000" class="i-star__component" animate="animated rubberBand">
            <span slot="icon" class="i-star__text" :style="{color:(classInfo.favourite?'rgb(240,86,84)':'#444'),'font-size':'20px'}" @click="handleClick"><i class="fa fa-heart"></i></span>
            </vue-star-plus>
            <div class="classVideo">
               <div class="container">
                   <d-player :options="options"
                        @play="play"
                        ref="player" @pause="pause" @progress="progress" @ended="ended">
                </d-player>
                </div>
            </div>
        </center>
        <h3>课程详情</h3>
        <hr>
        <div class="classInt mc">
            <h4>课程概述</h4>
            <p>{{classInfo.classDetail}}</p>
            <h4>课程大纲</h4>
            <p></p>
            <h4>预备知识</h4>
            <p></p>
            <h4>参考资料</h4>
            <p></p>
        </div>
        <div id="comment"></div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueDPlayer from 'vue-dplayer'
export default {
  name: 'Lesson',
  data () {
    return {
        options: {
          video: {
            url: '',
            pic: 'http://p9wmpwieh.bkt.clouddn.com/cover.png'
          },
          autoplay: false,
          contextmenu: [
              {
                  text: 'GitHub',
                  link: 'https://github.com/fatdoge'
              }
          ],
          danmaku: {
            id: 'yzLesson1',
            api: 'https://api.prprpr.me/dplayer/',
            user:'fatdoge'
        },
        screenshot:true
        },
        player: null,
        //valine配置
        valineop:{
            el: '#comment' ,
            notify:false, 
            verify:false, 
            appId: 'pEUNSmIOUPk1jIRvWfEqdRLc-gzGzoHsz',
            appKey: 'NupnAdXxRyow0Y5PeHdhqNNK',
            placeholder: '来点评论呀~',
            path:this.$route.path, 
            avatar:'mm' 
        },
        //课程信息
        classInfo:{
            className:'',
            classDetail:'',
            rate:'',
            classId:'',
            oldRate:'',
            favourite:false
        }
    }
  },
   mounted() {  
    this.player = this.$refs.player.dp;      
      new Valine(this.valineop);
      console.log(this.valineop)
        this.$api.getSingleLessonInfo(this.$route.params.lessonid)
            .then(
                (response)=>{
                    if(response.data.status===200){
                        this.classInfo.oldRate=response.data.data.rate;
                    console.log(response.data);
                    this.classInfo.className=response.data.data.classname;
                    this.classInfo.classDetail=response.data.data.classdetail;
                    this.classInfo.favourite=response.data.data.favourite;
                    this.classInfo.rate=response.data.data.rate;
                    this.classInfo.classId=response.data.data.id;
                    this.options.video.url=response.data.data.classurl;
                    this.options.danmaku.id=`yzLesson${response.data.data.id}`
                    this.player.switchVideo({
                            url: this.options.video.url
                        },
                        {
                            id: this.options.danmaku.id,
                            api: this.options.danmaku.api,
                            user:'fatdoge'
                        })
                        console.log('上次保存的进度',this.classInfo.rate)
                        if(this.classInfo.oldRate){
                            this.player.seek(this.classInfo.oldRate);
                        }
                    }else{
                        this.player.notice('找不到课程')
                        console.log('未找到课程')
                        this.player.switchVideo({
                            url: ''
                        },
                        {
                            id: '',
                            api: '',
                            user:'fatdoge'
                        })
                        this.classInfo.className='404 Not Found'
                        this.classInfo.classDetail='404 Not Found'
                    }
                    
                }
                )
                .catch(
                    (reject)=>{
                        console.log(reject)
                    }
                )      
    },
    methods: {
      play() {
        console.log('play callback')
        console.log(this.options.danmaku.id)
      },
      pause(){
          console.log('pause callback')
      },
      progress(){
          let currentTime=this.player.video.currentTime;
          console.log('当前进度:'+currentTime,"视频id:"+this.options.danmaku.id);
          console.log(this.classInfo.classId,currentTime)
          this.$api.updateHistory(this.classInfo.classId,currentTime)
          .then(
              (response)=>{
                  console.log(response.data)
              }
          )
          .catch(
              (reject)=>{
                  console.log(reject);
              }
          )
      },
      ended(){
          console.log('视频播放完毕')
      },
      handleClick () {
      //do something
      this.$api.toggleCollection(this.classInfo.classId)
      .then(
          (response)=>{
              console.log(response.data);
              this.$message(response.data.msg)
          }
      )
      .catch(
          (reject)=>{
              console.log(reject)
              this.$message(reject)
          }
      )
    }
    },
  components: {
    'd-player': VueDPlayer,
  },
  watch:{
      //检测url变动重新渲染comment
      $route(to){
          let that=this;
          that.valineop.path=that.$route.path;
          Vue.nextTick(function(){
            new Valine(that.valineop);
            that.$api.getSingleLessonInfo(that.$route.params.lessonid)
            .then(
                (response)=>{
                    if(response.data.status===200){
                        that.classInfo.oldRate=response.data.data.rate;
                    console.log(response.data);
                    that.classInfo.className=response.data.data.classname;
                    that.classInfo.classDetail=response.data.data.classdetail;
                    that.classInfo.rate=response.data.data.rate;
                    that.classInfo.classId=response.data.data.id;
                    that.classInfo.favourite=response.data.data.favourite;
                    that.options.video.url=response.data.data.classurl;
                    that.options.danmaku.id=`yzLesson${response.data.data.id}`
                    that.player.switchVideo({
                            url: that.options.video.url
                        },
                        {
                            id: that.options.danmaku.id,
                            api: that.options.danmaku.api,
                            user:'fatdoge'
                        })
                        if(that.classInfo.oldRate!==0){
                            that.player.seek(that.classInfo.oldRate);
                        }
                    }else{
                        that.player.notice('找不到课程')
                        console.log('未找到课程')
                        that.player.switchVideo({
                            url: ''
                        },
                        {
                            id: '',
                            api: '',
                            user:'fatdoge'
                        })
                        that.classInfo.className='404 Not Found'
                        that.classInfo.classDetail='404 Not Found'
                    }
                    
                }
                )
                .catch(
                    (reject)=>{
                        console.log(reject)
                    }
                )      
        })
      }
  }
}
</script>
<style>
.dplayer {
    box-shadow: -10px 11px 0px 0px rgba(72, 207, 173, 0.61), 0 2px 2px 0 rgba(72, 207, 173, 0.49);
}
#comment{
    text-align: left;
}
.v .vbtn:active, .v .vbtn:hover {
    color: #48cfad;
    border-color: #48cfad;
    background-color: #fff;
}
.v .txt-right {
    display: none;
}
.v .vlist .vcard section .vfooter .vat {
    color: #48cfad;
}
.v .vlist .vcard .vhead .vsys {
    background: #48cfad;
    color: white;
    box-shadow: 0 4px 8px 0 rgba(72, 207, 173, 0.41);
    border-radius: 12px;
}
.v .vwrap .vheader .vinput:focus {
    border-bottom: 1px dashed #48cfad;
}
.v .vbtn {
    color: white;
    border: 1px solid #48cfad;
    background: #48cfad;
    box-shadow: 0 4px 8px 0 rgba(72, 207, 173, 0.41);
    border-radius: 12px;
}
.v .vbtn:hover{
    color: white;
    border: 1px solid #48cfad;
    background: #48cfad;
    box-shadow: 0 4px 8px 0 rgba(72, 207, 173, 0.41);
    border-radius: 12px;
}
.v .vwrap {
    background: #FFF;
    box-shadow: 0 4px 8px 0 rgba(7,17,27,.1);
    border-radius: 12px;}
.vcard{
        position: relative;
    margin-bottom: 8px;
    padding: 32px;
    background: #FFF;
    box-shadow: 0 4px 8px 0 rgba(7,17,27,.1);
    border-radius: 12px;
}
.vnick:hover{
    color:#48cfad!important;
}
.vat{
    color: #48cfad!important;
}
.collect{
    color: #a9a9a9;
    right: 0;
    font-size: 20px;
    transition: .3s ease-in-out;
}
.collect:hover{
    color: rgb(240, 86, 84);
    font-size: 24px;
    transition: .3s ease-in-out;
}
.animated .collect{
    color: rgb(240, 86, 84);
}
.VueStar{
    position: fixed;
    right: -13px;
    bottom: 40px;
    z-index: 999;
}
</style>

