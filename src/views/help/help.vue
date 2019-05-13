<template>
<div class="dataSubscribe">
	<div class="reportBtns">
		<div class="btnClass"><span class="dotClass"></span>帮助中心</div>
	</div>
	<div class="mySubscribe">

	<div class="dataContent">
		<ul class="dataContentUl">
			<li class="dataListTitle" >
				<!-- <div v-for="(item,index) in dataList" :key="index">编号</div> -->
				<div class="title_num">编号</div>
				<div class="title_num">文章名称</div>
				<div class="title_time">更新时间</div>
				<div class="title_do">操作</div>
			</li>
			<li class="dataListClass" v-for='item in dataList' :key='item.id'>
				<div class="listItem list_num">{{item.code}}</div>
				<div class="listItem list_name">{{item.title}}</div>
				<div class="listItem list_time">{{item.time.split('T')[0]}}</div>
				<div class="listItem list_do" @click='get_detail(item.id)'><span class="seeBtn">查看详情</span></div>
			</li>
		</ul>
		<el-pagination :page-size="pageSize" layout="prev, pager, next" :total="total" class="reportPage" @current-change="pageChange">
		</el-pagination>
	</div>
	<el-dialog
		title="文章详情"
		:visible.sync="dialogVisible"
		width="60%">
		<div class=''>
			<h1>
				{{detail.title}}
			</h1>
			<div v-html="detail.content"></div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false" type="primary">阅读完毕</el-button>
			<el-button  @click="dialogVisible = false">取 消</el-button>
		</span>
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
			pageNum:1,
            pageSize:10,
			total:0,
			detail:{},
			dialogVisible:false
      }
    },
    created() {
        this.get_data()
    },
	methods:{
		async get_data() {
            const data = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            const res = await this.$api.get_help(data)
            this.dataList=res.data.list
            this.total = res.data.count
        },
        pageChange(val) {
            this.pageNum = val
            this.get_data()
		},
		async get_detail(id) {
			const res = await this.$api.get_help_detail({id:id})
			this.detail = res.data
			this.dialogVisible = true
		} 
    }
}
</script>
<style lang="stylus">
.dataSubscribe
    width 100%
	height 100%
	border 1px red solid

.mySubscribe
	padding-top 88px
.dataListClass:hover
    background #D3D8F4
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
.listItem
	padding 0 20px
	box-sizing border-box
    width 25% 
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

