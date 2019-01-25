<template>
	<div class="agent" ref='wapper'>
		<div class="cont">
			<div class="agentMsg" @click="myMsg">
				<img :src="data.headImgUrl" />
				<div>
					<h2>{{data.xm}}</h2>
					<p><span>已上传截图数:<i>{{data.uploadNum}}</i>张</span><span>审核通过截图:<i>{{data.throughNum}}</i>张</span></p>
				</div>
			</div>
			<div class="agentBenefits">
				<p @click="integral"><em>{{data.integral}}</em><br /><span>积分</span></p>
				<p class="middleP"></p>
				<p @click="bonus" ><em>{{data.bonus}}</em><br /><span>奖励金</span></p>
				<p class="middleP"></p>
				<p @click="members"><em>{{data.membersNum}}</em><br /><span>会员数</span></p>
			</div>
		</div>
		<div class="Signin">
			<p @click="today" class="iconfont handleP"><span><img src="../../../../../assets/image/agent (5).png"/>每日签到</span><span class="iconfont">{{txt}}<img class="right" src="../../../../../assets/image/PC (2).png" /></span></p>
			<p class="iconfont handleP" @click="uploadrecord"><span><img src="../../../../../assets/image/PC (6).png"/>我的上传记录</span><span class="iconfont"><img class="right" src="../../../../../assets/image/PC (2).png" /></span></p>
		</div>
		<div class="Mybenifit">
			<p class="iconfont handleP" @click="myMemberUp"><span><img src="../../../../../assets/image/PC (6).png"/>会员上传记录</span><span class="iconfont"><img class="right" src="../../../../../assets/image/PC (2).png" /></span></p>
			<p class="iconfont handleP" @click="benefits"><span><img src="../../../../../assets/image/PC (5).png"/>关于合伙人</span><span class="iconfont"><img class="right" src="../../../../../assets/image/PC (2).png" /></span></p>
			<p class="iconfont handleP" @click="shore"><span><img src="../../../../../assets/image/agent (4).png"/>我的专属会员码</span><span class="iconfont"><img class="right" src="../../../../../assets/image/PC (2).png" /></span></p>
		</div>
		<div class="seachSchool">
			<p @click="schoolMsg" class="iconfont handleP"><span><img src="../../../../../assets/image/agent (1).png"/>学校信息查询</span><span class="iconfont"><img class="right" src="../../../../../assets/image/PC (2).png" /></span></p>
		</div>
		<div class="foot">
			<el-row>
				<router-link to='/home2'>
				<el-col :span='12'>
					<span class="iconfont"><img src="../../../../../assets/image/PC (4).png"/><br /><i>首页</i></span>
				</el-col>
				</router-link>
				<el-col :span='12'>
					<span class="iconfont"><img src="../../../../../assets/image/PC (3).png"/><br /><i>我的</i></span>
				</el-col>
			</el-row>
		</div>
		<div class="tips" style="display: none;">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
		        <div class="weui-dialog__bd">身份转换成功</div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="close" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
		        </div>
		    </div>
		</div>
		<SignIn :succ='succ' :error='error' v-if='showIn' class='sign' @close='close'/>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import SignIn from './SignIn'
	import store from '@/store';
	import getUrl from '@/assets/js/getUrl.js';
	import axios from 'axios'
	import Qs from 'qs'
	export default{
		name:'Agent',
		components:{
			SignIn
		},
		data(){
			return{
				data:{},
				txt:'今日未签到',
				showIn:false,
				error:'',
				succ:false,
				url:''
			}
		},
		methods:{
			today(){
				//签到
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/addSignIn',
				}).then(res=>{
					this.showIn=true
//					console.log(res)
					if(res.data.error_code==0){
						this.error='签到成功！'
						this.getMyMsg();
						this.succ=true
					}else{
						this.error=res.data.error_message
					}
					
				})
			},
			shore(){
//				this.$router.push('/shore?code='+this.$store.state.code)
//				this.$router.push({name:'Shore',query:{code:this.$store.state.code}})
				window.location.href=this.url+'terminal/dist/getQrcode/index.html?extCode='+this.$store.state.code
			},
			benefits(){
				this.$router.push('/benefits')
			},
			schoolMsg(){
				//学校查询
				this.$router.push('/schoolMsg')
			},
			uploadrecord(){
				//我的上传记录
				this.$router.push('/uploadrecord')
			},
			myMemberUp(){
				//我的会员记录
				this.$router.push('/memberUp')
			},
			myMsg(){
				//查看个人信息
				this.$router.push('/MyMsg')
			},
			integral(){
				//查看积分
				this.$router.push('/integral')
			},
			bonus(){
				//查看奖励金
				this.$router.push('/bonus')
			},
			members(){
				//查看会员数
				this.$router.push('/members')
			},
			getMyMsg(){
				//获取个人信息
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getRegistrationInfo',
				}).then(res=>{
//					console.log(res)
					store.dispatch('getCode',res.data.registration_info.code)
					this.data=res.data.registration_info
					if(this.data.signNum==1){
						this.txt='今日已签到'
					}
				})
			},
			close(){
				$('.tips').css('display','none')
				this.showIn=false
			}
		},
		mounted(){
			let url=getUrl()
			this.url=url
			this.scroll= new BScroll (this.$refs.wapper, {click: true})
			this.getMyMsg();
			if(this.$route.params.show){
				$('.tips').css('display','block')
			}
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.agent{
		height: 100vh;
		background: #F5F5F5;
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
	.cont{
		height: 1.8rem;
		background:linear-gradient(348deg,rgba(255,72,0,1) 0%,rgba(255,132,23,1) 100%);
	}
	.agentMsg{
		display: flex;
		color: white;
	}
	.agentMsg >div{
		margin-top: .25rem;
	}
	.agentMsg img{
		background: white;
		width: .65rem;
		height: .65rem;
		border-radius: 50%;
		margin: .3rem .17rem 0 .25rem;
	}
	.agentMsg h2{
		font-size: .16rem;
		margin: .13rem 0 .11rem 0;
	}
	.agentMsg p span:first-child{
		margin-right: .2rem;
	}
	.agentMsg i{
		font-style: normal;
	}
	.agentBenefits{
		color: white;
		display: flex;
		margin-top: .26rem;
		align-items: center;
	}
	.agentBenefits p{
		text-align: center;
		width: 33.3%;
	}
	.agentBenefits em{
		font-size: .2rem;
	}
	.agentBenefits span{
		font-size: .12rem;
	}
	/*.middleP{
		border-left: 1px solid gainsboro;
		border-right: 1px solid gainsboro;
	}*/
	.middleP{
		width: 1px !important;
		background: rgba(255,255,255,.3);
		height: .28rem;
	}
	.right {
		width: .07rem !important;
		height: .12rem !important;
		margin-left: .1rem;
	}
	.Signin{
		background: white;
		margin: .1rem 0;
	}
	.Signin img{
		width: .18rem;
		height: .18rem;
		margin-right: .1rem;
	}
	.Signin p{
		margin: 0 .2rem;
		height: .45rem;
		padding: 0 .1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: .45rem;
		border-bottom: 1px solid #EEEEEE ;
	}
	.Signin p:last-child{
		border-bottom: none !important;
	}
	.Mybenifit{
		background: white;
		margin-bottom:.1rem 
	}
	.Mybenifit img{
		width: .18rem;
		height: .18rem;
		margin-right: .1rem;
	}
	.Mybenifit p{
		height: .45rem;
		padding: 0 .1rem;
		margin: 0 .2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: .45rem;
		border-top: 1px solid #EEEEEE;
	}
	.Mybenifit p:first-child{
		border-top: none;
	}
	.seachSchool{
		background: white;
	}
	.seachSchool img{
		width: .18rem;
		margin-right: .1rem;
		height: .18rem;
	}
	.seachSchool p{
		align-items: center;
		height: .45rem;
		padding: 0 .3rem;
		display: flex;
		justify-content: space-between;
		line-height: .45rem;
	}
	.foot{
		position: fixed;
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
	.iconfonts{
		font-size: .20rem;
		line-height: .20rem;
		height: .12rem;
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