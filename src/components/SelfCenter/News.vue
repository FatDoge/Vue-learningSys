<template>
    <div id="news">
    <div class="course">
        <div class="right-course">
            <h2>新闻资讯</h2>
            <el-collapse-transition v-for="news in newsList" :key="news.ganhuo_id">
            <el-row type="flex" class="newsCard">
            <el-col :span="18">
                <div class="desc">
                    <a :href="news.url" target="_blank">{{news.desc}}</a>
                </div>
            </el-col>
            <el-col :span="6">
                {{news.who}}
            </el-col>
            </el-row>
            </el-collapse-transition>
        </div>
    </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    data(){
        return{
            newsList:''
        }
    },
    created() {
        this.newsList=this.$api.getNews()
        .then(
            (response)=>{
                this.newsList=response.data.results;
            }
        )
    },
}
</script>
<style>
.desc a{
    font-size: 17px;
    font-weight: lighter;
    color: white;
}
.desc a:hover{
    color: white!important;
}
.newsCard{
    padding: 15px 20px;
    margin: 15px 15px;
    border-radius: 12px;
    color: white;
    border: 1px solid #48cfad;
    background: #48cfad;
    box-shadow: 0 4px 8px 0 rgba(72, 207, 173, 0.41);
}
</style>
