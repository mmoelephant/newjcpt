import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
// const baseURL = '/api'
// const baseURL = '/'
const service = axios.create({
	baseURL: '/api',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const service1 = axios.create({
	baseURL: '/lw',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const formser = axios.create({
		baseURL: '/api',
    withCredentials: false,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

service.interceptors.response.use(
    response => {
      return response
    },
    (error) => {
      console.log(
        'fetch',
        error.config.url,
        error.config.params,
        'error. error:',
        error
      )
      return Promise.reject(error)
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
			return service.post('/PageUserController/login',data)
		},
		updata_user(data) {
			return service.post('/PageUserController/updateUserInfo',data)
		},
		// 数据查询
		get_cate_time_list(data) {
			return service1.post('/PageMaterialController/getMaterialsInfoEncapsulation',data)
		},
		get_area_time_list(data) {
			return service1.post('/PageMaterialController/getMaterialsInfoByAreaEncapsulation',data)
		},
		get_yn_time_list(data) {
			return service1.post('/PageMaterialController/getMaterialsInfoByProvinceAreaEncapsulation',data)
		},
    get_area(data) {
		return service.post('/PageAreaController/getAreaList', {pid:53})
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
	
	get_reports(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/findListByPage', data)
	},
	get_reports_detail(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/getReportById', data)
	},
	updata_report(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/updateReport', data)
	},
	add_report(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/addReport', data)
	},
	get_subscrib(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageSubscriptionController/findPage', data)
	},
	delete_sub(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageSubscriptionController/delete',data)
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
		return service.post('/PageMessageController/getMessage', data)
	},
	delete_msg(data) {
		return service.post('/PageMessageController/delMessage', data)
	}
}

export default api