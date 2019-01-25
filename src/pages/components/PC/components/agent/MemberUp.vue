<template>
	<div class="memberUp">
		<div class="time">
			<button @click="preMon"><img src="../../../../../assets/image/memberUp (2).png"/>{{time|monPre}}月份</button>
			<div @click='openPicker' class="timePicker">
				<p>{{time|date}}<img src="../../../../../assets/image/memberUp (1).png"/></p>
				<wv-datetime-picker
				    ref="picker"
				    type="date"
				    v-model="pickerValue"
				    year-format="{value} 年"
  					month-format="{value} 月"
				    class='pickerDate'
				     @confirm="handleConfirm"
				    >
				  </wv-datetime-picker>	
			    </div>
		    <button @click="nexMon">{{time|monNex}}月份<img src="../../../../../assets/image/memberUp (3).png"/></button>
		</div>
			<div class="tabs">
				<el-tabs stretch v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="待审核" name="first"></el-tab-pane>
					<el-tab-pane label="待领奖励金" name="second"></el-tab-pane>
					<el-tab-pane label="已领奖励金" name="third"></el-tab-pane>
				</el-tabs>
				<span v-if="num.length>0" class="num">{{num.length}}</span>
			</div>
		<div class="wapper" ref='wapper'>
		<div>
			<div v-if="activeName=='first'">
				<div class="tips" v-if='record.length==0'>暂无数据!</div>
				<div class="auditList" v-for="item of record">
					<h2>{{item.xm}}<span>{{item.imgUpTime}}</span></h2>
					<div>
						<div class="cont">
							<p>上传银行: <span>{{item.productName}}</span></p>
							<p>上传截图: <span>{{item.type|picType}}</span></p>
							<p>审核状态: <span>待审核</span></p>
						</div>
					</div>
				</div>
			</div>
			<div v-if="activeName=='second'">
				<div class="tips" v-if='record.length==0'>暂无数据!</div>
				<div class="auditList" v-for="item of record">
					<h2>{{item.xm}}<span>{{item.imgUpTime}}</span></h2>
					<div>
						<div class="cont">
							<p>上传银行: <span>{{item.productName}}</span></p>
							<p>上传截图: <span>{{item.type|picType}}</span></p>
							<p class="pass"><i>审核状态: <span>审核通过</span></i><button @click="getRed(item.applyId)" class="btn1">立即领取</button></p>
						</div>
					</div>
				</div>
			</div>
			<div v-if="activeName=='third'">
				<div class="tips" v-if='record.length==0'>暂无数据!</div>
				<div class="auditList" v-for="item of record">
					<h2>{{item.xm}}<span>{{item.imgUpTime}}</span></h2>
					<div>
						<div class="cont">
							<p>上传截图: <span>{{item.productName}}</span></p>
							<p>上传截图: <span>{{item.type|picType}}</span></p>
							<p class="pass"><i>审核状态: <span>审核通过</span></i><button class="btn2">已领取</button></p>
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
		<div class="tip" style="display: none;">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
		        <div class="weui-dialog__bd">{{tip}}</div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="close" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Qs from 'qs'
	import BScroll from 'better-scroll'
	import getUrl from '@/assets/js/getUrl.js';
	export default{
		name:'MemberUp',
		filters:{
			picType(val){
				switch (val){
					case 0:return '银行短信通知截图'
					break
					case 1:return '卡片照片'
				}
			},
			img(val){
				let url=getUrl()
				return url+'attachManage/getAttach?attachid='+val
			},
			monPre(val){
				if(typeof val!='string'){
					var mounth=val.getMonth()+1
					if(mounth=='1'){
						mounth=13
					}
				}
				return mounth-1
			},
			monNex(val){
				if(typeof val!='string'){
					var mounth=val.getMonth()+1
					if(mounth=='12'){
						mounth=0
					}
				}
				return mounth+1
			},
			date(val){
				if(typeof val!='string'){
					var year=val.getFullYear()
					var mounth=val.getMonth()+1
				}
				return year+"年"+mounth+"月"
			}
		},
		data(){
			return{
				activeName:'first',
				record:[],
				bonusState:'',
				pickerValue:'',
				show:false,
				time:'',
				mon:'',
				times:'',
				url:'',
				tip:'领取成功！',
				num:[]
			}
		},
		methods:{
			close(){
				$('.tip').css('display','none')
			},
			preMon(){
				//上个月
				let ss=new Date(this.time.getTime()-2678400000)
				this.time=ss
			},
			nexMon(){
				//下个月
				let ss=new Date(this.time.getTime()+2678400000)
				this.time=ss
			},
			openPicker() {
				//打开时间选择
				if(this.show){
					this.$refs.picker.close();
					this.show=false
				}else{
					this.$refs.picker.open();
					this.show=true
				}
		    },
			handleConfirm(val){
//				console.log(val.getTime())
				this.time=this.pickerValue
				this.$refs.picker.close();
			},
			
			handleClick(){
				this.scroll.scrollToElement('div')
				switch(this.activeName){
					case 'first':this.bonusState=''
					break; 
					case 'second':this.bonusState='0'
					break;
					case 'third':this.bonusState='1'
					break;
				}
				this.getRuaList(this.bonusState,this.times);
			},
			getRuaList(state,times){
				let data={}
				if(state!=''){
					//查询审核通过
					data={
						"bonusState": state,// 红包领取状态 0 ：未领 1 ：已领
						"imgState": "2",
						"yyyy_mm":times
					}
				}else{
					//查询未审核通过数据
					data={
						"bonusState": '',
						"imgState": "1",
						"yyyy_mm":times
					}
				}
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getRuaList',
					data:Qs.stringify(data)
				}).then(res=>{
//					console.log(res.data.rows,data)
					this.record=res.data.rows
				})
			},
			getRed(id){
				//领取红包
				let data={
					'applyId':id,
					'type':'1'
				}
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/sendRedPack',
					data:Qs.stringify(data)
				}).then(res=>{
//					console.log(res)
					if(res.data.error_code==0){
						$('.tip').css('display','block')
						let delateId=this.record.filter((item,index)=>{
								return item.applyId==id
							})
						this.record.splice(this.record.indexOf(delateId[0]),1)
					}else{
						this.tip=res.data.error_message
						$('.tip').css('display','block')
					}
				})
			}
		},
		watch:{
			time(){
				let mon=this.time.getMonth()+1
				if(mon<10){
					mon='0'+mon
				}
				this.times=this.time.getFullYear()+'-'+mon
				this.getRuaList(this.bonusState,this.times)
			}
		},
		created(){
			let url=getUrl()
			this.url=url
			let data={
					"bonusState": '0',// 红包领取状态 0 ：未领 1 ：已领
					"imgState": "2",
				}
			console.log(data)
			axios({
				headers:{'Content-Type':'application/x-www-form-urlencoded'},
				method: 'post',
				url: this.url+'wechatManage/getRuaList',
				data:Qs.stringify(data)
			}).then(res=>{
//					console.log(res.data.rows,data)
					this.num=res.data.rows.filter(item=>{
						return item.imgState=='2'
					})
					console.log(this.num)
				this.record=res.data.rows
			})
		},
		created(){
			let urlStr=location.href
			if(urlStr.indexOf('type')>=0){
				this.activeName='second'
				this.bonusState='0'
				this.getRuaList(this.bonusState,this.times)
			}
		},
		mounted(){
			let url=getUrl()
			this.url=url
			this.scroll= new BScroll (this.$refs.wapper,{click:true})
			this.getRuaList(this.bonusState,this.times)
			//当天11点59分59秒
			const start = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
			this.pickerValue=start
			this.time=start
			$('.weui-picker__group')[2].remove()
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.num{
		position: absolute;
		top: .48rem;
		left: 59%;
		display: block;
		background: red;
		border: none;
		border-radius: 50%;
		width: .18rem;
		text-align: center;
		height: .18rem;
		line-height: .18rem;
		font-size: .12rem;
		color: white;
		z-index: 889;
	}
	.pickerDate{
		z-index: 22;
	}
	.timePicker{
		text-align: center;
		line-height: .45rem;
		height: .45rem;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.timePicker>p {
		background: white;
		height: .3rem;
		color: #333333;
		font-size: .14rem;
		width: 1.8rem;
		text-align: center;
		line-height: .3rem;
	}
	.timePicker >p img{
		width: .25rem;
		height: .15rem;
		padding-left: .1rem;
		border-left: 1px solid #333333;
		margin-left: .1rem;
		margin-bottom: .03rem;
	}
	.time{
		padding:0 .2rem;
		height: 7vh;
		display: flex;
		background: #F8681F;
		align-items: center;
		justify-content: space-around;
	}
	.time input[type=button], input[type=submit], input[type=file], button { 
        cursor: pointer ; 
       -webkit-appearance: none ;
		width: 1.2rem;
		outline: none;
		color: white;
		height: .45rem;
		font-size: .14rem;
		line-height: .45rem;
		background: transparent;
		border: none;
	}
	.time button img{
		width: .07rem;
		height: .12rem;
		margin: 0 .05rem;
		padding-bottom: .03rem;
	}
	.wapper{
		width: 100%;
		height: 87vh;
		background: #f5f5f5;
		position:absolute;
		overflow: hidden;
		z-index: 1;
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
	.tabs{
		background: white;
	}
	.auditList{
		background: white;
		padding: .12rem .15rem;
		margin-bottom: .1rem;
	}
	.auditList img{
		width: 1.2rem;
		height: .85rem;
		margin-right: .15rem;
	}
	.auditList>div{
		display: flex;
	}
	.auditList h2{
		padding-bottom: .1rem;
		margin-bottom: .1rem;
		font-weight: 400;
		align-items: center;
		height: .4rem;
		font-size: .13rem;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #EEEEEE;
	}
	.auditList h2>span{
		font-size: .12rem;
		font-weight: normal;
		color: #999999;
	}
	.cont img{
		width: 1.5rem;
		height: 1rem;
	}
	.cont{
		width: 100%;
	}
	.cont p{
		color: #999;
		margin-bottom: .1rem;
	}
	.cont p:last-child{
		margin-bottom: 0 !important;
	}
	.cont span{
		margin-left: .1rem;
		color: #666;
	}
	.pass{
		display: flex;
		justify-content: space-between;
	}
	.pass i{
		font-style: normal;
	}
	.btn1{
		width: .65rem;
		height: .21rem;
		color: white;
		background: #F8681F !important;
		border: none;
		outline: none;
		line-height: .2rem;
		border-radius: .05rem;
		font-size: .11rem;
	}
	.btn2{
		width: .65rem;
		line-height: .2rem;
		height: .21rem;
		color: white;
		background:rgba(153,153,153,1) !important;
		border: none;
		outline: none;
		border-radius: .05rem;
		font-size: .11rem;
	}
	.tips{
		text-align: center;
	}
</style>