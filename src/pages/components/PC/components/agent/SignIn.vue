<template>
	<div class="integralRules">
		<transition name='rulesShow'>
			<div class="rules" v-if="show" >
				<h2>{{error}}</h2>
				<p>{{succ==true?'+0.5积分':'+0积分'}}</p>
				<button @click="handleClose">我知道了</button>
			</div>
		</transition>
	</div>
</template>

<script>
	export default{
		name:'SignIn',
		props:{
			error:String,
			succ:Boolean
		},
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
		created(){
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
	.rules{
		width: 3rem;
		height: 1.4rem;
		background: white;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: .1rem;
		margin-left: -1.5rem;
		margin-top: -.7rem;
		box-sizing: border-box;
		
	}
	.rules p{
		padding: 0 .25rem;
		font-size: .16rem;
		text-align: center;
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
		margin-top: .24rem;
		line-height: .44rem;
		outline: none;
		color:rgba(248,104,31,1);
		font-size: .15rem;
		border-bottom-left-radius: .1rem;
		border-bottom-right-radius: .1rem;
		border: none;
		border-top:1px solid #EEEEEE;
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