<template>
    <div class='left'>
        <p>监测地区总量</p>
        <div class='num-box'>
            <i class='l'></i>
            <p class='fontb'>580</p>
            <i class='r'></i>
        </div>
        <p style='margin-top:46px'>
            各材料指数涨跌
        </p>
        <div class='cate'>
            <i class='k'></i>
            <ul :class="animate==true?'cate-list anim':'cate-list'">
                <li v-for='(item,index) in list' :key='index'>
                    <div style='justify-content:space-between'>
                        <p>{{item.name}}</p>
                        <p>{{item.num}}</p>
                    </div>
                    <el-progress :percentage="Math.abs(item.zs)" :color="Number(item.zs)>0?'#FD3A0D':'#0DFDA0'" :text-inside="true" :stroke-width="4"
                        style='margin:10px auto'></el-progress>
                    <div>
                        <p class='p'>{{item.zs}}%</p>
                        <img src='../../public/img/上.png' v-if='item.zs>0'/>
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
        this.$store.commit('bigscreen/SET_CATE_ON', this.list[0])
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
        }
    },
    mounted() {
        this.timer = setInterval(this.t,10000)
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
        height 100%
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
            margin-bottom 20px
            margin-left -20px
        .num-box
            width px2vw(150)
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
                padding 15px 105px 13px 76px
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
                    .p 
                        color #95979C
                        font-size 14px
            .el-progress-bar__outer
                background-color #4D6084 !important
                border-radius 0 !important
            .el-progress-bar__innerText
                opacity 0
            .el-progress-bar__inner
                border-radius 0 !important
</style>

