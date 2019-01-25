<template>
	<div class="integral">
		<div class="current">
			<span>当前奖励金</span>
			<p>{{data.bonus}}</p>
			<em class="iconfont" @click="showRules">&#xe66b;奖励金规则</em>
		</div>
		<div class="getIntegral" ref='wapper'>
			<ul>
				<li v-for="item of bonuslList" >
					<p>{{item.xm}} — 截图审核通过<br /><span>{{item.insTime}}</span></p>
					<i>+{{item.newBonus-item.oldBonus}}</i>
				</li>
			</ul>
		</div>
		<BonusRules v-if='showRule' @close='close'/>
	</div>
</template>

<script>
	import BonusRules from './BonusRules'
	import getUrl from '@/assets/js/getUrl.js';
	import axios from 'axios'
	import BScroll from 'better-scroll'
	import Qs from 'qs'
	export default{
		name:'Bonus',
		components:{
			BonusRules
		},
		data(){
			return{
				showRule:false,
				bonuslList:[],
				data:{},
				url:''
			}
		},
		methods:{
			close(){
				//关闭规则
				this.showRule=false
			},
			showRules(){
				this.showRule=true
			},
			getBonusDetail(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getBonusDetail',
				}).then(res=>{
					console.log(res)
					this.bonuslList=res.data.rows
					this.data=res.data.registration_info
				})
			}
		},
		mounted(){
			let url=getUrl()
			this.url=url
			this.getBonusDetail();
			this.scroll= new BScroll (this.$refs.wapper, {click: true})
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.integral{
		background: #F5F5F5;
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
	.shore{
		font-size: .22rem;
		
	}
	header p{
		margin-left: -.3rem;
		font-size: .18rem;
		color: white;
	}
	.current{
		position: relative;
		height: 22.5vh;
		background:linear-gradient(348deg,rgba(255,72,0,1) 0%,rgba(255,132,23,1) 100%);
		text-align: center;
		color: white;
	}
	.current span{
		display: inline-block;
		margin-top: .5rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.24rem;
		font-size: .15rem;
		
	}
	.current p{
		font-size: .36rem;
		font-weight: 500;
	}
	
	.current em{
		position: absolute;
		top: .16rem;
		right: .16rem;
		color: white;
	}
	.getIntegral{
		background: white;
		height: 77.5vh;
		overflow: hidden;
	}
	.getIntegral li{
		height: .6rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 .15rem;
		border-bottom: 1px solid #E5E5E5;
	}
	.getIntegral p{
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.18rem;
		font-size: .15rem;
		color:rgba(102,102,102,1);
	}
	.getIntegral span{
		font-size:.12rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.14rem;
		color:rgba(153,153,153,1)
	}
	.getIntegral i{
		font-size:.15rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.14rem;
		font-style: normal;
		color:rgba(248,104,31,1);
	}
</style>