<template>
	<div>
		<div class="cont">
			<h1><p>合伙人一起说了算的项目！</p></h1>
			<img class="img1" src="../../../../../../static/image/de-title.png"/>
			<h2>为什么要开展校园起点？</h2>
			<div class="count">
			<p class="ss">谁都差钱，人都会遇到需要钱应急的时候；大学生活丰富多彩，消费的场景也很多，大部分同学都有资金需求，但君子爱财取之有道，望同学们能从正规渠道获取，远离非法平台；</p>
			<p class="ss"><span>共青团中央委员会，国家发展改革委，中国人民银行编制印发了《青年信用体系建设规划（2016-2020年）》</span>，国家对于青年信用体系建设的重点领域也给出了明确方向：<span>学习教育，志愿公益，就业创业，婚恋交友，信贷租赁，抚养赡养，医疗健康，出行旅游。</span>这八个领域和同学们的生活息息相关，尽早建立良好的征信和信用记录，对于同学们的现在和未来都是有巨大帮助的。</p>
			</div>
			<h2>校园起点合伙人的未来？</h2>
			<div  class="count">
			<p class="ss"><em>P1阶段：</em>以大学生专属信用卡为起点，在校园内传播科学理财观念，帮助同学们建立良好的征信记录；满足同学们资金需求的同时，也能给大家带来一些实质性的奖励。发挥集团资源优势，与更多银行建立合作关系，实现银行产品的多元化，全面推进青年信用体系建设。</p>
			<p class="ss"><em>P2阶段：</em>校园起点的多元化发展：和合伙人探讨其他金融、旅游等更多的受同学们欢迎的业务可行性，校园起点的未来掌握在大家的手里。</p>
			</div>
			<h2>你将获得：</h2>
			<div class="count">
			<p>《校园信用大使》证书；</p>
			<p>求职推荐信；</p>
			<p>宣传推广所需物料；</p>
			<p>大咖讲授金融和理财方面培训；</p>
			<p>合伙人旅游、聚会等集体活动；</p>
			<p>月均1500-3000元的收入，额外推广奖金；</p>
			<p>晋升：竞聘演讲——试用考核期——正式任命；</p>
			<p class="ss">校园合伙人（做自己的CEO）——校园经理（负责所辖校园合伙人的管理）——城市经理（负责所辖城市合伙人的管理）——业务经理（管理校园起点业务）——公司高层管理</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Benefits',
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
	.cont{
		padding: .2rem;
	}
	.cont h1{
		text-align: center;
		font-size: .18rem;
		font-weight: bold;
	}
	.cont h2{
		font-size: .16rem;
		font-weight: bold;
	}
	.cont p{
		padding-left: .2rem;
	}
	.ss{
		text-indent: 2em;
	}
	.cont span{
		color: red;
	}
	.cont em{
		color: lightskyblue;
	}
	.cont h1{
		background: lightblue;
		width: 80%;
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
		background-image: url(../../../../../../static/image/s-title.png);
		background-size: 100% 60%;
		background-position:  50% 70%;
		background-repeat: no-repeat;
		line-height: .8rem;
		text-align: center;
		font-size: .16rem;
		font-weight: bold;
	}
</style>