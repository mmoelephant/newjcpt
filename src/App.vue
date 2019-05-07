<template>
	<div id="app">
		<el-container>
            <el-header class='header'>
                <div class='left'>
                    <img src='../public/img/loginlogo.png'>
                    <p>云南省建设工程材料及设备价格监测系统</p>
                </div>
                <div class='right'>
                    <p>回到首页</p>
                    <i></i>
                    <p class='blue'>退出登录</p>
                </div>
            </el-header>
            <el-container style='height:100%'>
                <el-aside width="200px" class='side'>
					<div class='userinfo'>
						<img src='../public/img/default.png'/>
						<h1>userName</h1>
						<p>userCompany</p>
					</div>
                    <el-menu
                        :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        background-color="#fff"
                        text-color="#8E9099"
                        router>
                        <el-menu-item  :index="item.router" v-for='(item, index) in navList' :key='index'>
                            <i :class="'iconfont navicon' + ' ' + item.icon"></i>
                            <template slot="title" >
                                <span style='margin-right:48px'>{{item.name}}</span>
								<i class='iconfont icon-shang-copy arrow'></i>
                            </template>
							
                        </el-menu-item >
                    </el-menu>
                </el-aside>
                <el-main class='main'>
                    <router-view ></router-view>
                </el-main>
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
                    router: '/'
                }, {
                    name: '智能报告',
                    icon: 'icon-baogaoshoucang',
                    router: '/season-data'
                }, {
                    name: '数据订阅',
                    icon: 'icon-dingyue',
                    router: '/year-data'
                }, {
                    name: '帮助中心',
                    icon: 'icon-bangzhu',
                    router: '/analysis-report'
                }, {
                    name: '账户设置',
                    icon: 'icon-setting',
                    router: '/setting'
                }
            ],
            mainHeight: 0
        };
    },
}
</script>

<style lang='stylus'>
	@import './style/color.stylus'
	#app 
		height 100%
	.header 
		display flex
		justify-content space-between
		align-items center
		padding 17px 80px !important
		background #fff
		height 68px !important
		line-height 68px !important
		box-shadow 0px 8px 14px 0px rgba(33,58,233,0.1)
		.left 
			display flex
			align-items center
			img 
				height 34px
				margin-right 6px
			p 
				font-size 18px
				font-weight bold
				color font-color-black
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
				color tag-color
	.side
		box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
	.userinfo
		display flex
		flex-direction column
		align-items center
		background #fff
		box-shadow 0px 8px 14px 0px rgba(33,58,233,0.05)
		padding-top 52px
		img 
			width 100px
			height 100px
			border-radius 50%
		h1 
			color font-color-dark
			font-size 20px
			margin-top 20px
		p 
			color font-color-grey
			font-size 12px
			margin-bottom 55px
	.el-menu
		border none !important
		.iconfont
			font-size 22px 
			margin-right 15px
		.el-menu-item
			font-size 16px !important
		.el-menu-item.is-active 
			color #fff
			background -webkit-linear-gradient(left,#61e0ff,#6439f8) /* Safari 5.1-6.0 */
			background -o-linear-gradient(right,#61e0ff,#6439f8) /* Opera 11.1-12.0 */ 
			background -moz-linear-gradient(right,#61e0ff,#6439f8) /* Firefox 3.6-15 */
			background linear-gradient(to right,#61e0ff,#6439f8) /* 标准语法 */
		.el-menu-item:hover 
			background #B7BFFF !important
			color #fff!important
			.iconfont 
				color #fff
		.el-menu-item.is-active:hover 
			background -webkit-linear-gradient(left,#61e0ff,#6439f8) !important/* Safari 5.1-6.0 */
			background -o-linear-gradient(right,#61e0ff,#6439f8)!important /* Opera 11.1-12.0 */ 
			background -moz-linear-gradient(right,#61e0ff,#6439f8)!important /* Firefox 3.6-15 */
			background linear-gradient(to right,#61e0ff,#6439f8)!important /* 标准语法 */
			.iconfont 
				color #fff
		.arrow
			font-size 10px
			color #fff
</style>
