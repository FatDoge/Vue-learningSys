<template>
    <div id="manage" class="course" style="text-align:center">
        <div class="right-course" style="text-align:left">
            <h2>管理课程</h2>
        </div>
    <template>
  <el-row style="margin-top:-50px;">
  <el-col :span="24">
  <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%">
    <el-table-column
      label="课程ID"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="课程名称"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.classname }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="课程简介"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.classdetail }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">查看</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-col>
</el-row>
</template>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        window.open('#/lesson/'+row.id)
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$api.deletePersonalVideo(row.id)
            .then(
                (response)=>{
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.$api.getPersonalVideosList()
                .then(
                    (response)=>{
                        console.log(response.data)
                        this.tableData=response.data.data
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
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    mounted() {
        this.$api.getPersonalVideosList()
        .then(
            (response)=>{
                console.log(response.data)
                this.tableData=response.data.data
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