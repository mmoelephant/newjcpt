<template>
<div class="help-box">
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
		<div class='content'>
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
            pageSize:8,
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
			this.detail.content = this.detail.content.replace(/&amp;/g,'&')
			.replace(/&lt;/g,'<')
			.replace(/&gt;/g,'>')
			.replace(/&amp;nbsp;/g,' ')
			.replace(/&quot;/g,'"').
			replace(/&iexcl;/g, '?').
			replace(/&cent;/g, '￠'). 
			replace(/&pound;/g, '￡').
			replace(/&curren;/g, '¤')
			.replace(/&yen;/g, '￥')
			.replace(/&brvbar;/g, '|')
			.replace(/&sect;/g, '§')
			.replace(/&uml;/g, '¨')
			.replace(/&copy;/g, '©')
            .replace(/&laquo;/g, '?')
            .replace(/&not;/g, '?')
            .replace(/&reg;/g, '®')
            .replace(/&deg;/g, '°')
            .replace(/&plusmn;/g, '±')
            .replace(/&acute;/g, '′')
            .replace(/&middot;/g, '·')
            .replace(/&ordm;/g, 'o')
			this.dialogVisible = true
		},
    }
}
</script>
<style lang="stylus" scoped>
	.help-box
		// padding-top 88px
		width 100%
		height 100%	
		box-sizing border-box

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
	.dataContentUl
		width 100%
		padding 0 20px
		box-sizing border-box
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
	.listItem
		width 25% 
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
		cursor pointer
	.deleBtn
		display inline-block
		width 60px
		color #454EFF
	.content 
		width 80%
		max-height 820px
		overflow-y auto
		margin 0 auto
		border 1px solid #D8DBDF
		h1  
			font-size 20px
			color #2C2D33
			text-align center
			margin-top 30px
		div 
			padding 30px
</style>

