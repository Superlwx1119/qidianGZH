<template>
	<div class="beagent" >
		<div>
		<div class="tabs">
			<el-tabs stretch v-model="activeName" @tab-click="handleClick">
				<el-tab-pane class='labelTxt' label="合伙人权益" name="first"></el-tab-pane>
				<el-tab-pane class='labelTxt' label="填写资料" name="second"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="msgCont">
			<div v-if="activeName=='first'" class="benefits" ref='wapper'>
				<div>
					<h1><p>合伙人权益</p></h1>
						<img class="img1" src="../../../../../static/image/de-title.png"/>
				<h2>我们寻找:</h2>
				<div class="count">
				<p>愿意足不出户，在社交媒体进行运营、营销的大学生； </p>
				<p>推进青年信用体系建设，传播正规金融产品；</p>
				<p>做同学们身边的金融卫士和理财专家。 </p>
				</div>
				<h2>你将获得:</h2>
				<div class="count">
				<p>《校园信用大使》证书；</p>
				<p>求职推荐信；</p>
				<p>宣传推广所需物料；</p>
				<p>大咖讲授金融和理财方面培训；</p>
				<p>合伙人旅游、聚会等集体活动；</p>
				<p>月均1500-3000元的收入，额外推广奖金；</p>
				<p>晋升：竞聘演讲——试用考核期——正式任命；</p>
				<p>校园合伙人（做自己的CEO）——校园经理（负责所辖校园合伙人的管理）——城市经理（负责所辖城市合伙人的管理）——业务经理（管理校园起点业务）——公司高层管理</p>
				</div>
				<h2>你需要拥有这些素质:</h2>
				<div  class="count">
				<p>勤奋、好学； </p>
				<p>自信、敢想敢干； </p>
				<p>爱好广泛、善于沟通。 </p>
				</div>
				</div>
			</div>
			<div v-if="activeName=='second'" class='subMsg' >
				<!--<h2>状态：<span>{{states}}</span></h2>-->
				<p class="name"><label for="name">姓名</label><input disabled v-model="name" id="name" type="text" placeholder="请输入姓名"/></p>
				<p class="phoneNum"><label for='phoneNum'>手机号</label><input disabled v-model="phone" id="phoneNum" type="text" placeholder="请输入手机号"/></p>
				<p class="school" @click="toSchool"><span>学校</span><span>{{school==''?'请选择学校':school}}<i class="iconfont"><img src="../../../../assets/image/PC (2).png"/></i></span></p>
				<div class="photo">
					<p><label>身份证照片</label></p>
					<div class="file">
						<label for="positive" class="firLabel"><img id="zheng" :src="idCardPositive==''?'./static/image/msg (5).png':idCardPositive|img"/>
						<p>身份证正面照</p></label><input @change="Idpositive($event)" :disabled="state>=1" type="file" id="positive" multiple="multiple" accept="image/*" />
						<label for="reverse"  class="secLabel"><img id="fan" :src="idCardPeverse==''?'./static/image/msg (1).png':idCardPeverse|img"/><p>身份证反面照</p></label><input @change="Idreverse" :disabled="state>=1" type="file" id="reverse" accept="image/*" mutiple="mutiple"  />
					</div>
				</div>
				<p class="tip"><img :src="state!=2?'./static/image/msg.png':'./static/image/bingo.png'"/><span v-if='state==0'>未提交</span><span v-if="state==1">已提交(请等待审核)</span><span v-if="state==-1">审核失败</span><span v-if="state==2">您提交的申请资料,平台已审核通过,点击"转变为合伙人身份"按钮吧</span></p>
				<div class="btn">
					<!--<h2 v-if="states=='审核已通过'">您提交的申请资料,平台已审核通过,点击"转变为代理人身份"按钮吧</h2>-->
					<button v-if='state!=2' :disabled="state==1" :class="state==1?'gray':''" @click="JudgeState">提交</button>
					<button v-if="state==2" @click="changeLevel">转变为合伙人身份</button>
					<p>提示：请选择你所在的学校，并上传本人身份证正反面照片以供后台审核。</p>
				</div>
			</div>
		</div>
		<div class="tips" style="display: none;">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
		        <div class="weui-dialog__bd">{{txt}}</div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="close" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
		        </div>
		    </div>
		</div>
		</div>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/getUrl.js';
	import store from '@/store';
	import BScroll from 'better-scroll'
	import axios from 'axios'
	import Qs from 'qs'
	export default{
		name:"BeAgent",
		filters:{
			img(val){
				if(val){
					let arr=val.split('')
					if(arr.indexOf('/')>0){
						return val
					}else{
						let url=getUrl()
						return url+'attachManage/getAttach?attachid='+val
					}
				}
			}
		},
		data(){
			return{
				url:'',
				agent:{},
				show:false,
				activeName:'first',
				name:'',
				phone:'',
				idCardPositive:'',
				idCardPeverse:'',
				school:'',
				state:0,
				txt:'提交成功！',
				up1:false,
				up2:false
			}
		},
		methods:{
			handleClick(){
//				if(this.activeName=='second'){
//					setTimeout(()=>{
						this.getMyApplicationMaterials();
//					},30)
//				}
//				this.scroll= new BScroll (this.$refs.wapper2,{click:true})
			},
			close(){
				$('.tips').css('display','none')
			},
			Idpositive(e){
				//上传身份证正面并预览
				this.txt='图片上传中,请等待提示!';
				$('.tips').css('display','block');
				let reads= new FileReader();
		        let f=document.getElementById('positive').files[0];
		        reads.readAsDataURL(f);
		        reads.onload=function (e) {
		            document.getElementById('zheng').src=this.result;
		        };
		        var formData = new FormData(); 
			    formData.append('img', e.target.files[0]);
			    formData.append('type', 'idCardPositive ');
			      $.ajax({
			        url: this.url+'wechatManage/updApplicationMaterialsImg',//这里是后台接口需要换掉
			        type: 'POST',
			        dataType: 'json',
			        cache: false,
			        data: formData,
			        processData: false,
			        contentType: false,
			        success:(res)=>{  
			        	if(res.error_code==0){
			        		this.txt='图片上传成功!';
//			        		this.up1=true
							store.dispatch('getUp1',this.up1)
							$('.tips').css('display','block');
				        	this.getMyApplicationMaterials()
			        	}else{
			        		this.txt=res.error_message;
							$('.tips').css('display','block');
			        	}
			        }
			      })
			},
			Idreverse(e){
				//上传身份证反面并预览
				this.txt='图片上传中,请等待提示!';
				$('.tips').css('display','block');
				let reads= new FileReader();
		        let f=document.getElementById('reverse').files[0];
		        reads.readAsDataURL(f);
		        reads.onload=function (e) {
		            document.getElementById('fan').src=this.result;
		        };
		        
		        var formData = new FormData(); 
			    formData.append('img', e.target.files[0]);
			    formData.append('type', 'IdCardPeverse');
			      $.ajax({
			        url: this.url+'wechatManage/updApplicationMaterialsImg',//这里是后台接口需要换掉
			        type: 'POST',
			        dataType: 'json',
			        cache: false,
			        data: formData,
			        processData: false,
			        contentType: false,
			        success:(res)=>{  
			        	if(res.error_code==0){
			        		this.txt='图片上传成功!';
//			        		this.up2=true
			        		store.dispatch('getUp2',this.up2)
							$('.tips').css('display','block');
				        	this.getMyApplicationMaterials()
			        	}else{
			        		this.txt=res.error_message;
							$('.tips').css('display','block');
			        	}
			        }
			      })
			},
			toSchool(){
				//获取学校列表
				if(this.state<1){
					//提交后不可修改学校
					this.$router.push({name:'School',params:{name:this.name,phone:this.phone}})
				}
			},
			JudgeState(){
				//判断审核状态,未提交即提交,通过即转换身份
				if(this.state==-1){
//					console.log(this.$store.state.up1,this.$store.state.up2)
					if(this.$store.state.up1==false&&this.$store.state.up2==false){
						this.txt='原照片已失效,请重新选择照片!'
						$('.tips').css('display','block')
						return false
					}else if(this.$store.state.up1==false&&this.$store.state.up2==true){
						this.txt='请重新选择身份证正面照片!'
						$('.tips').css('display','block')
						return false
					}else if(this.$store.state.up1==true&&this.$store.state.up2==false){
						this.txt='请重新选择身份证反面照片!'
						$('.tips').css('display','block')
						return false
					}
				}
				if(!this.school||this.school==''||this.idCardPeverse==''||this.idCardPositive==''||!this.idCardPeverse||!this.idCardPositive){
					this.txt='请确认是否已选择学校和添加身份证正反面照片!'
					$('.tips').css('display','block')
				}else{
					axios({
						headers:{'Content-Type':'application/x-www-form-urlencoded'},
						method: 'post',
						url: this.url+'wechatManage/subApplicationMaterialsImg',
					}).then(res=>{
						store.dispatch('getUp2',true)
					    store.dispatch('getUp1',true)
//						console.log(res)
						if(res.data.error_code==0){
							this.state=1
							this.txt='提交成功!'
							$('.tips').css('display','block')
						}else{
							this.txt=res.data.error_message
							$('.tips').css('display','block')
						}
					})
				}
			},
			changeLevel(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/changeToAgent',
				}).then(res=>{
//					console.log(res)
					store.dispatch('changeLevel','second')
					this.$router.push({name:'Agent',params:{show:true}})
				})
			},
			getMyApplicationMaterials(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getMyApplicationMaterials',
				}).then(res=>{
					console.log(res.data.application_materials)
					this.agent=res.data.application_materials
					this.state=res.data.application_materials.state
					this.idCardPeverse=res.data.application_materials.idCardPeverse
					this.idCardPositive=res.data.application_materials.idCardPositive
					this.name=res.data.application_materials.xm
					if(res.data.application_materials.name){
						this.school=res.data.application_materials.name
					}
					this.phone=res.data.application_materials.mobile
					
				})
			}
		},
		created(){
			let url=getUrl()
			this.url=url
			
		},
		mounted(){
			if(this.$route.params.activeName){
				this.name=this.$route.params.name
				this.phone=this.$route.params.phone
				this.activeName=this.$route.params.activeName
				this.school=this.$route.params.school
				this.getMyApplicationMaterials()
			}
			let suiji=Math.floor(Math.random()*1000000)
			$('.count').css('border','1px dashed #'+suiji)
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.tabs{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		background: white;
	}
	.gray{
		background: gainsboro !important;
		color: #666666 !important;
	}
	.wapper{
		height: 100vh;
		overflow: hidden;
	}
	.name{
		border-bottom: 1px solid #E5E5E5;
	}
	.name input{
		background: transparent;
	}
	.phoneNum input{
		background: transparent;
	}
	.beagent{
		/*overflow: hidden;
		width: 100%;
		background:white;*/
		/*height: 100vh;*/
	}
	.msgCont{
		background: gainsboro;
	}
	.img1{
		width: 80%;
		padding-top: .1rem;
		height: 80%;
		display: block;
		margin: 0 auto;
	}
	.benefits h1{
		background: lightblue;
		width: 70%;
		text-align: center;
		margin: 0 auto;
		padding: 0.1rem;
	}
	.benefits h1 p{
		padding-left:0;
		font-size: .18rem;
		font-weight: bold;
		color: black;
		line-height: .7rem;
		border: 2px dashed white;
	}
	.count{
		border: 1px dashed black;
	}
	.benefits{
		background: white;
		padding: .2rem;
		height: 100vh;
		margin-top: .4rem;
	}
	.benefits h2{
		background-image: url(../../../../../static/image/s-title.png);
		background-size: 100% 60%;
		background-position:  50% 70%;
		background-repeat: no-repeat;
		line-height: .8rem;
		text-align: center;
		font-size: .16rem;
		font-weight: bold;
	}
	.benefits p{
		padding-left: 2em;
	}
	.subMsg{
		background:#F5F5F5;
		margin-top: .5rem;
	}
	.subMsg h2{
		text-align: center;
		height: .5rem;
		line-height: .5rem;
		font-size: .16px;
		font-weight: bold;
	}
	.subMsg p{
		background: white;
		height: .45rem;
		line-height: .45rem;
		text-indent: .14rem;
		position: relative;
	}
	.phoneNum{
		border-bottom: 1px solid #E5E5E5;
	}
	.subMsg p label{
		display: inline-block;
		width: .9rem;	
		font-size:.15rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.subMsg p input{
		width: 2.5rem;
		outline: none;
		border: none;
		font-size:.15rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:#666666;
	}
	.school{
		margin-bottom: .1rem;
	}
	.school span:first-child{
		width: .8rem;
		display: inline-block;
		font-size:.15rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.school span:last-child{
		float: right;
		padding-right: .3rem;
		font-size:.15rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.school i img{
		width: .07rem;
		height: .12rem;
		margin-left: .07rem;
		margin-bottom: .04rem;
	}
	.photo{
		background: white;
	}
	.file{
		display: flex;
		justify-content: center;
		padding: .2rem 0;
		box-sizing: border-box;
	}
	.firLabel{
		margin-right: .15rem;
	}
	.secLabel{
		margin-left: .15rem;
	}
	.file p{
		background:rgba(248,104,31,1);
		color: white;
		border-bottom-left-radius: 7px;
		border-bottom-right-radius: 7px;
		height: .3rem;
		font-size: .13rem;
		line-height: .3rem;
		border: none !important;
	}
	.photo >p label{
		width: 1.5rem;
	}
	.photo input{
		visibility: hidden;
		position: absolute;
		width: 0px;
		height: 0px;
	}
	.photo p{
		border-bottom: 1px solid gainsboro;
	}
	.photo img{
		width: 1.13rem;
		height: .75rem;
	}
	.tip{
		font-size: .15rem;
		line-height: .18rem;
		display: flex;
		/*align-items: center;*/
		padding-left: .14rem;
	}
	.tip span{
		display: inline-block;
		width: 3.5rem;
		line-height: .18rem;
		text-indent: 0;
		text-align: left
	}
	.tip img{
		margin-right: .06rem;
		width: .15rem;
		height: .15rem;
		margin-left: .14rem;
	}
	.btn{
		text-align: center;
		background: white;
	}
	.btn h2{
		line-height: .25rem;
		height: .5rem;
		text-align: left;
		width: 90%;
		padding-left: 10%;
		margin-top: .2rem;
	}
	.btn button{
		outline: none;
		width: 3.3rem;
		height: .4rem;
		background:rgba(248,104,31,1);
		color: white;
		border-radius: .2rem;
		border: none;
		margin: 0 .15rem;
	}
	.btn p{
		font-size: .14rem;
		line-height: .2rem;
		text-indent: 0;
		padding-top: .05rem;
		width: 85%;
		text-align: left;
		margin: 0 auto;
	}
</style>