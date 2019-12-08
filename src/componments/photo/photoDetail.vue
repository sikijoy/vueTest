<template>
    <div class="tmpl">

        <navBar title="图片详情"></navBar>
        
        <div class="photo-title">
            <p v-text="imgInfo.title"></p>
            <span>发起日期：{{ imgInfo.add_time | converDate }}</span>
            <span>{{ imgInfo.click }}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li v-for="(img, index) in imgs"  :key="index"  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <img :src="img.src">
                <!-- <img class="preview-img" :src="img.src" @click="$preview.open(index, imgs)"> -->
                 <!-- <vue-preview :slides="imgs" class="imgPrev"></vue-preview> -->
            </li>
           
        </ul>
        <div class="photo-desc">
            <p v-html="imgInfo.content"></p>
        </div>
        <!-- 评论使用子组件 -->
        <comment :imgId="imgId"></comment>

    </div>
</template>
<script>
export default {
    data(){
        return {
            imgs: [],            //存放缩率图
            imgInfo: {},         //详情数据对象
            imgId: this.$route.params.id,  //获取路由参数 对应图片id
        }
    },
    
    created(){
      this.getData();
    },
    methods: {
        getData() {
            //2:发起请求2个
            this.getImgData(this.imgId);
            this.getTextData(this.imgId);
           // this.loadFirstCommentData();
            //3:放上数据
        },

        //缩略图
        getImgData(id){
            this.$http.get('getthumimages/' + id)
            .then(res => {
                this.imgs = res.data.message;
                this.imgs.forEach( ele => {
                    ele.w = 600;   //设置以大图浏览时的宽度
                    ele.h = 400;   //设置以大图浏览时的高度
                    ele.src = item.img_url;  //大图
                    ele.msrc = item.img_url;  //小图
                })
            })
        .catch(err => {
            console.log(err)
            }) 
        },

        //图片详情
        getTextData(id){   
            this.$http.get('getimageInfo/' + id)
            .then(res => {
                //一个id对应一个详情对象
                this.imgInfo = res.data.message[0];
            })
            .catch(err => {
                console.log(err)
            });
        },
    },
}


</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}

</style>
