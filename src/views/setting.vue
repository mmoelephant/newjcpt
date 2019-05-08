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
            <div class='headicon'>
                <img src="../../public/img/default.png" alt="">
                <div class='shadow'>
                    点击上传
                </div>
                <input type="file" accept="image/*">
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
            <div class='btn'>
                更新资料
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formLabel:{},
            imageUrl:'../../public/img/default.png'
        }
    },
    methods:{
        handleAvatarSuccess() {

        },
        beforeAvatarUpload() {

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
        font-size 16px
        color tag-color
        i 
            display block
            width 4px
            height 22px
            background tag-color
            margin-right 9px
    .headicon 
        width 124px
        height 124px
        border-radius 50%
        position relative
        margin 30px 46px
        
        img 
            width 124px
            height 124px
            border-radius 50%
        input 
            position absolute
            opacity 0
            width 100%
            height 100%
            top 0
            left 0
            border-radius 50%
            cursor pointer
        .shadow
            position absolute
            width 100%
            height 100%
            top 0
            left 0
            background #000
            opacity 0.59
            border-radius 50%
            line-height 124px
            text-align center
            color #fff
            font-size 14px
    .btn 
        width 100px
        line-height 38px
        background #F57456
        border-radius 4px
        text-align center
        color #fff  
        font-size 14px
        margin-top 30px
        margin-left 80px
</style>
