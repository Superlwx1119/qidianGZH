<template>
	<div class="code">
		<img src="../../static/image/QrCode.jpg"/>
	</div>
</template>

<script>
	export default{
		name:'QrCode',
		methods:{
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.code{
		width: 100%;
		height: 100vh;
		position: relative;
		background-image: url(../../static/image/code.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		text-align: center;
	}
	img{
		width: 33%;
		height: 20%;
		margin-top: 15.5vh;
	}
</style>