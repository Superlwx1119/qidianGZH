<template>
	<div class="memberCenter">
		<div class="personalMsg">
			<p><img :src="data.headImgUrl"/></p>
			<p>{{data.xm}}</p>
			<p><span>已上传截图数:{{data.uploadNum }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>审核通过截图:{{data.throughNum}}</span></p>
		</div>
		<div class="handle">
			<router-link to='/uploadRecord'><p class="iconfont handleP"><span><img class="up" src="../../../assets/image/PC (6).png"/>我的上传记录</span><span class="iconfont"><img class="right" src="../../../assets/image/PC (2).png"/></span></p></router-link>
			<router-link to='/beAgent'><p class="iconfont "><span><img class="be" src="../../../assets/image/PC (5).png"/>申请成为合伙人</span><span class="iconfont"><img class="right" src="../../../assets/image/PC (2).png"/></span></p></router-link>
		</div>
		<div class="instructions">
			<p class="iconfont instructionsP" @click="schoolMsg"><span><img class="up" src="../../../assets/image/PC (6).png"/>学校查询</span><span class="iconfont"><img class="right" src="../../../assets/image/PC (2).png"/></span></p>
			<p class="iconfont"><span><img class="be" src="../../../assets/image/PC (1).png"/>合作电话</span><span class="tel">15111248787</span></p>
		</div>
		<div class="foot">
			<el-row>
				<router-link to='/home2'>
				<el-col :span='12'>
					<span class="iconfont"><img src="../../../assets/image/PC (4).png"/><br /><i>首页</i></span>
				</el-col>
				</router-link>
				<el-col :span='12'>
					<span class="iconfont"><img src="../../../assets/image/PC (3).png"/><br /><i>我的</i></span>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/getUrl.js';
	import axios from 'axios'
	import Qs from 'qs'
	export default{
		name:'Mine',
		data(){
			return{
				data:{},
				url:'',
			}
		},
		methods:{
			getRegistrationInfo(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getRegistrationInfo',
				}).then(res=>{
//					console.log(res)
					this.data=res.data.registration_info
				})
			},
			schoolMsg(){
				this.$router.push('/schoolMsg')
			}
		},
		created(){
			let url=getUrl()
			this.url=url
			this.getRegistrationInfo()
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.memberCenter{
		background:rgba(245,245,245,1);
		height: 100vh;
	}
	header{
		display: flex;
		justify-content: space-between;
		height: .44rem;
		color: white;
		padding: 0 .2rem;
		background: #1A191F;
		line-height: .44rem;
	}
	header span{
		font-size: .16rem;
		color: white;
	}
	header span:last-child{
		font-size: .22rem;
		
	}
	header p{
		margin-left: -.3rem;
		font-size: .18rem;
		color: white;
	}
	.personalMsg{
		margin-bottom: .1rem;
		background:linear-gradient(348deg,rgba(255,72,0,1) 0%,rgba(255,132,23,1) 100%);
		height: 1.8rem;
		text-align: center;
	}
	.personalMsg img{
		height: .65rem;
		width: .65rem;
		border-radius: 50%;
		margin: .3rem 0 .2rem 0;
		background: white;
	}
	.personalMsg p{
		font-size: .16rem;
		font-family:Source Han Sans CN;
		color:rgba(255,255,255,1);
	}
	.personalMsg p span{
		font-size: .12rem;
		font-weight:400;
	}
	.handle{
		background: white;
	}
	.handle p{
		margin: 0 .2rem;
		height: .45rem;
		display: flex;
		font-size: .15rem;
		justify-content: space-between;
		line-height: .45rem;
		background: white;
	}
	.handle span{
		color: #666666;
	}
	.instructions{
		background: white;
	}
	.instructions span{
		color: #666666;
	}
	.be{
		width: .18rem;
		height: .18rem;
		margin-right: .1rem;
	}
	.up{
		margin-right: .1rem;
		width: .18rem;
		height: .15rem;
	}
	.right{
		width: .07rem;
		height: .12rem;
	}
	.handleP{
		border-bottom: 1px solid #EEEEEE;
	}
	.instructions p{
		background: white;
		margin: 0 .2rem;
		display: flex;
		color: #666666;
		justify-content: space-between;
		height: .45rem;
		line-height: .45rem;
	}
	.instructions p:first-child{
		margin-top: .1rem;
	}
	.instructionsP{
		border-bottom: 1px solid #EEEEEE;
	}
	.tel{
		color: #999999 !important;
	}
	.foot{
		position: absolute;
		bottom: 0;
		background:rgba(255,254,255,1);
		border-top: 1px solid rgba(238,238,238,1);
		text-align: center;
		width: 100%;
		height: .5rem;
	}
	.foot .iconfont{
		font-size: .20rem;
		line-height: .20rem;
		height: .2rem;
		display: block;
		padding-top: .05rem;
	}
	.foot i{
		font-style: normal;
		color: #999999;
		font-size: .12rem;
	}
	.foot img{
		width: .2rem;
		height: .2rem;
	}
</style>