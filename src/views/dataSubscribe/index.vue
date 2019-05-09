<template>
<div class="dataSubscribe">
	<div class="reportBtns">
		<div :class="type == 0?'btnClass btnActive':'btnClass'" @click="choose(0)"><span :class="type == 0?'dotClass dotActive':'dotClass'"></span>数据订阅</div>
		<div :class="type == 1?'btnClass btnActive':'btnClass'" @click="choose(1)"><span :class="type == 1?'dotClass dotActive':'dotClass'"></span>消息接收</div>
	</div>
	<div :class="type == 0?'mySubscribe':'mySubscribe1'">
	<div class="filterSection">
		<div class="dataList"><div class="verticalBar"></div>订阅列表</div>
		<div class="adData" @click="openNewSub=true"><i class="iconfont icon-dingyue1"></i></div>
			<!-- demo-ruleForm  -->
			<!-- label-width="100px"  -->
		<div class="filterPart"><div class="verticalBar"></div>快速筛查
		<!-- <el-form :model="filterForm" :rules="rules" ref="filterForm" label-width="40px" class="filterList"> -->
		<el-form :model="filterForm"  ref="filterForm" label-width="40px" class="filterList">
			<el-form-item label="地区" prop="region" class="filterListItem">
				<el-select v-model="filterForm.region" placeholder="请选择对比地区">
					<el-option v-for="(item,index) in regions" :key="index" :value="item.value">
						{{item.value}}
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="材料" prop="type" class="filterListItem">
				<el-select v-model="filterForm.type" placeholder="请选择材料类型">
					<el-option v-for="(item,index) in material" :key="index" :value="item.value">
						{{item.value}}
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="时间" prop="time" class="filterListItem">
				    <el-date-picker v-model="filterForm.time" type="month" placeholder="请选择月份"></el-date-picker>
				<!-- <el-select v-model="filterForm.time" placeholder="请选择报告发布时间">
					<el-option v-for="(item,index) in material" :key="index" :value="item.value">
						{{item.value}}
					</el-option>
				</el-select> -->
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
				<div class="title_num">编号</div>
				<div class="title_num">地区</div>
				<div class="title_num">材料</div>
				<div class="title_num">订阅名称</div>
				<div class="title_time">发布时间</div>
				<div class="title_do">操作</div>
			</li>
			<li class="dataListClass">
				<div class="listItem list_num">DY002</div>
				<div class="listItem list_region">昆明市、安宁市、曲靖市、丽江市...</div>
				<div class="listItem list_materi">钢材、土建材料</div>
				<div class="listItem list_name">钢材 2018.03-2018.09 价格指数 1000 钢材 2018.03-2018.09...</div>
				<div class="listItem list_time">2018.06.23</div>
				<div class="listItem list_do"><span class="seeBtn">查看详情</span><span class="deleBtn">删除</span></div>
			</li>
			<li class="dataListClass">
				<div class="listItem list_num">DY002</div>
				<div class="listItem list_region">昆明市、安宁市、曲靖市、丽江市...</div>
				<div class="listItem list_materi">钢材、土建材料</div>
				<div class="listItem list_name">钢材 2018.03-2018.09 价格指数 1000 钢材 2018.03-2018.09...</div>
				<div class="listItem list_time">2018.06.23</div>
				<div class="listItem list_do"><span class="seeBtn">查看详情</span><span class="deleBtn">删除</span></div>
			</li>
			<!-- <li class="dataListClass" v-for="(item,index) in dataList" v-bind:key="index" @click="">
				<div class="listItem list_num">{{item.num}}</div>
				<div class="listItem list_region">{{item.cities}}</div>
				<div class="listItem list_materi">{{item.materi}}</div>
				<div class="listItem list_name">{{item.content}}</div>
				<div class="listItem list_time">{{item.time}}</div>
				<div class="listItem list_do"><span class="seeBtn">查看详情</span><span class="deleBtn">删除</span></div>
			</li> -->
		</ul>
		<el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" class="reportPage" current-change="get_data()" prev-click="pageNum--" next-click="pageNum++">
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
				<div class="title_num">编号</div>
				<div class="title_num">地区</div>
				<div class="title_num">材料</div>
				<div class="title_num">详细内容</div>
				<div class="title_time">发送时间</div>
				<div class="title_do">操作</div>
			</li>
			<li class="dataListClass">
				<div class="listItem list_num">DY002</div>
				<div class="listItem list_region">昆明市、安宁市、曲靖市、丽江市...</div>
				<div class="listItem list_materi">钢材、土建材料</div>
				<div class="listItem list_name">钢材 2018.03-2018.09 价格指数 1000 钢材 2018.03-2018.09...</div>
				<div class="listItem list_time">2018.06.23</div>
				<div class="listItem list_do"><span class="seeBtn">查看详情</span><span class="deleBtn">删除</span></div>
			</li>
			<li class="dataListClass">
				<div class="listItem list_num">DY002</div>
				<div class="listItem list_region">昆明市、安宁市、曲靖市、丽江市...</div>
				<div class="listItem list_materi">钢材、土建材料</div>
				<div class="listItem list_name">钢材 2018.03-2018.09 价格指数 1000 钢材 2018.03-2018.09...</div>
				<div class="listItem list_time">2018.06.23</div>
				<div class="listItem list_do"><span class="seeBtn">查看详情</span><span class="deleBtn">删除</span></div>
			</li>
			<!-- <li class="dataListClass" v-for="(item,index) in dataList" v-bind:key="index" @click="">
				<div class="listItem list_num">{{item.num}}</div>
				<div class="listItem list_region">{{item.cities}}</div>
				<div class="listItem list_materi">{{item.materi}}</div>
				<div class="listItem list_name">{{item.content}}</div>
				<div class="listItem list_time">{{item.time}}</div>
				<div class="listItem list_do"><span class="seeBtn">查看详情</span><span class="deleBtn">删除</span></div>
			</li> -->
		</ul>
		<el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" class="reportPage" current-change="get_data()" prev-click="pageNum--" next-click="pageNum++">
		</el-pagination>
	</div>	
	</div>
	<el-dialog title="新增材料订阅" :visible.sync="openNewSub" width="620px">
		<el-form :model="newSubForm" :rules="rules" ref="newSubForm" label-width="90px" class="newSubClass">
			<el-form-item label="订阅名称" prop="name" class="">
				<el-input v-model="newSubForm.name" readonly="true" placeholder="请先填写您的订阅名称"></el-input>
			</el-form-item>
			<el-form-item label="时间区间" prop="time" class="">
				    <el-date-picker v-model="newSubForm.time" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">

					</el-date-picker>
			</el-form-item>
			<el-form-item label="材料类型" prop="type" class="">
				<el-select v-model="newSubForm.type" multiple="true" collapse-tags="true" placeholder="请选择材料类型">
					<el-option v-for="(item,index) in material" :key="index" :value="item.value">
						{{item.value}}
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="对比地区" prop="region" class="">
				<el-select v-model="newSubForm.region" multiple="true" collapse-tags="true" placeholder="请选择对比地区">
					<el-option v-for="(item,index) in regions" :key="index" :value="item.value">
						{{item.value}}
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否推送" prop="push" class="">
				<el-switch v-model="newSubForm.push"></el-switch>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" style="background-color:#8B78FE;margin-left:-65px">立即创建</el-button>
				<el-button @click="openNewSub = false">取消</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
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
			pageSize:21,
			openNewSub: false,
			filterForm: {
				region: '',
				type:'',
				time:''
			},
			// 地区和材料都是后端获取的
			regions: [{
				value: '北京'
			}, {
				value: '上海'
			}, {
				value: '南京'
			}, {
				value: '成都'
			}, {
				value: '深圳'
			}, {
				value: '广州'
			}],
			material:[
				{value:'钢材'},
				{value:'木材'}
			],
			newSubForm:{
				name:'',
				time:'',
				type:'',
				region:'',
				push:false
			},
			rules:{
				name:[{required:true,message:'请输入订阅名称',trigger:'blur'}],
				time:[{required:true,message:'请选择时间区间',trigger:'change'}],
				type:[{required:true,message:'请选择材料类型',trigger:'blur change'}],
				region:[{required:true,message:'请选择对比地区',trigger:'blur change'}],	
			}
      }
	},
	methods:{
		choose:function(status){
			if(status == 0) {
				//先重置pageNum 再获取全部的我的订阅
				//this.dataList = value
				this.type = 0
			}else {
				//消息接收
				// this.dataList = value
				this.type = 1
			}
		},
		// get_data() {
		// 	const data = {
		// 		pageNum:this.pageNum,
		// 		pageSize: this.pageSize,
		// 		type:this.type
		// 	}
			//请求, 赋值dataList，因为需要有默认列表
		// },
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
		// toReportDetail(reportId){
			// window.location.href='reportDetail.vue'
			// this.reportId = reportId 
			// this.$router.push({
			// 	path:'reportDetail',
			// 	query:{
			// 		reportId:reportId
			// 	}
			// })
		// },
    }
}
</script>
<style lang="stylus">
.dataSubscribe
    width 100%
	height 100%
	border 1px red solid

.mySubscribe1
	display none

.messageVis1
	display none
.filterSection
	width 100%
	padding 0 20px
	box-sizing border-box
	margin-top 20px
	display flex
	flex-direction row
	flex-wrap nowrap
	justify-content flex-start
.dataList
	width 184px
	height 48px
	background rgba(255,255,255,1)
	padding-left 32px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	border-radius 8px
	box-sizing border-box
	margin-right 10px
	font-size 16px
	color rgba(127,148,255,1)
	line-height 48px
	position relative
.verticalBar
	width 4px
	height 22px
	background-color rgba(127,148,255,1)
	position absolute
	left 20px
	top 12px
.adData
	width 48px
	height 48px
	background rgba(254,155,120,1)
	border 1px solid rgba(245,131,86,1)
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	border-radius 8px
	margin-right 20px
	color white
	line-height 48px
	text-align center
.adData i 
	font-size 20px
.filterPart
	width calc(100% - 262px)
	height 48px
	background-color #ffffff
	padding-left 32px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	border-radius 8px
	font-size 16px
	color rgba(127,148,255,1)
	line-height 48px
	position relative

.filterList
	position absolute
	left 146px
	top 4px
	display flex
	flex-direction row
	flex-wrap nowrap
	justify-content flex-start

.filterListItem
	margin-right 20px
	// padding 0!important

.filterBtn
	background-color #8B78FE!important
	margin-left -40px

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

.listItem
	padding 0 20px
	box-sizing border-box
.list_num
	color #8E9099
.list_time
	color #8E9099
.seeBtn
	display inline-block
	width 60px
	color #2691FF
.deleBtn
	display inline-block
	width 60px
	color #454EFF
</style>

