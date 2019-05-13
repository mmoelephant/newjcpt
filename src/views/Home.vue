<template>
	<div class="home">
		<div>
			<div>
				<img src='../../public/img/logob.png'/>
				<p>云南省建筑工程材料及设备价格监测系统</p>
			</div>
			<p>进入工作台 ENTER</p>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

//import "echarts/lib/chart/line"
export default {
	data() {
		return {
			chart1:null
		}
	},
	components: {
		
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
</style>

