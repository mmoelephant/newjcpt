<template>
    <div class='left'>
        <div style='display:flex;margin-bottom:40px'>
            <div style='display:flex;flex-direction:column;align-items:center'>
                <p>监测市级</p>
                <div class='num-box'>
                    <i class='l'></i>
                    <p class='fontb'>16</p>
                    <i class='r'></i>
                </div>
            </div>
            <div style='display:flex;flex-direction:column;align-items:center'>
                <p>监测区、县级</p>
                <div class='num-box'>
                    <i class='l'></i>
                    <p class='fontb'>137</p>
                    <i class='r'></i>
                </div>
            </div>
        </div>
        
        <p>各材料指数涨跌<span style='font-size:12px'>(当前最新)</span></p>
        <p style='color:#0DFDA0;font-size:12px'>数据更新时间：{{list[0].asmdate?list[0].asmdate.substr(0,10):0}}</p>
        <div class='cate'>
            <i class='k'></i>
            <ul :class="animate==true?'cate-list anim':'cate-list'">
                <li v-for='(item,index) in list' :key='index'>
                    <div style='justify-content:space-between'>
                        <p>{{item.name}}</p>
                        <p>{{item.exponent?Number(item.exponent).toFixed(2):''}}</p>
                    </div>
                    <el-progress :percentage="item.huanbi?Math.abs(item.huanbi*100):0" :color="Number(item.huanbi)>0?'#FD3A0D':'#0DFDA0'" :text-inside="true" :stroke-width="4"
                        style='margin:10px auto'></el-progress>
                    <div>
                        <p class='p'>{{(item.huanbi*100).toFixed(2)}}%</p>
                        <img src='../../public/img/上.png' v-if='item.huanbi>0'/>
                        <img src='../../public/img/下.png' v-else/>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { setInterval } from 'timers';
import $ from 'jquery';
export default {
    data() {
        return {
            list:[
                {
                    name:'钢材',
                    num:955.06,
                    zs:18
                },
                {
                    name:'地区材料',
                    num:955.06,
                    zs:18
                },
                {
                    name:'电线电缆',
                    num:955.06,
                    zs:50
                },
                {
                    name:'管材',
                    num:955.06,
                    zs:-15
                },
                {
                    name:'防水材料',
                    num:955.06,
                    zs:44
                },
                {
                    name:'混凝土预制件',
                    num:955.06,
                    zs:-1
                },
                {
                    name:'建筑玻璃',
                    num:955.06,
                    zs:-12
                },
                {
                    name:'钢材',
                    num:955.06,
                    zs:18
                },
                {
                    name:'地区材料',
                    num:955.06,
                    zs:18
                },
                {
                    name:'电线电缆',
                    num:955.06,
                    zs:50
                },
                {
                    name:'管材',
                    num:955.06,
                    zs:-15
                },
                {
                    name:'防水材料',
                    num:955.06,
                    zs:44
                },
                {
                    name:'混凝土预制件',
                    num:955.06,
                    zs:-1
                },
                {
                    name:'建筑玻璃',
                    num:955.06,
                    zs:-12
                },
            ],
            timer:null,
            animate:false,
        }
    },
    created() {       
        this.get_cate()
    },
    methods:{
        t() {
            this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
            setTimeout(()=>{
                    this.list.push(this.list[0]);  // 将数组的第一个元素添加到数组的
                    this.list.shift();               //删除数组的第一个元素
                    this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                    this.$store.commit('bigscreen/SET_CATE_ON', this.list[0])
            },1000)
        },
        async get_cate() {
            const res = await this.$api.get_cate_level1()
            this.list = res.data
            this.$store.commit('bigscreen/SET_CATE_ON', this.list[0])
            this.$store.commit('bigscreen/SET_CATE_LIST', this.list)
            this.$nextTick(() => {
                this.timer = setInterval(this.t,10000)
            })
        }
    },
    mounted() {
        
    },
    beforeRouteLeave(to,from,next) {
        this.timer = null
        next()
    }
}
</script>
<style lang="stylus" scoped>
@import '../style/px2vh.stylus'
    .anim
        transition all 0.6s
        margin-top -92px
    
    .left
        // height 100%
        width px2vw(380)
        flex-shrink 0
        padding-top px2vh(88)
        box-sizing border-box
        display flex
        flex-direction column
        align-items center
        p 
            font-family MicrosoftYaHei-Bold
            font-weight bold
            color rgba(85,253,253,1)
            margin-bottom 15px
            // margin-left -20px
        .num-box
            // width px2vw(150)
            padding 0 15px
            height px2vh(50)
            display flex
            justify-content space-between
            line-height px2vh(50)
            i 
                display block
                height 100%
                width 7px
            .l
                background url('../../public/img/br.png') no-repeat
                background-size 100% 100%
            .r
                background url('../../public/img/bl.png') no-repeat
                background-size 100% 100%
            p 
                font-size 60px
                margin 0
                text-shadow 0px 0px 10px rgba(85,227,253,0.4)

    .cate
        width 100%
        height 640px
        position relative
        overflow hidden
        .k
            display block
            position absolute
            width 100%
            height 92px
            background url('../../public/img/lk.png') no-repeat
            background-size 100% 100%
        .cate-list
            width 100%
            li 
                width 100%
                padding 15px px2vw(105) 13px px2vw(76)
                box-sizing border-box
                img 
                    width 10px
                    height 10px
                    margin-left 10px
                div
                    display flex
                    align-items center
                    p  
                        margin 0 
                        font-size 16px
                        font-family MicrosoftYaHei-Bold
                        font-weight bold
                        color #fff
                        text-overflow ellipsis
                        // width 50%
                    .p 
                        color #95979C
                        font-size 14px
                        width 50%
                        text-overflow ellipsis
            .el-progress-bar__outer
                background-color #4D6084 !important
                border-radius 0 !important
            .el-progress-bar__innerText
                opacity 0
            .el-progress-bar__inner
                border-radius 0 !important
</style>

