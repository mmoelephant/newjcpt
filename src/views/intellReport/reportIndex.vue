<template>
    <div class="intellReport">
		<div class="reportBtns">
			<div :class="type == 0?'btnClass btnActive':'btnClass'" @click="choose(0)"><span :class="type == 0?'dotClass dotActive':'dotClass'"></span>全部报告</div>
			<div :class="type == 1?'btnClass btnActive':'btnClass'" @click="choose(1)"><span :class="type == 1?'dotClass dotActive':'dotClass'"></span>平台发布</div>
			<div :class="type == 2?'btnClass btnActive':'btnClass'" @click="choose(2)"><span :class="type == 2?'dotClass dotActive':'dotClass'"></span>我的报告</div>
		</div>
		<div class="reportContent">
			<ul>
				<li v-for="(item,index) in reportList" v-bind:key="index"></li>
			</ul>
		</div>
    </div>
</template>
<script>
export default {
	data() {
		return {
			reportList:[],
			// type的值为是全部报告还是平台报告或者其他
			type:0,
			pageNum:1,
			pageSize:21
		}
	},
	methods:{
		choose:function(status){
			if(status == 0) {
				//先重置pageNum 再获取全部的报告列表
				//this.reportList = value
				this.type = 0

			} else if(status == 1) {
				// 获取平台报告
				this.type = 1

			} else {
				//获取我的报告
				this.type = 2
			}
		},

		get_data() {
			const data = {
				pageNum:this.pageNum,
				pageSize: this.pageSize,
				type:this.type
			}
			//请求, 赋值reportList，因为需要有默认列表
		}
	}
}
</script>

<style lang="stylus">
.intellReport 
	width 100%
	height 100%
	// border 1px red solid
	// box-sizing border-box

.reportContent 
	width 100%
	padding 30px 20px
	// border 1px green solid 
	// box-sizing border-box

.reportContent ul
	display flex
	flex-direction row
	flex-wrap wrap
	justify-content flex-start

.reportContent ul li
	width 200px
	height 240px
	background-color #ffffff
	box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
    border-radius 8px
	margin-left 20px

</style>


