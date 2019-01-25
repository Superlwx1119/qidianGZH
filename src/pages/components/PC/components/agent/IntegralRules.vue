<template>
	<div class="integralRules">
		<transition name='rulesShow'>
			<div class="rules" v-if="show" >
				<h2>积分规则</h2>
				<h3 class="title">如何获取积分？ 完成日常任务，即可获取积分。</h3>
				<p>1、每日签到获取0.5分；</p>
				<p>2、每发展1个会员2分；</p>
				<p>3，获取奖金可获得积分，1元=50分；</p>
				<h3 class="title">积分有有效期吗？</h3>
				<p>积分是没有有效期的，是获取开始，一直都有。</p>
				<h3 class="title">积分可以用来做什么？</h3>
				<p>积分可以用来线下兑换礼物，当达到10万积分时，有特别的奖励。</p>
				<button @click="handleClose">我知道了</button>
			</div>
		</transition>
	</div>
</template>

<script>
	export default{
		name:'IntegralRules',
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
	.integralRules{
		height: 100vh;
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.4);
	}
	.title{
		font-size: .14rem;
		font-weight: bold;
	}
	.rules h3{
		padding: 0 .25rem;
		color:rgba(153,153,153,1);
		line-height: .18rem;
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
		padding: 0 .25rem;
		text-indent: 2em;
		font-size: .12rem;
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