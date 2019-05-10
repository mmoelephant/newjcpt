<template>
  <ul>
    <li class="th">
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
    <li v-for="(i,index) in [1,1,1,1,1,1,1]" :key="index">
      <p>
        <span>钢材</span>
        <i class="iconfont icon-shang-copy" @click="chose_area(i)"></i>
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
</template>
<script>
export default {
    props:{
        tabledata:{
            type:Array
        }
    }
};
</script>
<style lang="stylus" scoped>
@import '../style/color.stylus'
ul {
  li {
    display: flex;
    align-items: center;
    height: 32px;
    box-sizing: border-box;
    padding: 6px;

    p {
      width: 190px;
      color: #fff;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #fff;
      box-sizing: border-box;
    }

    p+p {
      width: 76px;
    }
  }

  li+li {
    p {
      justify-content: space-around;
      color: font-color-black;

      .iconfont {
        font-size: 10px;
        color: #637CFB;
      }

      border: none;
    }

    p+p {
      justify-content: center;
    }
  }

  li:nth-child(even) {
    background: #F3F4FE;
  }

  li:nth-child(odd) {
    background: #DFE1F4;
  }

  li:nth-child(1) {
    background: #B0BDFF;
  }

  i {
    cursor: pointer;
  }
}
</style>
