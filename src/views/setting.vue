<template>
    <div>
        <div class="reportBtns">
            <div class="btnClass"><span class="dotClass"></span>账户设置</div>
        </div>
        <div class='user-box'>
            <div class='title'>
                <i></i>
                基本资料
            </div>
            <div class='headicon'>
                <img :src='dataURL?dataURL:user&&user.headPortrait?user.headPortrait:""' :onerror='defaultimg'/>
                <div class='shadow'>
                    点击上传
                </div>
                <input type="file" accept="image/*" @change='upimg'>
            </div>
            <el-form label-position="right" label-width="80px" :model="formLabel" class='form'>
                <el-form-item label="用户名">
                    <el-input v-model="formLabel.name"></el-input>
                </el-form-item>
                <el-form-item label="所在地">
                    <el-input v-model="formLabel.location"></el-input>
                </el-form-item>
                <el-form-item label="单位">
                    <el-input v-model="formLabel.unit"></el-input>
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input v-model="formLabel.individualResume" type="textarea" resize='none' :rows='5'></el-input>
                </el-form-item>
            </el-form>
            <div class='btn' @click='updata'>
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
			defaultimg:'this.src="'+ require('../../public/img/head.png') +'"',
            user:this.$store.state.login.userInfo,
            dataURL:''
        }
    },
    created() {
        this.formLabel = {
            name: this.user.name,
            location: this.user.location,
            unit: this.user.unit,
            individualResume: this.user.individualResume
        }
    },
    methods:{
        upimg(e) {
            const file = e.target.files[0]
            const reader = new FileReader();
            const _this = this
            reader.readAsDataURL(file); // 读出 base64
            reader.onloadend = function () {
                _this.dataURL = reader.result
                
            }
        },
        async updata() {
            this.dataURL&&this.dataURL.length>0?this.formLabel.headPortrait = this.dataURL:''
            this.formLabel.token = this.$store.state.login.token
            const res = await this.$api.updata_user(this.formLabel)
            if(res.data.user) {
                this.$store.commit('login/SET_USER_INFO', res.data.user)
                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
            }
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
        margin-top 20px
        box-sizing border-box
        margin-left 20px
    .form
        label
            font-size 14px
            color font-color-light-b
    .title 
        display flex
        font-size 16px
        color #7F94FF
        i 
            display block
            width 4px
            height 22px
            background #7F94FF
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
