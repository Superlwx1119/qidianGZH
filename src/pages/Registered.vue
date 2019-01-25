<template>
	<div>
		<div class="form">
			<p><img src="../assets/image/zhuce (1).png"/></p>
			<div class="formDiv">
				<label class="iconfont" for="name"><img class="name" src="../assets/image/zhuce (2).png"/><input type="text" name="" id="name" value="" placeholder="请输入姓名" v-model="name" /></label>
				<p></p>
				<label class="iconfont" for="phone"><img class="phone"  src="../assets/image/zhuce (4).png"/><input type="text" name="" id="phone" value="" placeholder="请输入手机号码" v-model="telNumber" /></label>
				<p></p>
				<label class="iconfont" for="safecode"><img class="safecode" src="../assets/image/zhuce (3).png"/><input type="text" name="" id="safecode" v-model="safeCode" placeholder="短信验证码" /><button :class="totalTime==60?'btn1':'btn2'" @click="getSafeCode">{{txt}}</button></label>
				<p></p>
				<el-button @click='registered' class='reg'>注册</el-button>
			</div>
			<p class="tip">提示:注册成功后,将可以在平台申请办理信用卡</p>
		</div>
		<div class="tips" style="display: none;">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
		        <div class="weui-dialog__bd">{{tipTxt}}</div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="close" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/getUrl.js';
	import axios from 'axios'
	import Qs from 'qs'
	export default{
		name:'Registered',
		data(){
			return{
				tipTxt:'注册成功!',
				url:'',
				telNumber:'',
				name:'',
				txt:'获取验证码',
				safeCode:'',
				first:true,
				getCode:true,
				totalTime: 60,
				code:'',
				level:0
			}
		},
		methods:{
			close(){
				$('.tips').css('display','none')
			},
			registered(){
//				this.$router.push('/home2')
//				return
				//注册完成即将跳转
				let data1={
					"mobile":this.telNumber, //手机号（必传）
					"validate_code":this.safeCode, //验证码（必传）
				}
				let data2={
					"xm":this.name,
					"mobile":this.telNumber,
					"code":this.code
				}
				if(this.name==''||this.safeCode==''||this.telNumber==''){
					this.tipTxt='请填写完整信息!'
					$('.tips').css('display','block')
//					alert('请填写完整信息!')
					return
				}
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'smsManage/checkValidateCode',
					data: Qs.stringify(data1)
				}).then(res=>{
//					console.log(res.data.error_message)
					if(res.data.error_code==0){
						axios({
							headers:{'Content-Type':'application/x-www-form-urlencoded'},
							method: 'post',
							url: this.url+'wechatManage/addRegistration',
							data: Qs.stringify(data2)
						}).then(res=>{
//							console.log(res)
							if(res.data.error_code==0){
								this.tipTxt='注册成功!'
								$('.tips').css('display','block')
								if(this.code!=''){
									this.$router.push('/qrCode')
								}else{
									this.$router.push('/home2')
								}
							}else{
								alert(res.data.error_message)
							}
							
						})
					}else{
						this.tipTxt='验证码错误!'
						$('.tips').css('display','block')
					}
				})
			},
			getSafeCode(){
				//获取验证码
					let data={
						'mobile':this.telNumber
					}
					var reg=/^1[3456789]\d{9}$/;
			    	if(this.telNumber==''){
			    		this.tipTxt='请输入手机号!'
						$('.tips').css('display','block')
			    	}else{
			    		if(reg.test(this.telNumber)==false){
			    			this.tipTxt='请输入11位手机号码!'
							$('.tips').css('display','block')
			    		}else{
			    			if(this.totalTime==60){
			    				let clock = setInterval(() => {
								      this.totalTime--
								      this.txt = this.totalTime + 's后重新发送'
								      if(this.totalTime<0){
								      	clearInterval(clock)
								      	this.totalTime=60
								      	this.txt='重新发送验证码'
								      }
									},1000)
			    			}
			    			
			    			if(this.txt=='重新发送验证码'||this.txt=='获取验证码'){
			    				//一分钟只能获取一次验证码
			    				axios({
									headers:{'Content-Type':'application/x-www-form-urlencoded'},
									method: 'post',
									url: this.url+'smsManage/getValidateCode',
									data: Qs.stringify(data)
								}).then(res=>{
		//							console.log(res)
								})
			    			}
			    			
							
			    		}
			    	}
				
			}
			//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdccde87d83a87068&redirect_uri=http://mbgqkd.natappfree.cc/&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect
			//https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxdccde87d83a87068&secret=9cb94f17cd8460ebf65408515238289a&code=061ftYoM0fAkDa2WZFrM08YBoM0ftYoU&grant_type=authorization_code
			//https://api.weixin.qq.com/sns/userinfo?access_token=17_BImGwgxAkxhjMjmAsCHCiUS-uqUzdmDQE7v3oyaH-sAhzC0IErQ3LRbOkoEgKVwyqfixEGCXTYobHtfLstZx0P3uKuwPE7Yn7Glc1Xby5Xw&openid=ot3mg0Z25xO1YfsbFCGY88y1BaYg
		},
		created(){
			let url=getUrl()
			this.url=url
			let urlStr=location.search
//			let str='https://fy.csgxcf.com/Campus2019/terminal/dist/index.html?code=82X0Z3&'
			let num=''
			if(urlStr.indexOf('&')<0){
				num=urlStr.split('?')[1].substr(5).length
			}else{
				num=urlStr.indexOf('&')-urlStr.indexOf('code')-5
			}
			this.code=urlStr.substr(urlStr.indexOf('code')+5,num)
			
		}
	}
</script>

<style scoped>
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
	}
	header span:last-child{
		font-size: .22rem;
	}
	header p{
		margin-left: -.3rem;
		font-size: .18rem;
	}
	.form >p{
		height: 1.1rem;
		position: relative;
		margin: .8rem 0 .7rem 0;
	}
	.form >p:last-child{
		font-size: .14rem;
		height: 100%;
		margin: .2rem auto;
		text-align: center;
	}
	.iconfont img{
		position: relative;
		top: .035rem;
		width: ;
	}
	.form>p>img{
		width: .85rem;
		height: 1.1rem;
		position: absolute;
		left: 50%;
		margin-left: -.425rem;
	}
	.formDiv{
		font-size: .14rem;
		margin: 0 auto;
		text-align: center;
	}
	.formDiv p{
		width: 2.8rem;
		height: 1px;
		background: #eee;
		margin: 0.05rem auto;
		font-size: .14rem;
		text-align: center
	}
	.formDiv label{
		width: 2.8rem;
		line-height: .38rem;
		font-size: .2rem;
		position: relative;
	}
	.name{
		width: .15rem;
		height: .15rem;
	}
	.phone{
		width: .12rem;
		height: .17rem;
		margin-left: -.03rem;
	}
	.safecode{
		width: .16rem;
		height: .19rem;
	}
	.formDiv input{
		text-indent: .2rem;
		width: 2.6rem;
		border: none;
		outline: none;
		color: #666;
	}
	.formDiv input::-webkit-input-placeholder{
		color: #999;
	}
	.btn1{
		width: 1.1rem;
		outline: none;
		position: absolute;
		right: 0;
		top: 0rem;
		color: #F8681F;
		height: .3rem;
		font-size: .14rem;
		border: none;
		background: transparent;
	}
	.btn2{
		width: 1.1rem;
		outline: none;
		position: absolute;
		right: 0;
		top: 0rem;
		color: #666;
		height: .3rem;
		font-size: .14rem;
		border: none;
		background: transparent;
	}
	.reg{
		width: 2.71rem;
		height: .4rem;
		border: none;
		outline: none;
		line-height: 0rem;
		margin-top: .42rem;
		background: #F8681F;
		color: white;
		border-radius:.2rem ;
	}
	.tip{
		margin: 0 !important;
		padding-top: .15rem;
		font-size: 12px !important;
	}
</style>