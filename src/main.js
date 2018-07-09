// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VCharts from 'v-charts'
import router from './router'
import RightNavbar from '@/components/CircleNavbar/RightNavbar'
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';
import { Notification, Pagination,Upload,Form,FormItem,Input,Radio,RadioGroup,Button,Checkbox,CheckboxGroup,DatePicker,TimePicker,Select,Option,Col,Row } from 'element-ui';
import api from '../static/api/api'
Vue.prototype.$api = api
Vue.prototype.$notify = Notification;
import CommentGrid from 'vue-comment-grid'
import VueStar from 'vue-star'
Vue.component('VueStar', VueStar)
Vue.use(CommentGrid)
Vue.use(VueLazyload);
Vue.use(VueResource);
Vue.use(Pagination);
Vue.use(Upload);
Vue.use(Form);
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Col)
Vue.use(Row)
Vue.use(VCharts)
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.component('right-navbar', RightNavbar)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
