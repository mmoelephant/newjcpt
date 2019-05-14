<template>
<<<<<<< HEAD
  <ul>
    <li class="th">
      <p>{{type==0?'区域':'材料'}}</p>
      <p v-for="(i,index) in time" :key="index">{{i.mdate?i.mdate.toString().substr(0,7):i.asmdate.substr(0,7)}}</p>
    </li>
    <el-checkbox-group v-model="checked">    
      <li v-for="(i,index) in tabledata" :key="index">
        <p>
          <el-checkbox :label='i' v-if='type==0' class='label'>{{i[0].area_name.substr(0,2)}}</el-checkbox>
          <el-checkbox :label='i' v-if='type==1' class='label'>{{i[0].name.substr(0,6)}}</el-checkbox>
          <i class="iconfont icon-shang-copy" @click="chose_area(i[0])" v-if='!isnext'></i>
        </p>
        <p v-for='(num) in i' :key='num.id' >
          <span v-if='t_type=="price"'>{{num.price?Number(num.price).toFixed(2):'-'}}</span>  
          <span v-if='t_type=="zs"'>{{num.exponent?Number(num.exponent).toFixed(2):'-'}}</span>  
          <span v-if='t_type=="tb"'>{{num.tongbi?Number(num.tongbi).toFixed(2):'-'}}</span>  
          <span v-if='t_type=="hb"'>{{num.huanbi?Number(num.huanbi).toFixed(2):'-'}}</span>  
        </p>
      </li>
    </el-checkbox-group>
  </ul>
</template>
<script>
=======
  <div style='width:100%; ' class='ul'> 
    <div id='table'>
      <div class="th li">
        <p>{{type==0?'区域':'材料'}}</p>
        <p v-for="(i,index) in time" :key="index">{{i.mdate?i.mdate.toString().substr(0,7):i.asmdate.substr(0,7)}}</p>
      </div>
      <el-checkbox-group v-model="checked">    
        <div v-for="(i,index) in tabledata" :key="index" class='li'>
          <p>
            <el-checkbox :label='i' v-if='type==0' class='label'>{{i[0].area_name?i[0].area_name.substr(0,2):''}}</el-checkbox>
            <el-checkbox :label='i' v-if='type==1' class='label'>{{i[0].name?i[0].name.substr(0,6):''}}</el-checkbox>
            <i class="iconfont icon-shang-copy" @click="chose_area(i[0])" v-if='!isnext'></i>
          </p>
          <p v-for='(num) in i' :key='num.id' >
            <span v-if='t_type=="price"'>{{num.price?Number(num.price).toFixed(2):'-'}}</span>  
            <span v-if='t_type=="zs"'>{{num.exponent?Number(num.exponent).toFixed(2):'-'}}</span>  
            <span v-if='t_type=="tb"'>{{num.tongbi?Number(num.tongbi).toFixed(2):'-'}}</span>  
            <span v-if='t_type=="hb"'>{{num.huanbi?Number(num.huanbi).toFixed(2):'-'}}</span>  
          </p>
        </div>
      </el-checkbox-group> 
    </div>
  </div>

</template>
<script>
import $ from 'jquery'
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
export default {
    data() {
      return {
        checked:[],
        time:[],
<<<<<<< HEAD
=======
        newdata:false
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
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
        }
    },
<<<<<<< HEAD
    watch:{
      checked:{
        handler(val) {
          this.$emit('checkList',val)
=======
    mounted() {
      
    },
    watch:{
      checked:{
        handler(val) {
          this.$emit('checkList',val)          
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
        }
      },
      tabledata:{
        handler(val) {
          let t = []
          val.map(item => {
            if(item.length>t.length) {
              t = item
            }
          })
          this.time = t
<<<<<<< HEAD
=======
          this.checked = []
          // this.$emit('checkList',val)
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
        },
        deep:true
      }
    },
    methods:{
      chose_area(item) {
        this.$emit('choseitem',item)
      }
    }
};
</script>
<style lang="stylus" scoped>
@import '../style/color.stylus'
<<<<<<< HEAD
ul 
  li 
=======
.ul 
  width 100%
  overflow-y auto
  .li 
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
    display flex
    align-items center
    height 32px
    box-sizing border-box
<<<<<<< HEAD
    padding 6px
=======
    
    width auto
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
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
      width 76px
    
<<<<<<< HEAD
  .th
    background #B0BDFF
=======
  .th 
    background #B0BDFF
    p
      background #B0BDFF
      padding 6px
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
  i 
    cursor: pointer
    flex-shrink 0
  .el-checkbox-group
<<<<<<< HEAD
    li
=======
    width auto
    .li
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
      p 
        justify-content space-between
        color font-color-black
        flex-shrink 0
<<<<<<< HEAD
=======
        height 32px
        padding-left 6px
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
        .iconfont 
          font-size 10px
          color: #637CFB
        

        border none
      

      p+p 
        justify-content center
<<<<<<< HEAD
    li:nth-child(even) 
      background #F3F4FE
    

    li:nth-child(odd) 
      background #DFE1F4
=======
        padding 0
    .li:nth-child(even) 
      background #F3F4FE
      p
        background #F3F4FE
    

    .li:nth-child(odd) 
      background #DFE1F4
      p
        background #DFE1F4
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
.label
    width 100%
</style>
