<template>
<div id="stusign">
  <div id="sign" class="sign mc">
        <a>
            <span class="sign-item bgcY">
                <h4>学生注册</h4>
            </span>
        </a>
        <a href="#/teasignup">
            <span class="sign-item bgcG">
                <h4>教师注册</h4>
            </span>
        </a>

        <form method="GET"><table class="mc signBox">
            <tr>
                <td>
                    <p>用户名</p>
                </td>
                <td>
                    <input type="text" class="form-control" placeholder="请输入用户名" v-model="form.username">
                </td>
            </tr>
            <tr>
                <td>
                    <p>邮箱</p>
                </td>
                <td>
                    <input type="text" class="form-control" placeholder="请输入邮箱" v-model="form.email">
                </td>
            </tr>
            <tr>
                <td>
                    <p>密码</p>
                </td>
                <td>
                    <input type="password" class="form-control" placeholder="6-12位密码，不可用空格，区分大小写" v-model="form.password">
                </td>
            </tr>
            <tr>
                <td>
                    <p>确认密码</p>
                </td>
                <td>
                    <input type="password" class="form-control" placeholder="再次输入密码" v-model="form.password1">
                </td>
            </tr>
        </table></form>
        <div class="modal-footer"> 
                <button type="button" class="btn btn-default " @click="stuRegister">提交</button>
            </div>
    </div>
    </div>
</template>
<style scoped>
#stusign{
    min-height: 450px;
}
.footer{
    bottom: 0;
}
</style>
<script>
import Vue from 'vue'
    export default {
        data(){
            return{
                form:{
                    username:'',
                    email:'',
                    password:'',
                    password1:'',
                    role:0
                }
            }
        },
        methods:{
            stuRegister(){
                if(!(this.form.username&&this.form.email&&this.form.password&&this.form.password1)){
                   Vue.prototype.$notify({
                    title: '提交失败',
                    message: '请填写完整',
                    type: 'error',
                    offset:50,
                    duration: 1000
                }) 
                }else if(this.form.password!==this.form.password1){
                    Vue.prototype.$notify({
                    title: '提交失败',
                    message: '请两次密码不一致',
                    type: 'warning',
                    offset:50,
                    duration: 1000
                }) 
                }else{
                    Vue.prototype.$notify({
                    title: '提交成功',
                    message: '正在注册...',
                    type: 'success',
                    offset:50,
                    duration: 3000
                }) 
                    this.$api.register(this.form)
                    .then(
                        (response)=>{
                            if(response.data.status===200){
                              Vue.prototype.$notify({
                                title: '注册成功',
                                message: '请登录完善信息',
                                type: 'success',
                                offset:50,
                                duration: 1000
                            })   
                            }else{
                                Vue.prototype.$notify({
                                title: '注册失败',
                                message: "服务端错误:"+response.data.msg,
                                type: 'error',
                                offset:50,
                                duration: 1000
                            })
                            }
                        }
                    )
                }
                console.log(this.form)
            }
        }
    }
</script>
