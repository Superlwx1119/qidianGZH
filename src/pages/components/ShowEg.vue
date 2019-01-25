<template>
	<div class="eg" @click="close">
		<transition name='Show'>
			<div class="rules" v-if="show1==1" >
				<img :src="data.figure2|img"/>
			</div>
		</transition>
		<transition name='Show'>
			<div class="rules" v-if="show2==1" >
				<img :src="data.figure3|img"/>
			</div>
		</transition>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/getUrl.js';
	export default{
		name:'ShowEg',
		props:{
			data:Object,
			showmsg:Number,
			showcard:Number
		},
		filters:{
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
				show1:true,
				show2:true
			}
		},
		methods:{
			close(){
				setInterval(()=>{
					this.$emit('close',false)
				},100)
			}
		},
		created(){
			if(this.showmsg==1){
				this.show2=0
				this.show1=1
			}else{
				this.show1=0
				this.show2=1
			}
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.eg{
		height: 100vh;
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 99;
		background: rgba(0,0,0,.4);
	}
	.rules{
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.rules span{
		position: absolute;
		right: 0;
		top: 0;
		z-index: 100;
		font-size: .6rem;
		display: block;
		width: .6rem;
		height: .6rem;
		text-align: center;
		line-height: .6rem;
		color: white;
	}
	.rules img{
		/*width: 3.2rem;
		height: 4.5rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -1.6rem;
		margin-top: -2.25rem;*/
		width: 80%;
		height: 80%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.Show-enter-active{
		animation: Show-in .15s;
	}
	.Show-leave-active{
		animation: Show-in .15s reverse;
	}
	@keyframes Show-in{
		0%{
			transform: scale(0);
		}
		100%{
			transform: scale(1);
		}
	}
</style>