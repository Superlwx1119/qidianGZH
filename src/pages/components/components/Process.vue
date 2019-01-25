<template>
	<div>
		<div class="cont">
			<img :src="show==true?'./static/image/process.jpg':''"/>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Process',
		data(){
			return{
				show:true
			}
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
		padding: 0;
		margin: 0;
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
	}
	.cont img{
		width: 100%;
		height: 100%;
	}
</style>