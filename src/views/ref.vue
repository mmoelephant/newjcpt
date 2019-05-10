<template>
    <div style='height:100%'>
        <div class="reportBtns">
			<div :class="timetype == 0?'btnClass btnActive':'btnClass'" @click="timetype = 0"><span :class="timetype == 0?'dotClass dotActive':'dotClass'"></span>月度数据</div>
			<div :class="timetype == 1?'btnClass btnActive':'btnClass'" @click="timetype = 1"><span :class="timetype == 1?'dotClass dotActive':'dotClass'"></span>季度数据</div>
			<div :class="timetype == 2?'btnClass btnActive':'btnClass'" @click="timetype = 2"><span :class="timetype == 2?'dotClass dotActive':'dotClass'"></span>年度数据</div>
		</div>
        <el-container style='height:100%;background:#F6F7FE;padding:88px 20px 40px 20px;box-sizing:border-box'>
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
                            <el-select v-model="time" placeholder="请选择" v-show='timetype==0'>
                                <el-option
                                v-for="item in monthoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="time" placeholder="请选择" v-show='timetype==1'>
                                <el-option
                                v-for="item in seasonoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="time" placeholder="请选择" v-show='timetype==2'>
                                <el-option
                                v-for="item in yearoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>  
                    <div class='table-box'>
                        <div class='t'>
                            <p v-if='chosed_tab==0'>{{chosed_cate.name}}地区数据表
                                <span v-if='isnext' @click='back'>返回 ></span>
                            </p>
                            <p v-if='chosed_tab==1'>云南省材料价格对比
                                <span v-if='isnext' @click='back'>返回 ></span>
                            </p>
                            <ul>
                                <li :class='chosed_type=="price"? "ac" :""' @click='chosed_type="price"'>价格</li>
                                <li :class='chosed_type=="zs"? "ac" :""' @click='chosed_type="zs"'>指数</li>
                                <li :class='chosed_type=="tb"? "ac" :""' @click='chosed_type="tb"'>同比</li>
                                <li :class='chosed_type=="hb"? "ac" :""' @click='chosed_type="hb"'>环比</li>
                            </ul>
                        </div>
                        <reftable :tabledata='tabledata' 
                            :type='chosed_tab' 
                            :t_type='chosed_type'
                            @checkList='checkList' 
                            @choseitem='choseitem'
                            :isnext='isnext'></reftable>
                        <page-btn :disabled="disablepage" @pagechange='pagechange'></page-btn>
                    </div>
                </div>
                <div class='ch' v-show ='showcharts'>
                    <h1>云南省材料价格对比柱状图</h1>
                    <div class='tool'>
                        <ul>
                            <li @click='init'>
                                <i class='iconfont icon-zhuzhuangtu'></i>
                            </li>
                            <li @click='init_line'>
                                <i class='iconfont icon-zhexian'></i>
                            </li>
                            <li @click='init_barline'>
                                <i class='iconfont icon-zhuzhuangzhexian'></i>
                            </li>
                        </ul>
                        <ul>
                            <li @click='showcharts=false'>
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
import reftable from '../components/ref-table'
import pageBtn from '../components/page-btn'
export default {
    data() {
        return {
            cateList: [],//分类列表 左侧树状图
            defaultProps: {
                children: 'childrenList',
                label: 'name'
            },
            chosed_cate:{
                // id:1,
                // name:'钢材'
            },//选中的分类
            showcharts:false,//是否展示图
            chosed_tab:0,//选择表格展示类型 0：区域比较 1：材料比较
            monthoptions:[{ //月度时间控件
                value:13,
                label: '近13个月'
            }],
            seasonoptions:[{//季度时间控件
                value:9,
                label: '近3个季度'
            },
            {
                value:18,
                label: '近6个季度'
            }],
            yearoptions:[{//年度时间控件
                value:2018,
                label: '2018年'
            },
            {
                value:2019,
                label: '2019年'
            }],
            time:'',//选取的时间
            chosed_type:'price',//表格内容展示筛选 price:价格 zs：指数 tb：同比 hb：环比
            timetype:0,//时间类型 0：月度 1：季度 2：年度
            tabledata:[],//表格数据 
            chosed_area:{
                area:53
            }, // 选择的区域code 默认云南省
            disablepage:-1, //传给分页组件的判定哪个按钮禁用 -1:左按钮 1：右按钮 0：不禁用 2:都禁用
            isnext:false,//是否是子表格
            checked:[],//选中作为图渲染的数据
        }
    },
    created() {       
        this.get_cate()
    },
    components:{
        reftable,
        pageBtn
    },
    watch:{
        timetype(type) {
            console.log(123132)
            if(type==0) {
                this.time = this.monthoptions[0].value
                
            } else if(type==1) {
                this.time = this.seasonoptions[0].value
                
            } else {
                this.time = this.yearoptions[0].value
                
            }
            this.chosed_tab =0
        },
        time(val) {
            if(this.chosed_tab == 0) {
                this.get_area_data()
            } else {
                this.get_cate_data()
            }
        },
        showcharts(val){
            if(val) {
                this.$nextTick(() =>{
                    this.init()
                })
            }
            
        } 
    },  
    methods:{
        back() {
            this.isnext = false
            if(this.chosed_tab ==0) {
                this.chosed_area = {
                    area:53
                }
                this.get_area_data()
            } else {
                this.get_cate_data()
            }
        },
        formateTime() {
            const now =  new Date()
            let month = now.getMonth()
            let exmonth,exyear
            const y= now.getFullYear()
            switch (this.time) {
                case 13:
                    exmonth = month+12-13+1
                    exmonth = exmonth>9?exmonth:'0'+exmonth
                    month = month>9?month:'0'+month
                    return [(y-1)+'-'+exmonth,y+'-'+month]
                    break;
                case 9:
                    if(month>=9) {
                        exmonth= month-9+1
                        exyear=y
                    } else {
                        exmonth = month+12-9+1
                        exyear=y-1
                    }                     
                    exmonth = exmonth>9?exmonth:'0'+exmonth
                    month = month>9?month:'0'+month
                    return [exyear+'-'+exmonth,y+'-'+month]
                    break;
                case 18:
                    if(month>=6) {
                        exmonth= month+12-18+1
                        exyear=y-1
                    } else {
                        exmonth = month+24-18+1
                        exyear=y-2
                    }                     
                    exmonth = exmonth>9?exmonth:'0'+exmonth
                    month = month>9?month:'0'+month
                    return [exyear+'-'+exmonth,y+'-'+month]
                    break;
                case 2018:
                    return['2018-01','2018-12']
                    break;
                case 2019:
                    return['2019-01','2019-12']
                    break;
            }
        },
        async get_cate() { //获取分类列表 左侧树渲染
            const res = await this.$api.get_cate({})
            this.cateList = res.data
            this.chosed_cate = this.cateList[0]
            this.time = this.monthoptions[0].value
        },
        async get_area_data() {// 获取区域的数据
            this.tabledata =[]
            const t_arr=this.formateTime()
            const data = {
                id:this.chosed_cate.id,//选择的材料
				startDate:t_arr[0],//时间区间
                endDate:t_arr[1],
                area:this.chosed_area.area
            }
            const res = await this.$api.get_area_time_list(data)
            let keys = Object.keys(res.data.data)
            keys.forEach(key => {
                this.tabledata.push(res.data.data[key])
            })
            if(this.showcharts) { //如果展示图表  渲染
                this.init()
            }
        },
        async get_cate_data() { //获取材料的数据 目前只获取全省的材料的数据
            this.tabledata = []
            const t_arr=this.formateTime()
            const data = {
                // area:53,//this.chosed_area,//选择的地区,目前只有全省
                pid:this.isnext?this.chosed_cate.mid:0,//选中的材料id
                startDate:t_arr[0],//时间区间
                endDate:t_arr[1]
            }
            const res = await this.$api.get_cate_time_list(data)
            let keys = Object.keys(res.data.data)
            keys.forEach(key => {
                this.tabledata.push(res.data.data[key])
            })
            if(this.showcharts) {
                this.init()
            }
        },
        handleNodeClick(data) { //选择材料
            if(this.chosed_tab ==0) { //获取区域
                this.chosed_cate = data
                this.chosed_name = data.name
                this.get_area_data()
            } else {
                this.chosed_cate = data
                this.get_cate_data()
            }
        },
        async init() {
            let x=[],y=[],arr=[],legend=[]
            if(this.checked && this.checked.length >0) {
                this.checked.map(item => {
                    let data =[]
                    if(x.length<item.length) {
                        x=[]
                        item.map(t => {                       
                            x.push(t.mdate.substr(0,7))
                        })
                        
                    }
                    item.map(t=> {
                        data.push(t.price) 
                    })
                    legend.push(item[0].area_name)
                    y.push({data:data,type:'bar',name:item[0].area_name})
                })
            } else {// 获取全省的材料数据 用于初始化图表
                const t_arr=this.formateTime()
                const data = {
                    id:this.chosed_cate.id,//选中的材料id
                    startDate:t_arr[0],//时间区间
                    endDate:t_arr[1]
                }
                const res = await this.$api.get_yn_time_list(data)
                let keys = Object.keys(res.data.data)
                arr = res.data.data[keys[0]]
                y.push({
                    data:[],
                    type:'bar'
                })
                arr.forEach(item => {
                    x.push(item.mdate.substr(0,7))
                    y[0].data.push(item.price)
                })
                legend=['全省']
            }          
            const option = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:legend,
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
                        data : x
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series :y
            }
            const mycharts = this.$echarts.init(document.getElementById('main'))
            mycharts.setOption(option)
        },
        init_line() {

        },
        init_barline() {

        },
        saveImg() {
            var canvasData = $('#main').children('div').children('canvas')
            var a = document.createElement("a")
            a.href = canvasData[0].toDataURL()
            a.download = "图表"
            a.click()
        },
        checkList(val) {
            this.checked = val
            if(this.showcharts) {
                this.init()
            }
            //根据获取到的list重新渲染图表
        },
        choseitem(item) {
            //根据选择的item展示下一级表及图
            this.isnext = true
            if(this.chosed_tab ==0) { //获取区域
                this.chosed_area = item// 把选取的区域赋值
                this.get_area_data()
            } else {
                this.chosed_cate =item //把选取的材料赋值
                this.get_cate_data()
            }
        },
        pagechange(type) {

        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../style/color.stylus'
#main
    div
        width 100%
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
    height 100%
    overflow-y scroll
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
        border-radius 8px
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
