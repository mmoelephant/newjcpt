<template>
    <div class='cb'>
        <p class='t'>当前展示</p>
        <div class='b'>钢材</div>
        <div class='map'>

        </div>
    </div>
</template>
<script>
import yn from '../../public/map/yunnan.json'
export default {
    created() {
        const arr = yn.features
        this.CoordMap = []
        arr.forEach(item =>{
            this.CoordMap.push({name: item.properties.name, coord:item.properties.cp})
        })
    },
    mounted() {
        this.init_map()
    },
    methods:{
        init_map() {
             this.$echarts.registerMap('yn', yn);
            const chart =  this.$echarts.init(document.getElementsByClassName('map')[0]);
            const that = this
            // const geoCoordMap = this.CoordMap
            const _this = this
            chart.setOption({
                
                series: [{
                    type: 'map',
                    top:0,
                    left:0,
                    right:0,
                    map: 'yn',
                    markPoint:{
                        data:this.CoordMap,
                        // symbol: (value,par) => {console.log(value)},//'image://https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',
                        symbolSize:30,
                        silent:true,
                        symbolOffset:['100%', '-120%']
                    },
                    aspectScale:1.1,
                    itemStyle: {
                        normal: {
                            show:true,
                            label: {
                                show: true,//默认是否显示省份名称  
                                color:'#fff',//修改字体颜色
                                fontSize:20,
                            },
                            areaColor:'rgba(0,0,0,0)',//设置背景颜色
                            areaStyle:{
                                color:'red',
                            },
                            borderWidth:2,
                            borderColor:'#43bcff',//设置边框颜色
                        },
                        emphasis: {//鼠标移入动态的时候显示的默认样式
                            show:false,
                            // label: {
                            //     show: true,//选中状态是否显示省份名称
                            //     color:'#fff',//修改字体颜色
                            //     fontSiae:'40px' 
                            // },
                            // textStyle:{
                            //     color:'red',
                            // },
                            areaColor:'rgba(0,0,0,0)',
                        },
                    },
                }],
            });
        },
    }
}
</script>
<style lang="stylus" scoped>
    .cb
        width 880px
        height 100% 
        padding-top 42px
        box-sizing border-box
        display flex
        flex-direction column
        align-items center
        .t 
            font-size 16px
            font-family MicrosoftYaHei-Bold
            font-weight bold
            color rgba(85,253,253,1)
        .b 
            width 320px
            height 52px
            line-height 52px
            text-align center
            margin-top 17px
            font-size 22px
            font-family MicrosoftYaHei-Bold
            font-weight bold
            color rgba(85,253,253,1)
            text-shadow 0px 0px 10px rgba(85,227,253,0.4)
            background url('../../public/img/sb.png') no-repeat
            background-size 100% 100%
        .map
            width 100% 
            height 100%
            div 
                width 100% 
                height 100%
</style>
