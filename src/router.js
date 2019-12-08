
import VueRouter from 'vue-router';

//导入对应路由规则
import HomeContainer from './componments/tabbar/HomeContainer.vue'
import MemberContainer from './componments/tabbar/MemberContainer.vue'
import SearchContainer from './componments/tabbar/SearchContainer.vue'
import ShopcarContainer from './componments/tabbar/ShopcarContainer.vue'
import NewsList from './componments/news/newsList.vue'
import NewsDetail from './componments/news/newsDetail.vue'
import PhotoShare from './componments/photo/photoShare.vue'
import PhotoDetail from './componments/photo/photoDetail.vue'
import GoodsList from './componments/goods/goodsList.vue'
import GoodsDetail from './componments/goods/goodsDetail.vue'

var routerObj = new VueRouter({
    routes: [
       { path: '/home', component: HomeContainer },                         //首页
       { path: '/member', component: MemberContainer },                     //会员
       { path: '/search', component: SearchContainer },                     //购物车
       { path: '/shopcar', component: ShopcarContainer },                   //查找
       { path: '/home/newslist', component: NewsList },                     //新闻列表
       { name: 'news.detail', path: '/news/detail', component: NewsDetail},  //新闻详情
       { name: 'photo.share', path: '/photo/share', component: PhotoShare},  //图文分享
       { name: 'photo.detail', path: '/photo/detail/:id', component: PhotoDetail},  //图文详情
       { name: 'goods.list', path:'/goods/list', component: GoodsList},             //商品列表
       { name: 'goods.detail', path: '/goods/detail', component: GoodsDetail},       //商品详情
    ],
    linkActiveClass: 'mui-active'   //设置连接激活时使用css类 router-link-active  
    
})

export default routerObj;