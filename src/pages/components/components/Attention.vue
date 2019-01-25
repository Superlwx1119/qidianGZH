<template>
	<div>
		<div class="cont">
			<h1><p>注意事项</p></h1>
			<img class="img1" src="../../../../static/image/de-title.png"/>
			<h2>基本要求</h2>
			<div class="count">
			<p>申请人需为年满十八周岁的在校全日制大学生（大专、本科、研究生、博士）</p></div>
			<h2>申请资料填写要求</h2>
			<div class="count">
			<p>1、手机号需为本人身份证号码办理的；</p>
			<p>2、自动生成的姓名拼音一定要点击确认；</p>
			<p>3、行业性质、职业信息一定要写学生；</p>
			<p>4、区号、单位电话一定要写学校招生办电话（可直接咨询校园起点合伙人或在线客服）</p>
			<p>5、工作年限和年收入总额都写0；</p>
			<p>6、联系人姓名和手机号必须如实填写，且保持一致；</p>
			<p>7、外地学生在省外上学的，家庭地址和学校地址都写学校地址，本地学生不受影响，家庭地址就写真实的就好。例如：外地学生在海南上学的，家庭地址和学校地址都写学校地址，海南省本地学生不受影响，家庭地址就写真实的就好。</p>
			</div>
			<h2>办卡条件</h2>
			<div class="count">
			<p>1）本人名下有两张信用卡不可以申请办理中国银行学生信用卡；</p>
			<p>2）有校园贷、助学贷款等记录不可以申请办理中国银行学生信用卡。</p>
			</div>
			<h2>奖金红包规定</h2>
			<div class="count">
			<p>1、请提前确认已绑定银行卡，并通过实名认证，以防影响奖金领取。</p>
			<p>2、奖金红包领取成功，24小时没领将会退回，请及时领取，退回概不补发。</p>
			</div>
			<h2>授信标准</h2>
			<div class="count">
			<p>3000—8000</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Attention',
		mounted(){
			let suiji=Math.floor(Math.random()*1000000)
			console.log(suiji)
			$('.count').css('border','1px dashed #'+suiji)
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
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
		padding: .2rem;
	}
	.cont h2{
		font-size: .16rem;
		font-weight: bold;
	}
	.cont p{
		padding-left: 2em;
	}
	.cont h1{
		background: lightblue;
		width: 70%;
		text-align: center;
		margin: 0 auto;
		padding: 0.1rem;
	}
	.cont h1 p{
		padding-left:0;
		font-size: .18rem;
		font-weight: bold;
		color: black;
		line-height: .7rem;
		border: 2px dashed white;
	}
	.img1{
		width: 80%;
		padding-top: .1rem;
		height: 80%;
		display: block;
		margin: 0 auto;
	}
	.cont h2{
		background-image: url(../../../../static/image/s-title.png);
		background-size: 100% 60%;
		background-position:  50% 70%;
		background-repeat: no-repeat;
		line-height: .8rem;
		text-align: center;
		font-size: .16rem;
		font-weight: bold;
	}
</style>