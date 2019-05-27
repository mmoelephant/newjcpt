<template>
    <div class='right'>
        <div class='box'>
            <div class='tt'>
                <i></i>
                <p>监测平台数据总量</p>
                <p class='fontb'>{{all}}<span>条</span></p>
                
            </div>
            <div id='pie'>

            </div>
        </div>
        <div class='box'>
            <div class='tt'>
                <i></i>
                <p>{{cate.name}}价格环比/同比</p>
            </div>
            <div id='line'>

            </div>
        </div>
        <div class='box'>
            <div class='tt'>
                <i></i>
                <p>{{cate.name}}价格指数对比</p>
            </div>
            <div id='bar'>

            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
        return {
            area:[{"id":"530100000000","name":"昆明","level":"2","pid":"53","geocode":"102.832891,24.880095"},{"id":"530300000000","name":"曲靖","level":"2","pid":"53","geocode":"103.796167,25.489999"},{"id":"530400000000","name":"玉溪","level":"2","pid":"53","geocode":"102.546543,24.352036"},{"id":"530500000000","name":"保山","level":"2","pid":"53","geocode":"99.161761,25.112046"},{"id":"530600000000","name":"昭通","level":"2","pid":"53","geocode":"103.717465,27.338257"},{"id":"530700000000","name":"丽江","level":"2","pid":"53","geocode":"100.227750,26.855047"},{"id":"530800000000","name":"普洱","level":"2","pid":"53","geocode":"100.966512,22.825065"},{"id":"530900000000","name":"临沧","level":"2","pid":"53","geocode":"100.079583,23.877573"},{"id":"532300000000","name":"楚雄","level":"2","pid":"53","geocode":"101.528068,25.045532"},{"id":"532500000000","name":"红河","level":"2","pid":"53","geocode":"103.374799,23.363130"},{"id":"532600000000","name":"文山","level":"2","pid":"53","geocode":"104.216248,23.400733"},{"id":"532800000000","name":"西双版纳","level":"2","pid":"53","geocode":"100.797777,22.007351"},{"id":"532900000000","name":"大理","level":"2","pid":"53","geocode":"100.267638,25.606486"},{"id":"533100000000","name":"德宏","level":"2","pid":"53","geocode":"98.584895,24.433353"},{"id":"533300000000","name":"怒江","level":"2","pid":"53","geocode":"98.853097,25.852547"},{"id":"533400000000","name":"迪庆","level":"2","pid":"53","geocode":"99.702234,27.818882"}],
            all:0
        }
    },
    computed:{
        cate() {
            return this.$store.state.bigscreen.cate_on
        }
    },
    watch:{
        cate:{
            handler(val) {
                if(val.lineData) {
                    this.init_line(val.lineData)
                } else {
                    this.get_line_data()
                    
                }
                if(val.barData) {
                    this.init_bar(val.barData)
                } else {
                    this.get_bar_data()
                }
                if(val.pieData) {
                    this.init_pie(val.pieData)
                }else {
                    this.get_pie_data()
                }
            },
            deep: true
		},
    },
    methods:{
        async get_line_data() {
            const data = {
                id:this.cate.cid,
				monthNumber:12,
				area:"53"
            }
            const res = await this.$api.get_bg_line(data)
			let cate_list = this.$store.state.bigscreen.cate_list
			cate_list.forEach(item => {
				if(item.cid == this.cate.cid) {
					item.lineData = res.data.data
				}
            })
            this.init_line(res.data.data)
			this.$store.commit('bigscreen/SET_CATE_LIST', cate_list)
        },
        async get_bar_data() {
            const data = {
                id:this.cate.cid,
                monthNumber:1,
            }
            const res = await this.$api.get_bg_line(data)
			let cate_list = this.$store.state.bigscreen.cate_list
			cate_list.forEach(item => {
				if(item.cid == this.cate.cid) {
					item.barData = res.data.data
				}
            })
            this.init_bar(res.data.data)
			this.$store.commit('bigscreen/SET_CATE_LIST', cate_list)
        },
        async get_pie_data() {
            const data = {
                mid:this.cate.cid,
				area:'53',
            }
            const res = await this.$api.get_bg_pie(data)
            let cate_list = this.$store.state.bigscreen.cate_list
			cate_list.forEach(item => {
				if(item.cid == this.cate.cid) {
					item.pieData = res.data.data
				}
            })
            if(!this.all||this.all==0) {
                this.all = res.data.data.all.count
            }
            this.init_pie(res.data.data)
			this.$store.commit('bigscreen/SET_CATE_LIST', cate_list)
        },
        init_pie(data) {
            // const all = data.other.count + data.km.count
            // console.log(all,'123132132')
            const chart = this.$echarts.init(document.getElementById('pie'))
            const op = {
                color:['#ffaf25', '#215973'],
                series: [{
                    // 设置成相对的百分比
                    center: ['25%', '50%'],
                    name:'昆明',
                    type:'pie',
                    radius: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                            }
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[{ 
                        value:data.km.count,
                        name:'昆明',
                        itemStyle: {
                            normal: {
                                color: '#25ff8c',
                                shadowColor: 'rgba(37, 255, 140, 1)',
                                shadowBlur: 20
                            },
                        },
                        label:{
                            formatter: [
                                '{a|昆明}',
                                '{b|'+data.km.count+'}'
                            ].join('\n'),

                            rich: {
                                a: {
                                    color: '#fff',
                                    fontSize: '14',
                                    lineHeight:'34'
                                },
                                b: {
                                    color: '#25ff8c',
                                    fontSize: '14'
                                },
                            }
                        }
                    },{
                        value:data.other.count, name:'',itemStyle: { color: '#215973' }
                    }]
                    },{
                    center: ['75%', '50%'],
                    name:this.cate.name,
                    type:'pie',
                    radius: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[{ value:data.other.count,
                        name:this.cate.name,
                        itemStyle: {
                            normal: {
                                color: '#ffaf25',
                                shadowColor: 'rgba(255, 175, 37, 1)',
                                shadowBlur: 20
                            },
                        },
                        label:{
                            formatter: [
                                '{a|'+this.cate.name+'}',
                                '{b|'+data.other.count+'}'
                            ].join('\n'),
                            rich: {
                                a: {
                                    color: '#fff',
                                    fontSize: '14',
                                    lineHeight:'34'
                                },
                                b: {
                                    color: '#FFAF25',
                                    fontSize: '14'
                                },
                            }
                        }
                    },{
                        value:data.km.count, name:'',itemStyle: { color: '#215973' }
                    }]
                }]
            }
            chart.setOption(op)
        },
        init_line(data) {
            let x=[],tb=[],hb=[]
            data.map(item =>{
                x.push(item.asmdate.substr(0,7))
                tb.push(item.tongbi*100)
                hb.push(item.huanbi*100)
            })
            const chart = this.$echarts.init(document.getElementById('line'))
            const op = {
                tooltip : {
                    trigger: 'axis',
                    formatter:'{b0}:{c0}同比%<br />{b1}:环比{c1}%'
                },
                grid:{
                    bottom:42,
                    left:55,
                    top:10
                },
                calculable : true,
                legend:{
                    data:[{name:'环比', icon:'rect'},
                        {name:'同比',icon:'rect'}],
                    itemHeight:2,
                    itemWidth:10,
                    textStyle:{
                        color : '#fff',
                        fontSize:10
                    },
                    left:200
                },
                xAxis : [{
                    type : 'category',
                    data : x,//['2017.01','2018.01','2018.01','2018.01','2018.01','2018.01','2018.01','2018.01'],
                    /*echarts 隐藏x轴横线*/
                    axisLine: {
                    show: false
                    },
                    /*去除刻度线*/
                    splitLine:{
                        show:false
                    },
                    axisLabel:{
                        color: '#fff', fontSize:10
                    },
                }],
                yAxis : [{
                    type : 'value',
                    min: function(value) {
                        return Math.floor(value.min);
                    },
                    minInterval: 0,
                    /*显示y轴段数*/
                    splitNumber:4,
                    /*echarts 隐藏Y轴横线*/
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false, // 网格线是否显示
                    },

                    /*去除刻度线*/
                    axisTick:{
                        show:false
                    },
                    axisLabel:{
                        show: true,
                        formatter: '{value} %',
                        color: '#55D7FD', fontSize:10
                    },
                }],
                series : [{
                    name:'同比',
                    symbol: 'none',//折线点设置为实心点circle   去掉折线图的折点圆圈 none
                    symbolSize: 0,   //折线点的大小
                    type:'line',
                    itemStyle: {
                        normal: {
                            color: "#2C54FF",//折线点的颜色
                            lineStyle: {
                                color: "#2C54FF",//折线的颜色
                                shadowColor: '#516EFF',
                                shadowBlur: 10
                            }
                        },
                        
                    },
                    data:tb,

                },{
                    name:'环比',
                    type:'line',
                    symbol: 'none',//折线点设置为实心点
                    symbolSize: 0,   //折线点的大小
                    data:hb,
                    itemStyle: {
                        normal: {
                            color: "#00FFB4",//折线点的颜色
                            lineStyle: {
                                color: "#00FFB4",//折线的颜色
                                shadowColor: '#51FFC4',
                                shadowBlur: 10
                            }
                        }
                    },
                }]
            }
            chart.setOption(op)
            this.$nextTick(() => {
                this.scroll_line()
            })
        },
        init_bar(data) {
            let x = [],y=[]
            data.filter(item => {
                this.area.forEach(a => {
                    if(a.id==item.area) {
                        item.city = a.name
                    }
                })
                x.push(item.city)
                y.push(item.exponent)
            })
            const chart = this.$echarts.init(document.getElementById('bar'))
            const op ={
                tooltip : {
                    trigger: 'axis'
                },
                grid:{
                    bottom:42,
                    left:55,
                    top:10
                },
                calculable : true,
                xAxis : [
                {
                    type : 'category',
                    data : x,//['昆明市','曲靖市','昭通市','玉溪市','丽江市','保山市','红河州','昆明市','曲靖市','昭通市','玉溪市','丽江市','保山市','红河州','保山市','红河州'],
                    /*echarts 隐藏x轴横线*/
                    axisLine: {
                    show: false
                    },
                    /*去除刻度线*/
                    splitLine:{
                    show:false
                    },
                    axisLabel:{
                        color: '#fff', 
                        fontSize:10,
                        interval:0,
                        rotate:60
                    },
                }
                ],
                yAxis : [
                {
                    type : 'value',
                    min: function(value) {
                        return Math.floor(value.min);
                    },
                    minInterval: 0,
                    /*显示y轴段数*/
                    splitNumber:4,
                    /*echarts 隐藏Y轴横线*/
                    axisLine: {
                    show: false
                    },
                    //这行代码控制着坐标轴x轴的文字是否显示
                    splitLine: {
                    show: false, // 网格线是否显示
                    /*lineStyle: {
                        color: 'red' // 修改网格线颜色
                    },*/
                    },

                    /*去除刻度线*/
                    axisTick:{
                    show:false
                    },
                    axisLabel:{
                        show: true,
                        color: '#55D7FD', fontSize:10
                    },
                }
                ],
                series : [
                {
                    symbol: 'none',//折线点设置为实心点circle   去掉折线图的折点圆圈 none
                    symbolSize: 0,   //折线点的大小
                    type:'bar',
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#38effd'
                            }, {
                            offset: 1,
                            color: '#005fe2'
                            }]),
                            lineStyle: {
                            color: "#02e1a2"//折线的颜色
                            }
                        }
                    },
                    data:y,
                    barMaxWidth:14,
                    barGap:'40%'
                }]
            }
            chart.setOption(op);
            this.$nextTick(() => {
                this.scroll_bar()
            })
        },
        scroll_line() {
            const box = $('.box')
            const content = $('#line div')
           
            const offW = content.width()-box.width()
            content.animate({"left":"-"+offW+"px"}, 5000,function() {
				content.animate({"left":0}, 2000, function() {

                })
            })
        },
        scroll_bar() {
            const box = $('.box')
            const content = $('#bar div')
           
            const offW = content.width()-box.width()
            content.animate({"left":"-"+offW+"px"}, 5000,function() {
				content.animate({"left":0}, 2000, function() {
                    
                })
            })
        }
    },
    mounted() {
        
    }
}
</script>
<style lang="stylus" scoped>
@import '../style/px2vh.stylus'
.right
    width px2vw(500)
    padding-top px2vh(88)
    margin-left 100px
    height 100%
    display flex
    flex-direction column
    justify-content space-between
    box-sizing border-box
    .box
        width 100%
        height 33%
        background url('../../public/img/right.png') no-repeat
        background-size 100% 100%
        margin-bottom 20px
        overflow hidden 
        position relative
    .tt 
        display flex
        align-items center
        padding 0 px2vh(26)
        height px2vh(66)
        i 
            display block
            width 8px
            height 8px
            border 2px solid rgba(85,253,253,1)
            border-radius 50%
            margin-right 4px
        p  
            font-size px2vw(18)
            font-family MicrosoftYaHei-Bold
            font-weight bold
            color #fff
            // line-height px2vh(66)
        .fontb
            font-size px2vw(32)
            font-weight bold
            color rgba(85,215,253,1)
            margin-left px2vw(76)
            span 
                font-size 16px
                font-family:MicrosoftYaHei
                font-weight 400
    #pie
        width 100%
        height px2vh(170)
    #line,#bar
        width 100%
        height px2vh(170)
        // position relative
        // left -50px
</style>
