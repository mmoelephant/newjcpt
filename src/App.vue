<template>
	<div id="app" v-title data-title="云南省建设工程材料及设备价格监测系统">
		<el-container class="el-container">
            <el-header class='header'>
                <div class='left'>
                    <img src='../public/img/loginlogo.png'>
                    <p>云南省建设工程材料及设备价格监测系统</p>
					<div class='nav'>
						<div :class='$route.path == "/ref"?"act":""' @click='$router.push("/ref")'>
							<img src='../public/img/数据灰色.png' v-if='$route.path == "ref"'/>
							<img src="../public/img/数据选中.png" alt="" v-else>
							<p>数据查询</p>
						</div>
						<div :class='$route.path == "/reportIndex"?"act":""' @click='$router.push("/reportIndex")'>
							<img v-if='$route.path == "reportIndex"'/>
							<img src="" alt="" v-else>
							<p>智能报告</p>
						</div>
					</div>
                </div>
                <div class='right'>
                    <p @click='$router.push("/")'>回到首页</p>
                    <i></i>
                    <p class='blue' @click='logout'>{{token&&token.length>0?'退出登录':'登录'}}</p>
                </div>
            </el-header>
<<<<<<< HEAD
            <el-container style='height:100%;flex-direction:column;'>
				<router-view style="height:100%"></router-view>
				<!-- <p class='ba'>云南省建设工程材料及设备价格监测系统</p>
				<p class='ba'>滇公网安备 5301110011230  备案编号：滇ICP备16100321号  Copyright 2018-2019 版</p> -->
=======
            <el-container style='height:100%;flex-direction:column'>
				<router-view></router-view>
>>>>>>> 0f10fe31d153b42e72de870fd68dee1dd2fdb734
            </el-container>
        </el-container>
	</div>
</template>

<script>
export default {
	name: 'app',
	data() {
        return {
            navList: [
                // {
                //     name: '我的首页',
                //     icon: 'iconshouye',
                //     router: '/'
                // }, 
                {
                    name: '数据查询',
                    icon: 'icon-shuju',
                    router: '/ref'
                }, {
                    name: '智能报告',
                    icon: 'icon-baogaoshoucang',
                    router: '/reportIndex'
				}, 
				// {
                //     name: '数据订阅',
                //     icon: 'icon-dingyue',
                //     router: '/dataIndex'
				// }, 
				// {
                //     name: '帮助中心',
                //     icon: 'icon-bangzhu',
                //     router: '/help'
				// }, 
				{
                    name: '账户设置',
                    icon: 'icon-setting',
                    router: '/setting'
                }
            ],
			mainHeight: 0,
			defaultimg:'this.src="'+ require('../public/img/head.png') +'"'
        };
	},
	computed:{
		user() {
			return this.$store.state.login.userInfo
		},
		token() {
			return this.$store.state.login.token
		},
		route() {
			return this.$route.path
		}
	},
	watch: {
		user:{
			handler(val) {
				console.log(val)
			},
			deep:true
		},
		route(val) {
			console.log(val)
		}
	},
	created() {
		const token = sessionStorage.getItem('token')
		const user = JSON.parse(sessionStorage.getItem('user'))
        if(token && token.length>0 && user && user.phone) {
            this.$store.commit('login/SET_TOKEN', token)
            this.$store.commit('login/SET_USER_INFO', user)
        } else {
            this.$store.commit('login/SET_TOKEN', '')
            this.$store.commit('login/SET_USER_INFO', '')
            sessionStorage.removeItem('token')
			sessionStorage.removeItem('user')
			
			if(this.$route.path == '/') {
			} else {
				this.$router.push('/login')
			}
			
        }
	},
	methods:{
		logout() {
			this.$store.commit('login/SET_TOKEN', '')
            this.$store.commit('login/SET_USER_INFO', '')
            sessionStorage.removeItem('token')
			sessionStorage.removeItem('user')
			this.$router.push('login')
		}
	}
}
</script>

<style lang='stylus'>
	@import './style/color.stylus'
	#app 
		height 100%
	.el-container
		height 100%
		background-color #F6F7FE
		padding 0
	.header 
		display flex
		justify-content space-between
		align-items center
		padding 0 80px !important
		background #fff
		height 78px !important
		box-shadow 0px 8px 14px 0px rgba(33,58,233,0.1)
		box-shadow 0px 8px 14px 0px rgba(33,58,233,0.1)
		position relative
		z-index 999
		.left 
			display flex
			align-items center
			height 100%
			img 
				height 34px
				margin-right 6px
			p 
				font-size 18px
				font-weight bold
				color font-color-black
			.nav
				display flex
				align-items center
				height 100%
				margin-left 105px
				div
					text-align center
					width 100px
					height 100%
					border-bottom 2px solid #fff
					box-sizing border-box
					padding 15px 0 10px 0
					cursor pointer
				img 
					width 32px
					margin 0
				p
					font-size 14px
					font-weight 400
					color #8E9099
				.act
					background #F6F7FE
					border-bottom 2px solid #635EF9
					p 
						color #635EF9
		.right 
			display flex
			align-items center
			p 
				font-size 14px
				font-weight 400
				color font-color-grey
				cursor pointer
			i 
				display block
				width 1px
				height 14px
				background rgba(102,102,102,1)
				margin 0 16px
			.blue 
				color #7F94FF
<<<<<<< HEAD
	.ba 
		width 100%
		font-size 14px
		font-family MicrosoftYaHei
		font-weight 400
		color #666
		text-align center
	.ba+.ba 
		font-size 12px
		color #999
		margin 20px 0 80px 0
</style>
=======
</style>
>>>>>>> 0f10fe31d153b42e72de870fd68dee1dd2fdb734
