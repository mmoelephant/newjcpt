<template>
    <div class="intellReport">
		<div class="reportBtns">
			<div :class="type == 0?'btnClass btnActive':'btnClass'" @click="choose(0)"><span :class="type == 0?'dotClass dotActive':'dotClass'"></span>全部报告</div>
			<div :class="type == 1?'btnClass btnActive':'btnClass'" @click="choose(1)"><span :class="type == 1?'dotClass dotActive':'dotClass'"></span>平台发布</div>
			<div :class="type == 2?'btnClass btnActive':'btnClass'" @click="choose(2)"><span :class="type == 2?'dotClass dotActive':'dotClass'"></span>我的报告</div>
		</div>
		<div class="reportContent">
			<ul class="reportContentUl">
				<li :class="type==2?'reportListClass newReport newReport1':'reportListClass newReport newReport2'" @click="dialogFormVisible = true">
					<p class="newReporTitle">新建智能报告</p>
				</li>
				<el-dialog title="新建智能报告" :visible.sync="dialogFormVisible" width="620px">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  						<el-form-item label="报告名称" prop="name">
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
  							</el-select>
  						</el-form-item>
  						<el-form-item label="添加备注" prop="desc">
  							<el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入备注，可选填"></el-input>
  						</el-form-item>
  						<el-form-item>
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
			token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwOTdmMGRkOWUyMjc0Y2NmYjc2ZjRmYWMxNDQxNjMzOSIsImV4cCI6MTU1NzQ1NjQ0NiwibmJmIjoxNTU3MzcwMDQ2fQ.gSpbQHxU7-vJ4mqZFSFG8N5TfK6KXXgjilSJldqe1mo',
			// listData:{
			// 	pageNum:1,
			// 	pageSize:13,
			// 	type:0
			// },
			elPageNum:100,
			dialogFormVisible: false,
			ruleForm: {
				name: '',
				type:'',
				timeInterval: '',
				materialType:'',
				compareRegion:'',
				desc: ''
			},
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
				]
			}
		}
	},
	created(){
		var data1 = {
			pageNum:this.pageNum,
			pageSize:this.pageSize,
			token:this.token
		}
		this.$api.get_reports(data1).then(value => {
			this.reportList = value.data.list
			this.elPageNum = value.data.list.length
		})
	},
	methods:{
		get_img(type) {
			return '/img/report/bg_'+type+'.png'
		},
		choose:function(status){
			if(status == 0) {
				//先重置pageNum 再获取全部的报告列表
				this.pageNum = 1
				this.type = 0
				var data2 = {
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					token:this.token
				}
				this.$api.get_reports(data2).then(v => {
					this.reportList = v.data.list
					this.elPageNum = v.data.list.length
				})
			} else if(status == 1) {
				// 获取平台报告
				this.pageNum = 1
				this.type = 1
				var data3 = {
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					type:this.type
				}
				this.$api.get_reports(data3).then(v => {
					this.reportList = v.data.list
					this.elPageNum = v.data.list.length
				})

			} else {
				//获取我的报告
				this.pageNum = 1
				this.type = 2
				var data4 = {
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					token:this.token,
					type:this.type
				}
				this.$api.get_reports(data4).then(v => {
					this.reportList = v.data.list
					this.elPageNum = v.data.list.length
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
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
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
	margin-top 88px
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
	margin-right 20px
	margin-bottom 20px
	position relative

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
	background-color #8B78FE
	background-image url('../../../public/img/newReport.png')
	background-repeat no-repeat
	background-position center 56px

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


