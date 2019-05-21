<template>
  <div style='width:100%; ' class='ul'> 
    <div id='table' style='width:auto' >
      <div class="th tli">
        <p>{{type==0?'区域':'材料'}}</p>
        <p v-for="(i,index) in time" :key="index">{{i}}</p>
      </div>
      <el-checkbox-group v-model="checked">    
        <div v-for="(i,index) in newdata" :key="index" class='li'>
          <div>
            <p>
              <el-checkbox :label='i' v-if='type==0' class='label'>{{i.data[0].area_name?i.data[0].area_name.substr(0,2)+''+i.data[0].area_name.substr(-1,1):''}}</el-checkbox>
              <el-checkbox :label='i' v-if='type==1' class='label'>{{i.data[0].name?i.data[0].name.substr(0,6):''}}</el-checkbox>
              <i :class="i.expand?'iconfont icon-shang-copy rotate':'iconfont icon-shang-copy'" @click="chose_area(i)"></i>
            </p>
            <p v-for='(num,a) in i.data' :key='a' >
              <span v-if='t_type=="price"'>{{num.price?Number(num.price).toFixed(2):'-'}}</span>  
              <span v-if='t_type=="zs"'>{{num.price ==0?"-":num.exponent?Number(num.exponent).toFixed(2):'-'}}</span>  
              <span v-if='t_type=="tb"'>{{num.price==0?"-":num.tongbi?(Number(num.tongbi)*100).toFixed(2)+'%':'-'}}</span>  
              <span v-if='t_type=="hb"'>{{num.price==0?"-":num.huanbi?(Number(num.huanbi)*100).toFixed(2)+'%':'-'}}</span>  
            </p>
          </div>
          
          <div v-for="(c,ci) in i.children" :key="ci" :class='i.expand?"li cli":"hide"' >
            <p>
              <el-checkbox :label='c' v-if='type==0' class='label'>{{c.data[0].area_name?c.data[0].area_name.substr(0,2):''}}</el-checkbox>
              <el-checkbox :label='c' v-if='type==1' class='label'>{{c.data[0].name?c.data[0].name.substr(0,6):''}}</el-checkbox>
            </p>
            <p v-for='(cs,csi) in c.data' :key='csi' >
              <span v-if='t_type=="price"'>{{cs.price?Number(cs.price).toFixed(2):'-'}}</span>  
              <span v-if='t_type=="zs"'>{{cs.price ==0?"-":cs.exponent?Number(cs.exponent).toFixed(2):'-'}}</span>  
              <span v-if='t_type=="tb"'>{{cs.price==0?"-":cs.tongbi?(Number(cs.tongbi)*100).toFixed(2)+'%':'-'}}</span>  
              <span v-if='t_type=="hb"'>{{cs.price==0?"-":cs.huanbi?(Number(cs.huanbi)*100).toFixed(2)+'%':'-'}}</span>  
            </p>
          </div>
        </div>
      </el-checkbox-group> 
    </div>
    <p v-show='newdata.length ==0'>暂无数据</p>
  </div>

</template>
<script>
import $ from 'jquery'
export default {
    data() {
      return {
        checked:[],
        time:[],
        newdata:[]
      }
    },
    props:{
        tabledata:{
          type:Array
        },
        type:{
          type:Number
        },
        t_type:{
          type:String
        },
        isnext:{
          type:Boolean
        },
        timeType:{
          type:Number
        }
    },
    watch:{
      checked:{
        handler(val) {
          this.$emit('checkList',val)          
        }
      },
      tabledata:{
        handler(val) {
          this.newdata = []
          this.time = []
          if(val.length >0) {
            val[0].data.map(item => {
              if(this.timeType ==0) {
                const d = item.mdate?item.mdate.toString().substr(0,7):item.asmdate.toString().substr(0,7)
                this.time.push(d)
              } else if(this.timeType == 1) {
                const m = item.mdate?Number(item.mdate.substr(5,2)):Number(item.asmdate.substr(5,2))
                const y = item.mdate?item.mdate.substr(0,4):item.asmdate.substr(0,4)
                if(m ==1) {
                  this.time.push(y+'年第一季度')
                } else if( m ==4) {
                  this.time.push(y+'年第二季度')
                } else if( m ==7) {
                  this.time.push(y+'年第三季度')
                } else {
                  this.time.push(y+'年第四季度')
                }
              } else {
                const y = item.mdate?item.mdate.substr(0,4):item.asmdate.substr(0,4)
                this.time.push(y+'年')
              }
            })
          }
          this.checked = []
          var objDeepCopy = function (source) {// 深度拷贝数组对象
              var sourceCopy = source instanceof Array ? [] : {};
              for (var item in source) {
                  sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
              }
              return sourceCopy;
          }
          this.newdata=objDeepCopy(val)
        },
        deep:true
      }
    },
    methods:{
      chose_area(item) {
        item.expand = !item.expand
      },
      
    }
};
</script>
<style lang="stylus" scoped>
@import '../style/color.stylus'
.ul 
  width 100%
  overflow-y auto
  .tli,.li>div
    display flex
    align-items center
    height 32px
    box-sizing border-box
    width auto
    p 
      width 190px
      color #fff
      font-size 14px
      display flex
      justify-content center
      align-items center
      border-right 1px solid #fff
      box-sizing border-box
      flex-shrink 0
    p+p 
      width 130px
    
  .th 
    background #B0BDFF
    p
      background #B0BDFF
      padding 6px
  i 
    cursor: pointer
    flex-shrink 0
  .rotate:before
    display inline-block
    transform rotate(90deg)
    transition .3s
  .el-checkbox-group
    width auto
    .li
      p 
        justify-content space-between
        color font-color-black
        flex-shrink 0
        height 32px
        padding-left 6px
        .iconfont 
          font-size 10px
          color: #637CFB
        border none
      p+p 
        justify-content center
        padding 0
    .li:nth-child(odd)
        background #F3F4FE
        p
          background #F3F4FE
        .li:nth-child(odd) 
          background #F3F4FE
          p
            background #F3F4FE
        .li:nth-child(even) 
          background #DFE1F4
          p
            background #DFE1F4
    .li:nth-child(even) 
        background #DFE1F4
        p
          background #DFE1F4
        .li:nth-child(odd) 
          background #DFE1F4
          p
            background #DFE1F4
        .li:nth-child(even) 
          background #F3F4FE
          p
            background #F3F4FE
    .cli
        transition .3s
        p 
          padding-left 40px
        p+p 
          padding-left 0
    .hide
      height 0
      transition .3s
      overflow hidden
.label
    width 100%
</style>
