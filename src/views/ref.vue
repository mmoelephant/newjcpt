<template>
    <div style='height:100%' v-loading.fullscreen.lock="loading">
        <img src="" alt="">
        <div class="reportBtns">
			<div class='btnClass'>
                <span class="dotClass"></span>
                数据查询>
                <span>各地区材料数据</span>
            </div>
		</div>
        <el-container style='height:100%;background:#F6F7FE;padding:20px 20px 40px 20px;box-sizing:border-box'>
            <el-aside width="320px" style='border-radius:4px;background:#fff;' class='cate'>
                <div :class='t==0?"title acttitle":"title"'  @click='t=0'>
                    <div>
                        <p class='c'></p>
                        <span>各地材料数据</span>
                    </div>
                    
                    <i class='iconfont icon-shang-copy'></i>
                    
                </div>
                <el-tree 
                    :data="cateList" :props="defaultProps" @node-click="handleNodeClick" :indent='30'
                    :style='t==0?"height:auto;transition:.4s;opacity:1":"height:0;background:#000;transition:.4s;opacity:0"'></el-tree>
                <div :class='t==1?"title acttitle":"title"' @click='t =1'>
                    <div>
                        <p class='a'></p>                   
                        <span>各地材料对比</span>
                    </div>
                    <i class='iconfont icon-shang-copy'></i>
                </div>
                <el-tree :data="areaList" :props="defaultProps" @node-click="handleNodeClick" :indent='30'
                    :style='t==1?"height:auto;transition:.4s;opacity:1":"height:0;background:#000;transition:.4s;opacity:0"'></el-tree>

            </el-aside>
            <el-container class='charts-main'>
                <div class='tooltip'>
                    <div class='left'>
                        <h1>云南省各地区材料数据</h1>
                        <div class='tab'>
                            <p :class='timetype ==0?"active":""' @click='timetype=0'>
                                月度数据
                            </p>
                            <p :class='timetype ==1?"active":""' @click='timetype=1'>
                                季度数据
                            </p>
                            <p :class='timetype ==2?"active":""' @click='timetype=2'>
                                年度数据
                            </p>
                        </div>
                        <div class='switch' @click='showcharts = !showcharts'>
                            显示勾选地区对比图表
                        </div>
                    </div>
                    
                </div>  
                <div class='table-box'>
                    <div class='t'>
                        <div>
                            <p v-if='t==0'>各地区<span>"{{chosed_cate.name}}"</span>{{timetype==0?"月度":timetype==1?"季度":timetype==2?"年度":""}}数据表
                                <span v-if='isnext' @click='back'>返回 ></span>
                            </p>
                            <p v-if='t==1'><span>"{{chosed_city.name}}"</span>材料价格对比
                            </p>
                            <ul>
                                <li :class='chosed_type=="price"? "ac" :""' @click='chosed_type="price"' v-if='t == 0'>价格</li>
                                <li :class='chosed_type=="zs"? "ac" :""' @click='chosed_type="zs"'>指数</li>
                                <li :class='chosed_type=="tb"? "ac" :""' @click='chosed_type="tb"'>同比</li>
                                <li :class='chosed_type=="hb"? "ac" :""' @click='chosed_type="hb"'>环比</li>
                            </ul>
                        </div>
                        <div class='timer'>
                            <span>时间</span>
                            <el-select v-model="time" placeholder="请选择查询时间" v-show='timetype==0'>
                                <el-option
                                v-for="item in monthoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="time" placeholder="请选择查询时间" v-show='timetype==1'>
                                <el-option
                                v-for="item in seasonoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="time" placeholder="请选择查询时间" v-show='timetype==2'>
                                <el-option
                                v-for="item in yearoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <reftable 
                        style='padding-top:56px'
                        :tabledata='tabledata' 
                        :type='t' 
                        :timeType='timetype'
                        :t_type='chosed_type'
                        @checkList='checkList' 
                        @choseitem='choseitem'
                        :isnext='isnext'></reftable>
                    <page-btn :disablepage="disablepage" @pagechange='pagechange' style='padding-top:20px;float:right'></page-btn>
                </div>
            </el-container>
        </el-container>
        <el-dialog
            :visible.sync="showcharts"
            width="60%">
            <div class='ch' v-show ='showcharts'>
                <h1>云南省材料价格对比柱状图</h1>
                <div class='tool'>
                    <ul>   
                        <li @click='change_charts="bar"' :class='change_charts=="bar"?"active":""'>
                            <i class='iconfont icon-zhuzhuangtu'></i>
                        </li>
                        <li @click='change_charts="line"' :class='change_charts=="line"?"active":""'>
                            <i class='iconfont icon-zhexian'></i>
                        </li>
                        <li @click='change_charts="mixin"' :class='change_charts=="mixin"?"active":""'>
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
        </el-dialog>
    </div>
</template>
<script>
import $ from 'jquery'
import reftable from '../components/ref-table'
import pageBtn from '../components/page-btn'
export default {
    data() {
        return {
            t:0,//0 单材料多区域 1 多材料单区域
            cateList: [],//分类列表 左侧树状图
            areaList:[{"id":"530100000000","name":"昆明","level":"2","pid":"53","geocode":"102.832891,24.880095"},{"id":"530300000000","name":"曲靖","level":"2","pid":"53","geocode":"103.796167,25.489999"},{"id":"530400000000","name":"玉溪","level":"2","pid":"53","geocode":"102.546543,24.352036"},{"id":"530500000000","name":"保山","level":"2","pid":"53","geocode":"99.161761,25.112046"},{"id":"530600000000","name":"昭通","level":"2","pid":"53","geocode":"103.717465,27.338257"},{"id":"530700000000","name":"丽江","level":"2","pid":"53","geocode":"100.227750,26.855047"},{"id":"530800000000","name":"普洱","level":"2","pid":"53","geocode":"100.966512,22.825065"},{"id":"530900000000","name":"临沧","level":"2","pid":"53","geocode":"100.079583,23.877573"},{"id":"532300000000","name":"楚雄","level":"2","pid":"53","geocode":"101.528068,25.045532"},{"id":"532500000000","name":"红河","level":"2","pid":"53","geocode":"103.374799,23.363130"},{"id":"532600000000","name":"文山","level":"2","pid":"53","geocode":"104.216248,23.400733"},{"id":"532800000000","name":"西双版纳","level":"2","pid":"53","geocode":"100.797777,22.007351"},{"id":"532900000000","name":"大理","level":"2","pid":"53","geocode":"100.267638,25.606486"},{"id":"533100000000","name":"德宏","level":"2","pid":"53","geocode":"98.584895,24.433353"},{"id":"533300000000","name":"怒江","level":"2","pid":"53","geocode":"98.853097,25.852547"},{"id":"533400000000","name":"迪庆","level":"2","pid":"53","geocode":"99.702234,27.818882"}],//区域列表，左侧树状图
            defaultProps: {
                children: 'childrenList',
                label: 'name'
            },
            chosed_city:{
                name:'全省',
                id:'53'
            },
            chosed_cate:{
                // id:1,
                // name:'钢材'
            },//选中的分类
            showcharts:false,//是否展示图
            t:0,//选择表格展示类型 0：区域比较 1：材料比较
            monthoptions:[{ //月度时间控件
                value:3,
                label: '近3个月'
            },{ //月度时间控件
                value:6,
                label: '近6个月'
            },{ //月度时间控件
                value:9,
                label: '近9个月'
            },{ //月度时间控件
                value:12,
                label: '近12个月'
            },{ //月度时间控件
                value:15,
                label: '近15个月'
            }],
            seasonoptions:[{//季度时间控件
                value:4,
                label: '近4个季度'
            },
            {
                value:8,
                label: '近8个季度'
            },
            {
                value:12,
                label: '近12个季度'
            }],
            yearoptions:[{//年度时间控件
                value:2,
                label: '近2年'
            },
            {
                value:4,
                label: '近4年'
            },
            {
                value:8,
                label: '近8年'
            },
            {
                value:10,
                label: '近10年'
            }],
            time:'',//选取的时间
            chosed_type:'price',//表格内容展示筛选 price:价格 zs：指数 tb：同比 hb：环比
            timetype:0,//时间类型 0：月度 1：季度 2：年度
            tabledata:[],//表格数据 
            chosed_area:{
                area:53
            }, // 选择的区域code 默认云南省 用于图展示
            disablepage:-1, //传给分页组件的判定哪个按钮禁用 -1:左按钮 1：右按钮 0：不禁用 2:都禁用
            isnext:false,//是否是子表格
            checked:[],//选中作为图渲染的数据,
            mycharts:null,
            change_charts:'bar',//展示图表的类型
            color:['#ff5193','#09d8ca','#ffa966','#2bbdef','#5f81ff',
            '#ff7e68','#18db98','#d06cff','#77a1ff','#f58d13','#ed5627',
            '#fe76cc','#f037c2','#18cb00','#2da5ea','#994eee'],
            boxwidth:0,
            tablewidth:0,
            loading:false
        }
    },
    created() {       
        this.get_cate()
    },
    mounted() {
        
    },
    components:{
        reftable,
        pageBtn
    },
    watch:{
        timetype(type) {
            if(type==0) {
                this.time = this.monthoptions[0].value
                
            } else if(type==1) {
                this.time = this.seasonoptions[0].value
                
            } else {
                this.time = this.yearoptions[0].value
                
            }
        },
        time(val) {
            if(this.t == 0) {
                this.get_area_data()
            } else {
                this.get_cate_data()
            }
        },
        showcharts(val){
            if(val) {
                this.$nextTick(() =>{
                    if(this.change_charts=='bar') {
                        this.init()
                    } else if(this.change_charts=='line') {
                        this.init_line()
                    } else {
                        this.init_barline()
                    }
                })
            }
        },
        t(val) {
            this.chosed_city = {id:'53', name:'全省'}
            this.chosed_cate=this.cateList[0]
            if(val ==0) {
                this.get_area_data()
            } else {
                if(this.chosed_type =='price') this.chosed_type = 'zs'
                this.get_cate_data()
            }
        },
        change_charts(type){
            if(type=='bar') {
                this.init()
            } else if(type=='line') {
                this.init_line()
            } else {
                this.init_barline()
            }
        }
    },  
    methods:{
        back() {
            this.isnext = false
            if(this.t ==0) {
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
            if(this.timetype == 0) {
                if (month>=this.time) {
                    exmonth = month-this.time+1
                    exyear = y
                } else {
                    exmonth = month+12-this.time+1
                    exyear = y-1
                }
            }
            exmonth = exmonth>9?exmonth:'0'+exmonth
            month = month>9?month:'0'+month
            return [exyear+'-'+exmonth,y+'-'+month]
        },
        async get_cate() { //获取分类列表 左侧树渲染
            const res = await this.$api.get_cate({})
            this.cateList = res.data
            this.chosed_cate = this.cateList[0]
            this.time = this.monthoptions[0].value
        },
        async get_area_data() {// 获取区域的数据
            this.loading = true
            this.tabledata =[]
            this.checked = []
            let data = {
                id:this.chosed_cate.id,//选择的材料
                area:this.chosed_area.area
            } 
            if(this.timetype == 0) {
                const t_arr=this.formateTime()
                data.startDate = t_arr[0]
                data.endDate=t_arr[1]
            } else if(this.timetype == 1) {
                data.quarterNumber = this.time.toString()
            } else {
                data.yearNumber = this.time.toString()
            }
            const res = await this.$api.get_area_time_list(data,this.timetype)
            if(Object.keys(res.data.data).length>0) {
                let keys = Object.keys(res.data.data)
                keys.forEach(key => {
                    this.tabledata.push(res.data.data[key])
                })
                if(this.showcharts) { //如果展示图表  渲染
                    if(this.change_charts=='bar') {
                        this.init()
                    } else if(this.change_charts=='line') {
                        this.init_line()
                    } else {
                        this.init_barline()
                    }
                }
            } else {
                this.tabledata = []
            }
            this.$nextTick(() =>{
                this.show_page()
                this.loading = false
            })
        },
        async get_cate_data() { //获取材料的数据 
            this.loading = true
            this.tabledata = []
            this.checked = []
            
            let data = {
                area:this.chosed_city.id,//选择的地区,默认全省
                pid:this.isnext?this.chosed_cate.mid:0,//选中的材料id               
            }
            if(this.timetype==0) {
                const t_arr=this.formateTime()
                data.startDate=t_arr[0]//时间区间
                data.endDate=t_arr[1]
            } else if(this.timetype ==1) {
                data.quarterNumber = this.time
            } else {
                data.yearNumber = this.time
            }
            const res = await this.$api.get_cate_time_list(data,this.timetype)
            let keys = Object.keys(res.data.data)
            keys.forEach(key => {
                this.tabledata.push(res.data.data[key])
            })
            if(this.showcharts) {
                if(this.change_charts=='bar') {
                    this.init()
                } else if(this.change_charts=='line') {
                    this.init_line()
                } else {
                    this.init_barline()
                }
            }
            this.$nextTick(() =>{
                this.show_page()
                this.loading = false
            })
        },
        handleNodeClick(data) { //选择材料
            this.checked = []
            if(this.t ==0) { //获取区域
                this.chosed_cate = data
                this.chosed_name = data.name
                this.get_area_data()
            } else {
                this.chosed_city = data
                this.get_cate_data()
            }
        },
        async init() {
            let x=[],y=[],arr=[],legend=[]
            if(this.checked && this.checked.length >0) {
                this.checked.forEach((item,index) => {
                    let data =[]
                    if(x.length<item.length) {
                        x=[]
                        item.map(t => {                       
                            x.push(t.mdate?t.mdate.substr(0,7):t.asmdate.substr(0,7))
                        })
                        
                    }
                    item.map(t=> {
                        data.push(t.price) 
                    })
                    if(this.t==0) {
                        legend.push(item[0].area_name)
                        y.push({data:data,type:'bar',name:item[0].area_name,
                        barMaxWidth:20,
                        itemStyle:{
                            color:this.color[index]
                        }})
                    } else {
                        legend.push(item[0].name)
                        y.push({data:data,type:'bar',name:item[0].name,
                        barMaxWidth:20,
                        itemStyle:{
                            color:this.color[index]
                        }})
                    }                    
                })
            } else {// 获取全省的材料数据 用于初始化图表
                if(this.t ==0&&!this.isnext) { //第一级空选中 显示全省数据
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
                        type:'bar',
                        name:'全省',
                        itemStyle:{
                            color:this.color[0]
                        },
                        barMaxWidth:20
                    })
                    arr.forEach(item => {
                        x.push(item.mdate.substr(0,7))
                        y[0].data.push(item.price)
                    })
                    legend=['全省']
                } else {
                    let data=[]
                    try {
                        const defaultcate = this.tabledata[0]
                        if(x.length<defaultcate.length) {
                            x=[]
                            defaultcate.map(t => {                       
                                x.push(t.mdate?t.mdate.substr(0,7):t.asmdate.substr(0,7))
                            })
                            
                        }
                        defaultcate.map(t=> {
                            data.push(t.price) 
                        })
                        if(this.t==0) {
                            legend.push(defaultcate[0].area_name)
                            y.push({data:data,type:'bar',name:defaultcate[0].area_name,
                            barMaxWidth:20,
                            itemStyle:{
                            color:this.color[0]
                        }})
                        } else {
                            legend.push(defaultcate[0].name)
                            y.push({data:data,type:'bar',name:defaultcate[0].name,
                            barMaxWidth:20,
                            itemStyle:{
                            color:this.color[0]
                        }})
                        }  
                    } catch(e) {
                        // console.error(e)
                    }
                    
                    
                }
                
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
            this.mycharts = this.$echarts.init(document.getElementById('main'))
            this.mycharts.setOption(option,true)
        },
        async init_line() {
            let x=[],y=[],arr=[],legend=[]
            if(this.checked && this.checked.length >0) {
                this.checked.forEach((item,index) => {
                    let data =[]
                    if(x.length<item.length) {
                        x=[]
                        item.map(t => {                       
                            x.push(t.mdate?t.mdate.substr(0,7):t.asmdate.substr(0,7))
                        })
                        
                    }
                    item.map(t=> {
                        data.push(t.price) 
                    })
                    if(this.t==0) {
                        legend.push(item[0].area_name)
                        y.push({data:data,type:'line',name:item[0].area_name,itemStyle:{
                            color:this.color[index]
                        }})
                    } else {
                        legend.push(item[0].name)
                        y.push({data:data,type:'line',name:item[0].name,itemStyle:{
                            color:this.color[index]
                        }})
                    }                    
                })
            } else {// 获取全省的材料数据 用于初始化图表
                if(this.t ==0&&!this.isnext) {
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
                        type:'line',
                        name:'全省',
                        itemStyle:{
                            color:this.color[0]
                        }
                    })
                    arr.forEach(item => {
                        x.push(item.mdate.substr(0,7))
                        y[0].data.push(item.price)
                    })
                    legend=['全省']
                } else {
                    let data=[]
                    try {
                        const defaultcate = this.tabledata[0]
                        if(x.length<defaultcate.length) {
                            x=[]
                            defaultcate.map(t => {                       
                                x.push(t.mdate?t.mdate.substr(0,7):t.asmdate.substr(0,7))
                            })
                            
                        }
                        defaultcate.map(t=> {
                            data.push(t.price) 
                        })
                        if(this.t==0) {
                            legend.push(defaultcate[0].area_name)
                            y.push({data:data,type:'bar',name:defaultcate[0].area_name,
                            barMaxWidth:20,
                            itemStyle:{
                            color:this.color[0]
                        }})
                        } else {
                            legend.push(defaultcate[0].name)
                            y.push({data:data,type:'bar',name:defaultcate[0].name,
                            barMaxWidth:20,
                            itemStyle:{
                            color:this.color[0]
                        }})
                        }  
                    } catch(e) {
                        
                    }
                    
                }
                
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
            this.mycharts = this.$echarts.init(document.getElementById('main'))
            this.mycharts.setOption(option,true)
        },
        async init_barline() {
            let x=[],y=[],arr=[],legend=[]
            if(this.checked && this.checked.length >0) {
                this.checked.forEach((item,index) => {
                    let data =[],tb=[],hb=[]
                    if(x.length<item.length) {
                        x=[]
                        item.map(t => {                       
                            x.push(t.mdate?t.mdate.substr(0,7):t.asmdate.substr(0,7))
                        })
                        
                    }
                    item.map(t=> {
                        data.push(t.price) 
                        tb.push(t.tongbi)
                        hb.push(t.huanbi)
                    })
                    if(this.t==0) {
                        legend.push(item[0].area_name)
                        y.push({data:data,type:'bar',name:item[0].area_name,
                        barMaxWidth:20,
                        itemStyle:{
                            color:this.color[index]
                        }},
                            {data:hb,type:'line',name:item[0].area_name,yAxisIndex:1,itemStyle:{
                            color:this.color[index]
                        }})
                    } else {
                        legend.push(item[0].name)
                        y.push({data:data,type:'bar',name:item[0].name,
                        barMaxWidth:20,
                        itemStyle:{
                            color:this.color[index]
                        }},
                            {data:tb,type:'line',name:item[0].name,yAxisIndex:1,itemStyle:{
                            color:this.color[index]
                        }},{
                            data:hb,type:'line',name:item[0].name,yAxisIndex:1,itemStyle:{
                            color:this.color[index]
                        }}
                        )
                    }                    
                })
            } else {// 获取全省的材料数据 用于初始化图表
                if(this.t ==0&&!this.isnext) {
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
                        type:'bar',
                        name:'全省',
                        barMaxWidth:20,
                        itemStyle:{
                            color:this.color[0]
                        }
                    })
                     y.push({//环比
                        data:[],
                        type:'line',
                        name:'全省',
                        yAxisIndex:1,
                        emphasis:{
                            label:{
                                formatter:'{b}环比: {c}'
                            }
                        },itemStyle:{
                            color:this.color[0]
                        }
                    })
                    arr.forEach(item => {
                        x.push(item.mdate.substr(0,7))
                        y[0].data.push(item.price)
                        y[1].data.push(item.huanbi)
                    })
                    legend=['全省']
                } else {
                    let data=[]
                    try {
                        const defaultcate = this.tabledata[0]
                        if(x.length<defaultcate.length) {
                            x=[]
                            defaultcate.map(t => {                       
                                x.push(t.mdate?t.mdate.substr(0,7):t.asmdate.substr(0,7))
                            })
                            
                        }
                        defaultcate.map(t=> {
                            data.push(t.price) 
                        })
                        if(this.t==0) {
                            legend.push(defaultcate[0].area_name)
                            y.push({data:data,type:'bar',name:defaultcate[0].area_name,itemStyle:{
                            color:this.color[index]
                        }})
                        } else {
                            legend.push(defaultcate[0].name)
                            y.push({data:data,type:'bar',name:defaultcate[0].name,itemStyle:{
                            color:this.color[index]
                        }})
                        }  
                    } catch(e) {
                        
                    }
                    
                }
                
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
                    },
                    {
                        type:'value'
                    }
                ],
                series :y
            }
            this.mycharts = this.$echarts.init(document.getElementById('main'))
            this.mycharts.setOption(option,true)
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
                if(this.change_charts=='bar') {
                    this.init()
                } else if(this.change_charts=='line') {
                    this.init_line()
                } else {
                    this.init_barline()
                }
            }
            //根据获取到的list重新渲染图表
        },
        choseitem(item) {
            //根据选择的item展示下一级表及图
            
            if(this.t ==0) { //获取区域
                // this.chosed_area = item// 把选取的区域赋值
                // this.get_area_data()
            } else {
                // this.chosed_cate =item //把选取的材料赋值
                // this.get_cate_data()
                // this.isnext = true
            }
        },
        show_page() {
            this.boxwidth = $('#table').outerWidth()
            this.tablewidth = 190+($('.th p').length-1)*76
            let scroll = $('.ul').scrollLeft()
            let left = this.tablewidth-this.boxwidth-scroll
            if(scroll ==0 && left>0) {
                this.disablepage = -1
            } else if(this.boxwidth >= this.tablewidth || left<0 ){
                this.disablepage = 2
            } else if(left == 0){
                this.disablepage =1
            } else {
                this.disablepage = 0
            }
        },
        pagechange(type) {
            let scroll = $('.ul').scrollLeft()
            let left = this.tablewidth - this.boxwidth -scroll
            const that = this
            if(type == -1) {
                if(scroll>this.boxwidth) {
                    $('.ul').animate({
                        scrollLeft:scroll-this.boxwidth
                    },500,() =>{
                        that.show_page()
                    })
                } else {
                    $('.ul').animate({
                        scrollLeft:0
                    },500,() =>{
                        that.show_page()
                    })
                }
            } else {
                if(left>this.boxwidth) {
                    $('.ul').animate({
                        scrollLeft:scroll+this.boxwidth
                    },500,() =>{
                        that.show_page()
                    })
                } else {
                    $('.ul').animate({
                        scrollLeft:this.tablewidth
                    },500,() =>{
                        that.show_page()
                    })
                }
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../style/color.stylus'
.btnClass
    width auto
    padding-left 30px
    display flex
    align-items center
    padding-right 37px
    .dotClass
        display block
        position static
        margin-right 6px
    span
        color #454EFF
.title 
    display flex
    font-size 16px
    color font-color-light-b
    margin-bottom 10px
    align-items center
    justify-content space-between
    height 58px
    cursor pointer
    padding 0 20px
    div
        display flex
        align-items center
    p 
        width 30px
        height 30px
        flex-shrink 0
        margin-right 10px
        
    .c
        background url('../../public/img/1g.png') no-repeat
        background-size 100% 100%
    .a
        background url('../../public/img/2g.png') no-repeat
        background-size 100% 100%
    i 
        color font-color-light-b
        font-size 12px
.title:hover
    background #F5F6FE
    color #000
    .c
        background url('../../public/img/1b.png') no-repeat
        background-size 100% 100%
    .a
        background url('../../public/img/2b.png') no-repeat
        background-size 100% 100%
    i 
        color #000    
.acttitle,.acttitle:hover
    background -webkit-linear-gradient(right,#61e0ff,#6439f8) !important/* Safari 5.1-6.0 */
    background -o-linear-gradient(left,#61e0ff,#6439f8)!important /* Opera 11.1-12.0 */ 
    background -moz-linear-gradient(left,#61e0ff,#6439f8)!important /* Firefox 3.6-15 */
    background linear-gradient(to left,#61e0ff,#6439f8)!important /* 标准语法 */
    color #fff
    .c
        background url('../../public/img/1w.png') no-repeat
        background-size 100% 100%
    .a
        background url('../../public/img/2w.png') no-repeat
        background-size 100% 100%
    i
        color #fff
    .iconfont:before
        display inline-block
        transform rotate(90deg)

.cate
    box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
    border-radius 8px
    // padding 0 20px
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
            >div
                display flex
            p
                font-size 20px
                font-family MicrosoftYaHei-Bold
                font-weight bold
                >span 
                    color #7bfaff
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
        h1 
            font-size 20px
            font-weight bold
            color rgba(96,100,253,1)
            margin-right 50px
        .left , .tab
            display flex
            align-items center
        .switch
            width 180px
            line-height 32px
            border-radius 16px
            text-align center
            color #fff
            background #6064FD
            font-size 14px
            cursor pointer
        .switch:hover 
            background rgba(127,148,255,1)
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
                border-radius 0
            p+p+p
                border-radius 0px 4px 4px 0px
            .active 
                background #7F94FF
                border 1px solid #7F94FF
                color #fff
.timer
    span 
        font-size 14px
        color #fff
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
        height 550px
        div,canvas
            width 100%
            height 550px 
        
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
                background #7F94FF
                box-shadow 0px 6px 6px 0px rgba(127,148,255,0.24)
                border-radius 50%
                text-align center
                color #fff
                line-height 50px
                margin-right 20px
                cursor pointer
                .iconfont 
                    font-size 26px
            .active
                background #FB6371
                box-shadow 0px 6px 6px 0px rgba(251,99,113,0.24)
            .active:hover
                background #FB6371
                box-shadow 0px 6px 6px 0px rgba(251,99,113,0.24)
            li:hover
                background #AEBBFF
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
