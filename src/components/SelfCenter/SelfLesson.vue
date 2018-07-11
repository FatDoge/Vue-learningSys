<template>
    <div id="collection" class="course">
        <div class="right-course">
            <h2>我的收藏</h2>
        </div>
        <el-row>
            <el-col :span="6" v-for="collection in collections" :key="collection.id" v-if="collections.length>0">
                <el-card :body-style="{ padding: '0px'}" shadow="hover">
                <img src="static/img/cover.jpg" class="image">
                <div style="padding: 14px;">
                    <span>{{collection.className}}</span>
                <el-tooltip  effect="dark" content="取消收藏" placement="top">
                    <el-button type="danger" icon="el-icon-star-on" circle @click="toggleCollection(collection.classId)" style="float:right"></el-button>
                </el-tooltip>         
                </div>
                </el-card>
            </el-col>
            <el-col v-if="collections.length===0">暂无收藏记录</el-col>
            </el-row>
    </div>
</template>
<style scoped>
.catog-points span {
    display: inline-block;
    width: 135px;
}
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
#collection .el-card{
    padding: 5px;
    margin: 5px;
}
#collection .el-row{
    margin-top:-50px;
}
</style>
<script>
  export default {
    methods: {
      toggleCollection:function(classId){
          this.$api.toggleCollection(classId)
          .then(
              (response)=>{
                  console.log(response.data)
                  this.$message(response.data.msg)
                  this.$api.getCollection()
                    .then(
                        (response)=>{
                            console.log(response.data);
                            this.collections=response.data.data;
                        }
                    )
                    .catch(
                        (reject)=>{
                            console.log(reject)
                        }
                    )
              }
          )
          .catch(
              (reject)=>{
                  console.log(reject)
              }
          )
      }
    },
    data() {
      return {
        collections:[]
      };
    },
    mounted() {
        this.$api.getCollection()
        .then(
            (response)=>{
                console.log(response.data);
                this.collections=response.data.data;
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

