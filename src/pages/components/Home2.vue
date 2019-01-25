<template>
	<div>
		<div class="homeCont">
			
			<p class="card">{{data.cardName}}</p>
			<h2>{{data.introduce}}</h2>
			<p><img :src="url+'attachManage/getAttach?attachid='+data.background"/></p>
			<p class="benefit"><span>★ 七彩卡面任意选     ★ 终身免年费     ★ 中行请你看电影
</span><span>★ 移动支付多倍积分     ★ 银联闪付月月享视频会员</span><span>★ 透支利息7折，分期手续费8.5折</span><span><div class="tips"><em @click="process" style="margin-right: 5px;text-indent: 1.1em;">办卡流程</em> | <em style="margin-left: 5px;" @click="attention">注意事项</em></div></span></p>
			
			<div class="homeBtn">
				<button @click="apply">立即申请</button>
				<button @click="upPicture">上传截图</button>
			</div>
		</div>
		<div class="foot">
			<el-row>
				<el-col :span='12'>
					<span class="iconfont"><img src="../../assets/image/home2(6).png"/><br /><i>首页</i></span>
				</el-col>
				<router-link to='/mine'>
				<el-col :span='12'>
					<span class="iconfont"><img src="../../assets/image/home2(7).png"/><br /><i>我的</i></span>
				</el-col>
				</router-link>
			</el-row>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import getUrl from '@/assets/js/getUrl.js';
	import Qs from 'qs'
	import store from '@/store';
	export default{
		name:'Home2',
		filiers:{
			img(val){
				let arr=val.split('')
				if(arr.indexOf('/')>0){
					return val
				}else{
					let url=getUrl()
					return url+'attachManage/getAttach?attachid='+val
				}
				
			}
		},
		data(){
			return{
				url:'',
				level:0,
				data:{},
				productId:''
			}
		},
		methods:{
			apply(){
				//立即申请
				window.location.href=this.data.productUrl
			},
			getRegistrationInfo(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getRegistrationInfo',
				}).then(res=>{
//					console.log(res)
					this.level=res.data.registration_info.level
					if(this.level==1){
						store.dispatch('changeLevel','second')
					}
				})
			},
			upPicture(){
				store.dispatch('getProductId',this.productId)
				this.$router.push({name:'UpPicture',params:{productId:this.productId}})
			},
			getProductList(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getProductList',
				}).then(res=>{
//					console.log(res)
					this.data=res.data.rows[0]
					this.productId=res.data.rows[0].productId
				})
			},
			process(){
				this.$router.push('/process')
			},
			attention(){
				this.$router.push('/attention')
			}
		},
		created(){
			let url=getUrl()
			this.url=url
			this.getRegistrationInfo();
			this.getProductList();
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.homeCont{
		width: 100%;
		height: 93vh;
		position: relative;
		background-image: url(../../../static/image/homeBG1.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.homeCont p{
		text-align: center;
	}
	.homeCont h2{
		color: #333333;
		font-family:Source Han Sans CN;
		font-weight:500;
		font-size: .29rem;
		text-align: center;
		margin-bottom: .20rem;
	}
	.homeCont img{
		width: 2.13rem;
		height: 1.38rem;
		margin-bottom: .3rem;
	}
	.benefit{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: left !important;
	}
	.benefit span{
		line-height:.2rem;
		width: 3.4rem;
		display: block;
		font-size: .14rem;
	}
	.card{
		text-align: center;
		font-size: .2rem;
		color: #343434;
		font-family:Source Han Sans CN;
		padding-top: .7rem;
		margin-bottom: .13rem;
	}
	.tips{
		/*display: flex;*/
		position: absolute;
		right: .12rem;
		top:.25rem;
		color: #F8681F;
		font-size: .12rem;
	}
	.tips em{
		font-style: normal;
		font-size: .14rem;
		color: #F8681F;
	}
	.homeBtn{
		text-align: center;
		margin-top: .25rem;
	}
	.homeBtn button{
		outline: none;
		width: 1.3rem;
		height: .35rem;
		margin: 0 .1rem;
		border-radius:.18rem;
		border: none;
	}
	.homeBtn button:first-child{
		background:rgba(248,104,31,1);
		font-size:.16rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.2rem;
		color:rgba(255,255,255,1);
	}
	.homeBtn button:last-child{
		font-size:.16rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.2rem;
		color:rgba(248,104,31,1);
		background:white;
		border:1px solid rgba(248,104,31,1);
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