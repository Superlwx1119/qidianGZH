<template>
	<div class="upPicture" ref='wapper'>
		<div class="tabs">
			<el-tabs stretch v-model="activeName" @tab-click="handleClick">
				<el-tab-pane class='labelTxt' label="银行核卡短信截图" name="first"></el-tab-pane>
				<el-tab-pane class='labelTxt' label="卡片拍照图片" name="second"></el-tab-pane>
			</el-tabs>
		</div>
		<div v-if="activeName=='first'" class="photo">
			<div class="file">
				<label  class="firLabel"><p>示例</p><img id="zheng" @click="showMsgP" :src="data.figure2|img"/>
				</label>
				<label for="reverse"  class="secLabel"><p>上传截图</p><img id="fan" class="fan2" :src="img1==''?'./static/image/2c65bcf01a9f8ea1217944ebb3129c55.jpg':img1|img"/></label><input @change="changeIMg1($event)" :disabled="state1>=1" type="file" id="reverse" accept="image/*" mutiple  />
			</div>
			<p class="tip"><img :src="state1>=1?'./static/image/bingo.png':'./static/image/msg.png'"/><span v-if='state1==0'>未提交</span><span v-if="state1==1">已提交(请等待审核)</span><span v-if="state1==3">正在上传</span><span v-if="state1==-1">审核失败</span><span v-if="state1==2">审核通过</span></p>
			<div class="btn">
				<button :disabled="isdisabled1" :class="state1|state" @click="upMsg($event)">{{btnTxt}}</button>
				<p class="left"><i>重要提醒：</i><span>如果您已办理过该信用卡，将无法获得补贴。</span></p>
				<p class="left">请按示例将银行核卡成功短信截图并上传</p>
			</div>
		</div>
		<div v-if="activeName=='second'" class="photo">
			<div class="file">
				<label  class="firLabel"><p>示例</p><img id="zheng" @click="showCardP" :src="data.figure3|img"/>
				</label>
				<label for="reverse"  class="secLabel"><p>上传截图</p><img id="fan" class="fan2" :src="img2==''?'./static/image/2c65bcf01a9f8ea1217944ebb3129c55.jpg':img2|img"/></label><input @change="changeIMg2($event)" :disabled="state2>=1" type="file" id="reverse" accept="image/*" mutiple="mutiple"  />
			</div>
			<p class="tip"><img :src="state2>=1?'./static/image/bingo.png':'./static/image/msg.png'"/><span v-if='state2==0'>未提交</span><span v-if="state2==1">已提交(请等待审核)</span><span v-if="state2==3">正在上传</span><span v-if="state2==-1">审核失败</span><span v-if="state2==2">审核通过</span></p>
			<div class="btn">
				<button :disabled="isdisabled2" :class="state2|state"  @click="upCard($event)">{{btnTxt}}</button>
				<p class="left"><i>重要提醒：</i><span>如果您已办理过该信用卡，将无法获得补贴。</span></p>
				<p class="left">请按示例将银行信用卡照片上传</p>
			</div>
			
		</div>
		<ShowEg v-if='show' :data='data' @close='close' :showmsg='showmsg' :showcard='showcard' ></ShowEg>
		<div class="tips" style="display: none;">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
		        <div class="weui-dialog__bd">{{tips}}</div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="closes" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import getUrl from '@/assets/js/getUrl.js';
	import BScroll from 'better-scroll'
	import ShowEg from './ShowEg';
	import Qs from 'qs'
	export default{
		name:'UpPicture',
		components:{
			ShowEg
		},
		filters:{
			state(val){
				switch (val){
					case 0:return ''
					break;
					case 1:return 'gray'
					break;
					case -1:return ''
					break;
					case 2:return 'gray'
					break;
					case 3:return 'gray'
					break;
				}
			},
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
				tips:'上传成功!',
				btnTxt:'上传',
				activeName:'first',
				url:'',
				data:{},
				eventOjb1:{},
				eventOjb2:{},
				img1:'',
				img2:'',
				show:false,
				showmsg:0,
				showcard:0,
				state1:'0',
				state2:'0',
				isdisabled1:false,
				isdisabled2:false,
				productId:''
			}
		},
		methods:{
			closes(){
				$('.tips').css('display','none')
			},
			close(){
				this.show=false
				this.showmsg=0
				this.showcard=0
			},
			showMsgP(){
				this.showmsg=1
				this.show=true
				
			},
			showCardP(){
				this.showcard=1
				this.show=true
			},
			back(){
				this.$router.push('/home2')
			},
			handleClick(){
				if(this.activeName=='first'){
					//切换为短信截图
					let data={
						"productId":this.productId,
						"type": "0"
					}
					axios({
						headers:{'Content-Type':'application/x-www-form-urlencoded'},
						method: 'post',
						url: this.url+'wechatManage/getMyUploadApply',
						data:Qs.stringify(data)
					}).then(res=>{
//						console.log(res.data.rows[0])
						this.state1=res.data.rows[0].imgState
						this.img1=res.data.rows[0].img
					})
				}else{
					//切换为卡片截图
					let data={
						"productId":this.productId,
						"type": "1"
					}
					axios({
						headers:{'Content-Type':'application/x-www-form-urlencoded'},
						method: 'post',
						url: this.url+'wechatManage/getMyUploadApply',
						data:Qs.stringify(data)
					}).then(res=>{
//						console.log(res)
						this.state2=res.data.rows[0].imgState
						this.img2=res.data.rows[0].img
					})
				}
			},
			changeIMg1(e){
				let reads= new FileReader();
		        let f=document.getElementById('reverse').files[0];
		        reads.readAsDataURL(f);
		        reads.onload=function (e) {
		            document.getElementById('fan').src=this.result;
		        };
		        this.eventOjb1=e
			},
			changeIMg2(e){
				let reads= new FileReader();
		        let f=document.getElementById('reverse').files[0];
		        reads.readAsDataURL(f);
		        reads.onload=function (e) {
		            document.getElementById('fan').src=this.result;
		        };
		        this.eventOjb2=e
			},
			upMsg(){
				//上传短信截图并预览
//				this.isdisabled1=false
//				setTimeout(()=>{
//					this.isdisabled1=false
//				},2000)
//				
				
				if(this.state1==1||this.state1==2){
					this.tips='您目前无需再上传,请勿重复操作!'
					$('.tips').css('display','block')
					return
				}
				if(this.eventOjb1.target){
					var formData = new FormData(); 
				    formData.append('img', this.eventOjb1.target.files[0]);
				    formData.append('productId', this.data.productId);
				    formData.append('type', '0');
				    this.tips='图片上传中,请稍候!';
					$('.tips').css('display','block');
			    	this.isdisabled1=true;
			    	this.state1==3;
					this.btnTxt='图片上传中,请稍候';
//				    $(document).ajaxStart(function(){
//				    	this.tips='图片上传中,请稍候!'
//						$('.tips').css('display','block')
//				    	this.isdisabled1=true
//				    	this.state1==3
//						this.btnTxt='图片上传中,请稍候'
//					});
					
					$(document).ajaxComplete(function(){
						this.btnTxt='上传完毕'
					})
				      $.ajax({
				        url: this.url+'wechatManage/updUploadApplyImg',//这里是后台接口需要换掉
				        type: 'POST',
				        dataType: 'json',
				        cache: false,
				        data: formData,
				        processData: false,
				        contentType: false,
				        success:(res)=>{   
				        	if(res.error_code==0){
				        		this.tips='上传成功!'
								$('.tips').css('display','block')
								this.btnTxt='上传'
				        	}else{
				        		this.tips=res.error_message
								$('.tips').css('display','block')
								this.btnTxt='上传'
				        	}
				        	let data={
				        		"productId":this.productId,
								"type": "0"
							}
							axios({
								headers:{'Content-Type':'application/x-www-form-urlencoded'},
								method: 'post',
								url: this.url+'wechatManage/getMyUploadApply',
								data:Qs.stringify(data)
							}).then(res=>{
		//						console.log(res.data.rows[0])
								this.state1=res.data.rows[0].imgState
								this.img1=res.data.rows[0].img
							})
	//			        	console.log(res)
				        }
				      })
				}else{
					this.tips='请重新选择照片!'
					$('.tips').css('display','block')
				}
			},
			upCard(){
				//上传卡片截图并预览
				if(this.state2==1||this.state2==2){
					this.tips='您目前无需再上传,请勿重复操作!'
					$('.tips').css('display','block')
					return
				}
				if(this.eventOjb2.target){
			    	var formData = new FormData(); 
				    formData.append('img', this.eventOjb2.target.files[0]);
				    formData.append('productId', this.data.productId);
				    formData.append('type', '1');
				    this.tips='图片上传中,请稍候!';
					$('.tips').css('display','block');
			    	this.isdisabled2=true;
			    	this.state2==3;
					this.btnTxt='图片上传中,请稍候';
//				    $(document).ajaxStart(function(){
//				    	this.tips='图片上传中,请稍候!'
//						$('.tips').css('display','block')
//				    	this.isdisabled2=true
//				    	this.state2==3
//						this.btnTxt='图片上传中,请稍候'
//					});
					
					$(document).ajaxComplete(function(){
						this.btnTxt='上传完毕'
					})
				      $.ajax({
				        url: this.url+'wechatManage/updUploadApplyImg',//这里是后台接口需要换掉
				        type: 'POST',
				        dataType: 'json',
				        cache: false,
				        data: formData,
				        processData: false,
				        contentType: false,
				        success:(res)=>{   
				        	if(res.error_code==0){
				        		this.tips='上传成功!'
				        		this.btnTxt='上传'
								$('.tips').css('display','block')
				        	}else{
				        		this.tips=res.error_message
								$('.tips').css('display','block')
								this.btnTxt='上传'
				        	}
				        	let data={
				        		"productId":this.productId,
								"type": "1"
							}
							axios({
								headers:{'Content-Type':'application/x-www-form-urlencoded'},
								method: 'post',
								url: this.url+'wechatManage/getMyUploadApply',
								data:Qs.stringify(data)
							}).then(res=>{
		//						console.log(res)
								this.state2=res.data.rows[0].imgState
								this.img2=res.data.rows[0].img
							})
//				        	console.log(res)

				        }
			      })
			    }else{
			    	this.tips='请重新选择照片!'
					$('.tips').css('display','block')
					
			    }
			},
			getProductList(){
				//获取银行列表
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getProductList',
				}).then(res=>{
					console.log(res)
					this.data=res.data.rows[0]
				})
			}
		},
		mounted(){
			let url=getUrl()
			this.url=url
			this.getProductList()
			this.productId=this.$store.state.productId
			let data={
				"productId":this.productId,
				"type": "0"
			}
			axios({
				headers:{'Content-Type':'application/x-www-form-urlencoded'},
				method: 'post',
				url: this.url+'wechatManage/getMyUploadApply',
				data:Qs.stringify(data)
			}).then(res=>{
//				console.log(res.data.rows[0])
				this.state1=res.data.rows[0].imgState
				this.img1=res.data.rows[0].img
			})
			this.scroll= new BScroll (this.$refs.wapper,{click:true})
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.left{
		display: flex;
		
		text-align: left !important;
		text-indent: .2rem;
	}
	.left i{
		font-style: normal;
	}
	.left span{
		text-indent: 0;
		display: inline-block;
		flex: 1;
	}
	.upPicture{
		background: #F5F5F5;
		height: 100vh;
	}
	.fan{
		width: .6rem !important;
		height: .6rem !important;
		margin: .35rem .45rem;
	}
	.fan2{
		width: .6rem ;
		height: .6rem ;
		margin: 0 !important;
	}
	.gray{
		background: gainsboro !important;
		color: #666666 !important;
	}
	.file{
		background: white;
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
		color: #666666;
		text-align: center;
		height: .3rem;
		margin-bottom: .1rem;
		font-size: .14rem;
		line-height: .3rem;
		border: none !important;
	}
	.photo{
		margin-top: .1rem;
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
	.photo img{
		width: 1.5rem;
		height: 1.3rem;
	}
	.tip{
		padding: 0 .2rem;
		margin-top: .2rem;
		
	}
	.tip img{
		width: .15rem;
		height: .15rem;
		vertical-align: middle;
		margin-right: .1rem;
	}
	.btn{
		text-align: center;
	}
	.btn button{
		background: #F8681F;
		width: 3.5rem;
		height: .4rem;
		text-align: center;
		border: none;
		outline: none;
		border-radius: .2rem;
		color: white;
		font-family:Microsoft YaHei;
		margin: .2rem 0;
	}
	
	
</style>