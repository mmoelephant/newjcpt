<template>
    <div style='height:100%'>
        <ul>
            <li>月度数据</li>
            <li>季度数据</li>
            <li>年度数据</li>
        </ul>
        <el-container style='height:100%;background:#F6F7FE'>
            <el-aside width="320px" style='border-radius:4px;background:#fff;margin-right:20px' class='cate'>
                <div class='title'>
                    <i></i>
                    材料选择
                </div>
                <el-tree :data="cateList" :props="defaultProps" @node-click="handleNodeClick" :indent='30'></el-tree>
            </el-aside>
            <el-container class='charts-main'>
                <div>
                    <div class='title'>
                        <i></i>
                        详细数据
                    </div>
                    <div class='tooltip'>
                        <div class='left'>
                            <div class='tab'>
                                <p :class='chosed_tab ==0?"active":""' @click='chosed_tab=0'>
                                    地区对比
                                </p>
                                <p :class='chosed_tab ==1?"active":""' @click='chosed_tab=1'>
                                    材料对比
                                </p>
                            </div>
                            <div class='switch'>
                                <span>图表</span>
                                <el-switch
                                    v-model="showcharts"
                                    active-color="#7F94FF"
                                    inactive-color="#E8EBF7">
                                </el-switch>
                            </div>
                        </div>
                        <div class='timer'>
                            <span>时间</span>
                            <el-select v-model="time" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>  
                    <div class='table-box'>
                        <div class='t'>
                            <p>云南省材料价格对比</p>
                            <ul>
                                <li :class='chosed_type=="price"? "ac" :""' @click='chosed_type="price"'>价格</li>
                                <li :class='chosed_type=="zs"? "ac" :""' @click='chosed_type="zs"'>指数</li>
                                <li :class='chosed_type=="tb"? "ac" :""' @click='chosed_type="tb"'>同比</li>
                                <li :class='chosed_type=="hb"? "ac" :""' @click='chosed_type="hb"'>环比</li>
                            </ul>
                        </div>
                        <ul>
                            <li class='th'>
                                <p>材料</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                                <p>2019.01</p>
                            </li>
                            <li v-for='(i,index) in [1,1,1,1,1,1,1]' :key='index'>
                                <p>
                                    <span>钢材</span>
                                    <i class='iconfont icon-shang-copy' @click='chose_area(i)'></i>
                                </p>
                                <p>543.03</p>
                                <p>543.03</p>
                                <p>543.03</p>
                                <p>543.03</p>
                                <p>543.03</p>
                                <p>543.03</p>
                                <p>543.03</p>
                                <p>543.03</p>
                                <p>543.03</p>
                                <p>543.03</p>
                                <p>543.03</p>
                                <p>543.03</p>
                                <p>543.03</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class='ch'>
                    <h1>云南省材料价格对比柱状图</h1>
                    <div class='tool'>
                        <ul>
                            <li>
                                <i class='iconfont icon-zhuzhuangtu'></i>
                            </li>
                            <li>
                                <i class='iconfont icon-zhexian'></i>
                            </li>
                            <li>
                                <i class='iconfont icon-zhuzhuangzhexian'></i>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                收起图表
                            </li>
                            <li @click='saveImg'>
                                <i class='iconfont icon-xiazai'></i>
                                下载
                            </li>
                        </ul>
                    </div>
                    <div id ='main'>

                    </div>
                </div>

            </el-container>
        </el-container>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
        return {
            cateList: [{
                    id: "1",
                    name: "钢材",
                    pid: "0",
                    sort: "1",
                    childrenList: [{
                            id: "11",
                            name: "钢筋",
                            pid: "1",
                            sort: "1"
                        },
                        {
                            id: "12",
                            name: "钢板",
                            pid: "1",
                            sort: "2"
                        },
                        {
                            id: "13",
                            name: "钢管",
                            pid: "1",
                            sort: "3"
                        },
                        {
                            id: "14",
                            name: "型钢",
                            pid: "1",
                            sort: "3"
                        },
                        {
                            id: "15",
                            name: "钢绞线",
                            pid: "1",
                            sort: "3"
                        },
                        {
                            id: "16",
                            name: "钢丝绳",
                            pid: "1",
                            sort: "3"
                        },
                    ]
                },
                {
                    id: "3",
                    name: "地区材料",
                    pid: "0",
                    sort: "2",
                    childrenList: [{
                            id: "31",
                            name: "钢筋水泥",
                            pid: "3",
                            sort: "1"
                        },
                        {
                            id: "32",
                            name: "砌体材料",
                            pid: "3",
                            sort: "2"
                        },
                        {
                            id: "33",
                            name: "建筑用砂",
                            pid: "3",
                            sort: "3"
                        },
                            {
                            id: "34",
                            name: "建筑用石",
                            pid: "3",
                            sort: "3"
                        },
                            {
                            id: "35",
                            name: "轻骨料",
                            pid: "3",
                            sort: "3"
                        },
                            {
                            id: "36",
                            name: "地基用材",
                            pid: "3",
                            sort: "3"
                        },
                            {
                            id: "37",
                            name: "混凝土",
                            pid: "3",
                            sort: "3"
                        },
                            {
                            id: "38",
                            name: "建筑砂浆",
                            pid: "3",
                            sort: "3"
                        },
                    ]
                },
                {
                    id: "4",
                    name: "电线电缆及光纤光缆",
                    pid: "0",
                    sort: "3",
                    childrenList: [{
                            id: "41",
                            name: "电力电缆",
                            pid: "4",
                            sort: "1"
                        },
                        {
                            id: "42",
                            name: "电气装备用电",
                            pid: "4",
                            sort: "2"
                        },
                        {
                            id: "43",
                            name: "其他电气材料",
                            pid: "4",
                            sort: "3"
                        },
                    ]
                },
                {
                    id: "5",
                    name: "管材",
                    pid: "0",
                    sort: "4",
                    childrenList: [{
                            id: "51",
                            name: "非金属管",
                            pid: "5",
                            sort: "1"
                        },
                        {
                            id: "52",
                            name: "复合管",
                            pid: "5",
                            sort: "2"
                        },
                        {
                            id: "53",
                            name: "金属管",
                            pid: "5",
                            sort: "3"
                        },
                    ]
                },
                {
                    id: "6",
                    name: "防水材料",
                    pid: "0",
                    sort: "5",
                    childrenList: [{
                            id: "61",
                            name: "防水卷材",
                            pid: "6",
                            sort: "1"
                        },
                        {
                            id: "62",
                            name: "防水涂料",
                            pid: "6",
                            sort: "2"
                        },
                        {
                            id: "63",
                            name: "防水砂浆",
                            pid: "6",
                            sort: "3"
                        },
                    ]
                },
                {
                    id: "7",
                    name: "建筑玻璃",
                    pid: "0",
                    sort: "6",
                    childrenList: [{
                            id: "71",
                            name: "特种琉璃",
                            pid: "7",
                            sort: "1"
                    },
                    ]
                },
                {
                    id: "31",
                    name: "混凝土预制件",
                    pid: "0",
                    sort: "7",
                    childrenList: [{
                        id: "81",
                        name: "混凝土管",
                        pid: "31",
                        sort: "1"
                    },
                    {
                        id: "82",
                        name: "混凝土预制桩",
                        pid: "31",
                        sort: "2"
                    },
                ]}
            ],
            defaultProps: {
                children: 'childrenList',
                label: 'name'
            },
            chosed_id:1,
            showcharts:false,
            chosed_tab:0,
            options:[{
                value:13,
                label: '近13个月'
            }],
            time:'',
            chosed_type:'price'
        }
    },
    watch:{
        chosed_id(val) {
            // console.log(val)
        }
    },  
    mounted() {
        this.init()
    },
    methods:{
        handleNodeClick(data) {
            console.log(data)
        },
        init() {
            const option = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['蒸发量','降水量'],
                    bottom:0
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {
                            show: true,
                            icon: ''
                        },
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {
                            show: true,
                            icon: ''
                        }
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'蒸发量',
                        type:'bar',
                        data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
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
                        name:'降水量',
                        type:'bar',
                        data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                        markPoint : {
                            data : [
                                {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                                {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name : '平均值'}
                            ]
                        }
                    }
                ]
            }
            const mycharts = this.$echarts.init(document.getElementById('main'))
            mycharts.setOption(option)
        },
        saveImg() {
            var canvasData = $('#main').children('div').children('canvas');
            console.log($('#main').children())
            var a = document.createElement("a");
            a.href = canvasData[0].toDataURL();;
            a.download = "图表";
            a.click();
        },
        chose_area(item) {

        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../style/color.stylus'
.title 
    display flex
    font-size 16px
    color #7F94FF
    margin-bottom 30px
    i 
        display block
        width 4px
        height 22px
        background #7F94FF
        margin-right 9px
.cate
    box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
    border-radius 8px
    padding 20px
    .cate-list 
        height auto
        .active
            height auto
            div
                background #7F94FF
                color #fff  
            .iconfont:before
                display inline-block
                transform rotate(90deg)
                color #fff
                
        .active2
            background #7F94FF
            p
                color #fff  
    .level1
        height 28px
        transition .3s
        overflow hidden
        line-height 28px
        font-size 16px
        color font-color-black
        cursor pointer
        .iconfont
            font-size 10px
            color main-color
            margin-right 6px
            margin-left 13px
        .iconfont:before 
            transform rotate(0deg)
            transition .3s            
        .level2 
            font-size 14px
            color font-color-light-b
            p
                margin-left 50px
.charts-main
    min-height 100%
    width 100%
    margin-left 20px
    
    border-radius 8px    
    
    flex-direction column
    .table-box
        width 100%
        overflow-x scroll
        margin-top 20px
        .t
            display flex
            justify-content space-between 
            align-items center
            height 56px
            padding 0 40px
            background #6064FD
            border-radius 4px 4px 0px 0px
            color #fff
            p
                font-size 20px
                font-family MicrosoftYaHei-Bold
                font-weight bold
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
        >ul
            li
                display flex
                align-items center
                height 32px
                box-sizing border-box
                padding 6px
                p
                    width 190px
                    color #fff
                    font-size 14px
                    display flex
                    justify-content center 
                    align-items center
                    border-right 1px solid #fff
                    box-sizing border-box
                p+p 
                    width 76px
            li+li
                p
                   justify-content space-around 
                   color font-color-black
                   .iconfont
                       font-size 10px
                       color #637CFB
                    border none
                p+p
                    justify-content center

            li:nth-child(even)
                background #F3F4FE
            li:nth-child(odd)
                background #DFE1F4
            li:nth-child(1)
                background #B0BDFF
            i
                cursor pointer
                
                    

    >div
        width 100%
        background #fff
        box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
        padding 20px
        box-sizing border-box 
        // min-height 100%
        max-height auto
        height auto
        margin-bottom 20px
    .tooltip 
        display flex
        justify-content space-between
        align-items center
        
        .left , .tab
            display flex
            align-items center
        .tab
            margin-right 48px
            p
                width 80px
                height 32px
                background #fff
                border-radius 4px 0px 0px 4px
                line-height 32px
                text-align center
                color font-color-grey
                font-size 12px
                border 1px solid #D6D9E2
                cursor pointer
            p+p 
                border-radius 0px 4px 4px 0px
            .active 
                background #7F94FF
                border 1px solid #7F94FF
                color #fff
        .switch,.timer
            span 
                font-size 14px
                color font-color-light-b
                margin-right 10px
            .el-input__inner
                height 38px
    
    .ch 
        h1 
            width 300px
            line-height 48px
            margin 64px auto 28px auto
            font-size 20px
            font-family MicrosoftYaHei-Bold
            font-weight bold
            color #fff  
            background main-color
            border 1px solid rgba(108,125,255,1)
            box-shadow 0px 8px 14px 0px rgba(39,30,237,0.14)
            border-radius 24px
            text-align center
        #main 
            width 100%
            height 750px
        .tool
            display flex
            justify-content space-between
            align-items center
            ul 
                display flex
                align-items center
                li
                    width 50px
                    height 50px
                    background #FB6371
                    box-shadow 0px 6px 6px 0px rgba(251,99,113,0.24)
                    border-radius 50%
                    text-align center
                    color #fff
                    line-height 50px
                    margin-right 20px
                    cursor pointer
                    .iconfont 
                        font-size 26px
                li+li
                    background #7F94FF
                    box-shadow 0px 6px 6px 0px rgba(127,148,255,0.24)
            ul+ul
                li
                    width 100px
                    height 28px
                    border 1px solid rgba(108,125,255,1)
                    border-radius 14px
                    font-size:14px
                    color #7F94FF
                    background #fff
                    box-shadow none
                    line-height 28px
                li+li
                    color #fff
                    background #637CFB
                    .iconfont 
                        font-size 16px
</style>
