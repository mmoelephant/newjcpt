<template>
<div class="dataDetail" v-loading.fullscreen="loading">
    <div class="reportBtns">
        <div class="btnClass"><span class="dotClass"></span>智能报告  > <span class="navigiOn">报告详情</span></div>
        <a href="javascript:void(0)" class="goBackBtn" @click='$router.back()'>返回</a>
    </div>
    <div class="dataBox">
        <div class="filterSection">
            <div class="filterPart"><div class="verticalBar"></div>报告内容<p class="decoText">Contents of the report</p></div>
            <div class="xzBtn adData"><i class="iconfont icon-xiazai"></i></div>
            <div class="dyBtn adData"><i class="iconfont icon-dayin"></i></div>
        </div>
        <div class="dataContent">
            <div class="dataRight">
				<p class="reTitle">{{reTitle}}</p>
				<div class="dataItem" v-for="(item,index) in reportDetailList" :key="index" >
					<p class="graphName" v-if='item.mm =="暂无数据"'>暂无数据</p>
					<p class="contentItem" v-if="item.mm != '暂无数据'"><span class="titleDot"></span>
					据对16个州、市建设工程7大类26小类主要材料市场价格的监测显示，2019年01月与上月相比，钢材类类材料价格上涨，钢筋类下降，电线电缆类持平。
					</p>
					<p class="graphName" v-if="item.mm != '暂无数据'">{{reTitle.split('省')[1]}}</p>
					<table class="tableBox" border="1" v-if='item.mm !="暂无数据"'>
						<thead>
							<tr>
								<th>材料名称</th>
								<th>单位</th>
								<th>本期价格（元）</th>
								<th>比上期价格涨跌(元)</th>
								<th>涨跌幅(%)</th>
							</tr>
						</thead>
						<tbody v-for="(aa,index2) in item.mm" :key="index2">
							<tr>
								<td>{{aa.areaName}}</td>
								<td>{{aa.tbPrice?aa.tbPrice.toFixed(2):'-'}}</td>
								<td>{{aa.hbPrice?aa.hbPrice.toFixed(2):'-'}}</td>
								<td>{{aa.price?aa.price.toFixed(2):'-'}}</td>
								<td>{{aa.tb?Number(aa.tb.toFixed(5)) * 100:'-'}}%</td>
								<td>{{aa.hb?Number(aa.hb.toFixed(5)) * 100:'-'}}%</td>
							</tr>
						</tbody>
						<tfoot class="tableFoot">
							<tr>
								<td colspan="5">注：上期为{{time1}}</td>
							</tr>
						</tfoot>
					</table>
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
			token:this.$store.state.login.token,
			reTitle:'云南省建设工程主要材料市场价格变动情况',
			reportDetailList:[],
			time1:'',
			loading:true
        }
	},
	watch:{
	},
	created(){
		var data1 = {
			token:this.token,
			reportId:this.id
		}
		var data6 = {
			id:this.id,
			token:this.token
		}
		this.$api.get_reports_detail(data6).then(v => {
			this.loading = false
			console.log(v.data.timeInterval)
			console.log(typeof v.data.timeInterval)
			this.reportDetailList = v.data.mapList
			this.time1 = v.data.timeInterval
			if(v.data.timeInterval.length == 1){
				this.reTitle = '云南省建设工程主要材料市场价格变动情况' + '(' + v.data.title.substr(0,9) + ')'
				if(v.data.timeInterval == 1){
					this.time1 = '2018年第四季度'
				}else if(v.data.timeInterval == 2){
					this.time1 = '2019年第一季度'
				}else if(v.data.timeInterval == 3){
					this.time1 = '2019年第二季度'
				}else{
					this.time1 = '2019年第三季度'
				}
			}else if(v.data.timeInterval.length == 4){
				this.reTitle = '云南省建设工程主要材料市场价格变动情况' + '(' + v.data.title.substr(0,5) + ')'
				this.time1 = (Number(v.data.timeInterval) - 1).toString() + '年'
			}else{
				this.reTitle = '云南省建设工程主要材料市场价格变动情况' + '(' + v.data.title.substr(0,8) + ')'
				if(v.data.timeInterval.substr(5,2) == '01'){
					this.time1 = (Number(v.data.timeInterval.substr(0,4)) - 1).toString() + '年12月'
				}else{
					this.time1 = (Number(v.data.timeInterval.substr(0,4)) - 1).toString() + '年' + (Number(v.data.timeInterval.substr(5,2)) - 1) +'月'
				}
			}
		})
	},
	computed: {
		id: function () {
			return this.$route.query.id
		}
	},
	mounted() {
	},
    methods:{
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
.dataRight
	width 100%
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
	width 8px
	height 8px
	display inline-block
	background #7F94FF
	border-radius 50%
	margin-right 4px
	line-height 20px
.contentItem
	margin-top 30px
	font-size 14px
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

.tableFoot
	text-align left
	td
		padding-left 20px
</style>