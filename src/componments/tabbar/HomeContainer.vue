<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item) in imsArray" :key="item.id"> 
                <img :src="item.img">
            </mt-swipe-item>
        </mt-swipe>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to="{name: 'photo.share'}">
                    <img src="../../images/menu2.png" alt="">                    
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to="{name: 'goods.list'}">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品展示</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="">                    
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>        
            
		</ul>

    </div>
</template>

<script>
export default {
    data(){
        return {
            //保存轮播图数组
            imsArray: [{
                    id: 0,
                    img: 'https://tpc.googlesyndication.com/simgad/7483563517925595185?sqp=4sqPyQQrQikqJwhfEAEdAAC0QiABKAEwCTgDQPCTCUgAUAFYAWBfcAJ4AcUBLbKdPg&rs=AOga4qn_VzDwo8RmXwAciEOLLRT0gqvL8A'
                },
                {
                    id: 2,
                    img: 'https://tpc.googlesyndication.com/simgad/7483563517925595185?sqp=4sqPyQQrQikqJwhfEAEdAAC0QiABKAEwCTgDQPCTCUgAUAFYAWBfcAJ4AcUBLbKdPg&rs=AOga4qn_VzDwo8RmXwAciEOLLRT0gqvL8A' 
                },
                {
                    id: 3,
                    img: 'https://tpc.googlesyndication.com/simgad/7483563517925595185?sqp=4sqPyQQrQikqJwhfEAEdAAC0QiABKAEwCTgDQPCTCUgAUAFYAWBfcAJ4AcUBLbKdPg&rs=AOga4qn_VzDwo8RmXwAciEOLLRT0gqvL8A'
                }
            ],
            pageViewUrl:  'https://tpc.googlesyndication.com/simgad/7483563517925595185?sqp=4sqPyQQrQikqJwhfEAEdAAC0QiABKAEwCTgDQPCTCUgAUAFYAWBfcAJ4AcUBLbKdPg&rs=AOga4qn_VzDwo8RmXwAciEOLLRT0gqvL8A'
        };
    },

    created(){
        //this.getImgs();
    },
    methods: {
        //获取轮播图方法
        getImgs() {
            this.$http.get().then(response =>{
                console.log(response);
                this.imsArray = response.data;
            });
        }
    }
}
</script>

<style scoped>
    .mint-swipe{
       height: 200px; 
    }
    .mint-swipe-item:nth-child(1){
        background-color: red;
    }    
    .mint-swipe-item:nth-child(2){
        background-color: blue;
    }    
    .mint-swipe-item:nth-child(3){
        background-color: pink;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border: none;
    }
    .mui-grid-view.mui-grid-9 > img{
    
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0;
    }
    .mui-media-body{
        font-size: 13px;
    }

</style>