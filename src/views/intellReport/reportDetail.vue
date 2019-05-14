<template>
<div class="dataDetail">
    <div class="reportBtns navigi">
        <div class="btnClass1 btnClass"><span class="dotClass dotClass1"></span>智能报告  > <span class="navigiOn">报告详情</span></div>
        <a href="javascript:void(0)" class="goBackBtn">返回</a>
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
			<el-form :model="markForm" :rules="rules" ref="markForm" class="">
				<el-form-item prop="mark">
				<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" clearable v-model="markForm.mark" placeholder="请输入备注" minlength="10"  maxlength="50" show-word-limit></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('markForm')" style="background-color:#8B78FE">立即创建</el-button>
					<el-button @click="cancelMark('markForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
        <div class="dataContent">
            <div class="dataLeft">
				<div class="markItem" v-for="item in markList" :key="item.id">
                    <p class="timeTip">最新提交时间</p>
                    <p class="time">{{item.updateTime?item.updateTime.split('T')[0]:''}}</p>
					<el-input type="textarea" :readonly="markRight" :disabled="inputDis" :autosize = "{ minRows: 2, maxRows: 10}" class="markBox" v-model="item.mark" @change="markChange"></el-input>
                    <i class="el-icon-error closeMark" @click="deleteMark(item.id)"></i>
                    <div class="doBtns">
                        <button class="btn" @click="modifyMark()" :style="btnVis">修改</button>
                        <button class="btn btnSave" :style="btnVis1" @click="saveMark(item.id)">保存</button>
                        <button class="btn btnCancle" :style="btnVis1" @click="cancelModify()">取消</button>
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
				<p class="titleItem">一、钢材</p>
				<p class="contentItem">2019年第一季度 云南省 钢材价格  元/吨 指数点 环比下降，同比下降。</p>
			</div>
        </div>
		<router-view></router-view>
    </div>
</div>
</template>
<script>
export default {
	data() {
		return {
			openNewMark:false,
			token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwOTdmMGRkOWUyMjc0Y2NmYjc2ZjRmYWMxNDQxNjMzOSIsImV4cCI6MTU1Nzg4NjMyNywibmJmIjoxNTU3Nzk5OTI3fQ.4BO9dVg1EflfTjjhkyaove_lngXE4OCHhgNVdCVfW3Y',
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
			console.log(v)
			console.log(v.data.title)
			this.reTitle = v.data.title
		})
	},
	computed: {
		id: function () {
			return this.$route.query.id
    	}
  	},
    methods:{
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
		modifyMark(bb){
			this.markRight = false
			this.btnVis.display = 'none'
			this.btnVis1.display = ''
			this.inputDis = false
		},
		markChange(value){
			console.log(value)
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
	line-height 28px
	text-align center

.btnSave
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
.dataRight
	width calc(100% - 320px)
	height 824px
	background #fff
	padding 20px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	border-radius 8px
	box-sizing border-box
	font-size 14px

.reTitle
	font-size 16px
	line-height 30px
	text-align center

.titleItem
	margin-top 20px
	// border 1px red solid
</style>