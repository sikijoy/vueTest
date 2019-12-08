<template>
     <!-- 评论内容start -->
        <div class="photo-bottom">
            <ul>
                <li>
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goBack">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="userMsg" cols="30" rows="10"></textarea>
                </li>
                <li>
                    <myBtn size="large" type="primary" @click="sendMsg">发表评论按钮</myBtn>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(item, index) in comments" :key="index">
                    {{item.user_name}}：{{item.content}} {{item.add_time | converDate}}
                </li>
            </ul>
            <myBtn size="large" type="danger" plain @click="loadByPage(imgId)">加载更多按钮</myBtn>
        </div>
        <!-- 评论内容end -->
</template>

<script>
export default {
    data(){
        return {
            comments: [],        //存放评论数据
            pageIndex: 1,       //页码
            userMsg: '',              //用户评论数据
        }
    },
    props: ['imgId'],
    created(){
        this.initData()
    },
    methods: {
        //初始化数据
        initData(){
            this.loadFirstCommentData();
        },
        //初始化 第一次获取评论数据
        loadFirstCommentData(){
            this.getCommentData(this.imgId, 1);
        },
        //获取评论数据
        getCommentData(id, pageIndex){
            this.$http.get('getcomments/' + id + '?pageindex=' + pageIndex)
            .then(res => {
                this.comments = res.data.message;
                console.log(this.comments);
            })
            .catch(err => {
                console.log(err);
            })
        },
        //追加评论数据
        addCommentData(id){
             this.$http.get('getcomments/' + id + '?pageindex=' + (++this.pageIndex))
            .then(res => {
                this.comments = this.comments.concat(res.data.message);
            })
            .catch(err => {
                console.log(err);
            })
        },
        //发送评论 并且更新评论数
        loadByPage(id){
            this.addCommentData(id, this.pageIndex);
        }, 
        //发表评论
        sendMsg(id){
            this.$http.post('postcomment/' + id, 'content=' + this.userMsg)
            .then(res => {
                console.log(res);
                this.loadFirstCommentData();
                this.clearText();
            })
            .catch(err => {
                console.log(err);
            })
        },
        //清空文本
        clearText(){
            this.userMsg = ''; 
        },
        //返回
        goBack(){
            this.$router.go(-1);
        }
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
    /* 评论样式 */
.photo-comment > div span:nth-child(1){
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2){
    float: right;
}

.photo-comment{
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment{
    padding: 5 5;
}

.txt-comment textarea{
    margin-bottom: 5px;

}

.comment-list li{
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

</style>>
