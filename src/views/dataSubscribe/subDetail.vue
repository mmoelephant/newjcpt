<template>
<div class="dataDetail">
    <div class="reportBtns navigi">
        <div class="btnClass1 btnClass"><span class="dotClass dotClass1"></span>数据订阅  > <span class="navigiOn">订阅详情</span></div>
        <a href="javascript:void(0)" class="goBackBtn" @click='$router.back()'>返回</a>
    </div>
    <div class="dataBox">
        <div class="filterSection">
            <div class="dataList" style="width:300px"><div class="verticalBar"></div>订阅内容</div>
            <div class="filterPart" style="width:calc(100% - 456px)"><div class="verticalBar"></div>数据详情<p class="decoText">Contents of the report</p></div>
            <div class="xzBtn adData"><i class="iconfont icon-xiazai"></i></div>
            <div class="dyBtn adData"><i class="iconfont icon-dayin"></i></div>
        </div>
		<div class="dataContent">
			<div class="dataLeft">
				<div class="subInfo">
					<!-- v-for="subDetail" -->
					<p class="deTitle"><span class="dot1"></span>订阅名称</p>
					<p class="deContent">{{subInfoName}}</p>
					<p class="deTitle"><span class="dot1"></span>时间区间</p>
					<p class="deContent">{{subInfoTime}}</p>
					<p class="deTitle"><span class="dot1"></span>对比地区</p>
					<p class="deContent">{{subInforegion}}</p>
					<p class="deTitle"><span class="dot1"></span>对比材料</p>
					<p class="deContent">{{subInfomateri}}</p>
				</div>
				
			</div>
			<div class="dataRight">
				<div class="rightBox">
					<h1>{{subInfoName}}</h1>
					<div class='table-box' v-for='(item,index) in tableData' :key='index'>
                        <div class='t'>
                            <p>{{item.maName }}地区数据表
                            </p>
                            <ul>
                                <li :class='item.chosed_type=="price"? "ac" :""' @click='item.chosed_type="price"'>价格</li>
                                <li :class='item.chosed_type=="zs"? "ac" :""' @click='item.chosed_type="zs"'>指数</li>
                                <li :class='item.chosed_type=="tb"? "ac" :""' @click='item.chosed_type="tb"'>同比</li>
                                <li :class='item.chosed_type=="hb"? "ac" :""' @click='item.chosed_type="hb"'>环比</li>
                            </ul>
                        </div>
						<div id='table' class='ul'>
							<div class="th li">
								<p>区域</p>
								<p v-for="(t,i) in tableData[0].datalist[0]" :key="i">{{t.maDate}}</p>
							</div>
							<div class='el-checkbox-group'>
								<div class='li' v-for="(d,h) in item.datalist" :key="h">
									<p>
										{{d[0].areaName}}
									</p>
									<p v-for='(num) in d' :key='num.id' >
										<span v-if='item.chosed_type=="price"'>{{num.price?Number(num.price).toFixed(2):'-'}}</span>  
										<span v-if='item.chosed_type=="zs"'>{{num.exponent?Number(num.exponent).toFixed(2):'-'}}</span>  
										<span v-if='item.chosed_type=="tb"'>{{num.tongbi?Number(num.tongbi).toFixed(2):'-'}}</span>  
										<span v-if='item.chosed_type=="hb"'>{{num.huanbi?Number(num.huanbi).toFixed(2):'-'}}</span>  
									</p>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
		<router-view></router-view>
    </div>
</div>
</template>
<script>
import reftable from '../../components/ref-table'
export default {
	data() {
		return {
			token:this.$store.state.login.token,
			subDetail:[],
			subInfoName:'',
			subInfoTime:'',
			subInforegion:'',
			subInfomateri:'',
			tableData:[]
        }
    },
	created(){
		var data1 = {
			id:this.id,
			token:this.token
		}
		this.$api.sub_detail(data1).then(v => {
			this.subInfoName = v.data.title
			this.subInfoTime = v.data.stTimeStr.substr(0,7) + ' 至 ' + v.data.enTimeStr.substr(0,7)
			this.subInforegion = v.data.area
			this.subInfomateri = v.data.maName
			v.data.mapList.filter(item => {
				item.chosed_type = 'price'
				item.datalist=[]
				let keys = Object.keys(item.data)
				keys.forEach(key => {
					item.datalist.push(item.data[key])
				})
			})
			this.tableData = v.data.mapList
		})
	},
	components:{

	},
	computed: {
		id: function () {
			return this.$route.query.id
		}
	},
    methods:{
    }
}
</script>
<style lang="stylus" scoped>
@import '../../style/color.stylus'
.dataDetail
    width 100%
    height 100%

.dataBox
    width 100%
    height 100%

.dataContent
	width 100%
	height 100%
	padding 0 20px 20px 20px
	box-sizing border-box
	margin-top 10px
	display flex
	flex-direction row
	flex-wrap nowrap
	justify-content flex-start

.dataLeft
    width 300px

.subInfo
	width 300px
	height 340px
	background #fff
	padding 20px
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	border-radius 8px
	box-sizing border-box
	font-size 14px
	line-height 14px
	
.deTitle
	width 100%
	padding-left 14px
	box-sizing border-box
	font-size 14px
	color #8E9099
	line-height 14px
	position relative

.dot1
	width 6px
	height 6px
	display inline-block
	background #7F94FF
	border-radius 50%
	position absolute
	left 0
	top 4px

.deContent
	width 100%
	margin-top 7px
	margin-bottom 25px
	font-size 14px
	color #2C2D33
	line-height 20px

.dataRight
    width calc(100% - 310px)

.rightBox
	width 100%
	height 300px
	margin-left 10px
	background-color #fff


.table-box
	width 100%
	margin-top 20px
	position relative
	.t
		display flex
		justify-content space-between 
		align-items center
		height 56px
		padding 0 40px
		background #6064FD
		border-radius 4px 4px 0px 0px
		color #fff
		position absolute
		width 100%
		box-sizing border-box
		top 0
		left 0
		p
			font-size 20px
			font-family MicrosoftYaHei-Bold
			font-weight bold
			span 
				font-size 16px
				color #fff
				text-decoration underline
				margin-left 26px
				font-weight 400
				cursor pointer
		ul
			display flex
			font-size 14px
			color #BDBEF8
			align-items center
			li
				margin-left 20px
				cursor pointer
			.ac 
				font-size 18px
				color #fff
.ul 
	width 100%
	overflow-y auto
	padding-top 56px
	.li 
		display flex
		align-items center
		height 32px
		box-sizing border-box		
		width auto
		p 
			width 190px
			color #fff
			font-size 14px
			display flex
			justify-content center
			align-items center
			border-right 1px solid #fff
			box-sizing border-box
			flex-shrink 0
		p+p 
			width 76px
		
	.th 
		background #B0BDFF
		p
			background #B0BDFF
			padding 6px
	i 
		cursor: pointer
		flex-shrink 0
.el-checkbox-group
	width auto
	.li
		p 
			justify-content space-between
			color font-color-black
			flex-shrink 0
			height 32px
			padding-left 6px
			.iconfont 
				font-size 10px
				color: #637CFB
				border none
		p+p 
			justify-content center
			padding 0
	.li:nth-child(even) 
		background #F3F4FE
		p
			background #F3F4FE		
	.li:nth-child(odd) 
		background #DFE1F4
		p
			background #DFE1F4
	.label
		width 100%
</style>