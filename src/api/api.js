import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
// const test = 'http://192.168.8.20'
const test = 'http://182.247.245.27'
// const baseURL = '/api'
// const baseURL = '/'
// console.log(process.env.NODE_ENV === 'development' )
const service = axios.create({ //hg
		baseURL: process.env.NODE_ENV === 'development'?'/api':test+':9220',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const service1 = axios.create({ //lw
	baseURL: process.env.NODE_ENV === 'development'?'/lw':test+':9220',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const service2 = axios.create({ //xb
	baseURL: process.env.NODE_ENV === 'development'?'/xb':test+':9220',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const service3 = axios.create({
	baseURL: process.env.NODE_ENV === 'development'?'/api':test+':9220',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const formser = axios.create({ //hg
	baseURL: process.env.NODE_ENV === 'development'?'/api':test+':9440',
	withCredentials: false,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
// const formser = axios.create({ //hg
// 	baseURL: '/api',
// 	withCredentials: false,
// 	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
// })

service.interceptors.response.use(
    response => {
      return response
    },
    (error) => {
			alert('网络错误，请稍后重试')
			return Promise.reject(error)
    }
)
service1.interceptors.response.use(
	response => {
		return response
	},
	(error) => {
		alert('网络错误，请稍后重试')
		return Promise.reject(error)
	}
)
service2.interceptors.response.use(
	response => {
		return response
	},
	(error) => {
		alert('网络错误，请稍后重试')
		return Promise.reject(error)
	}
)
service3.interceptors.response.use(
	response => {
		return response
	},
	(error) => {
		alert('网络错误，请稍后重试')
		return Promise.reject(error)
	}
)
formser.interceptors.response.use(
	response => {
		return response
	},
	(error) => {
		alert('网络错误，请稍后重试')
		return Promise.reject(error)
		// console.log(
		// 	'fetch',
		// 	error.config.url,
		// 	error.config.params,
		// 	'error. error:',
		// 	error
		// )
		// return Promise.reject(error)
	}
)
const api = {
		//大屏接口
		get_cate_level1() {
			return service1.post('/PageMaterialController/getMaterialsInfoByRecent',{})
		},
		get_bg_line(data) {
			return service1.post('/PageMaterialController/getMaterialsInfoByAllCities',data)
		},
		get_bg_pie(data) {
			return service1.post('/PageMaterialController/getMaterialCount',data)
		},
		get_cate_num(data) {
			return service1.post('/PageMaterialController/getMaterialCount',data)
		},
		//登录
		login (data) {
			return service2.post('/PageUserController/login',data)
		},
		updata_user(data) {
			return service2.post('/PageUserController/updateUserInfo',data)
		},
		// 数据查询
		get_area_time_list(data,type) {
			if(type == 0) {
				return service1.post('/PageMaterialController/getMaterialsInfoByAreaEncapsulation',data)
			} else if(type==1) {
				return service1.post('/PageMaterialController/getMaterialsInfoByAreaQuarter',data)
			} else {
				return service1.post('/PageMaterialController/getMaterialsInfoByAreaYear',data)
			}
		},
		get_cate_time_list(data,type) {
			if(type == 0) {
				return service1.post('/PageMaterialController/getMaterialsInfoEncapsulation',data)
			} else if(type==1) {
				return service1.post('/PageMaterialController/getMaterialsInfoByQuarter',data)
			} else {
				return service1.post('/PageMaterialController/getMaterialsInfoByYear',data)
			}
		},
		get_yn_time_list(data,type) {
			if(type == 0) {
				return service1.post('/PageMaterialController/getMaterialsInfoByProvinceAreaEncapsulation',data)
			} else if(type==1) {
				return service1.post('/PageMaterialController/getMaterialsInfoByProvinceAreaQuarter',data)
			} else {
				return service1.post('/PageMaterialController/getMaterialsInfoByProvinceAreaYear',data)
			}
		},
    get_area(data={pid:53}) {
		return service1.post('/PageAreaController/getAreaList', data)
    },
    get_cate(data) {
		return service1.post('/PageMaterialController/getMaterialsClass', {})
		},
		//帮助
		get_help(data) {
			if(data) data = qs.stringify(data, { allowDots: true })
			return formser.post('/pageHelperController/findHelperByPage', data)
		},
		get_help_detail(data) {
			if(data) data = qs.stringify(data, { allowDots: true })
			return formser.post('/pageHelperController/getArtInfo', data)
		},
    get_cate_data(data) {
		return service.post('/PageMaterialController/getMaterialsInfo',data)
	},
	get_area_data(data) {
		return service.post('PageMaterialController/getMaterialsInfoByArea', data)
	},
	// 报告备注
	get_markList(data) {
		// if(data) data = qs.stringify(data, { allowDots:true })
		return service3.post('/PageReportRemarkController/findList', data)
	},
	add_mark(data){
		// if(data) data = qs.stringify(data, { allowDots:true })
		return service3.post('/PageReportRemarkController/add', data)
	},
	delete_mark(data) {
		// if(data) data = qs.stringify(data, { allowDots:true})
		return service3.post('/PageReportRemarkController/deleteRemark', data)
	},
	modify_mark(data) {
		return service3.post('/PageReportRemarkController/updateRemark', data)
	},
	get_reports(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/findListByPage', data)
	},
	get_reports_detail(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/getReportInfoById', data)
	},
	updata_report(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/updateReport', data)
	},
	add_report(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/addReport', data)
	},
	delete_report(data){
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/deleteReport', data)	
	},
	get_subscrib(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageSubscriptionController/findPage', data)
		// PageSubscriptionController
	},
	delete_sub(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageSubscriptionController/delete',data)
	},
	sub_detail(data) {
		if(data) data = qs.stringify(data, { allowDots:true })
		return formser.post('/PageSubscriptionController/getInfoById',data)
	},
	add_sub(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageSubscriptionController/add',data)
	},
	get_help_detail(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/pageHelperController/getArtInfo', data)
	},
	get_msg(data) {
		// if(data) data = qs.stringify(data, { allowDots: true })
		return service3.post('/PageMessageController/getMessage', data)
	},
	delete_msg(data) {
		return service3.post('/PageMessageController/delMessage', data)
	}
}

export default api