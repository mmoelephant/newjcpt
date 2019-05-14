import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
// const baseURL = '/api'
// const baseURL = '/'
<<<<<<< HEAD
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
const service3 = axios.create({
	baseURL: '/api',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
// const service2 = axios.create({
// 	baseURL: '/hui',
//     withCredentials: false,
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
// })
const formser = axios.create({
		baseURL: '/api',
=======
// console.log(process.env.NODE_ENV === 'development' )
const service = axios.create({ //hg
		baseURL: process.env.NODE_ENV === 'development'?'/api':'',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const service1 = axios.create({ //lw
	baseURL: process.env.NODE_ENV === 'development'?'/lw':'',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const service2 = axios.create({ //xb
	baseURL: process.env.NODE_ENV === 'development'?'/xb':'',
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
const formser = axios.create({ //hg
		baseURL: process.env.NODE_ENV === 'development'?'/api':'',
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
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
<<<<<<< HEAD
			return service.post('/PageUserController/login',data)
		},
		updata_user(data) {
			return service.post('/PageUserController/updateUserInfo',data)
=======
			return service2.post('/PageUserController/login',data)
		},
		updata_user(data) {
			return service2.post('/PageUserController/updateUserInfo',data)
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
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
		return service1.post('/PageAreaController/getAreaList', {pid:53})
<<<<<<< HEAD
		},
		// 材料列表
=======
    },
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
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
<<<<<<< HEAD
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
=======
	
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
	get_reports(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageReportController/findListByPage', data)
	},
	get_reports_detail(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
<<<<<<< HEAD
		return formser.post('/PageReportController/getReportInfoById', data)
=======
		return formser.post('/PageReportController/getReportById', data)
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
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
<<<<<<< HEAD
		// PageSubscriptionController
=======
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
	},
	delete_sub(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageSubscriptionController/delete',data)
	},
<<<<<<< HEAD
	sub_detail(data) {
		if(data) data = qs.stringify(data, { allowDots:true })
		return formser.post('/PageSubscriptionController/getInfoById',data)
	},
=======
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
	add_sub(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/PageSubscriptionController/add',data)
	},
<<<<<<< HEAD
=======
	
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
	get_help_detail(data) {
		if(data) data = qs.stringify(data, { allowDots: true })
		return formser.post('/pageHelperController/getArtInfo', data)
	},
	get_msg(data) {
<<<<<<< HEAD
		// if(data) data = qs.stringify(data, { allowDots: true })
		return service3.post('/PageMessageController/getMessage', data)
	},
	delete_msg(data) {
		return service3.post('/PageMessageController/delMessage', data)
=======
		return service.post('/PageMessageController/getMessage', data)
	},
	delete_msg(data) {
		return service.post('/PageMessageController/delMessage', data)
>>>>>>> b1cae310e0ec25101301a74dec51513412a76d10
	}
}

export default api