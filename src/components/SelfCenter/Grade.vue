<template>
    <div id="grade">
        <div class="grade">
        <div class="right-grade">
            <h2>我的成绩</h2>
        </div>
        <div class="btn-group">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search">查看所有课程信息</el-button>
        </div>
         <ve-pie :data="chartData"></ve-pie>
    </div>
    </div>
</template>
<script>
    require('../../assets/css/student-grade.css')
    export default {
    data () {
      return {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        },
         options: [{
          value: '选项1',
          label: 'Vue'
        }, {
          value: '选项2',
          label: 'React'
        }, {
          value: '选项3',
          label: 'Angular'
        }, {
          value: '选项4',
          label: 'San'
        }],
        value:''
      }
    }
  }
</script>
<style>
#grade{
    text-align: left;
}
</style>

