<template>
<div class="dataDetail" v-loading.fullscreen="loading">
    <div class="reportBtns navigi">
        <div class="btnClass1 btnClass"><span class="dotClass dotClass1"></span>智能报告  > <span class="navigiOn">报告详情</span></div>
        <a href="javascript:void(0)" class="goBackBtn" @click='$router.back()'>返回</a>
    </div>
    <div class="dataBox">
        <div class="filterSection">
            <div class="dataList" style="width:242px"><div class="verticalBar"></div>我的备注</div>
            <div class="adData adData1" @click="openMark"><i class="iconfont icon-xinzeng1"></i></div>
            <div class="filterPart" style="width:calc(100% - 456px)"><div class="verticalBar"></div>报告内容<p class="decoText">Contents of the report</p></div>
            <div class="xzBtn adData"><i class="iconfont icon-xiazai"></i></div>
            <div class="dyBtn adData"><i class="iconfont icon-dayin"></i></div>
        </div>
		<el-dialog title="新增备注" :visible.sync="openNewMark" width="620px">
			<p class="newTime">时间<span class="timeSpan">{{addTime}}</span></p>
			<el-form :model="markForm" :rules="rules" ref="markForm">
				<el-form-item prop="mark">
					<el-input type="textarea" :autosize="{minRows:4,maxRows:10}" clearable v-model="markForm.mark" placeholder="请输入备注" minlength="10"  maxlength="100" show-word-limit></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('markForm')" class="newNow">立即创建</el-button>
					<!-- style="background-color:#9A7CFF"  -->
					<el-button @click="cancelMark('markForm')">取消</el-button>
					</el-form-item>
			</el-form>
		</el-dialog>
        <div class="dataContent">
            <div class="dataLeft">
				<div class="markItem" v-for="item in markList" :key="item.id">
                    <p class="timeTip">最新提交时间</p>
                    <p class="time">{{item.updateTime?item.updateTime.split('T')[0]:'-'}}</p>
					<el-input type="textarea" :readonly="markRight" :disabled="inputDis" :autosize = "{ minRows: 2, maxRows: 10}" class="markBox" v-model="item.mark" @change="markChange"></el-input>
                    <i class="el-icon-error closeMark" @click="deleteMark(item.id)"></i>
                    <div class="doBtns">
                        <button class="btn" @click="modifyMark(item.id)" :style="btnVis">修改</button>
                        <button class="btn btnSave" :style="btnVis1" @click="saveMark(item.id)" :key="item.id">保存</button>
                        <button class="btn btnCancle" :style="btnVis1" @click="cancelModify()" :key="item.id">取消</button>
                    </div>
                </div>
				<div class="noData" :style="imgVis">
					<img src="../../../public/img/subscribe/noMark.png" class="noDataImg">
					<p class="noDatap1">还没有添加备注哦~</p>
					<p class="noDatap2">点击上方<span style="color:#8B78FE">创建按钮</span>，立即新建一个吧</p>
				</div>
            </div>
            <div class="dataRight">
				<p class="reTitle">{{reTitle}}</p>
				<div class="dataItem" v-for="(item,index) in reportDetailList" :key="index">
					<!-- <p class="graphName">{{item.title}}</p> -->
					<p class="titleItem">
						<span class="titleDot"></span>
						{{item.title}}
					</p>
					<p class="contentItem">
						<span v-if="time1.length == 1">{{item.title?item.title.substr(0,9):'-'}} 云南省 {{item.maName}}价格</span>
						<span v-else-if="time1.length == 4">{{item.title?item.title.substr(0,9):'-'}} 云南省 {{item.maName}}价格</span>
						<span v-else>{{item.title?item.title.substr(0,7):'-'}} 云南省 {{item.maName}}价格</span>
						{{item.mmYn[index].price?item.mmYn[index].price.toFixed(2):'-'}} 元/吨 
						指数{{item.mmYn[index].exponent?item.mmYn[index].exponent.toFixed(2):''}}点 
						环比下降{{item.mmYn[index].hb?item.mmYn[index].hb.toFixed(5) * 100:'-'}}%，
						同比下降{{item.mmYn[index].tb?item.mmYn[index].tb.toFixed(5) * 100:'-'}}%。</p>
					<table class="tableBox" border="1">
						<thead>
							<tr>
								<th rowspan="2">地区</th>
								<th colspan="5">{{item.maName}} 单位：元/立方米</th>
							</tr>
							<tr v-if="time1.length == 1">
								<th>{{(parseInt(item.title.substr(0,4)) - 1).toString() + '年'}}</th>
								<th>{{item.title.substr(0,9)}}</th>
								<th>{{item.title.substr(0,9)}}</th>
								<th>同比增长率(%)</th>
								<th>环比增长率(%)</th>
							</tr>
							<tr v-else-if="time1.length == 4">
								<th>{{(parseInt(item.title.substr(0,4)) - 1).toString() + '年'}}</th>
								<th>{{item.title.substr(0,5)}}</th>
								<th>{{item.title.substr(0,5)}}</th>
								<th>同比增长率(%)</th>
								<th>环比增长率(%)</th>
							</tr>
							<tr v-else>
								<th>{{(parseInt(item.title.substr(0,4)) - 1).toString() + item.title.substr(5,3)}}</th>
								<th>{{item.title.substr(5,2) == '01'?(parseInt(item.title.substr(0,4)) - 1).toString() + '12月':item.title.substr(0,5) + (parseInt(item.title.substr(5,2)) - 1).toString() + '月'}}</th>
								<th>{{item.title.substr(0,7)}}</th>
								<th>同比增长率(%)</th>
								<th>环比增长率(%)</th>
							</tr>
						</thead>
						<tbody v-for="(aa,index2) in item.mm" :key="index2">
							<tr>
								<td>{{aa.areaName}}</td>
								<td>{{aa.tbPrice?aa.tbPrice.toFixed(2):'-'}}</td>
								<td>{{aa.hbPrice?aa.hbPrice.toFixed(2):'-'}}</td>
								<td>{{aa.price?aa.price.toFixed(2):'-'}}</td>
								<td>{{aa.tb?aa.tb.toFixed(5) * 100:'-'}}%</td>
								<td>{{aa.hb?aa.hb.toFixed(5) * 100:'-'}}%</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<td>{{item.mmYn[index].areaName}}</td>
								<td>{{item.mmYn[index].tbPrice?item.mmYn[index].tbPrice.toFixed(2):'-'}}</td>
								<td>{{item.mmYn[index].hbPrice?item.mmYn[index].hbPrice.toFixed(2):'-'}}</td>
								<td>{{item.mmYn[index].price?item.mmYn[index].price.toFixed(2):'-'}}</td>
								<td>{{item.mmYn[index].tb?item.mmYn[index].tb.toFixed(5) * 100:'-'}}%</td>
								<td>{{item.mmYn[index].hb?item.mmYn[index].hb.toFixed(5) *100:"-"}}%</td>
							</tr>
						</tfoot>
					</table>
					<!-- <p>{{item.}}价格</p> -->
					<div :id="'main'+index" style="width: 600px;height:400px;margin:30px auto 20px;"></div>
					<div :id="'main2'+index" style="width: 600px;height:400px;margin:30px auto 20px;"></div>
					<div :id="'main1'+index" style="width: 600px;height:400px;margin:30px auto 20px;"></div>
				</div>
				
			</div>
        </div>
		<router-view></router-view>
    </div>
</div>
</template>
<script>
import $ from 'jquery'
export default {
	data() {
		return {
			openNewMark:false,
			token:this.$store.state.login.token,
			markList:[],
			markRight:true,
			inputDis:true,
			input:'',
			modifiedMark:'',
			btnVis:{
				display:''
			},
			btnVis1:{
				display:'none'
			},
			imgVis:{
				display:'block'
			},
			markForm:{
				mark:''
			},
			addTime:'',
			text:'',
			textarea:'',
			rules:{
				mark:[{required:true,message:'请输入备注',trigger:'blur'}]
			},
			reTitle:'',
			reportDetailList:[],
			time1:'',
			mycharts:null,
			loading:true
        }
    },
	created(){
		this.markList = []
		var data1 = {
			token:this.token,
			// reportId:'6b0efab0a0a746e6be8562d51359d214'
			reportId:this.id
		}
		var data6 = {
			id:this.id,
			token:this.token
		}
		this.$api.get_markList(data1).then(v => {
			if(v.data.data != null){
				this.imgVis.display = 'none'
				this.markList = v.data.data
			}else{
				this.imgVis.display = 'block'
				this.markList = []
			}
		})
		this.addTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
		this.$api.get_reports_detail(data6).then(v => {
			// this.loading = false
			this.reTitle = v.data.title
			this.reportDetailList = v.data.mapList
			this.time1 = v.data.timeInterval
			this.$nextTick(() => {
				this.reportDetailList.forEach((item,index) => {
					this.drawGraph(item,index)
					this.drawGraph2(item,index)
					this.drawGraph1(item,index)
				})
				
			})
		})
	},
	computed: {
		id: function () {
			return this.$route.query.id
		}
	},
	mounted() {
		// this.drawGraph()
	},
    methods:{
		drawGraph(aa,bb){
			if(aa.mm == "暂无数据") return
			let x = [],y = []
			const mycharts = this.$echarts.init(document.getElementById('main'+bb))
			aa.mm.forEach(item => {
				x.push(item.areaName)
				y.push(item.price)
			})
			var option = {
				// title:{
				// 	text:aa.title
				// },
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				toolbox: {
					feature: {
						dataView: {show: true, readOnly: false},
						magicType: {show: true, type: ['line', 'bar']},
						restore: {show: true},
						saveAsImage: {show: true}
					}
				},
				legend: {
					data:['价格']
				},
				xAxis: [
					{
						type: 'category',
						data: x,
						axisPointer: {
							type: 'shadow'
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						// name: '价格',
						min: 0,
						max: 6000,
						interval: 1000,
						axisLabel: {
							formatter: '{value}'
						}
					}
				],
				series:[
					{
					name:'价格',
					type:'bar',
					color: ['#637CFB','#FE9B78'],
					data:y,
					barWidth:30
					},
				]
			}
			mycharts.setOption(option,true)
		},
		drawGraph2(aa,bb){
			if(aa.mm == "暂无数据") return
			let x = [],y =[],z=[]
			// ,w =''
			const mycharts2 = this.$echarts.init(document.getElementById('main2'+bb))
			aa.mm.forEach(item => {
				x.push(item.areaName)
				y.push(item.price)
				z.push(item.hbPrice)
				// w = aa.maName + '价格'
			})
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				toolbox: {
					feature: {
						dataView: {show: true, readOnly: false},
						magicType: {show: true, type: ['line', 'bar']},
						restore: {show: true},
						saveAsImage: {show: true}
					}
				},
				legend: {
					data:['价格','环比价格']
				},
				xAxis: [
					{
						type: 'category',
						data: x,
						axisPointer: {
							type: 'shadow'
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						// name: '价格',
						min: 0,
						max: 6000,
						interval: 1000,
						axisLabel: {
							formatter: '{value}'
						}
					}
				],
				series:[
					{
					name:'价格',
					type:'line',
					color:['#637CFB'],
					data:y,
					},
					{
					name:'环比价格',
					type:'line',
					color:['#FE9B78'],
					data:z,
					}

				]
			}
			mycharts2.setOption(option,true)
		},
		drawGraph1(aa,bb){
			if(aa.mm == "暂无数据") return
			let x = [],y =[],z=[]
			const mycharts1 = this.$echarts.init(document.getElementById('main1'+bb))
			aa.mm.forEach(item => {
				x.push(item.areaName)
				y.push(item.price)
				z.push(item.tbPrice)
			})
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				toolbox: {
					feature: {
						dataView: {show: true, readOnly: false},
						magicType: {show: true, type: ['line', 'bar']},
						restore: {show: true},
						saveAsImage: {show: true}
					}
				},
				legend: {
					data:['价格','同比价格']
				},
				xAxis: [
					{
						type: 'category',
						data: x,
						axisPointer: {
							type: 'shadow'
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						// name: '价格',
						min: 0,
						max: 6000,
						interval: 1000,
						axisLabel: {
							formatter: '{value}'
						}
					}
				],
				series:[
					{
					name:'价格',
					type:'line',
					color:['#637CFB'],
					data:y,
					},
					{
					name:'同比价格',
					type:'line',
					color:['#FE9B78'],
					data:z,
					}

				]
			}
			mycharts1.setOption(option,true)
		},
		
		getMarkList(){
			var data3 = {
				token:this.token,
				// reportId:this.reportId,
				reportId:this.id
			}
			this.$api.get_markList(data3).then(v => {
				if(v.data.data != null){
					this.imgVis.display = 'none'
					this.markList = v.data.data
				}else{
					this.imgVis.display = 'block'
					this.markList = []
				}
			})
		},
		openMark(){
			this.openNewMark = true
		},
		modifyMark(){
			this.markRight = false
			this.btnVis.display = 'none'
			this.btnVis1.display = ''
			this.inputDis = false
		},
		markChange(value){
			this.modifiedMark = value
		},
		saveMark(ss){
			var data5 = {
				token:this.token,
				id:ss,
				mark:this.modifiedMark
			}
			this.$api.modify_mark(data5).then(v => {
				if(v.data.msg == 'success'){
					this.btnVis1.display = 'none'
					this.btnVis.display = ''
					this.getMarkList()
				}else{
					this.btnVis1.display = ''
					this.btnVis.display = 'none'
				}
			})
		},
		cancelModify(){
			this.btnVis.display = ''
			this.btnVis1.display = 'none'
		},
		deteleTip(){
			this.$message({
				showClose:true,
				message:'删除成功',
				type:'success',
				duration:2000
			})
		},
		deteleTip1(){
			this.$message({
				showClose:true,
				message:'删除失败',
				type:'error',
				duration:2000
			})
		},
        deleteMark(id){
			var data4 = {
				token:this.token,
				id:id
			}
			this.$api.delete_mark(data4).then(v => {
				if(v.data.msg == 'success'){
					this.deteleTip()
					this.getMarkList()
				}else{
					this.deteleTip1()
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
		submitForm(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var data2 = {
						token:this.token,
						// reportId:this.reportId,
						reportId:this.id,
						mark:this.markForm.mark
					}
					this.$api.add_mark(data2).then(v => {
						if(v.data.msg == 'success'){
							this.openNewMark = false
							this.$refs['markForm'].resetFields()
							this.openTip()
							this.getMarkList()
						}else{
							this.openNewMark = false
							this.$refs[formName].resetFields()
							this.openTip1()
						}
					})
				}else{
					this.openTip1()	
				}
			})
		},
		cancelMark(formName){
			this.openNewMark = false
			this.$refs[formName].resetFields()
		}
    }
}
</script>
<style lang="stylus" scoped>
.dataDetail
    width 100%
    height 100%

.goBackBtn


.dataBox
    width 100%
    height 100%

.dataContent
	width 100%
	height 100%
	padding 0 20px
	// border 1px red solid
	box-sizing border-box
	margin-top 10px
	display flex
	flex-direction row
	flex-wrap nowrap
	justify-content space-around
.dataLeft
    width 300px
    display flex
    flex-direction column
    flex-wrap nowwrap
    justify-content flex-start

.markItem
	width 300px
	background #fff
	padding 20px
	border-radius 8px
	box-sizing border-box
	margin-bottom 20px
	font-size 14px
	line-height 14px
	position relative

.timeTip
    color #8E9099
    margin-bottom 12px
.time
    color #2C2D33
    margin-bottom 20px

.closeMark
    position absolute
    right 18px
    top 15px
    font-size 24px
    color #8E9099

.markBox
	width 100%
	overflow hidden
	// height 116px
	// padding 10px
	border 1px solid rgba(216,219,223,1)
	box-sizing border-box
	color #5C5D62
	line-height 24px
.doBtns
	margin-top 10px
	text-align right
.btn
	width 60px
	height 28px
	background #fff
	border 1px solid rgba(108,125,255,1)
	border-radius 14px
	margin-left 10px
	font-size 14px
	color #7F94FF
	line-height 24px
	text-align center
	transition background color 0.5s

.btn:hover
	color #FEFEFE
	background #8FA1FF

.btnSave
	background #6C7DFF
	color white
	transition background color 0.5s

.btnSave:hover
	background #6C7DFF
	color white
.noData
	font-size 18px
	line-height 18px
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

.newTime
	position relative
	top -34px
	font-size 14px
	color #8E9099
	line-height 14px

.timeSpan
	margin-left 8px

.newNow
	background #9A7CFF
	transition background 0.5s

.newNow:hover
	background #C7B7FF
.dataRight
	width calc(100% - 320px)
	// height 824px
	background #fff
	padding 20px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	border-radius 8px
	box-sizing border-box
	font-size 14px
	line-height 24px

.reTitle
	font-size 16px
	font-weight bold
	line-height 30px
	text-align center

.titleItem
	font-size 14px
	font-weight bold
	line-height 28px
	box-sizing border-box
	margin-top 30px

.titleDot
	width 6px
	height 6px
	display inline-block
	background #7F94FF
	border-radius 50%
	margin-right 4px
	line-height 28px

.graphName
	font-weight bold
	text-align center
	margin-top 30px

.tableBox
	width 100%
	border 1px #ccc solid
	border-collapse collapse
	margin-top 20px
	font-size 14px
	text-align center
</style>
