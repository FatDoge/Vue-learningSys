/**
 * 接口地址
 */
let url = 'http://hduzjh.cn/LearningSys'
export default {
    // 登录接口
    loginUrl:`${url}/user/confirm`,
    //退出接口
    exitUrl: `${url}/user/exit`,
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
    //更新历史记录
    updateHistoryUrl: `${url}/history/update`,
    //获取历史记录
    getHistoryUrl: `${url}/history/query`,
    //清空历史记录
    deleteHistoryUrl: `${url}/history/delete`,
    //收藏项目toggle
    toggleCollectionUrl: `${url}/favourite/addanddelete`,
    //查看收藏夹
    getCollectionUrl: `${url}/favourite/query`,
    //获取token
    getQiniuTokenUrl: `${url}/class/upload`,
    //发送课程信息
    sendNewLessonInfoUrl: `${url}/class/save`,
    //获取高权限用户个人上传视频列表
    getPersonalVideosListUrl: `${url}/class/getteacher`,
    //高权限用户删除个人上传视频
    deletePersonalVideoUrl: `${url}/class/delete`
}