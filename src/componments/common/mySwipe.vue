<template>
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item) in imsArray" :key="item.id"> 
                <img :src="item.img">
            </mt-swipe-item>
        </mt-swipe> -->
    <div>
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(img,index) in imgs" :key="index">
              <a :href="img.url"><img :src="img.src"></a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgs: [],
        }
    },
    props:['url'],
    created(){
        this.$http.get(this.url)
        .then(res => {
            this.imgs = res.data.message;
            console.log(this.imgs);
        })
        .catch(err => {
            console.log(err);
        })
    }
}
</script>

<style scoped>
/*轮播图样式*/
.mint-swipe{
    max-height:187px; 
}
.mint-swipe img {
    height: 100%;
}
</style>