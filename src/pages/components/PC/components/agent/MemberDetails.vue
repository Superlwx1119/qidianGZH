<template>
	<div class="details">
		<div class="cont">
			<div class="agentMsg" >
				<img :src="msg.headImgUrl" />
				<div>
					<h2>{{msg.xm}}</h2>
					<p>{{msg.mobile}}</p>
				</div>
			</div>
			<div class="agentBenefits">
				<p><em>{{msg.cardNum}}</em><br /><span>办卡数</span></p>
				<p class="middleP"></p>
				<p ><em>{{msg.uploadNum}}</em><br /><span>已上传截图</span></p>
				<p class="middleP"></p>
				<p><em>{{msg.throughNum}}</em><br /><span>已审核通过截图</span></p>
			</div>
			<div class="memberList" ref='wapper'>
				<ul>
					<li v-for="item of data">
						<p><span>{{msg.xm}}</span><span class="tel">{{item.imgUpTime}}</span></p>
						<div>
							<p><span>上传截图:<i>{{item.type|picType}}</i></span></p>
							<p class="pass"><span>审核状态:<i>{{item.imgState|state}}</i></span><button :class="item.bonusState==0?'btn1':'btn2'" v-if='item.bonusState==0&&item.imgState==2' @click="getBonus(item.applyId)">{{txt}}</button></p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="tip" style="display: none;">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
		        <div class="weui-dialog__bd">{{tip}}</div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="close" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import getUrl from '@/assets/js/getUrl.js';
	import BScroll from 'better-scroll'
	import Qs from 'qs'
	export default{
		name:'MemberDetails',
		filters:{
			img(val){
				let url=getUrl()
				return url+'attachManage/getAttach?attachid='+val
			},
			state(val){
				switch (val){
					case -1:return '审核失败'
					break;
					case 0:return '待上传'
					break;
					case 1:return '待审核'
					break;
					case 2:return '审核成功'
				}
			},
			picType(val){
				switch (val){
					case 0:return '银行短信通知截图'
					break
					case 1:return '卡片截图'
				}
			},
		},
		data(){
			return{
				state:0,
				registrationId:'',
				msg:{},
				data:[],
				tip:'领取成功!',
				txt:'立即领取',
				url:''
			}
		},
		methods:{
			close(){
				$('.tip').css('display','none')
			},
			getMyRegistrationDetail(){
				let data={
					'registrationId':this.registrationId
				}
//				console.log(data)
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getMyRegistrationDetail',
					data:Qs.stringify(data)
				}).then(res=>{
					console.log(res.data)
					this.msg=res.data.registration_info
//					console.log(res.data.rows)
					this.state=res.data.registration_info.imgState
					this.data=res.data.rows
				})
			},
			getBonus(id){
				let data={
					"applyId": id, // 上传截图记录id（必传）
					"type": "1"// 领取类型 0:红包 1:奖励金		
				}
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/sendRedPack',
					data:Qs.stringify(data)
				}).then(res=>{
//					console.log(res)
					if(res.data.error_code==0){
						$('.tip').css('display','block')
						this.txt='已领取!'
					}else{
						this.tip=res.data.error_message
						$('.tip').css('display','block')
					}
				})
			}
		},
		created(){
			let url=getUrl()
			this.url=url
			this.registrationId=this.$store.state.registrationId
			this.getMyRegistrationDetail();
		},
		mounted(){
			this.scroll= new BScroll (this.$refs.wapper, {click: true})
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.details{
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
	.cont{
		height: 22vh;
		background:linear-gradient(348deg,rgba(255,72,0,1) 0%,rgba(255,132,23,1) 100%);
	}
	.agentMsg{
		display: flex;
		color: white;
		height: 10.5vh;
	}
	.agentMsg >div{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: .3rem;
		width: 100%;
		margin-top: .2rem;
	}
	.agentMsg img{
		background: white;
		width: .4rem;
		height: .4rem;
		border-radius: 50%;
		margin: .24rem .1rem 0 .3rem;
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
		height: 12vh;
		/*margin-top: .2vh;*/
		padding-bottom: .1vh;
		align-items: center;
	}
	.agentBenefits p{
		text-align: center;
		width: 33.3%;
	}
	.agentBenefits em{
		font-size: .18rem;
	}
	.agentBenefits span{
		font-size: .12rem;
	}
	.middleP{
		width: 1px !important;
		background: rgba(255,255,255,.3);
		height: .28rem;
	}
	.memberList{
		overflow: hidden;
		height: 78vh;
	}
	.memberList li{
		margin: .13rem .13rem 0 .13rem;
		border-radius: .1rem;
		background: white;
	}
	.memberList li>p{
		height: .44rem;
		border-bottom: 1px solid #E5E5E5;
		display: flex;
		margin: .07rem .2rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.22rem;
		color:rgba(102,102,102,1);
		align-items: center;
		justify-content: space-between;
	}
	.memberList img{
		margin-right: .1rem;
		width: .3rem;
		height: .3rem;
	}
	.memberList li>div{
		margin: .07rem .2rem;
		padding-bottom: .12rem;
	}
	.memberList div span{
		font-size: .12rem;
		margin-right: .1rem;
		color: #999999;
	}
	.memberList div img{
		width: 2rem;
		max-width: 2.5rem;
		height: 1.5rem;
		max-height: 3rem;
	}
	.memberList div>p{
		padding: .05rem 0;
	}
	.memberList ul{
		margin-top: 1vh;
	}
	.memberList i{
		font-style: normal;
		color: #666666;
		font-size: .12rem;
		margin-left: .1rem;
	}
	.pass{
		display: flex;
		justify-content: space-between;
	}
	.btn1{
		width: .65rem;
		height: .21rem;
		color: white;
		background: #F8681F !important;
		border: none;
		outline: none;
		border-radius: .05rem;
		font-size: .11rem;
	}
	.btn2{
		width: .65rem;
		height: .21rem;
		color: white;
		background:rgba(153,153,153,1) !important;
		border: none;
		outline: none;
		border-radius: .05rem;
		font-size: .11rem;
	}
</style>