<template>
    <div class='right'>
        <div class='box'>
            <div class='tt'>
                <i></i>
                <p>检测平台数据总量</p>
                <p class='fontb'>145632148<span>条</span></p>
                
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
export default {
    computed:{
        cate() {
            return this.$store.state.bigscreen.cate_on
        }
    },
    watch:{
        cate:{
            handler(val) {
                
            },
            deep: true
        }
    },
    methods:{
        init_pie() {
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
                        value:100,
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
                                '{b|12345}'
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
                        value:55, name:'',itemStyle: { color: '#215973' }
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
                    data:[{ value:100,
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
                                '{b|45678}'
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
                        value:20, name:'',itemStyle: { color: '#215973' }
                    }]
                }]
            }
            chart.setOption(op)
        },
        init_line() {
            const chart = this.$echarts.init(document.getElementById('line'))
            const op = {
                tooltip : {
                    trigger: 'axis'
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
                    data : ['2017.01','2018.01','2018.01','2018.01','2018.01','2018.01','2018.01','2018.01'],
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
                    data:[0,10,20,10,5,2,9,2],

                },{
                    name:'环比',
                    type:'line',
                    symbol: 'none',//折线点设置为实心点
                    symbolSize: 0,   //折线点的大小
                    data:[0,22,15,20,16,2,8,0],
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
        },
        init_bar() {
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
                    data : ['昆明市','曲靖市','昭通市','玉溪市','丽江市','保山市','红河州','昆明市','曲靖市','昭通市','玉溪市','丽江市','保山市','红河州','保山市','红河州'],
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
                        interval:0
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
                    data:[15,10,20,10,5,2,9,2,15,10,20,10,5,2,9,2],
                    barWidth:14,
                    barGap:'40%'
                }]
            }
            chart.setOption(op);
        }
    },
    mounted() {
        this.init_pie()
        this.init_line()
        this.init_bar()
    }
}
</script>
<style lang="stylus" scoped>
@import '../style/px2vh.stylus'
.right
    width px2vw(480)
    padding-top 93px
    margin-left 100px
    .box
        width 100%
        height px2vh(242)
        background url('../../public/img/right.png') no-repeat
        background-size 100% 100%
        margin-bottom 20px
        overflow hidden 
        position relative
    .tt 
        display flex
        align-items center
        padding 0 px2vh(26)
        line-height px2vh(66)
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
            line-height px2vh(66)
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
        width px2vw(740)
        height px2vh(170)
        position relative
        // left -50px
</style>
