import axios from 'axios'
import config from './config'
import Vue from 'Vue'
import { Notification} from 'element-ui'
Vue.prototype.$notify = Notification;
import Bus from '../../src/components/Bus'
import { resolve } from 'url';
axios.defaults.withCredentials = true
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
                Bus.$emit('userId', res.data.data.userid)
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
 * 退出
 */
let exit = function () {
    return new Promise((resolve, reject) => {
        axios.post(config.exitUrl)
            .then((response) => {
                resolve(response)
                Bus.$emit('isLogin', false)
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
        axios.post(config.getNews)
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
        axios.post(config.singleLessonInfo,{
                id: lessonId
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
 * 查找课程
 */
let searchLessons = function (keyword) {
    return new Promise((resolve, reject) => {
        axios.post(config.lessonSearchUrl,{
            className:keyword
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
 * 校内课程列表
 */
let getLessonsList = function (keyword) {
    return new Promise((resolve, reject) => {
        axios.post(config.lessonSearchUrl,{
            className:''
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
 * 更新历史记录
 */
let updateHistory = function (classId,rate) {
    return new Promise((resolve, reject) => {
        axios.post(config.updateHistoryUrl, {
            classId: classId,
            rate:rate
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
 * 获取历史记录
 */
let getHistory = function () {
    return new Promise((resolve, reject) => {
        axios.post(config.getHistoryUrl)
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
 * 删除历史记录
 */
let deleteHistory = function () {
    return new Promise((resolve, reject) => {
        axios.post(config.deleteHistoryUrl)
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
 * 获取收藏夹
 */
let getCollection = function () {
    return new Promise((resolve, reject) => {
        axios.post(config.getCollectionUrl)
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
 * toggle收藏项目
 */
let toggleCollection = function (classId) {
    return new Promise((resolve, reject) => {
        axios.post(config.toggleCollectionUrl,{
            id:classId
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
console.log('api.js loaded...')
export default {
    login,//已连接
    register,//已连接
    exit,//
    getNews,//已连接
    getSingleLessonInfo,//已连接
    getLessonsList,//已连接
    searchLessons,//已连接 
    updateHistory,//已连接
    getHistory,//已连接
    deleteHistory,//已连接
    getCollection,//已连接
    toggleCollection,//已连接
}
