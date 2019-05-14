<template>
<<<<<<< HEAD
	<div>
	<router-view v-if='$route.name == "reportDetail"'></router-view>
    <div class="intellReport" v-else>
		<div class="reportBtns" >
=======
    <div class="intellReport">
		<div class="reportBtns">
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
			<div :class="type == 0?'btnClass btnActive':'btnClass'" @click="choose(0)"><span :class="type == 0?'dotClass dotActive':'dotClass'"></span>全部报告</div>
			<div :class="type == 1?'btnClass btnActive':'btnClass'" @click="choose(1)"><span :class="type == 1?'dotClass dotActive':'dotClass'"></span>平台发布</div>
			<div :class="type == 2?'btnClass btnActive':'btnClass'" @click="choose(2)"><span :class="type == 2?'dotClass dotActive':'dotClass'"></span>我的报告</div>
		</div>
		<div class="reportContent">
			<ul class="reportContentUl">
<<<<<<< HEAD
				<li :class="type==2?'newReport newReport1':'newReport newReport2'" @click="dialogForm">
=======
				<li :class="type==2?'reportListClass newReport newReport1':'reportListClass newReport newReport2'" @click="dialogFormVisible = true">
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
					<p class="newReporTitle">新建智能报告</p>
				</li>
				<el-dialog title="新建智能报告" :visible.sync="dialogFormVisible" width="620px">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  						<el-form-item label="报告名称" prop="name">
<<<<<<< HEAD
  							<el-input v-model="ruleForm.name" readonly placeholder="请先选择以下内容"></el-input>
  						</el-form-item>
  						<el-form-item label="报告类型" prop="type">
  							<el-select v-model="ruleForm.type" placeholder="请选择报告类型" @change="changeType" :style="ruleFormClass">
  								<el-option v-for="item in reType" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
  							</el-select>
  						</el-form-item>
  						<el-form-item label="时间节点" prop="timeInterval">
  							<el-select v-model="ruleForm.timeInterval" :placeholder="word" :style="season" @change="changeTime">
  								<el-option v-for="item in seasons" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
  							</el-select>
							<el-date-picker v-model="ruleForm.timeInterval" :style="timePicker" @change="changeTime" :type="timeRange" value-format='yyyy-MM' range-separator="至" 
							:placeholder="word" :start-placeholder="startWord" :end-placeholder="endWord">
							</el-date-picker>
  						</el-form-item>
  						<el-form-item label="材料类型" prop="materialType">
  							<el-select v-model="ruleForm.materialType" multiple collapse-tags placeholder="请选择材料类型" @change="changeMateri" :style="ruleFormClass">
  								<el-option v-for="item in material" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
  							</el-select>
  						</el-form-item>
  						<el-form-item label="对比地区" prop="compareRegion">
  							<el-select v-model="ruleForm.compareRegion" multiple collapse-tags placeholder="请选择对比地区" @change="changeRegion" :style="ruleFormClass">
  								<el-option v-for="item in regions" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
=======
  							<el-input v-model="ruleForm.name" readonly="true" placeholder="请先选择对应的报告内容"></el-input>
  						</el-form-item>
  						<el-form-item label="报告类型" prop="type">
  							<el-select v-model="ruleForm.type" placeholder="请选择报告类型">
  								<el-option label="月度数据报告" value="1"></el-option>
  								<el-option label="季度数据报告" value="2"></el-option>
  								<el-option label="年度数据报告" value="3"></el-option>
  							</el-select>
  						</el-form-item>
  						<el-form-item label="时间节点" prop="timeInterval">
							<el-date-picker v-model="ruleForm.timeInterval" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">

							</el-date-picker>
  						</el-form-item>
  						<el-form-item label="材料类型" prop="materialType">
  							<el-select v-model="ruleForm.materialType" multiple="true" collapse-tags="true" placeholder="请选择材料类型">
  								<el-option label="钢材" value="钢材"></el-option>
  								<el-option label="缆绳" value="缆绳"></el-option>
  								<el-option label="木材" value="木材"></el-option>
  								<el-option label="砖块" value="砖块"></el-option>
  							</el-select>
  						</el-form-item>
  						<el-form-item label="对比地区" prop="compareRegion">
  							<el-select v-model="ruleForm.compareRegion" multiple="true" collapse-tags="true" placeholder="请选择对比地区">
  								<el-option label="昆明市" value="昆明市"></el-option>
  								<el-option label="楚雄市" value="楚雄市"></el-option>
  								<el-option label="昭通市" value="昭通市"></el-option>
  								<el-option label="大理州" value="大理州"></el-option>
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
  							</el-select>
  						</el-form-item>
  						<el-form-item label="添加备注" prop="desc">
  							<el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入备注，可选填"></el-input>
  						</el-form-item>
  						<el-form-item>
<<<<<<< HEAD
  							<el-button type="primary" @click="submitForm('ruleForm')" style="background-color:#8B78FE">立即创建</el-button>
  							<el-button @click="cancleNewReport('ruleForm')">取消</el-button>
  						</el-form-item>
					</el-form>
				</el-dialog>
				<li class="reportListClass" v-for="item in reportList" :key="item.id" @click="toDetail(item.id)">
					<img src="reportIconn" class="reportIcon">
					<div :class="item.mark == 1?'markClass':'markClass markDisplay'">{{}}</div>
					<div :class="item.type == 1?'reporType':'reporType reporType1'">{{item.type == 1?'平台':'我的'}}</div>
					<p class="reporTitle">{{item.title}}</p>
					<p class="reporTime">{{item.createTime?item.createTime.split('T')[0]:''}}</p>
				</li>
			</ul>
			<div class="noData" :style="imgVis">
				<img src="../../../public/img/subscribe/noFind.png" class="noDataImg">
				<p class="noDatap1">暂时没有找到</p>
				<p class="noDatap2">不要着急，要不再试试~</p>
			</div>
			<el-pagination :page-size="pageSize" :total="elPageNum" :pager-count="5" :current-page="pageNum" :hide-on-single-page="true" layout="prev, pager, next"  class="reportPage" @current-change="get_data()" 
			@prev-click="get_data()" @next-click="get_data()">
            </el-pagination>
		</div>
    </div>
	</div>
=======
  							<el-button type="primary" @click="submitForm('ruleForm') " style="background-color:#8B78FE">立即创建</el-button>
  							<el-button @click="dialogFormVisible = false">取消</el-button>
  							<el-button @click="resetForm('ruleForm')">重置</el-button>
  						</el-form-item>
					</el-form>
				</el-dialog>
				<li class="reportListClass" v-for="(item,index) in reportList" v-bind:key="index">
					<img :src="get_img(item.materialClassID)" class="reportIcon">
					<div :class="item.mark == 1?'markClass':'markClass markDisplay'">{{}}</div>
					<div :class="item.type == 1?'reporType':'reporType reporType1'">{{item.type == 1?'平台':'我的'}}</div>
					<p class="reporTitle">{{item.title}}</p>
					<p class="reporTime">{{item.createTime.split('T')[0]}}</p>
				</li>
			</ul>
			<el-pagination :page-size="pageSize" :total="elPageNum" :pager-count="5" :current-page="pageNum" :hide-on-single-page="true" layout="prev, pager, next"  class="reportPage" @current-change="get_data()" 
			prev-click="get_data()" next-click="get_data()">
            </el-pagination>
		</div>

    </div>
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
</template>
<script>
export default {
	data() {
		return {
			reportList:[],
			reportIconn:'',
			// type的值为是全部报告还是平台报告或者其他
			type:0,
			pageNum:1,
			pageSize:13,
<<<<<<< HEAD
			token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwOTdmMGRkOWUyMjc0Y2NmYjc2ZjRmYWMxNDQxNjMzOSIsImV4cCI6MTU1Nzg4NjMyNywibmJmIjoxNTU3Nzk5OTI3fQ.4BO9dVg1EflfTjjhkyaove_lngXE4OCHhgNVdCVfW3Y',
			elPageNum:13,
			imgVis:{
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
=======
			token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwOTdmMGRkOWUyMjc0Y2NmYjc2ZjRmYWMxNDQxNjMzOSIsImV4cCI6MTU1NzQ1NjQ0NiwibmJmIjoxNTU3MzcwMDQ2fQ.gSpbQHxU7-vJ4mqZFSFG8N5TfK6KXXgjilSJldqe1mo',
			// listData:{
			// 	pageNum:1,
			// 	pageSize:13,
			// 	type:0
			// },
			elPageNum:100,
			dialogFormVisible: false,
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
			ruleForm: {
				name: '',
				type:'',
				timeInterval: '',
				materialType:'',
				compareRegion:'',
				desc: ''
			},
<<<<<<< HEAD
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
				name: [
					{required: true, message: '必须有报告内容', trigger: 'blur' },
				],
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
=======
			rules: {
				name: [
					{ required: true, message: '必须有报告内容', trigger: 'blur' },
				],
				type: [
					{ required: true, message: '请选择报告类型', trigger: 'change'}
				],
				timeInterval: [
					{ required: true, message: '请选择时间节点', trigger: 'change'}
				],
				materialType: [
					{ required: true, message: '请选择材料类型', trigger: 'change'}
				],
				compareRegion: [
					{ required: true, message: '请选择对比地区', trigger: 'change'}
				],
				desc: [
					{ required: false, message: '请填写备注', trigger: 'blur'}
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
				]
			}
		}
	},
	created(){
<<<<<<< HEAD
		this.reportList = []
=======
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
		var data1 = {
			pageNum:this.pageNum,
			pageSize:this.pageSize,
			token:this.token
		}
<<<<<<< HEAD
		this.$api.get_reports(data1).then(v => {
			if(v.data.count != null){
				this.imgVis.display = 'none'
				this.reportList = v.data.list
				this.elPageNum = v.data.count
			}else{
				this.imgVis.display = 'block'
				this.reportList = []
				this.elPageNum = 0
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
	methods:{
=======
		this.$api.get_reports(data1).then(value => {
			this.reportList = value.data.list
			this.elPageNum = value.data.list.length
		})
	},
	methods:{
		get_img(type) {
			return '/img/report/bg_'+type+'.png'
		},
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
		choose:function(status){
			if(status == 0) {
				//先重置pageNum 再获取全部的报告列表
				this.pageNum = 1
				this.type = 0
<<<<<<< HEAD
				this.reportList = []
=======
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
				var data2 = {
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					token:this.token
				}
				this.$api.get_reports(data2).then(v => {
<<<<<<< HEAD
					if(v.data.count != null){
						this.imgVis.display = 'none'
						this.reportList = v.data.list
						this.elPageNum = v.data.count				
					}else{
						this.imgVis.display = 'block'
						this.reportList = []
						this.elPageNum = 0
					}
=======
					this.reportList = v.data.list
					this.elPageNum = v.data.list.length
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
				})
			} else if(status == 1) {
				// 获取平台报告
				this.pageNum = 1
				this.type = 1
<<<<<<< HEAD
				this.reportList = []
=======
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
				var data3 = {
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					type:this.type
				}
				this.$api.get_reports(data3).then(v => {
<<<<<<< HEAD
					if(v.data.count != null){
						this.imgVis.display = 'none'
						this.reportList = v.data.list
						this.elPageNum = v.data.count						
					}else{
						this.imgVis.display = 'block'
						this.reportList = []
						this.elPageNum = 0
					}
=======
					this.reportList = v.data.list
					this.elPageNum = v.data.list.length
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
				})

			} else {
				//获取我的报告
				this.pageNum = 1
				this.type = 2
<<<<<<< HEAD
				this.reportList = []
=======
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
				var data4 = {
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					token:this.token,
					type:this.type
				}
				this.$api.get_reports(data4).then(v => {
<<<<<<< HEAD
					if(v.data.count != null){
						this.imgVis.display = 'none'
						this.reportList = v.data.list
						this.elPageNum = v.data.count		
					}else{
						this.imgVis.display = 'block'
						this.reportList = []
						this.elPageNum = 0
					}
=======
					this.reportList = v.data.list
					this.elPageNum = v.data.list.length
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
				})
			}
		},
		get_data() {
			var data5 = {
				pageNum:this.pageNum,
				pageSize: this.pageSize,
				token:this.token
			}
			var data6 = {
				pageNum:this.pageNum,
				pageSize:this.pageSize,
				type:this.type
			}
			var data7 = {
				pageNum:this.pageNum,
				pageSize:this.pageSize,
				token:this.token,
				type:this.type
			}
			//请求, 赋值reportList，因为需要有默认列表
			if(this.type == 0){
				this.$api.get_reports(data5).then(v => {
<<<<<<< HEAD
					if(v.data.count != null){
						this.imgVis.display = 'none'
						this.reportList = v.data.list
						this.elPageNum = v.data.count
					}else{
						this.imgVis.display = 'block'
						this.reportList = []
						this.elPageNum = 0
					}
				})
			}else if(this.type == 1){
				this.$api.get_reports(data6).then(v => {
					if(v.data.count != null){
						this.imgVis.display = 'none'
						this.reportList = v.data.list
						this.elPageNum = v.data.count
					}else{
						this.imgVis.display = 'block'
						this.reportList = []
						this.elPageNum = 0
					}
				})
			}else{
				this.$api.get_reports(data7).then(v => {
					if(v.data.count != null){
						this.imgVis.display = 'none'
						this.reportList = v.data.list
						this.elPageNum = v.data.count
					}else{
						this.imgVis.display = 'block'
						this.reportList = []
						this.elPageNum = 0
					}
				})
			}
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
				this.ruleForm.name = this.ruleForm.timeInterval + area_list.toString() + cate_list.toString() + '月度数据报告'
			}else if(this.timeType == 2){
				// console.log(this.ruleForm.timeInterval)
				this.seasons.map(ji => {
					if(this.ruleForm.timeInterval == ji.id){
						this.ruleForm.timeInterval = ji.name
						}
				})
				console.log(this.ruleForm.timeInterval)
				this.ruleForm.name = '2019年' + this.ruleForm.timeInterval + area_list.toString() + cate_list.toString() + '季度数据报告'
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
		changeTime(ss){
			this.ruleFormName()
		},
		changeMateri(vv){
			this.ruleFormName()
		},
		changeRegion(cc){
			this.ruleFormName()
		},
=======
					this.reportList = v.data.list
				})
			}else if(this.type == 1){
				this.$api.get_reports(data6).then(v => {
					this.reportList = v.data.list
				})
			}else{
				this.$api.get_reports(data6).then(v => {
					this.reportList = v.data.list
				})
			}
		},
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
		toReportDetail(reportId){
			// window.location.href='reportDetail.vue'
			// this.reportId = reportId 
			this.$router.push({
				path:'reportDetail',
				query:{
					reportId:reportId
				}
			})
		},
<<<<<<< HEAD
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
							this.openTip()
							this.get_data()
						}else{
							this.dialogFormVisible = false
							this.$refs[formName].resetFields()
							this.openTip1()
						}
					})
=======
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
<<<<<<< HEAD
		cancleNewReport(formName){
			this.dialogFormVisible = false
			this.$refs[formName].resetFields();
		},
=======
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
    }
	}
// }
</script>

<style lang="stylus" scoped>
.intellReport
	width 100%
	position relative

.reportContent
	width 100%
	height 100%
	padding 20px 40px
<<<<<<< HEAD
	margin-top 20px
=======
	margin-top 88px
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
	font-size 14px
	color rgba(51,51,51,1)
	line-height 14px

.reportContentUl
	display flex
	flex-direction row
	flex-wrap wrap
	justify-content flex-start

.reportListClass
	width 200px
	height 240px
	background-color #ffffff
	border-radius 8px
<<<<<<< HEAD
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-right 20px
	margin-bottom 20px
	position relative
	transition margin-top 0.2s

.reportListClass:hover
	background-color #E8EBF9
	margin-top -10px
=======
	margin-right 20px
	margin-bottom 20px
	position relative
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10

.reportIcon
	position absolute
	top 44px
	left 60px
	display block

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
<<<<<<< HEAD
	width 200px
	height 240px
=======
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
	background-color #8B78FE
	background-image url('../../../public/img/newReport.png')
	background-repeat no-repeat
	background-position center 56px
<<<<<<< HEAD
	border-radius 8px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	margin-right 20px
	margin-bottom 20px
	position relative

=======
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10

.newReport1
	display block

.newReport2
	display none

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

.reporType
	position absolute
	left 10px
	bottom 65px
	width 34px
	height 16px
	background-color #A037F8
	border-radius 4px
	font-size 12px
	color #ffffff
	line-height 16px
	text-align center

.reporType1
	background-color #F8374E!important

.reporTitle
	position absolute
	left 0
	bottom 40px
	width 100%
	height 14px
	overflow hidden
	padding 0 14px 0 10px
	box-sizing border-box
	text-overflow: ellipsis
	white-space nowrap
.reporTime
	position absolute
	left 0
	bottom 20px
	width 100%
	height 14px
	padding 0 14px 0 10px
	box-sizing border-box
	font-size 12px
	color #999999
	overflow hidden
	text-overflow: ellipsis
	white-space nowrap
<<<<<<< HEAD

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

=======
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
.reportPage
	// border 1px red solid
	padding 0!important
	border-radius 8px
	box-sizing border-box
	margin-top 30px
	margin-right 160px
	text-align right

// .createBtn
// 	background-color #8B78FE
</style>


