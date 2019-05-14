<template>
<div class="dataDetail">
    <div class="reportBtns navigi">
        <div class="btnClass1 btnClass"><span class="dotClass dotClass1"></span>数据订阅  > <span class="navigiOn">订阅详情</span></div>
        <a href="javascript:void(0)" class="goBackBtn">返回</a>
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
					<div class="table-box">
					
					</div>
				</div>
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
			token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwOTdmMGRkOWUyMjc0Y2NmYjc2ZjRmYWMxNDQxNjMzOSIsImV4cCI6MTU1Nzg4NjMyNywibmJmIjoxNTU3Nzk5OTI3fQ.4BO9dVg1EflfTjjhkyaove_lngXE4OCHhgNVdCVfW3Y',
			subDetail:[],
			subInfoName:'',
			subInfoTime:'',
			subInforegion:'',
			subInfomateri:'',
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
			this.subInforegion = v.data.areaNameList.toString()
			this.subInfomateri = v.data.maName
		})
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
</style>