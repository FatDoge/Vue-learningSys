<template>
  <div id="schoolClass">
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
                <li class="active">校内课堂</li>
            </ul>
        </div>
        <div class="class-Fliter">
            <table>
                <tr>
                    <td>
                        <a href="#/classes">
                            <span class="colorYellow">全部</span>
                        </a>
                    </td>
                    <td>
                        <a href="#/schoolclass/ITclass">
                            <span>计算机</span>
                        </a>
                    </td>
                    <td>
                        <a href="#/">
                            <span>经济管理</span>
                        </a>
                    </td>
                    <td>
                        <a href="#">
                            <span>心理学</span>
                        </a>
                    </td>
                    <td>
                        <a href="#">
                            <span>外语</span>
                        </a>
                    </td>
                    <td>
                        <a href="#">
                            <span>文学历史</span>
                        </a>
                    </td>
                    <td>
                        <a href="#">
                            <span>医学</span>
                        </a>
                    </td>

                </tr>
                <tr>
                    <td>
                        <a href="#">
                            <span>艺术设计</span>
                        </a>
                    </td>

                    <td>
                        <a href="#">
                            <span>工学</span>
                        </a>
                    </td>
                    <td>
                        <a href="#">
                            <span>理学</span>
                        </a>
                    </td>

                    <td>
                        <a href="#">
                            <span>哲学</span>
                        </a>
                    </td>
                    <td>
                        <a href="#">
                            <span>法学</span>
                        </a>
                    </td>
                    <td>
                        <a href="#">
                            <span>教育学</span>
                        </a>
                    </td>
                    <td>
                        <a href="#">
                            <span>其他</span>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
        <div class="classitem" v-for="result in results" :key="result.id">
            <a :href="'#/lesson/'+result.id" target="_blank">
                <img v-lazy="src">
                <span>
                    <h4>{{result.classname}}</h4>
                    <p id="classSchool">{{result.school||'杭州电子科技大学'}}</p>
                    <p id="classTea">{{result.classteacher}}</p>
                    <p id="classAbs">{{result.classdetail}}</p>
                </span>
            </a>
        </div>
    </div>
  </div>
</template>
<style>
#schoolClass{
    text-align: left;
}
.class-Fliter td{
    transition: .3s ease-in-out;
    background: #76e4c8;
}
.class-Fliter td a{
    color: white;
}
.class-Fliter td:hover{
    background: #4bd6b3;
    transition: .3s ease-in-out;
}
.class-Fliter td:hover a{
    color: #fff;
}
</style>
<script>
    export default {
        data(){
            return {
                src:'static/img/cover.jpg',
                results:[]
            }
        },
        mounted() {
            this.$api.getLessonsList()
            .then(
                (response)=>{
                    console.log(response.data)
                    this.results=response.data.data
                }
            )
        },
    }
</script>
