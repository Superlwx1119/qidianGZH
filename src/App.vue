<template>
  <div id="app" v-cloak>
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
				(function (doc, win) {
		        var docEl = doc.documentElement,
		            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		            recalc = function () {
		                var clientWidth = docEl.clientWidth;
		                if (!clientWidth) return;
		                if(clientWidth>=375){
		                    docEl.style.fontSize = '100px';
		                }else{
		                    docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
		                }
		            };
		 
		        if (!doc.addEventListener) return;
		        win.addEventListener(resizeEvt, recalc, false);
		        doc.addEventListener('DOMContentLoaded', recalc, false);
		    })(document, window);
		  }
}
</script>

<style>
.memberUp .weui-picker{
	transform: translate(0, 0);
}
.weui-picker__hd{
	z-index: 1111;
}
.uploadrecord .el-tabs__nav-scroll{
	margin-bottom: .1rem;
}
.uploadrecord .el-tabs__nav-wrap::after{
	height: .1rem;
	background: #F5F5F5;
}
.upPicture .el-tabs__active-bar{
	background-color: #F8681F;
	width: 33% !important;
	margin-left: 6% !important;
}
.upPicture .el-tabs__item:hover{
	color: #666666;
}
.upPicture .el-tabs.el-tabs--top{
	height: .44rem;
}
.upPicture .el-tabs__item{
	color: #666666;
	background: white;
}
.home .el-tabs__nav-scroll{
	margin-left: .3rem;
}
.home .el-tabs__active-bar{
	background-color: black;
}
.home .el-tabs__item:hover{
	color: black;
}
.home .el-tabs__item.is-active{
	color: black;
}
.uploadrecord .el-tabs__active-bar.is-top{
	width: 20% !important;
	margin-left: 3%;
}
.uploadrecord .el-tabs__active-bar{
	background-color: #F8681F;
}
.uploadrecord .el-tabs__item:hover{
	color: black;
}
.uploadrecord .el-tabs__item.is-active{
	color: black;
}
.uploadrecord .el-tabs.el-tabs--top{
	height: .5rem;
}

/*.membersTabs .el-tabs__active-bar.is-top{
	margin-bottom: .1rem;
	width: 21% !important;
	margin-left: 12%;
}*/
/*.memberUp .picker-item{
	z-index: 99;
	font-size: .14rem;
	height: 2rem;
}*/
.memberUp .el-tabs__nav-wrap::after{
	height: 0vh;
	background: #F5F5F5;
}
.memberUp .el-tabs__nav-scroll{
	margin-bottom: 1.5vh;
}
.memberUp .el-tabs__active-bar.is-top{
	width: 20% !important;
	margin-left: 3%;
}
.memberUp .el-tabs__active-bar{
	background-color: #F8681F;
}
.memberUp .el-tabs__item:hover{
	color: black;
}
.memberUp .el-tabs__item.is-active{
	color: black;
}
.memberUp .el-tabs.el-tabs--top{
	height: 7vh;
}
.membersTabs .el-tabs__item{
	color: #666666;
	font-family:Source Han Sans CN;
	font-weight:400;
	font-size: .15rem;
}
.membersTabs .el-tabs__item{
	background: white !important;
}
.membersTabs .el-tabs__item.is-active{
	color: #F8681F;
}
.membersTabs .el-tabs.el-tabs--top{
	height: .4rem;
}
.membersTabs .el-tabs__active-bar{
	background-color: #F8681F;
}
.membersTabs .el-tabs__active-bar.is-top{
	width: 21% !important;
	margin-left: 3%;
}
.beagent .el-tabs.el-tabs--top{
	height: .44rem;
}
.beagent .el-tabs__active-bar{
	background-color: #F8681F;
}
.beagent .el-tabs__active-bar.is-top{
	margin-bottom: .1rem;
	width: 21% !important;
	margin-left: 12%;
}
.beagent .el-tabs__item:hover{
	color: black;
}
.beagent .el-tabs__item.is-active{
	color: black;
}
.beagent .el-tabs__item{
	color: #666666;
	height: .5rem;
	line-height: .42rem;
	font-family:Source Han Sans CN;
	font-weight:400;
	font-size: .15rem;
}
.beagent .el-tabs__nav-wrap::after{
	height: .1rem;
	background: #F5F5F5;
}
.beagent .el-tabs.el-tabs--top{
	height: .4rem;
}
/*.beagent .el-tabs.el-tabs--top{
	height: .4rem;
}*/
.details .el-tabs__item{
	height: .5rem;
}
</style>
