import axios from 'axios'
import qs from 'qs'
// import Cookies from 'js-cookie'

let JsonData = [
	'/manage/doctorFollowupRecordCall/submit',
	'/manage/doctorFollowupRecordCall/manualOutbound'
]
// post multipart/form-data格式上传的接口
let FormData = [
]
// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        let flag = 0
        for (let item of JsonData) {
            if (config.url.indexOf(item) !== -1) {
                flag++
                break
            }
        }
        let flagSecond = 0
        for (let item of FormData) {
            if (config.url.indexOf(item) !== -1) {
                flagSecond++
                break
            }
        }
        // 在发送请求之前做些什么
        if (flag > 0) {
            config.headers = {
                'Content-Type': 'application/json;charset=utf-8'
            }
        } else if (flagSecond > 0) {
            config.headers = {
                // 'Content-Type': 'multipart/form-data;charset=utf-8'
                // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary04KoNV9lwMWGnAq1'
            }
        } else {
            config.data = qs.stringify(config.data)
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }
        // 设置cookie
        config.params = config.params || {}
        // config.params['rs-upms-server-session-id'] = Cookies.get('rs-upms-server-session-id') // todo to check
        config.params['rs-upms-server-session-id'] = sessionStorage.getItem('rsysSessionId')
        return config
    },
    function (error) {
    // 对请求错误做些什么
        return Promise.reject(error)
    }
)
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
}
/**
 * @function 请求状态码检测
 * @param  {type} response {description}
 * @return {type} {description}
 */
const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const errortext = codeMessage[response.status] || response.statusText
    window.RSYS.$Message.warning(
        `请求错误 ${response.status}: ${response.url},${errortext}`
    )
    const error = new Error(errortext)
    error.name = response.status
    error.response = response
    throw error
}
/* 返回一个Promise(发送post请求) */
export const fetch = (type, url, params) => {
    return new Promise((resolve, reject) => {
        let data = type === 'get' ? { params: params } : params
        axios[type](url, data)
            .then(checkStatus)
            .then(response => {
            	// todo logout接口的传参
            	if (response.data === '' || response.data.code === 10107 || (typeof response.data === 'string' && response.data.indexOf('DOCTYPE') !== -1)) {
                    sessionStorage.setItem('rsysSessionId', '')
                    window.RSYS.$router.push('/login')
                    return false
                }
                if (response.data.code === undefined) {
                    response.data = JSON.parse(response.data)
                }
                let code
                window.RSYS.$Spin.hide()
                try {
                    code = response.data.code
                } catch (error) {
                    resolve(response.data)
                }
                if (code === 2 || code === 21) {
                    window.RSYS.$router.push('/login')
                } else if (code === 0) {
                    resolve(response.data)
                } else {
                	if (response.message || response.data.message) {
                        window.RSYS.$Message.warning(response.message || response.data.message)
                    } else {
                		// 解决长时间不使用(登录超时？？？)导致请求302，跳转至登录页重新登录
                        sessionStorage.setItem('rsysSessionId', '')
                        window.RSYS.$router.push('/login')
                    }
                    reject(response)
                }
            })
    })
}

// 需要额外传类似get方式传参的时候用上
export const putParamsFormat = (url, idKey, data) => {
    let str = url + '/?'
    if (idKey) {
        str = url + '/' + data[idKey] + '?'
    }
    for (const key in data) {
        str += key + '=' + (data[key] ? data[key] : '') + '&'
    }
    return fetch('put', str, {})
}

// 需要额外传类似get方式传参的时候用上
export const dataFormFormat = (type, url, idKey, data, dataFormData) => {
    let str = url + '/?'
    if (idKey) {
        str = url + '/' + data[idKey] + '?'
    }
    for (const key in data) {
        str += key + '=' + (data[key] ? data[key] : '') + '&'
    }
    return fetch(type, str, dataFormData)
}

if (process.env.NODE_ENV === 'development') {
    // axios.defaults.baseURL = 'http://192.168.1.218:9011'
    // axios.defaults.baseURL = 'http://192.168.1.215:8011'
    // axios.defaults.baseURL = 'http://192.168.3.25:8001'
    // axios.defaults.baseURL = 'http://192.168.3.29:8001'
    // axios.defaults.baseURL = 'http://192.168.3.69:8001'
}
