<template>
    <div class='cb'>
        <p class='t'>当前展示</p>
        <div class='b'>{{this.$store.state.bigscreen.cate_on.name}}</div>
        <div class='map'>

        </div>
        <img src="../../public/img/tem.png" alt="" class='tem'>
    </div>
</template>
<script>
import yn from '../../public/map/yunnan.json'
export default {
    data() {
        return {
            upsymbol:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI0RUE3QUE1NkZBQzExRTlBQUZGRjg0QjNFOTU1NDE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI0RUE3QUE2NkZBQzExRTlBQUZGRjg0QjNFOTU1NDE2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjRFQTdBQTM2RkFDMTFFOUFBRkZGODRCM0U5NTU0MTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjRFQTdBQTQ2RkFDMTFFOUFBRkZGODRCM0U5NTU0MTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6otKEhAAACIUlEQVR42rSXz2pTQRTGk4mF0Lho6qKkEpW2m0KhmJKYPoF1H3f6CL5Ut+5ETbvrriVpA4VCNwZiwP7ZVIQmBCSJ34HvyvWaOSe5Nz3wW1xm5nx3Zs7MOZMepz6kprAMWCerIA+ybBuAn+AKtMnQcvjIaBfnVVAGOU+fx6QIXoE+aIAT/tRESysz3gJ7dBrH7sEBuJh2xg684SyTmPxwDTwHdTCKikS/385BNGxl+nSasCztZmr+tknfE4VlTyuph7MKNf7Z4yz31bIVLt0aWOKx+QU6oAlujfGi8U2iPRCuKsdFbAG8BiU5CZHgfEKkrQUOwW+Pnxy1jhwvh7Ih+h7sRET/O5rs844+tWDLON5GOWN5ijPs5TNj20RrPRD2mVyPL2MEUonx4LMNES4oHbZjRnDa2L6CY2B4/yzB8VlT2pZdKMtMsnwC4SUt+Thj8DCBsDrWaamLl0Nc08YORPhO6dBOINxR2u4cKwefnScQbilt186Y1ZXhQBPVJtQOhPtKp6+gO4Nol2N81pNE4Rh9DSM698EZGCv9xuyzb0S0ZLFhkJ1OjIJOHH0Gp8yrLyJpscufvzFWo0etv/l4wLqoZgwUx58SBFw9OL7hC+TCWPKk1ghXnNGbS8rRywcQvaRvb7EnJehHBsC8rEmfI6uulg5fwHcm9FxMwR73dOqCPrznUpjtMuIXpxTsc5bHcZ8wvkfbU8+j7ccsj7Y/AgwA/LR3QT2Y9/gAAAAASUVORK5CYII=',
            downsymbol:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI1QjRBQjZCNkZBQzExRTlCOEM4QzVFNjM3MkE0REIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI1QjRBQjZDNkZBQzExRTlCOEM4QzVFNjM3MkE0REIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjVCNEFCNjk2RkFDMTFFOUI4QzhDNUU2MzcyQTREQjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjVCNEFCNkE2RkFDMTFFOUI4QzhDNUU2MzcyQTREQjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz556KrVAAACEElEQVR42rSXz0sCQRTH17FA2g5Wh7DoB9olEKLCsL+gutet/jmvdeznrVtiPyAIvCSUkNXFCFKEUHuvvgvrtjPP3dUHn4POzPvOzryZ9yZmdY+tPixOZMAMMUEk0NYiPogaUQFtyWFMEGbneSJH2FZ/1iRKRBGTCiycJbaJcSucfRHnxINf44jPf4rYwVdGMZ7wLrFAnBEdr4j3994ARN2Wg09lEualXbYGb8vw7SvMe7phDc82oNGzxwnsq2TTWLo0kcSx+SSeiGviXRjPGo8c7Y5wXjguo8QWsfZ7EnqDcwpw2x1xQXxr/NjQulS4HHKC6AGx7hH9fzT/+uzDpynY4gq3kS0sz1yAvZwXto21Mo6wzvh6XA0RSGuIB50tsXDK0GElZATHhO1LKQSGdmYRjk/a0DapXFnGzyYiCCdNyUcJg9sRhI1jlSl14XIIa6axLRauGzpUIgg/GdrqCpWDzu4jCN8Z2l6V8FU1wYFJ1PRBFUe4aeh0SlQDiFYxRmcNThQK0VcSorNA3BJdQ78u+hSEiOYs1nayU1Eo6NgRF2c3yKuLnrRYxeTfhNVoQKun2MuiRhqmHTnFn/sCeRCWPKqV3BWn9+bicrQ8BNEyfGuLPS5BDxEAg7Jr+OxIdTV3OCGekdDtkIIN1NN9F/TuPefCbBMRPxbgCcNfeRX2CaN7tM1qHm0vQR5tPwIMAEWMd77cFWV+AAAAAElFTkSuQmCC',
            cpsymbol:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI0MTU0RDM2NkZBQzExRTlBMDJBRDgxMDg5MDFCQUMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI0MTU0RDM3NkZBQzExRTlBMDJBRDgxMDg5MDFCQUMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjQxNTREMzQ2RkFDMTFFOUEwMkFEODEwODkwMUJBQzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjQxNTREMzU2RkFDMTFFOUEwMkFEODEwODkwMUJBQzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz62ELPCAAACHUlEQVR42rSXu0sDQRDGk1VBjIWPQlR8oDaCID4StbNTe+30n7O1EzVaKRYqUSOCkMaABnw1ikVCQKJ+A9/Jebg7ubs48CuO3Z1vH3M7s8nsyVWiDmsCo6QPdIJWtlXBG3gERVLTHDYr7eJ8HqRBytKnnQyAOVABOXDGSYUWngDLdBrG2sAimAX74KZeYQNWuMo4JhNeBUMgCz6DIsHvtQaI+i1Nn8YlLFs7nmi8jdP3n8JyppnE/1mGGr/OuJXnqlkPt24EdPC3eQd34By8KONF41ai3ROed/wuYi1gCUyDZCA4u4m05cEB+LD4SVHryPBySCuiG2AmIBq0JPus06cr2JoMb6OUsj0DIc5yUDk20Rr1hG0m1+NUhECaZjzYbEyEex0dJiNGcFI5vl7DwLDOLMbvM+Jo6zK+LPOXdcYQ7nAlH6MMrsUQdo41rtTFyyGqucZWRfjV0aEYQ/jO0fZqWDnY7DqGcN7R9mSUVT0qDlyirgUVPeGKo9MeKIUQLXGMzcqSKAyjL6dE5ya4BF+Ofl/ss6lEtGSxmpedzpSCThztgAvm1eFAWixx8s/KbpSp9ZOPq6yLVpWB4ng7RsBlvd/Xf4HcKFse13L+ijN4c0k5WvgH0QJ9W4s9KUG3GACNsnP6/NTqaumwC+6Z0FMRBcs807oLev+ZS2G2wIhvq1OwwlWeRn3CeNF+CI59j7Z+y6PtIcyj7VuAAQD2R3dP+C6jjgAAAABJRU5ErkJggg==',
            area:[{"id":"530100000000","name":"昆明","level":"2","pid":"53","geocode":"102.832891,24.880095"},{"id":"530300000000","name":"曲靖","level":"2","pid":"53","geocode":"103.796167,25.489999"},{"id":"530400000000","name":"玉溪","level":"2","pid":"53","geocode":"102.546543,24.352036"},{"id":"530500000000","name":"保山","level":"2","pid":"53","geocode":"99.161761,25.112046"},{"id":"530600000000","name":"昭通","level":"2","pid":"53","geocode":"103.717465,27.338257"},{"id":"530700000000","name":"丽江","level":"2","pid":"53","geocode":"100.227750,26.855047"},{"id":"530800000000","name":"普洱","level":"2","pid":"53","geocode":"100.966512,22.825065"},{"id":"530900000000","name":"临沧","level":"2","pid":"53","geocode":"100.079583,23.877573"},{"id":"532300000000","name":"楚雄","level":"2","pid":"53","geocode":"101.528068,25.045532"},{"id":"532500000000","name":"红河","level":"2","pid":"53","geocode":"103.374799,23.363130"},{"id":"532600000000","name":"文山","level":"2","pid":"53","geocode":"104.216248,23.400733"},{"id":"532800000000","name":"西双版纳","level":"2","pid":"53","geocode":"100.797777,22.007351"},{"id":"532900000000","name":"大理","level":"2","pid":"53","geocode":"100.267638,25.606486"},{"id":"533100000000","name":"德宏","level":"2","pid":"53","geocode":"98.584895,24.433353"},{"id":"533300000000","name":"怒江","level":"2","pid":"53","geocode":"98.853097,25.852547"},{"id":"533400000000","name":"迪庆","level":"2","pid":"53","geocode":"99.702234,27.818882"}],
            CoordMap:[],
            chart:null
        }
    },
    computed:{
        cate() {
            return this.$store.state.bigscreen.cate_on
        }
    },
    watch:{
        cate:{
            handler(val) {
                if(val.barData) {
                    this.chart.dispose()
                    this.init_map(val.barData)
                } else {
                    this.get_bar_data()
                }
            },
            deep: true
		},
    },
    created() {
    },
    mounted() {
        
    },
    methods:{
        async get_bar_data() {
            const data = {
                id:this.cate.cid,
                monthNumber:1,
            }
            const res = await this.$api.get_bg_line(data)
			let cate_list = this.$store.state.bigscreen.cate_list
			cate_list.forEach(item => {
				if(item.cid == this.cate.cid) {
					item.barData = res.data.data
				}
            })
            res.data.data.filter(d => {
                this.area.forEach(a => {
                    if(a.id == d.area) {
                        d.city = a.name
                    }
                })
                
            }) 
            this.init_map(res.data.data)
            this.$store.commit('bigscreen/SET_CATE_LIST', cate_list)
        },
        init_map(data) {
            const arr = yn.features
            this.CoordMap = []
            arr.forEach(item => {
                data.forEach(d => {
                    let symbol=''
                    if(item.properties.name == d.city) {
                        if(Number(d.huanbi)>0) {
                            symbol = 'image://'+this.upsymbol
                        } else if(Number(d.huanbi)<0) {
                            symbol = 'image://'+this.downsymbol
                        } else {
                            symbol = 'image://'+this.cpsymbol
                        }
                        this.CoordMap.push({
                            name: item.properties.name, 
                            coord:item.properties.dot, 
                            symbol:symbol
                        })
                    }
                })
            })      
            this.$echarts.registerMap('yn', yn);
            this.chart =  this.$echarts.init(document.getElementsByClassName('map')[0]);
            // if(chart) chart.dispose()
            // const geoCoordMap = this.CoordMap
            this.chart.setOption({
                series: [{
                    type: 'map',
                    top:80,
                    left:80,
                    right:80,
                    bottom:50,
                    map: 'yn',
                    markPoint:{
                        data:this.CoordMap,
                        // symbol: function(par) {
                        //     console.log(par)
                        // },//'image://https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png',
                        symbolSize:20,
                        silent:true,
                        symbolOffset:['100%', '-120%']
                    },
                    aspectScale:1.1,
                    itemStyle: {
                        normal: {
                            show:true,
                            label: {
                                show: true,//默认是否显示省份名称  
                                color:'#fff',//修改字体颜色
                                fontSize:20,
                            },
                            areaColor:'rgba(0,0,0,0)',//设置背景颜色
                            areaStyle:{
                                color:'red',
                            },
                            borderWidth:2,
                            borderColor:'#43bcff',//设置边框颜色
                        },
                        emphasis: {//鼠标移入动态的时候显示的默认样式
                            show:false,
                            label: {
                                show: true,//选中状态是否显示省份名称
                                color:'#fff',//修改字体颜色
                                fontSize:'20' 
                            },
                            textStyle:{
                                color:'#fff',
                            },
                            areaColor:'rgba(0,0,0,0)',
                        },
                    },
                }],
            });
        },
    }
}
</script>
<style lang="stylus" scoped>
@import '../style/px2vh.stylus'
    .cb
        width px2vw(880)
        height 100% 
        padding-top px2vh(88)
        box-sizing border-box
        display flex
        flex-direction column
        align-items center
        position relative
        .t 
            font-size 16px
            font-family MicrosoftYaHei-Bold
            font-weight bold
            color rgba(85,253,253,1)
        .b 
            width px2vw(320)
            height px2vh(52)
            line-height px2vh(52)
            text-align center
            margin-top 17px
            font-size px2vh(22)
            font-family MicrosoftYaHei-Bold
            font-weight bold
            color rgba(85,253,253,1)
            text-shadow 0px 0px 10px rgba(85,227,253,0.4)
            background url('../../public/img/sb.png') no-repeat
            background-size 100% 100%
        .map
            width 100% 
            height 100%
            div 
                width 100% 
                height 100%
    .tem  
        width 180px
        position absolute
        right 10px
        top px2vh(820)
</style>
