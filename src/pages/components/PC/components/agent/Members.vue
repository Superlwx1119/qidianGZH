<template>
	<div class="members">
		<div class="current">
			<span>当前会员数</span>
			<p>{{total}}</p>
		</div>
		<div class="membersTabs">
			<el-tabs stretch v-model="activeName" @tab-click="handleClick">
				<el-tab-pane  label="按时间" name="first"></el-tab-pane>
				<el-tab-pane  label="按审核通过数" name="third"></el-tab-pane>
				<el-tab-pane  label="按办卡数量" name="second"></el-tab-pane>
			</el-tabs>
			<div class="scroll" ref='wapper'>
			<div v-if="activeName=='first'" class="memberList">
				<ul>
					<li @click="showDetail(item.registrationId)" v-for="(item,index) of members">
						<p><span><img :src="item.headImgUrl"/>{{item.xm}}</span><span class="tel">{{item.mobile}}</span></p>
						<div>
							<p><span>{{item.cardNum}}</span><br />办卡数</p>
							<p><span>{{item.uploadNum}}</span><br />已上传截图</p>
							<p><span>{{item.throughNum}}</span><br />已审核通过截图</p>
						</div>
					</li>
				</ul>
			</div>
			<div v-if="activeName=='second'" class="memberList">
				<ul>
					<li @click="showDetail(item.registrationId)" v-for="(item,index) of members">
						<p><span><img :src="item.headImgUrl"/>{{item.xm}}</span><span class="tel">{{item.mobile}}</span></p>
						<div>
							<p><span>{{item.cardNum}}</span><br />办卡数</p>
							<p><span>{{item.uploadNum}}</span><br />已上传截图</p>
							<p><span>{{item.throughNum}}</span><br />已审核通过截图</p>
						</div>
					</li>
				</ul>
			</div>
			<div v-if="activeName=='third'" class="memberList">
				<ul>
					<li @click="showDetail(item.registrationId)" v-for="(item,index) of members">
						<p><span><img :src="item.headImgUrl"/>{{item.xm}}</span><span class="tel">{{item.mobile}}</span></p>
						<div>
							<p><span>{{item.cardNum}}</span><br />办卡数</p>
							<p><span>{{item.uploadNum}}</span><br />已上传截图</p>
							<p><span>{{item.throughNum}}</span><br />已审核通过截图</p>
						</div>
					</li>
				</ul>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import getUrl from '@/assets/js/getUrl.js';
	import axios from 'axios'
	import Qs from 'qs'
	import store from '@/store';
	export default{
		name:'Members',
		data(){
			return{
				activeName:'first',
				members:[],
				registrationId:'',
				total:'',
				orderType:'',
				url:''
			}
		},
		methods:{
			handleClick(){
				this.scroll.scrollToElement('ul')
				switch (this.activeName){
					//判断排序类型
					case 'first':
					this.orderType='registrationTime'
					break
					case 'second':
					this.orderType='cardNum'
					break
					case 'third':
					this.orderType='throughNum'
					break
				}
				this.getMembersList();
			},
			showDetail(id){
				//查看会员详情
				this.registrationId=id
				store.dispatch('getRegistrationId',this.registrationId)
				this.$router.push({name:'MemberDetails',params:{registrationId:this.registrationId}})
			},
			getMembersList(){
				let data={'orderType':this.orderType}
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getMyRegistration',
					data: Qs.stringify(data)
				}).then(res=>{
					this.members=res.data.rows
					this.total=res.data.total
				})
			}
		},
		mounted(){
			let url=getUrl()
			this.url=url
			this.scroll= new BScroll (this.$refs.wapper, {click: true})
			this.getMembersList();
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.members{
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
	.scroll{
		margin-top: 1.5vh;
		overflow: hidden;
		height: 64vh;
	}
	.current{
		position: relative;
		height: 1.5rem;
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
	.memberList{
		margin-top: .1rem;
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
		border-radius: 50%;
		background: red;
	}
	.memberList li>div{
		display: flex;
		padding: .1rem 0 .15rem 0;
	}
	.memberList li>div p{
		text-align: center;
		width: 33.33%;
		font-size: .12rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.21rem;
		color:rgba(102,102,102,1);
	}
	.memberList li>div span{
		font-size:.18rem;
		font-family:Arial;
		font-weight:400;
		line-height:.21rem;
		color:rgba(248,104,31,1);
	}
	.tel{
		font-size:.12rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.22rem;
		color:rgba(153,153,153,1);
	}
</style>