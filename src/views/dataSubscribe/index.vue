<template>
<div v-loading.fullscreen="loading">
<router-view v-if='$route.name == "dataDetail"'></router-view>
<div class="dataSubscribe" v-else>
	<div class="reportBtns">
		<div :class="type == 0?'btnClass btnActive':'btnClass'" @click="choose(0)"><span :class="type == 0?'dotClass dotActive':'dotClass'"></span>数据订阅</div>
		<div :class="type == 1?'btnClass btnActive':'btnClass'" @click="choose(1)"><span :class="type == 1?'dotClass dotActive':'dotClass'"></span>消息接收</div>
	</div>
	<div :class="type == 0?'mySubscribe':'mySubscribe1'">
	<div class="filterSection">
		<div class="dataList"><div class="verticalBar"></div>订阅列表</div>
		<a href="javascript:;"><div class="adData" @click="openNewSub = true"><i class="iconfont icon-dingyue1"></i></div></a>
			<!-- demo-ruleForm  -->
			<!-- label-width="100px"  -->
		<div class="filterPart"><div class="verticalBar"></div>快速筛查
		<el-form :model="filterForm" ref="filterForm" label-width="40px" class="filterList">
			<!-- :rules="filteRules"   -->
			<el-form-item label="地区" prop="region" class="filterListItem">
				<el-select v-model="filterForm.region" multiple collapse-tags placeholder="请选择对比地区" style="width:220px">
					<el-option v-for="item in regions" :key="item.id" :value="item.id" :label="item.name">
						{{item.name}}
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="材料" prop="type" class="filterListItem">
				<el-select v-model="filterForm.type" multiple collapse-tags placeholder="请选择材料类型" style="width:220px">
					<el-option v-for="item in material" :key="item.id" :value="item.id" :label="item.name">
						{{item.name}}
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="时间" prop="time" class="filterListItem">
				    <el-date-picker v-model="filterForm.time" type="month" value-format='yyyy.MM' placeholder="请选择月份" style="width:220px"></el-date-picker>
			</el-form-item>
			<el-form-item class="filterListItem">
				<el-button type="primary" @click="submitForm('filterForm')" class="filterBtn" style="background-color:#8B78FE;margin-left:-30px">筛查</el-button>
			</el-form-item>
		</el-form>
		</div>
	</div>
	<div class="dataContent">
		<ul class="dataContentUl">
			<li class="dataListTitle">
				<!-- <div v-for="(item,index) in dataList" :key="index">编号</div> -->
				<div class="titleItem title_num">编号</div>
				<div class="titleItem title_region">地区</div>
				<div class="titleItem title_materi">材料</div>
				<div class="titleItem title_title">订阅名称</div>
				<div class="titleItem title_time">发布时间</div>
				<div class="titleItem title_do">操作</div>
			</li>
			<li class="dataListClass" v-for="item in dataList" v-bind:key="item.id">
				<div class="listItem list_num">DY{{item.number}}</div>
				<div class="listItem list_region">{{item.area?item.area.slice(0,11):''}}...</div>
				<div class="listItem list_materi">{{item.maName?item.maName.slice(0,15):''}}...</div>
				<div class="listItem list_name">{{item.title?item.title.slice(0,10):''}}</div>
				<div class="listItem list_time">{{item.createTime?item.createTime.split('T')[0]:''}}</div>
				<div class="listItem list_do"><a href="javascript:;"><span class="seeBtn" @click="toDetail(item.id)">查看详情</span></a><a href="javascript:;"><span class="deleBtn" @click="deleteItem(item.id)">删除</span></a></div>
			</li>
		</ul>
		<div class="noData" :style="imgVis">
			<img src="../../../public/img/subscribe/noFind.png" class="noDataImg">
			<p class="noDatap1">暂时没有找到</p>
			<p class="noDatap2">不要着急，要不再试试~</p>
		</div>
		<div class="noData" :style="imgVis1">
			<img src="../../../public/img/subscribe/noMessage.png" class="noDataImg">
			<p class="noDatap1">暂时没有订阅数据</p>
			<p class="noDatap2">快点击上方新增按钮订阅吧~</p>
		</div>
		<el-pagination :page-size="pageSize" :total="totalPage" :pager-count="5" :current-page="pageNum" layout="prev, pager, next" :hide-on-single-page="true" 
		class="reportPage" @current-change="get_data" @prev-click="get_data" @next-click="get_data">
		</el-pagination>
	</div>
	</div>
	<div :class="type == 1?'messageVis':'messageVis1'">
	<div class="filterSection">
		<div class="dataList"><div class="verticalBar"></div>消息列表</div>
	</div>
	<div class="dataContent">
		<ul class="dataContentUl">
			<li class="dataListTitle">
				<!-- <div v-for="(item,index) in dataList" :key="index">编号</div> -->
				<div class="titleItem title_num">编号</div>
				<div class="titleItem title_region">地区</div>
				<div class="titleItem title_materi">材料</div>
				<div class="titleItem title_title">详细内容</div>
				<div class="titleItem title_time">发送时间</div>
				<div class="titleItem title_do">操作</div>
			</li>
			<li class="dataListClass" v-for="item in dataList" v-bind:key="item.id" >
				<div class="listItem list_num">DY{{item.number}}</div>
				<div class="listItem list_region">{{item.areaName?item.areaName.slice(0,11):''}}...</div>
				<div class="listItem list_materi">{{item.maName?item.maName.slice(0,15):''}}...</div>
				<div class="listItem list_name">{{item.title?item.title.slice(0,10):''}}</div>
				<div class="listItem list_time">{{item.updateTime?item.updateTime.split('T')[0]:''}}</div>
				<div class="listItem list_do"><span class="seeBtn" @click="toDetail(item.id)">查看详情</span><span class="deleBtn" @click="deleteItem1(item.id)">删除</span></div>
			</li>
		</ul>
		<div class="noData" :style="imgVis2">
			<img src="../../../public/img/subscribe/noMessage.png" class="noDataImg">
			<p class="noDatap1">暂时没有消息</p>
		</div>
		<el-pagination :page-size="pageSize" :total="totalPage" :pager-count="5" :current-page="pageNum" layout="prev, pager, next" :hide-on-single-page="true" 
		class="reportPage" @current-change="get_data" @prev-click="get_data" @next-click="get_data">
		</el-pagination>
	</div>	
	</div>
	<el-dialog title="新增材料订阅" :visible.sync="openNewSub" width="620px">
		<el-form :model="newSubForm" :rules="rules" ref="newSubForm" label-width="90px" class="newSubClass">
			<el-form-item label="订阅名称" prop="name" class="">
				<!-- newSubForm.name -->
				<el-input v-model="newSubForm.name" placeholder="请先填写您的订阅名称"></el-input>
			</el-form-item>
			<el-form-item label="时间区间" prop="time" class="">
				    <el-date-picker v-model="newSubForm.time" type="monthrange" value-format='yyyy-MM-dd' range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">

					</el-date-picker>
			</el-form-item>
			<el-form-item label="材料类型" prop="type" class="">
				<el-select v-model="newSubForm.type" multiple collapse-tags placeholder="请选择材料类型">
					<el-option v-for="item in material" :key="item.id" :value="item.id" :label="item.name">
						{{item.name}}
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="对比地区" prop="region" class="">
				<el-select v-model="newSubForm.region" multiple collapse-tags placeholder="请选择对比地区">
					<el-option v-for="item in regions" :key="item.id" :value="item.id" :label="item.name">
						{{item.name}}
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否推送" prop="push" class="">
				<el-switch v-model="newSubForm.push"></el-switch>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm1('newSubForm')" style="background-color:#8B78FE;margin-left:-65px">立即创建</el-button>
				<el-button @click="cancelNewSub('newSubForm')">取消</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			dataList:[],
			// type的值为是全部报告还是平台报告或者其他
			type:0,
			pageNum:1,
			pageSize:8,
			token:this.$store.state.login.token,
			totalPage:8,
			openNewSub: false,
			imgVis:{
				display:'none'
			},
			imgVis1:{
				display:'none'
			},
			imgVis2:{
				display:'none'
			},
			filterForm: {
				region: '',
				type:'',
				time:''
			},
			// 地区和材料都是后端获取的
			regions:[],
			material:[],
			newSubFormName:'',
			newSubForm:{
				name:'',
				time:'',
				type:'',
				region:'',
				push:false
			},
			// filteRules:{
			// 	region:[{required:false,message:'请选择对比地区',trigger:'change'}],
			// 	type:[{required:false,message:'请选择材料类型',trigger:'change'}],
			// 	time:[{required:false,message:'请选择时间',trigger:'change'}]
			// },
			rules:{
				name:[{required:true,message:'请输入订阅名称',trigger:'blur'}],
				time:[{required:true,message:'请选择时间区间',trigger:'change'}],
				type:[{required:true,message:'请选择材料类型',trigger:'blur change'}],
				region:[{required:true,message:'请选择对比地区',trigger:'blur change'}],	
			},
			loading:true
      }
	},
	created(){
		this.dataList = []
		const data1 = {
			token:this.token,
			pageNum:this.pageNum,
			pageSize:this.pageSize,
			areaId:this.filterForm.region.toString(),
			maId:this.filterForm.type.toString(),
			month:this.filterForm.time,
		}
		this.$api.get_subscrib(data1).then(value => {
			if(value.data.count != null){
				this.loading = false
				this.imgVis.display = 'none'
				this.dataList = value.data.list
				this.totalPage = value.data.count
			}else{
				this.loading = false
				this.dataList = []
				this.imgVis.display = 'block'
				this.totalPage = 0
			}
		})
		this.$api.get_area().then(res => {
			console.log(res)
			this.regions = res.data
		})
		this.$api.get_cate().then(res => {
			console.log(res)
			this.material = res.data
		})
		
	},
	// computed:{
	// 	timeChange:function(){
	// 		var dd = new Date(this.filterForm.time)
	// 		return dd.getFullYear()
	// 	}
	// },
	methods:{
		choose:function(status){
			if(status == 0) {
				//先重置pageNum 再获取全部的我的订阅
				this.pageNum =1
				this.type = 0
				this.dataList = []
				this.loading = true
				var data2 = {
					token:this.token,
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					areaId:this.filterForm.region.toString(),
					maId:this.filterForm.type.toString(),
					month:this.filterForm.time
				}
				this.$api.get_subscrib(data2).then(v => {
					if(v.data.count != null){
						this.loading = false
						this.imgVis.display = 'none'
						this.imgVis1.display = 'none'
						this.imgVis2.display = 'none'
						this.dataList = v.data.list
						this.totalPage = v.data.count
					}else{
						this.loading = false
						this.imgVis.display = 'block'
						this.imgVis1.display = 'none'
						this.imgVis2.display = 'none'
						this.dataList = []
						this.totalPage = 0
					}
				})
			}else {
				//消息接收
				this.pageNum = 1
				this.type = 1
				this.dataList = []
				this.loading = true
				var data3 = {
					// token:this.token,
					pageNum:this.pageNum,
					pageSize:this.pageSize
				} 
				this.$api.get_msg(data3).then(v => {
					if(v.data.total != 0){
						this.loading = false
						this.imgVis2.display = 'none'
						this.imgVis.display = 'none'
						this.imgVis1.display = 'none'
						this.dataList = v.data.data
						this.totalPage = v.data.total
					}else{
						this.loading = false
						this.imgVis2.display = 'block'
						this.imgVis.display = 'none'
						this.imgVis1.display = 'none'
						this.dataList = []
						this.totalPage = 0
					}
				})
			}
		},
		get_data() {
			if(this.type == 0){
				var data4 = {
					token:this.token,
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					areaId:this.filterForm.region.toString(),
					maId:this.filterForm.type.toString(),
					month:this.filterForm.time
				}
				this.loading = true
				this.$api.get_subscrib(data4).then(v => {
					if(v.data.count != null){
						this.loading = false
						this.imgVis.display = 'none'
						this.imgVis1.display = 'none'
						this.imgVis2.display = 'none'
						this.dataList = v.data.list
						this.totalPage = v.data.count
					}else{
						this.loading = false
						this.imgVis.display = 'block'
						this.imgVis1.display = 'none'
						this.imgVis2.display = 'none'
						this.dataList = []
						this.totalPage = 0
					}
				})
			}else{
				var data5 = {
					token:this.token,
					pageNum:this.pageNum,
					pageSize:this.pageSize
				}
				this.$api.get_msg(data5).then(v => {
					if(v.data != null){
						this.imgVis.display = 'none'
						this.imgVis1.display = 'none'
						this.imgVis2.display = 'none'
						this.dataList = v.data.data
						this.totalPage = v.data.total
					}else{
						this.imgVis2.display = 'block'
						this.imgVis.display = 'none'
						this.imgVis1.display = 'none'
						this.dataList = []
						this.totalPage = 0
					}

				})
			}
		},
		toDetail(aa){
			this.$router.push('/dataIndex/dataDetail?id='+aa)
		},
		openErr1(){
			this.$message({
				showClose:true,
				message:'操作失败，请稍后重试！',
				type:'error',
				duration:2000
			})
		},
		openSuccess(){
			this.$message({
				showClose:true,
				message:'删除成功！',
				type:'success',
				duration:2000
			})
		},
		openErr(){
			this.$message({
				showClose:true,
				message:'删除失败！',
				type:'error',
				duration:2000
			})
		},
		deleteItem(dd){
			var data7 = {
				id:dd,
				token:this.token
			}
			this.$api.delete_sub(data7).then(v => {
				console.log(v)
				if(v.data.msg = 'success'){
					this.openSuccess()
					this.get_data()
				}else{
					this.openErr()
				}
			})
		},
		deleteItem1(dd){
			var data10 = {
				ids:dd,
				token:this.token
			}
			this.$api.delete_msg(data10).then(v => {
				console.log(v)
				if(v.msg = '操作成功'){
					this.openSuccess()
					this.get_data()
				}else{
					this.openErr()
				}
			})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				console.log(this.pageNum)
				console.log(this.pageSize)
				if (valid) {
					var data6 = {
						token:this.token,
						pageNum:this.pageNum,
						pageSize:this.pageSize,
						areaId:this.filterForm.region.toString(),
						maId:this.filterForm.type.toString(),
						month:this.filterForm.time
					}
					this.$api.get_subscrib(data6).then(v => {
						if(v.data.count != null){
							this.imgVis.display = 'none'
							this.imgVis1.display = 'none'
							this.imgVis2.display = 'none'
							this.$refs[formName].resetFields()
							this.dataList = v.data.list
							this.totalPage = v.data.count
						}else{
							this.dataList = []
							this.$refs[formName].resetFields()
							this.imgVis.display = 'none'
							this.imgVis1.display = 'block'
							this.imgVis2.display = 'none'
							this.totalPage = 0
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		openTip(){
			this.$message({
				showClose:true,
				message:'创建成功！',
				type:'success',
				duration:2000				
			})
		},
		openTip1(){
			this.$message({
				showClose:true,
				message:'创建失败！',
				type:'error',
				duration:2000				
			})
		},
		submitForm1(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var data6 = {
						title:this.newSubForm.name,
						materialID:this.newSubForm.type.toString(),
						token:this.token,
						areaID:this.newSubForm.region.toString(),
						remark:'',
						isPush:Number(this.newSubForm.push),
						startTimeStr:this.newSubForm.time[0],
						endTimeStr:this.newSubForm.time[1]
					}
					this.$api.add_sub(data6).then(v => {
						console.log(v)
						if(v.data.msg = 'success'){
							this.openNewSub = false
							this.$refs[formName].resetFields()
							this.openTip()
							this.get_data()
						}else{
							this.openNewSub = false
							this.$refs[newSubForm].resetFields()
							this.openTip1()							
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		cancelNewSub(formName){
			this.openNewSub = false
			this.$refs[formName].resetFields()
		},
    }
}
</script>
<style lang="stylus" scoped>
.dataSubscribe
	width 100%
	height 100%

.mySubscribe
	width 100%
	height 100%

.mySubscribe1
	display none

.messageVis
	width 100%
	height 100%

.messageVis1
	display none

.dataContent
	width 100%
	height 100%

.dataContentUl
	width 100%
	padding 0 20px
	box-sizing border-box
.dataListTitle
	width 100%
	height 36px
	background rgba(255,255,255,1)
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	border-radius 8px
	margin 20px 0 10px
	display flex
	flex-direction row
	flex-wrap nowrap
	justify-content space-around
	font-size 14px
	color #5C5D62
	text-align center
	line-height 36px


.title_num
	width 10%

.title_region
	width 20%

.title_materi
	width 25%

.title_title
	width 20%

.title_time
	width 10%

.title_do
	width 15%

.dataListClass
	width 100%
	height 48px
	background rgba(255,255,255,1)
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	border-radius 8px
	margin-bottom 20px
	display flex
	flex-direction row
	flex-wrap nowrap
	justify-content space-around
	font-size 14px
	color rgba(44,45,51,1)
	text-align center
	line-height 48px

.dataListClass:hover
	background #D3D8F4

.listItem
	padding 0 20px
	// border 1px red solid
	box-sizing border-box
	overflow hidden
	text-overflow: ellipsis
	white-space nowrap

.list_num
	width 10%
	color #8E9099

.list_region
	width 20%

.list_materi
	width 25%

.list_name
	width 20%

.list_time
	width 10%
	color #8E9099
.list_do
	width 15%

.seeBtn
	display inline-block
	width 60px
	color #2691FF
.deleBtn
	display inline-block
	width 60px
	color #454EFF
.noData
	font-size 20px
	line-height 20px
	text-align center

.noDatap2
	margin-top 10px
	font-size 14px
	color #ccc
	line-height 14px
.noDataImg
	display block
	margin 0 auto
	margin-top 100px
	margin-bottom 10px

.reportPage
	padding 0!important
	margin-top 30px
	margin-right 160px
	text-align right
</style>

