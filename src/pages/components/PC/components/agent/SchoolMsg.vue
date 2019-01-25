<template>
	<div class="school" v-cloak>
		<div class="search" >
			<div class="sea">
				<p><label for="Schname" class="iconfont"><img src="../../../../../assets/image/search.png"/><input type="text" placeholder="学校名称关键字搜索" id="Schname" v-model="schoolName" /></label></p>
				<span @click="search">搜索</span>
			</div>
			<div class="scroll" ref='wapper' v-if="!selected">
				<ul>
					<li v-if='schoolList.length==0'><p>无匹配学校！</p></li>
					<li @click="fn(item.name,item.schoolId)" v-for="item in schoolList">{{item.name}}</li>
				</ul>
			</div>
			<div v-if="selected" class="msgCont">
				<div class="cout">
					<p class="scName">{{data.name}}</p>
					<div class="scNumber">
						<p>招生办电话:<span>{{data.mobile}}</span></p>
						<p>学校邮编:<span>{{data.zipCode}}</span></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/getUrl.js';
	import axios from 'axios'
	import BScroll from 'better-scroll'
	import Qs from 'qs'
	export default{
		name:'SchoolMsg',
		data(){
			return{
				name:'',
				phone:'',
				schoolList:[],
				schoolName:'',
				list:[],
				resultList:[],
				selected:false,
				data:{},
				url:''
			}
		},
		methods:{
			fn(name,id){
				//返回申请页
				let data={
					"name":name
				}
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'schoolManage/getSchoolSelect',
				data:Qs.stringify(data)
				}).then(res=>{
//					console.log(res.data.rows[0])
					this.data=res.data.rows[0]
				})
				this.selected=true
			},
			getSchool(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'schoolManage/getSchoolSelect',
				}).then(res=>{
//					console.log(res.data.rows)
					this.schoolList=res.data.rows
					this.resultList=res.data.rows
				})
			},
			search(){
				
			}
		},
		mounted(){
			let url=getUrl()
			this.url=url
			this.scroll= new BScroll (this.$refs.wapper, {click: true})
			this.name=this.$route.params.name
			this.phone=this.$route.params.phone
			this.getSchool();
		},
		watch:{
			schoolName(){
				//学校关键字查找
				this.selected=false
				if (this.timer) {
			        clearInterval(this.timer)
			     }
				if(this.schoolName==''){
					axios({
						headers:{'Content-Type':'application/x-www-form-urlencoded'},
						method: 'post',
						url: this.url+'schoolManage/getSchoolSelect',
					}).then(res=>{
	//					console.log(res.data.rows)
						this.schoolList=res.data.rows
						this.resultList=res.data.rows
					})
				}
			      if (!this.schoolName) {
			        this.list = []
			        return
			      }
			      this.timer = setTimeout(() => {
			      	  this.list = []
			          this.resultList.forEach((value,index) => {
			            if (value.name.indexOf(this.schoolName) > -1 ) {
			               this.list.push(value)
			            }
			          })
			          this.schoolList=this.list
			      }, 100)
			    }
				
			
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.sea{
		background: white;
		display: flex;
		height: .5rem;
		margin-bottom: .05rem;
		align-items: center;
	}
	.sea p{
		width: 3.55rem;
		background: #F5F5F5 !important;
		margin-left: .2rem;
	}
	.sea span{
		text-align: center;
		width: .5rem;
		display: inline-block;
		font-size: .16rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.sea img{
		width: .14rem;
		height: .14rem;
		vertical-align: middle;
		position: absolute;
		top: 50%;
		left: 0;
		margin: -.07rem 0 0 .14rem;
	}
	.search input{
		background: transparent !important;
		margin-left: .15rem;
		height: .3rem;
		line-height: .3rem;
		outline: none;
		font-size: .12rem;
		border: none;
		text-indent: .2rem;
	}
	.search label{
		width: 2.6rem;
		font-size: .12rem;
		text-align: center;
		display: flex;
		position: relative;
	}
	.search{
		background: #F5F5F5;
		
	}
	.msgCont{
		overflow: hidden;
		height: 100vh;
		background: #F5F5F5;
	}
	.msgCont >div{
		background: white;
		height: 1.1rem;
		padding:0 .15rem;
		margin-bottom: .1rem;
	}
	.scName{
		padding: .15rem 0;
		border-bottom: 1px solid #E5E5E5;
		color: #666666;
		font-size: .15rem;
	}
	.scNumber{
		padding-top: .1rem;
	}
	.scNumber p{
		font-size: .13rem;
		color: #666666;
		font-family:Source Han Sans CN;
		line-height: .18rem;
	}
	.scNumber span{
		font-size: .15rem;
		color: #666666;
		font-family:Source Han Sans CN;
		line-height: .18rem;
	}
	.scroll{
		overflow: hidden;
		height: 90.5vh;
	}
	.search ul{
		background: white;
		padding:0 .2rem;
	}
	.search li{
		background: white;
		height: .45rem;
		line-height: .45rem;
		border-bottom: 1px solid #EEEEEE;
		
	}
	.cout{
		height: 1.1rem;
	}
</style>