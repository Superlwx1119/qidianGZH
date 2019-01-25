<template>
	<div class="mymsg">
		<div class="msg">
			<p><span>姓名</span><em>{{data.xm}}</em></p>
			<p><span>手机号</span><em>{{data.mobile}}</em></p>
			<p><span>学校</span><em>{{data.schoolName}}</em></p>
		</div>
		<div class="IDcard">
			<p><span>身份证照片</span><span class="iconfont"></span></p>
			<p><span><img :src="data.idCardPositive|img"/><br />身份证正面</span><span><img :src="data.idCardPeverse|img" /><br />身份证反面</span></p>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import getUrl from '@/assets/js/getUrl.js';
	export default{
		name:'MyMsg',
		filters:{
			img(val){
				let url=getUrl()
				return url+'attachManage/getAttach?attachid='+val
				
			}
		},
		data(){
			return{
				data:{},
				url:''
			}
		},
		methods:{
			getRegistrationDetail(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getRegistrationDetail',
				}).then(res=>{
//					console.log(res.data.registration_info)
					this.data=res.data.registration_info
				})
			}
		},
		mounted(){
			let url=getUrl()
			this.url=url
			this.getRegistrationDetail();
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.mymsg{
		background: #F5F5F5;
		height: 100vh;
	}
	.msg{
		background: white;
		margin-bottom: .1rem;
	}
	.msg p{
		height: .45rem;
		padding: 0 .3rem;
		display: flex;
		justify-content: space-between;
		line-height: .45rem;
		font-size: .15rem;
		border-bottom: 1px solid gainsboro;
	}
	.IDcard{
		background: white;
		margin-bottom: .1rem;
	}
	.IDcard p img{
		width: 1.5rem;
		height: 1.3rem;
	}
	.IDcard p:last-child{
		height: 2rem;
	}
	.IDcard p:last-child span{
		margin: .2rem 0;
		text-align: center;
	}
	.IDcard p{
		height: .45rem;
		padding: 0 .3rem;
		display: flex;
		justify-content: space-between;
		line-height: .45rem;
		border-bottom: 1px solid gainsboro;
		border-left: none;
		border-right: none;
	}
	.life{
		background: white;
	}
	.life p{
		height: .4rem;
		padding: 0 .3rem;
		display: flex;
		border-left: none;
		border-right: none;
		justify-content: space-between;
		line-height: .4rem;
		border: 1px solid gainsboro;
	}
</style>