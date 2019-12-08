<template>
    <div class="tmpl">
        <navBar title="图文分享"></navBar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="(category, index) in categorys" :key="index">
                    <a href="javascript:;" @click="getImg(category.id)">{{ category.title }}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link :to="{name: 'photo.detail', params: {id: img.id}}">
                        <!-- 懒加载 -->
                        <img v-lazy="img.img_url">
                        <p>
                            <span>{{ img.title }}</span>
                            <br>
                            <span>{{ img.zhaoyao }}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                categoryData: {},
                categorys: [],            //分类
                imgs: [],                //图片数据
            }
        },
        created(){
            this.initData();


        },
        methods: {

            //发起请求获取导航栏数据
            getHttpData(){
                this.$http.get('getimgcategory')
                .then(res => {
                   this.categorys = res.data.message;
                   this.categorys.unshift({
                        id: 0, title: '全部'
                })

                })
                .catch(err => console.log(err));
            },

            //
            getData(){
                this.categoryData = {status: 0, message: [
                                    {title: "家具生活", id: 14},
                                    {title: "摄影生活", id: 15},
                                    {title: "明星美女", id: 16},

                                ]}
                this.categorys = this.categoryData.message;
                this.categorys.unshift({
                    id: 0, title: '全部'
                })
            },

            //根据id获取 图片数据
            getImg(id){
                this.$http.get('getimages/'+ id)
                .then(res => {
                    this.imgs = res.data.message;
                })
                .catch(err => {
                    console.log(err);
                })
            },

           initData(){
               this.getImg(0);
               this.getHttpData();
           },
        }
    }
</script>
<style  scoped>
    .photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}

/* 懒加载图片样式 */
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>



