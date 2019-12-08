<template>
	<div class="tmpl">
		<div>
        	<navBar title="新闻列表"></navBar>
			<!-- 图文列表 -->
        	<ul class="mui-table-view">
				<li v-for="(news, index) in imsList" :key="index"
				class="mui-table-view-cell mui-media">
					<router-link :to="{name: 'news.detail', query: {id: news.id}}">
						<img class="mui-media-object mui-pull-left" :src="news.img_url">
						<div class="mui-media-body">
							<span>{{ news.title }}</span>
							<div class="news-desc">
								<p>点击数：{{ news.click }}</p>
								<p>发表时间: {{ news.add_time | converDate }}</p>
							</div>	
						</div>
					</router-link>
				</li>

			</ul>
    	</div>
	</div>
</template>

<script>
export default {
    data(){
		return {
			imsList: [],             //新闻列表数据

		}
	},
	created(){
		this.getNewsData();
	},
	methods: {
		
		getNewsData() {
			this.$http.get('getnewslist')
			.then(res => {
				this.imsList = res.data.message;
				console.log(this.imsList);
			})
		},
		getNewsData1() {
			this.imsList = [
								{ add_time: "2015-04-16T03:50:28.000Z", click: 1, title: '幸福', content: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？', id: 0,
				  img_url: 'https://pics3.baidu.com/feed/d4628535e5dde711041a20b852b9641e9c166114.png?token=3ef1b5aa9fb6c3f856a3f693ea442d60&s=21715B249D722BB742455D0B03001091'
				},
				{ add_time: "2015-04-16T03:50:28.000Z", click: 1, title: '木屋', content: '想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.', id: 1,
				  img_url: 'https://pics3.baidu.com/feed/d4628535e5dde711041a20b852b9641e9c166114.png?token=3ef1b5aa9fb6c3f856a3f693ea442d60&s=21715B249D722BB742455D0B03001091'
				},
				{ add_time: "2015-04-16T03:50:28.000Z", click: 1, title: 'CBD', content: '烤炉模式的城，到黄昏，如同打翻的调色盘一般.', id: 2,
				  img_url: 'https://pics3.baidu.com/feed/d4628535e5dde711041a20b852b9641e9c166114.png?token=3ef1b5aa9fb6c3f856a3f693ea442d60&s=21715B249D722BB742455D0B03001091'
				},
				{ add_time: "2015-04-16T03:50:28.000Z", click: 1, title: '幸福', content: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？', id: 3,
				  img_url: 'https://pics3.baidu.com/feed/d4628535e5dde711041a20b852b9641e9c166114.png?token=3ef1b5aa9fb6c3f856a3f693ea442d60&s=21715B249D722BB742455D0B03001091'
				},
				{ add_time: "2015-04-16T03:50:28.000Z", click: 1, title: '幸福', content: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？', id: 4,
				  img_url: 'https://pics3.baidu.com/feed/d4628535e5dde711041a20b852b9641e9c166114.png?token=3ef1b5aa9fb6c3f856a3f693ea442d60&s=21715B249D722BB742455D0B03001091'
				},
			]
		}
	},

}
</script>

<style scoped>
.mui-media-body{
	color: #0bb0f5
}

.news-desc p:nth-child(1){
	float: left;
}

.news-desc p:nth-child(2){
	float: right;
}
</style>