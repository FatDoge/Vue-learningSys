<template>
<div class="course">
        <div class="right-course">
            <h2>上传课程</h2>
        </div>
<el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <el-form-item>
        <el-upload
        class="upload-demo"
        ref="upload"
        action="http://up.qiniu.com"
        :file-list="fileList"
        :auto-upload="false"
        :on-error="onError"
        :on-success="onSuccess"
        :before-upload="judgeType"
        :data="qiniuInfo"
        :limit="1"
        :on-exceed="overSize">
        <el-button slot="trigger" size="huge" type="primary">选取视频<i class="el-icon-upload el-icon--right"></i></el-button>
        <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过500mb</div>
        </el-upload>
    </el-form-item>
  <el-form-item label="课程名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="学科" prop="region">
    <el-select  placeholder="请选择课程类别" v-model="form.region">
      <el-option label="计算机" value="jisuanji"></el-option>
      <el-option label="金融" value="jinrong"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="课程标签" prop="type">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="Web开发" name="type"></el-checkbox>
      <el-checkbox label="Vue" name="type"></el-checkbox>
      <el-checkbox label="javascript" name="type"></el-checkbox>
      <el-checkbox label="MVVM" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="课程权限" prop="resource">
    <el-radio-group v-model="form.resource">
      <el-radio label="公有"></el-radio>
      <el-radio label="私有"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="课程简介" prop="desc">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit('form')" type="primary">立即上传</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          userId:JSON.parse(sessionStorage.getItem('yzInfo')).userid,
          lessonUrl:'http://owmhe4011.bkt.clouddn.com/'
        },
        qiniuInfo:{
          token:"",
        },
        rules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择课程类别', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择课程权限', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写课程简介', trigger: 'blur' }
          ]
        },
        fileList: [],
        file:'',
        bucketHost: '',   // 上传视频的外链域名
        lessonUrl:''
      }
    },
    methods: {
      onSuccess:function(response,file,fileList){
      console.log(response);
      this.form.lessonUrl='http://owmhe4011.bkt.clouddn.com/'+response.hash;
      this.$api.sendNewLessonInfo(this.form)
      .then(
        (response)=>{
          console.log(response);
          this.$message(response.data.msg)
        }
      )
      .catch(
        (reject)=>{
          console.log(reject);
        }
      )
      },
      onError:function(err,file,fileList){
        console.log('失败',err);
      },
      onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
          if (valid) {  
            this.$api.getQiniuToken()
      .then(response => {
        this.qiniuInfo.token= response.data.token
        this.$message('授权成功,开始上传...')
           this.$refs.upload.submit();
      })
      .catch(reject=>{
        console.log(reject)
      })

         
        console.log('表单信息',this.form);
          } else {
            this.$message.error('未选择视频!');
            return false;
          }
        });
      },
      judgeType(file) {
        const isVideo = file.type === 'video/mp4';
        if (!isVideo) {
          this.$message.error('只支持上传mp4格式视频');
        }
        return isVideo;
      },
      overSize(file){
        this.$message.error('超出个数')
        return false;
      }
    }
  }
</script>
<style>
.yzButton{
    color: white;
    background: #48cfad;
}
.yzButton:hover{
    background: white;
    color: #48cfad;
    border: 1px solid #48cfad;
}
.el-upload__input {
    display: none!important;
}
.upload-demo{
    margin-top:-40px;
}
</style>
