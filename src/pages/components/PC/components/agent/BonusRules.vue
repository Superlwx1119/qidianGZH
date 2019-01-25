<template>
	<div class="bonusRules">
		<transition name='rulesShow'>
			<div class="rules" v-if="show" >
				<h2>奖励金规则</h2>
				<h3 class="title">奖励金是什么？怎么获取？</h3>
				<p>奖励金就是您的所属会员在此平台上办理信用卡，上传截图并审核成功后，给予您的奖励。</p>
				<p>有两次奖励金，第一次是会员上传银行核卡成功截图短信，第二次是上传信用卡正面照+卡号。可分别获得10元奖励金。</p>
				<p>3，获取奖金可获得积分，1元=50分；</p>
				<h3 class="title">在哪领取？</h3>
				<p>1、截图审核通过后，系统会推送您一条信息，点击领取；</p>
				<p>2、在会员办卡明细中，状态为审核成功，可点击“立即领取"，进行领取</p>
				<button @click="handleClose">我知道了</button>
			</div>
		</transition>
	</div>
</template>

<script>
	export default{
		name:'BonusRules',
		data(){
			return{
				show:false
			}
		},
		methods:{
			handleClose(){
				setInterval(()=>{
					this.$emit('close',this.show)
				},100)
			},
		},
		mounted(){
			this.show=true
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.title{
		font-size: .14rem;
		font-weight: bold;
	}
	.bonusRules{
		height: 100vh;
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.4);
	}
	.rules{
		width: 3rem;
		background: white;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: .1rem;
		margin-left: -1.5rem;
		margin-top: -1.66rem;
		box-sizing: border-box;
		
	}
	.rules p{
		text-indent: 2em;
		padding: 0 .25rem;
		font-size: .12rem;
		color:rgba(153,153,153,1);
		line-height: .18rem;
	}
	.rules h3{
		padding: 0 .25rem;
		color:rgba(153,153,153,1);
		line-height: .18rem;
	}
	.rules h2{
		font-size:.15rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.18rem;
		text-align: center;
		margin: .18rem 0 .14rem 0;
		color:rgba(102,102,102,1);
	}
	.rules button{
		width: 100%;
		height: .44rem;
		margin-top: .15rem;
		line-height: .44rem;
		outline: none;
		color:rgba(248,104,31,1);
		font-size: .15rem;
		border-bottom-left-radius: .1rem;
		border-bottom-right-radius: .1rem;
		border: none;
		border-top:1px solid #E5E5E5;
		
		background: transparent;
	}
	.rulesShow-enter-active{
		animation: rulesShow-in .15s;
	}
	.rulesShow-leave-active{
		animation: rulesShow-in .15s reverse;
	}
	@keyframes rulesShow-in{
		0%{
			transform: scale(0);
		}
		100%{
			transform: scale(1);
		}
	}
</style>