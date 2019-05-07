<template>
	<div class="home">
		<div class='b-t'>
			<div class='bt-content'>
				<div>
					<img src='../../public/img/logob.png'/>
					<p>云南省建筑工程材料及设备价格监测系统</p>
				</div>
				<p class='s'>进入工作台 ENTER</p>
			</div>
			<div class='bt-line'>
				<i class='cut'></i>
				<i class='light'></i>
			</div>
		</div>
		<div class='content'>
			<div class='left'>
				<left></left>
			</div>
			<div class='center'>
				<center></center>
			</div>
			<div class='right'>

			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

//import "echarts/lib/chart/line"
import left from '../components/big-left'
import center from '../components/center'
export default {
	data() {
		return {
			chart1:null
		}
	},
	components: {
		left,
		center
	},
	methods:{
		init() {
			const option = {
				title : {
					text: '未来一周气温变化',
					subtext: '纯属虚构'
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:['最高气温','最低气温']
				},
				toolbox: {
					show : true,
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false},
						magicType : {show: true, type: ['line', 'bar']},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						boundaryGap : false,
						data : ['周一','周二','周三','周四','周五','周六','周日']
					}
				],
				yAxis : [
					{
						type : 'value',
						axisLabel : {
							formatter: '{value} °C'
						}
					}
				],
				series : [
					{
						name:'最高气温',
						type:'line',
						data:[11, 11, 15, 13, 12, 13, 10],
						markPoint : {
							data : [
								{type : 'max', name: '最大值'},
								{type : 'min', name: '最小值'}
							]
						},
						markLine : {
							data : [
								{type : 'average', name: '平均值'}
							]
						}
					},
					{
						name:'最低气温',
						type:'line',
						data:[1, -2, 2, 5, 3, 2, 0],
						markPoint : {
							data : [
								{name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
							]
						},
						markLine : {
							data : [
								{type : 'average', name : '平均值'}
							]
						}
					}
				]
			};
			this.chart1 = this.$echarts.init(document.getElementById("chart1"));
			this.chart1.setOption(option);
		}
	},
	mounted() {
		// this.init()
	}
}
</script>

<style lang="stylus" scoped>
	.home 
		position fixed
		width 100%
		height 100%
		top 0
		left 0
		background url('../../public/img/bgb.png') no-repeat
		background-size 100% 100%
		font-family "MicrosoftYaHei"
	.b-t
		width 100% 
		height 120px
		position absolute
	.bt-content
		line-height 120px
		display flex
		align-items center
		justify-content space-between
		width 100%
		padding 0 82px 0 40px
		box-sizing border-box
		color #fff
		position relative
		div
			display flex
			align-items center
			font-size 32px
		img 
			width 45px
			margin-right 10px
		.s 
			font-size 20px
			color rgba(85,192,253,1)
			text-shadow 0px 0px 10px rgba(85,192,253,0.4) 
	.bt-line
		position absolute
		i 
			display block
			position absolute
		.cut
			width 100%
			height 1px
			background url('../../public/img/cutline.png') no-repeat
			background-size 100% 100%
			bottom 0
		.light
			width 277px
			height 14px
			background url('../../public/img/cutlight.png') no-repeat
			background-size 100% 100%
			left 40px
			bottom -7px
	.content 
		display flex
		width 100% 
		height 100% 
		padding 120px 80px 0 0
</style>

