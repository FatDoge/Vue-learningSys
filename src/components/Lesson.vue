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
            <h2>Office高级应用</h2>
            <div class="classVideo">
                <h3>课程{{this.$route.params.lessonid}}渲染</h3>
               <div class="container">
                   <d-player :options="options"
                        @play="play"
                        ref="player">
                </d-player>
                </div>
            </div>
        </center>
        <h3>课程详情</h3>
        <hr>
        <div class="classInt mc">
            <h4>课程概述</h4>
            <p>本课程以全国计算机等级考试“二级MS Office高级应用”考试大纲为基础，结合日常办公应用需求而有所扩展，讲解最常用的Word、Excel、PowerPoint三个应用组件，让学习者较系统地掌握Office的科学用法，在实际工作中能高质、高效使用Office解决问题，做到事半功倍，同时有助于顺利通过等级考试。
                </p>
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
            url: 'http://p9wmpwieh.bkt.clouddn.com/SAND%20IN%20THE%20SKY.mp4',
            pic: 'http://p9wmpwieh.bkt.clouddn.com/cover.png'
          },
          autoplay: false,
          contextmenu: [
              {
                  text: 'GitHub',
                  link: 'https://github.com/fatdoge'
              }
          ]
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
        }
    }
  },
   mounted() {
      this.player = this.$refs.player.dp;
      new Valine(this.valineop);
    },
    methods: {
      play() {
        console.log('play callback')
      }},
  components: {
    'd-player': VueDPlayer,
  },
  watch:{
      //检测url变动重新渲染comment
      $route(to){
          console.log(to);
          let that=this;
          Vue.nextTick(function(){
              setTimeout(() => {
                 new Valine(that.valineop).init(that.valineop);
              }, 50);
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
}
.v .vwrap .vheader .vinput:focus {
    border-bottom: 1px dashed #48cfad;
}
.v .vbtn {
    color: white;
    border: 1px solid #48cfad;
    background: #48cfad;
}
.v .vwrap {
    border-radius: 0px;
    box-shadow: -10px 11px 0px 0px rgba(72, 207, 173, 0.61), 0 2px 2px 0 rgba(72, 207, 173, 0.49);
}
</style>

