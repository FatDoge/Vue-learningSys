<template>
    <div id="history">
    <div class="course">
        <div class="right-course">
            <h2>浏览记录<el-button type="danger" icon="el-icon-delete" circle style="float:right" @click="clearHistory"></el-button></h2>
        </div>
            <el-row>
            <el-col :span="6" v-for="history in historyList" :key="history.id" v-if="historyList.length>0">
                <el-card :body-style="{ padding: '0px'}" shadow="hover">
                <img src="static/img/cover.jpg" class="image">
                <div style="padding: 14px;">
                    <span>{{history.className}}</span>
                    <div class="bottom clearfix">
                    <time class="time">{{changeTime(history.rate.toFixed(0))}}</time>
                    <el-button type="text" class="button" @click="openLesson(history.classId)">前往观看</el-button>
                    </div>
                </div>
                </el-card>
            </el-col>
            <el-col v-if="historyList.length===0">暂无历史记录</el-col>
            </el-row>
    </div>
    </div>
</template>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
#history .el-card{
    padding: 5px;
    margin: 5px;
}
#history .el-row{
    margin-top:-50px;
}
</style>
<script>
    export default {
        data(){
            return {
                historyList:[],
            }
        },
        methods:{
            changeTime:function(s){
        var t;
        if(s > -1){
            var hour = Math.floor(s/3600);
            var min = Math.floor(s/60) % 60;
            var sec = s % 60;
            if(hour < 10) {
                t = '0'+ hour + ":";
            } else {
                t = hour + ":";
            }

            if(min < 10){t += "0";}
            t += min + ":";
            if(sec < 10){t += "0";}
            t += sec.toFixed(0);
        }
        return t;
            },
            clearHistory:function(){
                console.log('删除历史记录')
                this.$confirm('此操作将永久删除历史记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$api.deleteHistory()
                    .then(
                        (response)=>{
                            this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        }
                    )
                    .catch(
                        (reject)=>{
                            console.log(reject);
                        }
                    )
                
                })
                .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            },
            openLesson:function(classId){
                window.open('#/lesson/'+classId);
            }
        },
        mounted() {
            console.log('查看历史记录')
            this.$api.getHistory()
            .then(
                (response)=>{
                    console.log(response.data.data)
                    this.historyList=response.data.data;
                }
            )
            .catch(
                (reject)=>{
                    console.log(reject)
                }
            )
        },
    }
</script>