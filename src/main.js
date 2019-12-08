// 将 main1.js 中的 router 模块  提取分离 出来 后的 结果

import Vue from 'vue';
Vue.config.devtools = true      // 解决 Vue.js not detected
//手动安装 VueRouter 
import VueRouter from 'vue-router'

// import VueResource from 'vue-resource'
// vue.use(VueResource);

import axios from 'axios'
import VueAxios from 'vue-axios'         //网络通讯
import VuePreview from 'vue-preview'     //预览图
import qs from 'qs.js'

Vue.use(VueAxios, axios);
axios.defaults.baseURL="http://www.liulongbin.top:3005/api/";  // 全局设置 服务器设置
//Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
//Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs


Vue.use(VuePreview);

import { Button, Header, Swipe, SwipeItem, Lazyload, Indicator, Loadmore } from 'mint-ui'
import 'mint-ui/lib/style.css'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'

import './css/global.css'

//axios拦截器  操作
axios.interceptors.request.use((config) => {
    // 显示拦截图片
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
    return config
});
axios.interceptors.response.use((config) => {
    //隐藏图片
    Indicator.close();
    //获取到config中的data 进行加工
    return config;
});

import Moment from 'moment'

import NavBar from './componments/common/navBar.vue'
import Comment from './componments/common/comment.vue'
import MySwipe from './componments/common/mySwipe.vue'

//使用Vue.component  注册组件
Vue.component('myBtn', Button);
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.use(Lazyload);                     //懒加载

Vue.component('navBar', NavBar);
Vue.component('comment', Comment);
Vue.component('mySwipe', MySwipe);


//创建路由对象
Vue.use(VueRouter);

//全局过滤器注册start
Vue.filter('converDate', function(value) {
    return Moment(value).format('YYYY-MM-DD');
})

//全局过滤器注册end

//引入组件
import app from './App.vue';

//导入自定义的路由模块
import routerObj from './router.js'
import { format } from 'path';

var vm = new Vue({
    el: '#app',
    //将 路由对象 挂载到vm上
    router: routerObj,
    render: c => c(app),
//    components: { app },
//    template: '<App/>',
});


