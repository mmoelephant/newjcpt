<template>
	<div id="app" v-title data-title="云南省建设工程材料及设备价格监测系统">
		<el-container class="el-container">
            <el-header class='header'>
                <div class='left'>
                    <img src='../public/img/loginlogo.png'>
                    <p>云南省建设工程材料及设备价格监测系统</p>
					<div class='nav'>
						<div :class='route == "/ref"?"act":""' @click='$router.push("/ref")'>
							<img src='../public/img/数据选中.png' v-if='route == "/ref"'/>
							<img src="../public/img/数据灰色.png" alt="" v-if='route !="/ref"'>
							<p>数据查询</p>
						</div>
						<div :class='route == "/reportIndex"?"act":""' @click='$router.push("/reportIndex")'>
							<img v-show='route == "/reportIndex"' src='../public/img/报告选中.png'/>
							<img src="../public/img/报告灰.png" alt="" v-show='route != "/reportIndex"'>
							<p>智能报告</p>
						</div>
					</div>
                </div>
                <div class='right'>
                    <p @click='$router.push("/")'>回到首页</p>
                    <i></i>
                    <p class='blue' @mouseenter="show=true" @mouseleave="show=false">{{token&&token.length>0?'设置中心':'登录'}}</p>
					<div class='set' v-show='show' @mouseenter="show=true" @mouseleave="show=false">
						<p @click='goset'>账户设置</p>
						<p @click='logout'>退出登录</p>
					</div>
                </div>
            </el-header>
            <el-container style='height:100%;flex-direction:column'>
				<router-view></router-view>
				<p class='ba'>云南省建设工程材料及设备价格监测系统</p>
				<p class='ba'>滇公网安备 5301110011230  备案编号：滇ICP备16100321号  Copyright 2018-2019 版权所有 昆明行列科技有限公司</p>
            </el-container>
        </el-container>
		<el-dialog
			title="账户设置"
			:visible.sync="dialogVisible"
			width="30%">
			<el-form :model="formInline" style='width:50%;padding-top:50px;margin:0 auto' label-width="40px">
				<el-form-item label="姓名">
					<el-input v-model="formInline.name"></el-input>
				</el-form-item>
				<el-form-item label="地区">
					<el-input v-model="formInline.location"></el-input>
				</el-form-item>
				<el-form-item label="单位">
					<el-input v-model="formInline.unit"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="save">保存修改</el-button>
				<el-button @click="dialogVisible= false">取消</el-button>
			</span>
		</el-dialog>
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
			defaultimg:'this.src="'+ require('../public/img/head.png') +'"',
			show:false,
			dialogVisible:false,
			formInline:{}
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
		},
		hh() {
			if(this.token&&this.token.length>0) {
				this.show = !this.show
			} else {
				this.$router.push('/login')
			}
		},
		goset() {
			this.formInline = {
				name: this.$store.state.login.userInfo.name,
				location: this.$store.state.login.userInfo.location,
				unit: this.$store.state.login.userInfo.unit
			}
			this.dialogVisible = true
		},
		async save() {
			const res = await this.$api.updata_user(this.formLabel)
			if(res.data.user) {
                this.$store.commit('login/SET_USER_INFO', res.data.user)
                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
            }
		},

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
		padding 0 30px !important
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
			position relative
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
			.set
				position absolute
				top 20px
				left 55px
				width 120px
				background #fff
				border 1px solid rgba(237,240,242,1)
				box-shadow 0px 6px 10px 0px rgba(70,74,78,0.12)
				border-radius 4px
				color #8E9099
				font-size 14px
				text-align center
				line-height 42px
				p:hover
					background #EFF2FC
					color #637CFB



</style>
