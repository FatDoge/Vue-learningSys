<template>
    <div class="course">
        <div class="right-course">
            <h2>全部课程</h2>
        </div>
        <div class="course-info">
            <div class="course-item ">
                <ul>
                    <li class="course-one" data-courseid="#" data-uid="#">
                        <div class="course-img l">
                            <a href="#" target="_blank">
                                <img width="200" height="113" alt="互联网营销策划实务" src="static\img\course1.png">
                            </a>
                        </div>
                        <div class="course-cont">
                            <h3 class="cou-title">
                                <a href="#" target="_blank">互联网营销策划实务</a>
                                <span class="i-new">更新完毕</span>
                            </h3>
                            <div class="study-points">
                                <span class="i-left">已学0%</span>
                                <span>用时 0分</span>
                                <span>学习至1-1 课程介绍</span>
                            </div>
                            <div class="catog-points">
                                <span class="i-left">
                                    <a href="#">笔记
                                        <i>0</i>
                                    </a>
                                </span>
                                <span class="i-mid">
                                    <a href="#">代码
                                        <i>0</i>
                                    </a>
                                </span>
                                <span class="i-right">
                                    <a href="#">问答
                                        <i>0</i>
                                    </a>
                                </span>
                                <div class="btn-behave">
                                <a href="#" target="_blank" class="btn-red continute-btn">删除</a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li class="course-one" data-courseid="#" data-uid="#">
                        <div class="course-img l">
                            <a href="#" target="_blank">
                                <img width="200" height="113" alt="互联网营销策划实务" src="static\img\course1.png">
                            </a>
                        </div>
                        <div class="course-cont">
                            <h3 class="cou-title">
                                <a href="#" target="_blank">互联网营销策划实务</a>
                                <span class="i-new">更新完毕</span>
                            </h3>
                            <div class="study-points">
                                <span class="i-left">已学0%</span>
                                <span>用时 0分</span>
                                <span>学习至1-1 课程介绍</span>
                            </div>
                            <div class="catog-points">
                                <span class="i-left">
                                    <a href="#">笔记
                                        <i>0</i>
                                    </a>
                                </span>
                                <span class="i-mid">
                                    <a href="#">代码
                                        <i>0</i>
                                    </a>
                                </span>
                                <span class="i-right">
                                    <a href="#">问答
                                        <i>0</i>
                                    </a>
                                </span>
                                <div class="btn-behave">
                                <a href="#" target="_blank" class="btn-red continute-btn">删除</a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li class="course-one" data-courseid="#" data-uid="#">
                        <div class="course-img l">
                            <a href="#" target="_blank">
                                <img width="200" height="113" alt="互联网营销策划实务" src="static\img\course1.png">
                            </a>
                        </div>
                        <div class="course-cont">
                            <h3 class="cou-title">
                                <a href="#" target="_blank">互联网营销策划实务</a>
                                <span class="i-new">更新完毕</span>
                            </h3>
                            <div class="study-points">
                                <span class="i-left">已学0%</span>
                                <span>用时 0分</span>
                                <span>学习至1-1 课程介绍</span>
                            </div>
                            <div class="catog-points">
                                <span class="i-left">
                                    <a href="#">笔记
                                        <i>0</i>
                                    </a>
                                </span>
                                <span class="i-mid">
                                    <a href="#">代码
                                        <i>0</i>
                                    </a>
                                </span>
                                <span class="i-right">
                                    <a href="#">问答
                                        <i>0</i>
                                    </a>
                                </span>
                                <div class="btn-behave">
                                <a href="#" target="_blank" class="btn-red continute-btn">删除</a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li class="course-one" data-courseid="#" data-uid="#">
                        <div class="course-img l">
                            <a href="#" target="_blank">
                                <img width="200" height="113" alt="互联网营销策划实务" src="static\img\course1.png">
                            </a>
                        </div>
                        <div class="course-cont">
                            <h3 class="cou-title">
                                <a href="#" target="_blank">互联网营销策划实务</a>
                                <span class="i-new">更新完毕</span>
                            </h3>
                            <div class="study-points">
                                <span class="i-left">已学0%</span>
                                <span>用时 0分</span>
                                <span>学习至1-1 课程介绍</span>
                            </div>
                            <div class="catog-points">
                                <span class="i-left">
                                    <a href="#">笔记
                                        <i>0</i>
                                    </a>
                                </span>
                                <span class="i-mid">
                                    <a href="#">代码
                                        <i>0</i>
                                    </a>
                                </span>
                                <span class="i-right">
                                    <a href="#">问答
                                        <i>0</i>
                                    </a>
                                </span>
                                <div class="btn-behave">
                                <a href="#" target="_blank" class="btn-red continute-btn">删除</a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                    </el-pagination>

            </div>
        </div>
    </div>
</template>
<style scoped>
.catog-points span {
    display: inline-block;
    width: 135px;
}
</style>
<script>
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    }
  }
</script>