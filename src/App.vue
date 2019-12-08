<template>
    <div class="app-container">
        <mt-header fixed title="固定在顶部"></mt-header>

		<transition>
			<router-view></router-view>
		</transition>
		<!-- <myBtn>1111</myBtn> -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge">{{pickNum}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="search">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
	import pickNumManage from './componments/common/pickNumManage.js'
    export default {
        data(){
			return {
				pickNum: 0,                //购物车数字
			}
		},
		created(){
			this.initView('home');
			pickNumManage.$on('addShopCart', num => {
				this.pickNum += num;

			});
		},
		methods:{
			initView(str){
				this.$router.push('/' + str);
			},

		}
    } 
</script>

<style scoped>
    .app-container {
        padding-top: 40px;
		overflow: hidden;
    }
	.v-enrer{
		opacity: 0;
		transform: translateX(100%);
		position: absolute;

	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;

	}
	.v-enrer-active, .v-leave-active{
		transition: all 0.5s ease;
	}


</style>


