<template>
    <div>
        <div>
            账户设置
        </div>
        <div class='user-box'>
            <div class='title'>
                <i></i>
                基本资料
            </div>
            <div>
                <img/>
                <input/>
            </div>
            <el-form label-position="right" label-width="80px" :model="formLabel" class='form'>
                <el-form-item label="用户名">
                    <el-input v-model="formLabel.name"></el-input>
                </el-form-item>
                <el-form-item label="所在地">
                    <el-input v-model="formLabel.local"></el-input>
                </el-form-item>
                <el-form-item label="单位">
                    <el-input v-model="formLabel.company"></el-input>
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input v-model="formLabel.intro" type="textarea" resize='none' :rows='5'></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formLabel:{}
        }
    }
}
</script>
<style lang="stylus">
    @import '../style/color.stylus'
    .user-box 
        width 580px
        height 640px
        background #fff
        box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
        border-radius 8px
        padding 20px 
        box-sizing border-box
    .form
        label
            font-size 14px
            color font-color-light-b
    .title 
        display flex
        
</style>
