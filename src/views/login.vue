<template>
    <div class='login'>
        <div class='login-box'>
            <div class='left'>
                <img src='../../public/img/logo.png'/>
                <p>云南省建设工程材料及设备价格</p>
                <p>监测系统</p>
                <p class='cp mt'>
                    Copyright 2018-2019 版权所有 昆明行列科技有限公司
                </p>
                <p class='cp'>Ver 2.1.1</p>
            </div>
            <div class='right'>
                <h1>用户登录</h1>
                <div class='input'>
                    <div :class='focusIndex == 1? "onfocus":error1&&error1.length>0?"onerror":""'>
                        <i class='iconfont icon-zhanghao'></i>
                        <span v-if='focusIndex != 1 && name.length==0 && !isSupportPlaceholder' @click='getfocus(0)'>请输入手机号</span>
                        <input 
                            autocomplete="off"
                            v-model='name' 
                            :placeholder="isSupportPlaceholder?'请输入手机号/账号':''"
                            @focus="focus(1)"
                            @blur="blur(1)"
                            :class='error1&&error1.length>0?"red":name&&name.length>0?"blue":""'>
                    </div>
                    <p class='error'>{{error1}}</p>
                </div>
                <div class='input'>
                    <div :class='focusIndex == 2? "onfocus":error2&&error2.length>0?"onerror":""'>
                        <i class='iconfont icon-mima'></i>
                        <span v-if='focusIndex != 2 && password.length==0&& !isSupportPlaceholder' @click='getfocus(1)'>请输入密码</span>
                        <input
                            autocomplete="off"
                            :placeholder="isSupportPlaceholder?'请输入密码':''"
                            v-model='password' type='password'
                            @focus="focus(2)"
                            @blur="blur(2)"
                            :class='error2&&error2.length>0?"red":password&&password.length>0?"blue":""'>

                    </div>
                    <p class='error'>{{error2}}</p>
                </div>
                <el-button @click='login' 
                    :class='!name || name.length ==0 || !password || password.length==0?"loginbtn disabled":"loginbtn abled"'>登录</el-button>
                <div class='tool'>
                    <p @click='$router.replace("/")'>&lt;返回首页</p>
                    <!--p>帮助中心</p-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data() {
        return {
            name:'',
            password:'',
            error2:'',
            error1:'',
            focusIndex:0,
            isSupportPlaceholder:''
        }
    },
    created() {
        
    },
    mounted() {
        const input = $('input')[0]
        this.isSupportPlaceholder =  'placeholder' in input
		const that = this
		document.onkeydown = function(e) {
			var keycode = document.all ? event.keyCode : e.which;
			if (keycode == 13) {
				that.login()
				return false;
			}
		}
	},
    methods:{
        getfocus(index) {
            $('input')[index].focus()
        },
        focus(i) {
            this.focusIndex = i
            if(i ==1) {
                this.error1 = ''
            } else {
                this.error2 = ''
            }
        },
        blur(i) {
            if(i==1) {
                if(this.name.length>0) {
                    return
                } else {
                    this.error1 = '请输入正确的账号/手机号'
                }
                
            } else {
                if(this.password.length>0) {
                    return
                } else {
                    this.error2 = '请输入正确的密码'
                }
            } 
            this.focusIndex=0
        },
        async login() {
            if(!this.check()) return 
            const data = {
                phone: this.name,
                password: this.password
            }
            const res = await this.$api.login(data)
            if(res.data.user) {
                this.$store.commit('login/SET_TOKEN', res.data.user.token)
                sessionStorage.setItem('token', res.data.user.token)
                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                this.$store.commit('login/SET_USER_INFO', res.data.user)
                // this.$message({
                //     message: '恭喜你，登录成功',
                //     type: 'success'
                // });
                this.$router.replace('/ref')
            } else {
                if(res.data.message == '此手机号未注册' || res.data.message == '手机号格式不对') {
                    this.error1 = res.data.message
                } else if(res.data.message == "密码错误") {
                    this.error2 = res.data.message
                }
            }
        },
        check() {
            if(!this.name || this.name.length==0) {
                this.error1 = '请输入正确的账号/手机号'
                return false
            } else if(!this.password || this.password.length==0) {
                this.error2 = '请输入正确的密码'
                return false
            } 
            // else if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(this.name))) {
            //     this.error1 = '手机号格式不正确'
            //     return false
            // } 
            else {
                return true
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../style/color.stylus'
    .icon-mima
        font-size 19px
    .login 
        width 100% 
        height 100%
        background url('../../public/img/bg.jpg') no-repeat
        background-size 100% 100%
        display flex
        justify-content center
        align-items center
        position absolute
        top 0
        left 0
        z-index 999
    .login-box
        display flex
        .left
            display flex
            flex-direction column
            align-items center
            width 360px
            height 480px
            padding 102px 30px 49px 30px
            box-sizing border-box
            margin-right 10px
            background url('../../public/img/loginq.jpg') no-repeat
            background-size 100% 100%
            box-shadow 0px 13px 29px 0px rgba(5,16,65,0.5) 
            img 
                width 116px
                margin-bottom 24px
            p 
                color #fff
                font-size 16px
                font-weight 600
            .cp
                color #A6A6A6
                font-size 12px
                font-weight 400
            .mt 
                margin-top 132px
        .right 
            width 480px 
            height 480px
            box-shadow 0px 13px 29px 0px rgba(5,16,65,0.5)
            background rgba(255,255,255,1)
            opacity 0.85
            border-radius 8px
            padding 90px 103px 0
            box-sizing border-box
            h1 
                text-align center
                font-size 24px
                margin-bottom 50px
                color font-color-black
            .input 
                font-size 14px
                color rgba(153,153,153,1)
                width 100%
                margin-bottom 14px
                position relative              
                div
                    display flex
                    align-items center
                    border-bottom 2px solid font-color-light-g
                i
                    font-weight 600
                .onfocus
                    border-bottom 2px solid #454EFF
                    i  
                        color #454EFF
                .onerror
                    border-bottom 2px solid font-color-red
                    i  
                        color font-color-red
                input 
                    width 100%
                    border none
                    margin-left 14px
                    outline none
                    line-height 32px
                    height 32px
                    display block
                span 
                    position absolute
                    color #8E9099
                    font-size 14px
                    left 40px
                .blue
                    border-color #3577EC
                .red 
                    border-color #D82B0E
                .error 
                    color #D82B0E
                    font-size 12px
                    height 16px
                    line-height 16px
        .loginbtn 
            width 100%
            margin-bottom 20px
            color #fff
            font-weight bold
            font-size 16px
            border-radius 4px
        
        .abled
            background linear-gradient(90deg,rgba(41,105,219,1) 0%,rgba(28,92,208,1) 100%)
            box-shadow 0px 10px 14px 0px rgba(36,133,250,0.14)
        .abled:hover 
            background linear-gradient(90deg,rgba(74,135,243,1) 0%,rgba(37,104,226,1) 100%)
            box-shadow 0px 10px 14px 0px rgba(36,133,250,0.14)
        .disabled 
            background font-color-grey 

        .tool 
            display flex
            justify-content space-between
            font-size 14px
            p 
                color #454EFF
                cursor pointer
            p+p 
                color font-color-black
</style>
