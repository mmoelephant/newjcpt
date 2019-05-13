<template>
<div class="dataDetail">
    <div class="reportBtns navigi">
        <div class="btnClass1 btnClass"><span class="dotClass dotClass1"></span>智能报告  > <span class="navigiOn">报告详情</span></div>
        <a href="" class="goBackBtn">返回</a>
    </div>
    <div class="dataBox">
        <div class="filterSection">
            <div class="dataList" style="width:242px"><div class="verticalBar"></div>我的备注</div>
            <div class="adData adData1" @click="openMark"><i class="iconfont icon-xinzeng1"></i></div>
            <div class="filterPart" style="width:calc(100% - 456px)"><div class="verticalBar"></div>报告内容<p class="decoText">Contents of the report</p></div>
            <div class="xzBtn adData" @click=""><i class="iconfont icon-xiazai"></i></div>
            <div class="dyBtn adData" @click=""><i class="iconfont icon-dayin"></i></div>
        </div>
		<el-dialog title="新增备注" :visible.sync="openNewMark" width="620px">
			<p class="newTime">时间<span class="timeSpan">{{addTime}}</span></p>
			<el-form :model="markForm" :rules="rules" ref="markForm" class="">
				<el-form-item prop="mark">
				<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" clearable v-model="markForm.mark" placeholder="请输入备注" minlength="50"  maxlength="2000" show-word-limit></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('markForm')" style="background-color:#8B78FE">立即创建</el-button>
					<el-button @click="cancelMark('markForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
        <div class="dataContent">
            <div class="dataLeft">
                <div class="markItem">
                    <p class="timeTip">最新提交时间</p>
                    <p class="time">2019-4-28</p>
                    <div class="markBox">爱好干哈百花谷比较宝贵哈哈给货币啊好好干和黄海波GV</div>
                    <i class="el-icon-error closeMark" @click="deleteMark(item.id)"></i>
                    <div class="doBtns">
                        <button class="btn">修改</button>
                        <button class="btn">保存</button>
                        <button class="btn">取消</button>
                    </div>
                </div>
				<!-- <div class="markItem" v-for="item in markList">
                    <p class="timeTip">最新提交时间</p>
                    <p class="time">{{item.updateTime}}</p>
                    <div class="markBox">{{item.mark}}</div>
                    <i class="el-icon-error closeMark" @click="deleteMark(item.id)"></i>
                    <div class="doBtns">
                        <button class="btn">修改</button>
                        <button class="btn">保存</button>
                        <button class="btn">取消</button>
                    </div>
                </div> -->
				<div class="noData" :style="imgVis">
					<img src="../../../public/img/subscribe/noMark.png" class="noDataImg">
					<p class="noDatap1">还没有添加备注哦~</p>
					<p class="noDatap2">点击上方<span style="color:#8B78FE">创建按钮</span>，立即新建一个吧</p>
				</div>
            </div>
            <div class="dataRight"></div>
        </div>
    </div>
</div>
</template>
<script>
export default {
	data() {
		return {
			openNewMark:false,
			token:'',
			markList:[],
			imgVis:{
				display:'none'
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
        }
    },
	created(){
		this.markList = []
		var data1 = {
			token:this.token,
			reportId:''
		}
		this.$api.get_markList(data1).then(v => {
			if(v.data.msg == '查询成功' && v.data.count != 0){
				this.markList = v.data.list
			}else{
				this.imgVis.display = 'block'
			}
		})
		this.addTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
	},
    methods:{
		getMarkList(){
			var data3 = {
				token:this.token,
				reportId:''
			}
			this.$api.get_markList(data3).then(v => {
				if(v.data.msg == '查询成功' && v.data.count != 0){
					this.markList = v.data.list
				}else{
					this.imgVis.display = 'block'
				}
			})
		},
		openMark(){
			this.openNewMark = true
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
						reportId:'',
						mark:this.markForm.mark
					}
					this.$api.add_mark(data2).then(v => {
						if(v.data.msg == 'success'){
							this.openNewMark = false
							this.$refs['markForm'].resetFields()
							this.openTip()
							getMarkList()
						}else{
							this.openNewMark = false
							this.$refs[formName].resetFields()
							this.openTip1()
						}
					})
				}else{

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
<style lang="stylus">
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
	box-sizing border-box
	margin-top 10px
.dataLeft
    width 300px
    height 300px
    display flex
    flex-direction column
    flex-wrap nowwrap
    justify-content flex-start

.markItem
	width 300px
	height 300px
	background #fff
	padding 20px
	border-radius 8px
	box-sizing border-box
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
	height 116px
	padding 10px
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
	font-size 14px
	color #7F94FF
	line-height 28px
	text-align center

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
</style>