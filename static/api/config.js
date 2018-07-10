/**
 * 接口地址
 */
let url = 'http://192.168.2.136:8080'
export default {
    // 登录接口
    loginUrl:`${url}/user/confirm`,
    // 注册接口
    registerUrl: `${url}/user/register`,
    // 新闻接口
    getNews:`${url}/news/query`,
    // 单节课程接口
    singleLessonInfo:`${url}/class/get`,
    //课程列表接口
    lessonListUrl: `${url}/class/query`,
    //课程查询接口
    lessonSearchUrl:`${url}/class/query`,
    //历史记录
    updateHistoryUrl: `${url}/history/update`
}