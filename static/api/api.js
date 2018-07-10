import axios from 'axios'
import config from './config'
import Vue from 'Vue'
import { Notification} from 'element-ui'
Vue.prototype.$notify = Notification;
import Bus from '../../src/components/Bus'
import { resolve } from 'url';
/**
 * @fatdoge
 * 登录
 */
let login= function (username, password) {
    axios.post(config.loginUrl, {
        username: username,
        password: password
    })
        .then(function (res) {
            console.log(res.data);
            if(res.data.status!==200){
                console.log('登陆失败')
                Vue.prototype.$notify({
                    title: '登录失败',
                    message: '请检查账户',
                    type: 'error',
                    offset:50,
                    duration: 1000
                })
                return false;
            }else if(res.data.status===200){
                Vue.prototype.$notify({
                    title: '登录成功',
                    message: `你好,${res.data.data.nickname}!`,
                    type: 'success',
                    offset:50,
                    duration: 1000
                })
                console.log('登陆成功')
                sessionStorage.setItem('yzInfo', JSON.stringify(res.data.data));
                Bus.$emit('yzInfo',JSON.stringify(res.data.data))
                return true;
            }
        })
        .catch(function (error) {
            console.log(error);
        });  
}
/**
 * @fatdoge
 * 注册
 */
let register= function (registerParams) {
    return new Promise((resolve, reject) => {
        axios.post(config.registerUrl,registerParams)
            .then((response) => {
                resolve(response)
            }
            )
            .catch((error) => {
                reject(error)
            })
    })
}
/**
 * @fatdoge
 * 新闻版块
 */
let getNews = function () {
    return new Promise((resolve,reject)=>{
        axios.get(config.getNews)
            .then((response) => {
                resolve(response)
            }
            )
            .catch((error)=>{
                reject(error)
            })
    })
}
/**
 * @fatdoge
 * 单节课程信息
 */
let getSingleLessonInfo = function(lessonId){
    return new Promise((resolve,reject)=>{
        axios.get(config.singleLessonInfo,{
            params:{
                id: lessonId
            }
        })
            .then((response) => {
                resolve(response)
            }
            )
            .catch((error) => {
                reject(error)
            })    
    })
}
/**
 * @fatdoge
 * 获取课程列表
 */
let getLessonsList = function(){
    return new Promise((resolve, reject) => {
        axios.get(config.lessonListUrl)
            .then((response) => {
                resolve(response)
            }
            )
            .catch((error) => {
                reject(error)
            })
    })    
}
console.log('api.js loaded...')
export default {
    login,//已连接
    register,//已连接
    getNews,//已连接
    getSingleLessonInfo,
    getLessonsList
}
