<template>
<div v-loading.fullscreen="loading">
	<router-view v-if='$route.name == "reportDetail"'></router-view>
	<div class="intellReport" v-else>
		<div class="inteLeft">
			<div :class="bigType == 0 ?'all allOn':'all'" @click="toggleBig(0)">全部报告</div>
			<div :class="bigType == 1 ?'month monthOn':'month'" @click="toggleBig(1)">月度智能报告</div>
			<div :class="bigType == 2 ?'custom customOn':'custom'" @click="toggleBig(2)">自定义报告</div>
		</div>
		<div class="inteRight">
			<div class="reportBtns">
				<div class="btnClass"><span class="dotClass"></span>智能报告  > <span class="navigiOn">{{navigiOn}}</span></div>
				<div class="viewToggle">
					<span :class="type == 0?'view1 viewActive':'view1'" @click="choose(0)">网格显示</span>
					<span :class="type == 1?'view2 viewActive':'view2'" @click="choose(1)">列表显示</span>
				</div>
				<div class="search">
					<!-- <el-autocomplete class="searchBox" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect">
					</el-autocomplete> -->
				</div>
			</div>
			<div class="reportContent">
				<div class="gridView" :style="viewToggle">
					<!-- 月度智能报告(网格视图) -->
					<div :class="bigType == 2?'systemVis':''">
						<el-badge value="new"><p class="reporTypeTitle">月度智能报告</p></el-badge>
						<ul class="gridUl">
							<li class="gridListClass" v-for="item in systemReport" :key="item.id">
								<img src="../../../public/img/report/more.png" class="reportImg" v-if="item.materialClassID&&item.materialClassID.indexOf(',') != -1">
								<img src="../../../public/img/report/single.png" class="reportImg" v-else>
								<p class="reporTitle">云南省建设工程主要材料市场价格变动情况</p>
								<p class="reporTime">{{item.createTime?item.createTime.substr(0,4) + '年' + item.createTime.substr(6,1) + '月':'-'}}</p>
							</li>
						</ul>
						<div class="noData" :style="noImg">
							<img src="../../../public/img/subscribe/noFind.png" class="noDataImg">
							<p class="noDatap1">暂时没有找到</p>
							<p class="noDatap2">不要着急，要不再试试~</p>
						</div>
						<el-pagination :page-size="pageSize1" :total="totalPage1" :pager-count="5" :current-page="pageNum1" :hide-on-single-page="true" layout="prev, pager, next" 
						class="reportPage" @current-change="get_data1">
						</el-pagination>
					</div>
					<!-- 自定义报告(网格视图) -->
					<div :class="bigType == 1?'customVis':''">
						<el-badge value="new"><p class="reporTypeTitle">自定义报告</p></el-badge>
						<div :class="bigType == 2?'newRe':'newRe1'">新建智能报告</div>
						<ul class="gridUl">
							<li class="gridListClass" v-for="item in customReport" :key="item.id">
								<img src="../../../public/img/report/more1.png" class="reportIcon" v-if="item.materialClassID&&item.materialClassID.indexOf(',') != -1">
								<img src="../../../public/img/report/single1.png" class="reportIcon" v-else>
								<div :class="item.materialClassID&&item.materialClassID.indexOf(',') != -1?'reportMateri':'reportMateri reportMateri1'">
									{{item.materialClassID&&item.materialClassID.indexOf(',') != -1?item.materialName:'单材料-' + item.materialName}}
								</div>
								<div class="reporType" v-if="item.dataType == 1">月报</div>
								<div class="reporType1" v-else-if="item.dataType == 2">季报</div>
								<div class="reporType2" v-else>年报</div>
								<a href="javascript:void(0)"><img src="../../../public/img/report/delete.png" class="deleteIcon"></a>
								<p class="reportarea">{{item.areaName}}</p>
								<p class="reporTitle1">{{item.title}}</p>
								<p class="reporTime">{{item.createTime?item.createTime.split('T')[0]:''}}</p>
							</li>
						</ul>
						<div class="noData" :style="noImgCustom">
							<img src="../../../public/img/subscribe/noFind.png" class="noDataImg">
							<p class="noDatap1">暂时没有找到</p>
							<p class="noDatap2">不要着急，要不再试试~</p>
						</div>
						<el-pagination :page-size="pageSize2" :total="totalPage2" :pager-count="5" :current-page="pageNum2" :hide-on-single-page="true" layout="prev, pager, next" 
						class="reportPage" @current-change="get_data2">
						</el-pagination>
					</div>
				</div>
				<div class="listView" :style="viewToggle1">
					<!-- 月度智能报告(列表视图) -->
					<div :class="bigType == 2?'systemVis':''">
						<el-badge value="new"><p class="reporTypeTitle">月度智能报告</p></el-badge>
						<ul class="listUl">
							<li class="lisTitle">
								<span class="titleItem titleNum">编号</span>
								<span class="titleItem titleT">报告标题</span>
								<span class="titleItem titleTime">创建时间</span>
								<span class="titleItem titleDo">操作</span>
							</li>
							<li class="listClass" v-for="(item,index) in systemReport" :key="index">
								<span class="listItem listNum">{{index < 9 ?"YD00" + (index + 1):"YD0" + (index+1)}}</span>
								<span class="listItem listT">
									<a href="javascript:void(0)">
										云南省建设工程主要材料市场价格变动情况{{item.createTime?item.createTime.substr(0,4) + '年' + item.createTime.substr(6,1) + '月':'-'}}
									</a>
								</span>
								<span class="listItem listTime">{{item.createTime?item.createTime.split('T')[0]:''}}</span>
								<span class="listItem listDo"><a href="javascript:void(0)">查看报告></a></span>	
							</li>
						</ul>
						<div class="noData" :style="noImg">
							<img src="../../../public/img/subscribe/noFind.png" class="noDataImg">
							<p class="noDatap1">暂时没有找到</p>
							<p class="noDatap2">不要着急，要不再试试~</p>
						</div>
						<el-pagination :page-size="pageSize1" :total="totalPage1" :pager-count="5" :current-page="pageNum1" :hide-on-single-page="true" layout="prev, pager, next" 
						class="reportPage" @current-change="get_data1">
						</el-pagination>
					</div>
					<!-- 自定义报告(列表视图) -->
					<div :class="bigType == 1?'customVis':''">
						<el-badge value="new"><p class="reporTypeTitle">自定义报告</p></el-badge>
						<div :class="bigType == 2?'newRe':'newRe1'">新建智能报告</div>
						<ul class="listUl">
							<li class="lisTitle">
								<span class="titleItem titleNum_custom">编号</span>
								<span class="titleItem titleT_custom">报告标题</span>
								<span class="titleItem titleType_custom">类型</span>
								<span class="titleItem titleTime_custom">创建时间</span>
								<span class="titleItem titleDo_custom">操作</span>
							</li>
							<li class="listClass" v-for="(item,index) in customReport" :key="index">
								<span class="listItem listNum_custom">{{index < 9 ?"YD00" + (index + 1):"YD0" + (index+1)}}</span>
								<span class="listItem listT_custom">
									<a href="javascript:void(0)">
										{{item.title?item.title.substr(0,25)+'...':'-'}}
									</a>
								</span>
								<span class="listItem listType_custom" v-if="item.dataType == 1">月度</span>
								<span class="listItem listType_custom1" v-else-if="item.dataType == 2">季度</span>
								<span class="listItem listType_custom2" v-else>年度</span>
								<span class="listItem listTime_custom">{{item.createTime?item.createTime.split('T')[0]:'-'}}</span>
								<span class="listItem listDo_custom">
									<a href="javascript:void(0)" class="toDetail">查看报告</a>
									<a href="javascript:void(0)" class="deleteRe" @click="deleteRe(item.id)">删除</a>
									</span>	
							</li>
						</ul>
						<div class="noData" :style="noImgCustom">
							<img src="../../../public/img/subscribe/noFind.png" class="noDataImg">
							<p class="noDatap1">暂时没有找到</p>
							<p class="noDatap2">不要着急，要不再试试~</p>
						</div>
						<el-pagination :page-size="pageSize2" :total="totalPage2" :pager-count="5" :current-page="pageNum2" :hide-on-single-page="true" layout="prev, pager, next" 
						class="reportPage" @current-change="get_data2">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
    </div>
</div>
</template>
<script>
export default {
	data() {
		return {
			bigType:0,
			navigiOn:'全部报告',
			// type切换网格视图或列表视图
			type:0,
			token:this.$store.state.login.token,
			state2:'',
			viewToggle:{
				display:'block'
			},
			viewToggle1:{
				display:'none'
			},
			systemReport:[],
			customReport:[],
			// reportIconn:'',
			pageNum1:1,
			pageSize1:14,
			totalPage1:14,
			pageNum2:1,
			pageSize2:14,
			totalPage2:14,
			noImg:{
				display:'none'
			},
			noImgCustom:{
				display:'none'
			},
			dialogFormVisible: false,
			reType:[
				{id:1,name:'月度数据报告'},
				{id:2,name:'季度数据报告'},
				{id:3,name:'年度数据报告'},
			],
			seasons:[
				{id:1,name:'第一季度'},
				{id:2,name:'第二季度'},
				{id:3,name:'第三季度'},
				{id:4,name:'第四季度'},
			],
			material:[],
			regions:[],
			ruleForm: {
				name: '请先选择相应的报告内容',
				type:'',
				timeInterval: '',
				materialType:'',
				compareRegion:'',
				desc: ''
			},
			ruleFormClass:{
				width:'260px'
			},
			timeRange:'month',
			timeType:1,
			word:'请选择月份',
			startWord:'开始季度',
			endWord:'结束季度',
			dd:'',
			season:{
				display:'none',
				width:'260px'
			},
			timePicker:{
				display:'',
				width:'260px'
			},
			rules: {
				type: [
					{required: true, message: '请选择报告类型', trigger: 'change'}
				],
				timeInterval: [
					{required: true, message: '请选择时间节点', trigger: 'change'}
				],
				materialType: [
					{required: true, message: '请选择材料类型', trigger: 'focus'}
				],
				compareRegion: [
					{required: true, message: '请选择对比地区', trigger: 'focus'}
				],
				desc: [
					{required: false, message: '请填写备注', trigger: 'blur'}
				]
			},
			loading:true
		}
	},
	created(){
		var data1 = {
			pageNum:this.pageNum1,
			pageSize:this.pageSize1,
			token:this.token,
			type:1,
			dataType:1
		}
		var data2 = {
			pageNum:this.pageNum2,
			pageSize:this.pageSize2,
			token:this.token,
			type:2
		}
		// var data7 = {

		// }
		// 获取全部报告
		// this.$api.get_reports(data1).then(v => {
		// 	this.loading = false
		// 	if(v.data.count != null){
		// 		console.log(v.data.count)
		// 		this.noImg.display = 'none'
		// 		this.systemReport = v.data.list
		// 		this.totalPage1 = v.data.count
		// 	}else{
		// 		this.noImg.display = 'block'
		// 		this.systemReport = []
		// 		this.totalPage1 = 0
		// 	}
		// })		
		// 获取平台报告
		this.$api.get_reports(data1).then(v => {
			this.loading = false
			if(v.data.count != null){
				console.log(v.data.count)
				this.noImg.display = 'none'
				this.systemReport = v.data.list
				this.totalPage1 = v.data.count
			}else{
				this.noImg.display = 'block'
				this.systemReport = []
				this.totalPage1 = 0
			}
		})
		// 获取自定义报告
		this.$api.get_reports(data2).then(v => {
			this.loading = false
			if(v.data.count != null){
				this.noImgCustom.display = 'none'
				this.customReport = v.data.list
				this.totalPage2 = v.data.count
			}else{
				this.noImgCustom.display = 'block'
				this.customReport = []
				this.totalPage2 = 0
			}
		})
		this.$api.get_area().then(res => {
			this.regions = res.data
		})
		this.$api.get_cate().then(res => {
			this.material = res.data
		})
	},
	mounted() {
    //   this.restaurants = this.loadAll();
    },
	methods:{
		toggleBig:function(aa){
			if(aa == 0){
				this.bigType = 0
				this.navigiOn = '全部报告'
			}else if(aa == 1){
				this.bigType = 1
				this.navigiOn = '月度智能报告'
			}else{
				this.bigType = 2
				this.navigiOn = '自定义报告'
			}
		},
		choose:function(status){
			if(status == 0){
				this.type = 0
				this.viewToggle.display = 'block'
				this.viewToggle1.display = 'none'
			}else{
				this.type = 1
				this.viewToggle.display = 'none'
				this.viewToggle1.display = 'block'
			}
		},
		// querySearch(queryString, cb) {
		// 	var reports = this.systemReport
		// 	var results = queryString ? reports.filter(this.createFilter(queryString)) : reports
		// 	// 调用 callback 返回建议列表的数据
		// 	cb(results)
		// },
		// createFilter(queryString) {
		// 	return (restaurant) => {
		// 		return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
		// 	}
		// },
		// handleSelect(item) {
		// 	console.log(item)
		// },
		get_data1(val) {
			this.pageNum1 = val
			var data5 = {
				pageNum:val,
				pageSize: this.pageSize1,
				token:this.token,
				type:1,
				dataType:1
			}
			this.loading = true
			this.$api.get_reports(data5).then(v => {
				this.loading = false
				if(v.data.count != null){
					this.noImg.display = 'none'
					this.systemReport = v.data.list
					this.totalPage1 = v.data.count
				}else{
					this.noImg.display = 'block'
					this.systemReport = []
					this.totalPage1 = 0
				}
			})
		},
		get_data2(val){
			this.pageNum2 = val
			var data6 = {
				pageNum:val,
				pageSize:this.pageSize2,
				token:this.token,
				type:2
			}
			this.loading = true
			this.$api.get_reports(data6).then(v => {
				this.loading = false
				if(v.data.count != null){
					this.noImgCustom.display = 'none'
					this.customReport = v.data.list
					this.totalPage2 = v.data.count
				}else{
					this.noImgCustom.display = 'block'
					this.customReport= []
					this.totalPage2 = 0
				}
			})
		},
		deleteRe(dd){
			var data9 = {
				id:dd
			}
			this.$api.delete_report(data9).then(v => {
				console.log(v)
			})
		},
		toDetail(aa){
			this.$router.push({name:'reportDetail',query:{id:aa}})
		},
		dialogForm(){
			this.dialogFormVisible = true
		},
		ruleFormName(){
			let cate_list =[]
			this.ruleForm.materialType.map( item=> {
				this.material.map(cate => {
					if(item == cate.id) {
						cate_list.push(cate.name)
					}
				})
			})
			let area_list = []
			this.ruleForm.compareRegion.map(item => {
				this.regions.map(area => {
					if(item == area.id) {
						area_list.push(area.name)
					}
				})
			})
			
			if(this.timeType == 1){
				this.ruleForm.name = this.ruleForm.timeInterval.split('-')[0] + '年' + this.ruleForm.timeInterval.split('-')[1] + '月' + area_list.toString() + cate_list.toString() + '月度数据报告'
			}else if(this.timeType == 2){
				let jidu = ''
				this.seasons.map(ji => {
					if(this.ruleForm.timeInterval == ji.id){
						jidu = ji.name
					}
				})
				this.ruleForm.name = '2019年' + jidu + area_list.toString() + cate_list.toString() + '季度数据报告'
			}else{
				this.ruleForm.name = this.ruleForm.timeInterval.substr(0,4) + '年' + area_list.toString() + cate_list.toString() + '年度数据报告'
			}
		},
		changeType(vv){
			if(vv == 1){
				this.season.display = 'none'
				this.timePicker.display = ''
				this.timeRange = 'month'
				this.word = '请选择月份'
				this.ruleForm.timeInterval = ''
				this.timeType = 1	
			}else if(vv == 2){
				this.season.display = ''
				this.timePicker.display = 'none'
				this.timeRange = 'monthrange'
				this.word = '请选择季度'
				this.ruleForm.timeInterval = ''
				this.timeType = 2
			}else{
				this.season.display = 'none'
				this.timePicker.display = ''
				this.timeRange = 'year'
				this.word = '请选择年份'
				this.ruleForm.timeInterval = ''
				this.timeType = 3
			}
		},
		changeTime(){
			this.ruleFormName()
		},
		changeMateri(){
			this.ruleFormName()
		},
		changeRegion(){
			this.ruleFormName()
		},
		toReportDetail(reportId){
			this.$router.push({
				path:'reportDetail',
				query:{
					reportId:reportId
				}
			})
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
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var data8 = {
						type:2,
						dataType:this.ruleForm.type,
						token:this.token,
						mark:this.ruleForm.desc,
						timeInterval:this.ruleForm.timeInterval,
						materialClassID:this.ruleForm.materialType.toString(),
						contrastRegionID:this.ruleForm.compareRegion.toString(),
						name:this.ruleForm.name
					}
					this.$api.add_report(data8).then(v =>{
						// console.log(v)
						if(v.data.msg == 'success'){
							this.dialogFormVisible = false
							this.$refs[formName].resetFields()
							this.get_data()
							this.openTip()
						}else{
							this.dialogFormVisible = false
							this.$refs[formName].resetFields()
							this.openTip1()
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		cancleNewReport(formName){
			this.dialogFormVisible = false
			this.$refs[formName].resetFields();
		},
		get_img(type) {
			if(type.indexOf(",") != -1) {
				return'../../../public/img/report/more.png'
			}
			return '../../../public/img/report/bg_'+type+'.png'
		},
    }
	}
// }
</script>

<style lang="stylus" scoped>
.intellReport
	width 100%
	height 100%
	overflow auto
	// border 1px red solid
	display flex
	flex-direction row
	flex-wrap wrap
	justify-content flex-start
	// position relative
	// z-index -1
.inteLeft
	width 200px
	height 100%
	background-color #fff

.all
	width 100%
	height 58px
	background url(../../../public/img/report/all_grey.png) no-repeat 15px 15px
	padding-left 46px
	box-sizing border-box
	margin-bottom 10px
	font-size 16px
	font-weight bold
	color #8E9099
	line-height 58px

.allOn
	background url(../../../public/img/report/all_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) 
	color white

.all:hover
	background #F5F6FE url(../../../public/img/report/all_black.png) no-repeat 15px 15px
	color #2C2D33

.allOn:hover
	background url(../../../public/img/report/all_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) 
	color white

.month
	width 100%
	height 58px
	background url(../../../public/img/report/month_grey.png) no-repeat 15px 15px
	padding-left 46px
	box-sizing border-box
	margin-bottom 10px
	font-size 16px
	font-weight bold
	color #8E9099
	line-height 58px

.month:hover
	background #F5F6FE url(../../../public/img/report/month_black.png) no-repeat 15px 15px
	color #2C2D33

.monthOn
	background url(../../../public/img/report/month_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) 
	color white

.monthOn:hover
	background url(../../../public/img/report/month_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) 
	color white

.custom
	width 100%
	height 58px
	background url(../../../public/img/report/custom_grey.png) no-repeat 15px 15px
	padding-left 46px
	box-sizing border-box
	margin-bottom 10px
	font-size 16px
	font-weight bold
	color #8E9099
	line-height 58px

.custom:hover
	background #F5F6FE url(../../../public/img/report/custom_black.png) no-repeat 15px 15px
	color #2C2D33

.customOn
	background url(../../../public/img/report/custom_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) 
	color white

.customOn:hover
	background url(../../../public/img/report/custom_white.png) no-repeat 15px 15px,linear-gradient(-90deg,rgba(97,224,255,1) 0%,rgba(100,57,248,1) 100%) 
	color white
	

.inteRight
	width calc(100% - 200px)
.search
	width 460px
	height 38px
	background-color #fff
	border-radius 8px
	margin-left 150px


.searchBox
	width calc(100% - 58px)
	border-radius 8px 0 0 8px
	border-radius none
.el-input__inner
	border 1px red solid
		// border 0 none
		// border-bottom 1px solid #ccc
		// border-radius 0px

.reportContent
	width 100%
	padding 40px 20px
	box-sizing border-box
	font-size 14px
	color rgba(51,51,51,1)
	line-height 14px

.reporTypeTitle
	font-size 20px
	line-height 20px

.newRe
	width 154px
	height 24px
	// background-color 
	background #8B78FE url(../../../public/img/report/add.png) no-repeat 10px 
	border 1px solid #6C56F5
	border-radius 24px
	font-size 14px
	color #fff
	line-height 24px
	text-align center
	position absolute
	top 182px
	left 380px

.newRe:hover
	background-color #9f8ffe
.newRe1
	display none

.gridUl
	padding 20px 10px
	box-sizing border-box
	display flex
	flex-direction row
	flex-wrap wrap
	justify-content flex-start

.systemVis
	display none

.customVis
	display none

.newVis
	display none

.gridListClass
	width 208px
	height 240px
	background-color #ffffff
	border-radius 8px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-right 20px
	margin-bottom 20px
	position relative
	transition margin-top 0.2s
	font-size 12px
	color #fff
	line-height 12px

.gridListClass:hover
	background-color #E8EBF9
	margin-top -10px

.gridListClass:hover .deleteIcon
	display block
.reportImg
	width 100px
	height 100px
	display block
	position absolute
	top 30px
	left 50%
	margin-left -50px

.reportIcon
	width 100px
	height 100px
	display block
	position absolute
	top 40px
	left 50%
	margin-left -50px

.deleteIcon
	position absolute
	right 10px
	top 10px
	width 20px
	height 20px
	display none

.reportMateri
	position absolute
	left 10px
	bottom 65px
	max-width 170px
	background-color #2B94FE
	padding 0 6px
	border-radius 4px
	box-sizing border-box
	line-height 18px
	white-space nowrap
	text-overflow ellipsis
	overflow hidden

.reportMateri1
	background-color #FEAC2B!important

.reporType
	position absolute 
	left 10px
	top 10px
	width 46px
	height 18px
	background #F83B5F
	border 1px solid #D9193D
	border-radius 9px
	line-height 18px
	text-align center

.reporType1
	position absolute 
	left 10px
	top 10px
	width 46px
	height 18px
	background #643BF8
	border 1px solid #4B22E0
	border-radius 9px
	line-height 18px
	text-align center
	
.reporType2
	position absolute 
	left 10px
	top 10px
	width 46px
	height 18px
	background #52B4FF
	border 1px solid #1184DC
	border-radius 9px
	line-height 18px
	text-align center

.reportarea
	position absolute
	right 10px
	bottom 16px
	width 70px
	height 12px
	color #8E9099
	text-align right
	overflow hidden
	text-overflow: ellipsis
	white-space nowrap

.reporTitle
	position absolute
	left 0
	bottom 47px
	width 100%
	height 40px
	padding 0 14px 0 10px
	box-sizing border-box
	font-size 14px
	color #333
	line-height 20px
	overflow hidden
	text-overflow: ellipsis

.reporTitle1
	position absolute
	left 0
	bottom 40px
	width 100%
	height 14px
	padding 0 14px 0 10px
	box-sizing border-box
	font-size 14px
	color #333
	line-height 14px
	overflow hidden
	text-overflow: ellipsis
	white-space nowrap

.reporTime
	position absolute
	left 0
	bottom 16px
	width 100%
	height 14px
	padding 0 14px 0 10px
	box-sizing border-box
	color #999999
	overflow hidden
	text-overflow: ellipsis
	white-space nowrap

.reportPage
	padding 0
	padding-right 80px
	box-sizing border-box
	margin-bottom 50px
	text-align right

.listUl
	padding 20px 10px
	box-sizing border-box
	display flex
	flex-direction column
	flex-wrap wrap
	justify-content flex-start
	font-size 14px
	text-align center

.lisTitle
	width 100%
	height 36px
	background-color #fff
	border-radius 8px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-bottom 10px
	color #5C5D62
	line-height 36px
	display flex
	flex-direction row
	flex-wrap nowrap
	justify-content flex-start

.titleItem
	display inline-block

.titleNum
	width 10%
.titleT
	width 45%
.titleTime
	width 35%
.titleDo
	width 10%

.titleNum_custom
	width 10%
.titleT_custom
	width 40%

.titleType_custom
	width 10%
.titleTime_custom
	width 24%
.titleDo_custom
	width 16%

.listClass
	width 100%
	height 48px
	background-color #fff
	border-radius 8px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-bottom 20px
	line-height 48px
	display flex
	flex-direction row
	flex-wrap nowrap
	justify-content flex-start
	transition background-color 0.1s

.listClass:hover
	background-color #D3D8F4

.listItem
	display inline-block
	padding 0 6px
	white-space nowrap
	text-overflow ellipsis
	overflow hidden

.listNum
	width 10%
	color #8E9099
.listT
	width 45%
	color #2C2D33
	a
		color #2c2d33
	a:hover
		color #7f94ff

.listTime
	width 35%
	color #8E9099
.listDo
	width 10%
	color #454EFF
	a
		color #454EFF
	a:hover
		color #7f94ff

.listNum_custom
	width 10%
	color #8E9099
.listT_custom
	width 40%
	color #2C2D33
	a
		color #2c2d33
	a:hover
		color #7f94ff

.listType_custom
	width 10%
	color #F83B5F
.listType_custom1
	width 10%
	color #643BF8
.listType_custom2
	width 10%
	color #52B4FF

.listTime_custom
	width 24%
	color #8E9099

.listDo_custom
	width 16%
	color #454EFF
	// border 1px red solid
	a
		padding 0 20px
		// border 1px red solid
.toDetail
	border-right 1px solid #8E9099
	box-sizing border-box
	color #454EFF
.toDetail:hover
	color #7f94ff

.deleteRe
	color #FF7437
.deleteRe:hover
	color #fc9d74


.noData
	margin-bottom 50px
	font-size 20px
	line-height 20px
	text-align center

.noDatap2
	margin-top 10px
	font-size 14px
	color #ccc
	line-height 14px

.noDataImg
	width 200px
	height 249px
	display block
	margin 0 auto
	margin-top 50px
	margin-bottom 10px

.newReporTitle
	position absolute
	left 0
	bottom 55px
	width 100%
	font-size 16px
	font-weight bold
	color #ffffff
	line-height 16px
	text-align center
 
.newReport
	width 200px
	height 240px
	background-color #8B78FE
	background-image url('../../../public/img/newReport.png')
	background-repeat no-repeat
	background-position center 56px
	border-radius 8px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-right 20px
	margin-bottom 20px
	position relative
	transition background-color 0.5s

.newReport:hover
	background-color #A99BFF

.newReport1
	display block

.newReport2
	display none

.newNow
	background #9A7CFF
	transition background 0.5s

.newNow:hover
	background #C7B7FF
// .reportDialogClass
// 	height 620px
// 	border 1px red solid
// 	font-size 18px
// 	font-family MicrosoftYaHei
	
.markClass
	position absolute
	left 10px
	top 10px
	width 72px
	height 20px
	background-color #7F94FF
	padding-left 24px
	border 1px solid rgba(108,125,255,1)
	box-sizing border-box
	border-radius 10px
	font-size 12px
	color #ffffff
	line-height 16px

.icon-beizhu
	position absolute
	left 7px
	top 1px
	width 12px
	height 12px
	display block
	font-size 12px
	
.markDisplay
	display none




</style>


