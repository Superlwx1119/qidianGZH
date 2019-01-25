<template>
	<div class="home">
		<header>
			<span class="iconfont">&#xe66a;</span>
			<p>首页</p>
			<span class="iconfont">&#xe747;</span>
		</header>
		<div class="tagline">
			<p>人生理财 &nbsp;从学校开始</p>
		</div>
		<div class="blankMsg">
			<img src="../../assets/logo.png"/>
			<div>
				<p>中国银行-中国银行赞卡</p>
				<p>1、银联闪付月月享视频会员</p>
				<p>2、中行请你看电影</p>
				<p>3、透支利息7折</p>
				<el-row>
					<el-col :span='11'><el-button>立即申请</el-button></el-col>
					<el-col :span='11' :offset="2"><router-link to='/uploadRecord'><el-button>上传截图</el-button></router-link></el-col>
				</el-row>
			</div>
		</div>
		<div  class='tabs'>
			 <el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="办卡流程" name="first"></el-tab-pane>
			    <el-tab-pane label="注意事项" name="second"></el-tab-pane>
			  </el-tabs>
			  <div class="handleCard" v-if="activeName=='first'">
			  	<p>办卡流程办卡流程办卡流程办卡流程</p>
			  	<p>1、点击"立即申请",在银行填写申请资料;</p>
				<p>2、银行发送核卡成功通知,截图保存,上传截图。</p>
				<p>3、下卡成功,将信用卡正面照按示例图拍照,填写卡号,提交,等待审核。</p>
				<p>4、审核通过,系统发送消息提醒,点击领取红包,红包直接进入在微信零钱里。</p>
			  </div>
			  <div v-if="activeName=='second'">
			  	aa
			  </div>
		</div>
		<div class="foot">
			<el-row>
				<el-col :span='12'>
					<span class="iconfont">&#xe621;<br /><i>首页</i></span>
				</el-col>
				<router-link to='/mine'>
					<el-col :span='12'>
						<span class="iconfont">&#xe621;<br /><i>我的</i></span>
					</el-col>
				</router-link>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Home',
		data(){
			return{
				activeName:'first',
				
			}
		},
		methods:{
			handleClick(tab){
				
			}
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.home{
		background: gainsboro;
		height: 100vh;
		overflow: hidden;
	}
	header{
		background: white;
		display: flex;
		justify-content: space-between;
		height: .4rem;
		color: white;
		padding: 0 .2rem;
		line-height: .4rem;
		border-bottom: 1px solid gainsboro;
	}
	header span{
		font-size: .16rem;
		color: gray;
	}
	header span:last-child{
		font-size: .22rem;
	}
	header p{
		font-size: .18rem;
		color: gray;
	}
	.blankMsg{
		justify-content: center;
		display: flex;
		background: white;
		padding-bottom: .15rem;
		margin-bottom: .2rem;
	}
	.blankMsg img{
		margin-right:.2rem;
		border-radius: 10px;
		width: 1.5rem;
		height: 1.4rem;
	}
	.blankMsg p{
		height: .25rem;
		line-height: .25rem;
	}
	.blankMsg p:first-child{
		font-size: .16rem;
		margin-bottom: .05rem;
	}
	.blankMsg>div{
	}
	.tagline{
		background: white;
		padding-top: .1rem;
	}
	.tagline p{
		text-align: center;
		height: .4rem;
		line-height: .4rem;
	}
	.blankMsg button{
		margin-top: .1rem;
		height: .3rem;
		line-height: 0;
	}
	.tabs{
		background: white;
	}
	.handleCard{
		margin-left: .3rem;
		height: 100vh;
	}
	.handleCard p{
		line-height: .3rem;
	}
	.foot{
		position: fixed;
		bottom: 0;
		background: gainsboro;
		border-top: 1px solid gray;
		text-align: center;
		width: 100%;
		height: .45rem;
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
	}
</style>