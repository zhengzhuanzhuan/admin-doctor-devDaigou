import { fetch } from './fetch'
import axios from 'axios'
// 登录
export const Login = {
    login (data) {
        return fetch('post', '/sso/login', data)
    },
    logout (data) {
        return fetch('get', '/sso/logout', data)
    }
}
// 首页
export const homePage = {
    public (data) {
        return fetch('get', '/manage/statistics/public', data)
    },
    // 疾病分布
    distribution (data) {
        return fetch('get', '/manage/statistics/disease/distribution', data)
    },
    // 关注患者
    patient (data) {
        return fetch('get', '/manage/attention/patient', data)
    },
    // 门诊情况分析
    outpatient (data) {
        return fetch('get', '/manage/outpatient', data)
    },
    // 住院情况分析
    hospitalization (data) {
        return fetch('get', '/manage/hospitalization', data)
    },
    // 治疗情况分析
    treatment (data) {
        return fetch('get', '/manage/treatment', data)
    },
    // 随访情况统计
    statistics (data) {
        return fetch('get', '/manage/followup/statistics', data)
    },
    // 随访异常指标情况分析
    abnormalTarget (data) {
        return fetch('get', '/manage/abnormalTarget', data)
    }
}
// 门诊统计详情
export const outpatientDetail = {
    // 医生接诊量排行
    ranking (data) {
        return fetch('post', '/manage/doctor/ranking', data)
    },
    // 疾病分布,每日就诊统计分析
    analysis (data) {
        return fetch('post', '/manage/outPatient/analysis', data)
    }
}
// 住院统计详情
export const hospital = {
    analysis (data) {
        return fetch('post', '/manage/hospitalization/analysis', data)
    }
}
// 随访统计
export const followCollect = {
	followList (data) {
		return fetch('post', '/manage/followup/list', data)
	},
	// 根据随访类型id,获取随访方案
	followSchemes (data) {
		return fetch('post', '/manage/schemes/list', data)
	}
}
// 治疗情况分析详情
export const Treatment = {
	// 统计分析条件模板块接口
    templateList (data) {
        return fetch('get', '/manage/upmsAnalysisTemplate/list', data)
    },
    create (data) {
        return fetch('post', '/manage/upmsAnalysisTemplate/create', data)
    },
	update (data) {
		return fetch('post', '/manage/upmsAnalysisTemplate/update', data)
	},
    delete (data) {
        return fetch('get', '/manage/upmsAnalysisTemplate/delete/' + data.id, {})
    },
	// 图表块数据
	anlysis (data) {
		return fetch('post', '/manage/treatmentAnalysis', data)
	},
	tableData (data) {
		return fetch('post', '/manage/treatmentAnalysis/list', data)
	},
	export (data) {
		return fetch('post', '/manage/export/report', data)
	}
}
// 异常指标分析
export const abnormalIndex = {
	// 图表块数据
	anlysis (data) {
		return fetch('post', '/manage/abnormal/target/analysis', data)
	},
	tableData (data) {
		return fetch('post', '/manage/abnormal/target/list', data)
	}
}
export const schemeManage = {
	// 用户相关的方案
	relatedSchemeList (data) { // todo to check
		return fetch('get', '/manage/user/schemes', data)
	},
	relatedSchemeIndexList (data) { // todo to check
		return fetch('get', '/manage/user/targets', data)
	}
}
// 随访
export const followManage = {
    // 随访类型
    followType (data) { // todo to check
		return fetch('get', '/manage/visitPlanType/list', data)
    },
    // 通话状态
    callStatus (data) { // todo to check
		return fetch('get', '/manage/upmsParamData/list', data)
	}
}
// 组织
export const organizeManage = {
    // 带数据权限的组织
    orgAuthList (data) {
        return fetch('get', '/manage/upmsOrganization/user/organization', data)
	}
}
// 用户
export const userManage = {
    // 关联的用户列表
    relatedUserList (data) {
        return fetch('get', '/manage/upmsUser/userUserList', data)
	},
	// 用户关联的用户
	manageUser (data) {
		return fetch('get', '/manage/user/user', data)
	}
}
// 疾病管理
export const diseaseManage = {
    list (data) {
        return fetch('get', '/manage/upmsDisease/list', data)
	},
	newList (data) {
		return fetch('get', '/manage/disease/info', data)
	}
}
// 患者管理
export const patientManage = {
	list (data) {
		return fetch('get', '/manage/doctorPatientInfo/list', data)
	},
	update (data) {
		return fetch('post', '/manage/doctorPatientInfo/update', data)
	},
	getRepeatTask (data) {
		return fetch('post', '/manage/doctorPatientInfo/task', data)
	},
	// 根据患者id查询诊断档案历史时间
	getRecordDate (data) {
		return fetch('post', '/manage/doctorPatientInfo/recordDate', data)
	},
	getRecordDetail (data) {
		return fetch('post', '/manage/patientRecord/recordByDate', data)
	},
	getPatientBaseInfo (data) {
		return fetch('get', '/manage/doctorPatientInfo/info', data)
	},
	// 关注
	foucsAdd (data) {
		return fetch('post', '/manage/upmsFocus/add', data)
	},
	// 取消关注
	foucsDelete (data) {
		return fetch('post', '/manage/upmsFocus/delete', data)
	}
}
export const systemParamManage = {
	list (data) {
		return fetch('get', '/manage/upmsParamData/list', data)
	}
}
export const planList = {
	// 批量终止传计划id
	batchEndPlay (data) {
		return fetch('post', '/manage/visitFollowupPlan/batchCanclePlanIds', data)
	},
	// 批量终止所有页--传查询条件
	batchCancleAll (data) {
		return fetch('post', '/manage/doctorFollowupPlan/batchCancleAll', data)
	},
	planList (data) {
		return fetch('get', '/manage/doctorFollowupPlan/list', data)
	},
	// 查看
	followPlanDetail (data) {
		return fetch('get', '/manage/visitFollowupPlan/info/' + data.id, {})
	}
}
// 随访记录
export const followRecord = {
	list (data) {
		return fetch('get', '/manage/doctorFollowupRecord/list', data)
	},
	// 随访记录详情顶部信息--未使用
	getTopRecord (data) {
		return fetch('post', '/manage/doctorFollowupRecord/getTopRecord', data)
	},
	// 随访记录详情-查询具体的随访执行计划的结果
	recordResult (data) {
		return fetch('post', '/manage/doctorFollowupRecord/recordResult', data)
	},
	// 随访记录详情-人工外呼
	view (data) {
		return fetch('post', '/manage/doctorFollowupRecord/view', data)
	},
	// 提交处理意见
	updateDiseaseInfo (data) {
		return fetch('post', '/manage/doctorFollowupRecordCall/updateDiseaseInfo', data)
	},
	// 点击 人工外呼，弹出框的记录列表块数据
	getFollowDetail (data) {
		return fetch('post', '/manage/doctorFollowupRecord/view', data)
	},
	// 人工外呼语音记录列表
	calloutlist (data) {
		return fetch('post', '/manage/doctorFollowupRecord/calloutlist', data)
	},
	// 一键拨打
	manualOutbound (data) {
		return fetch('post', '/manage/doctorFollowupRecordCall/manualOutbound', data)
	},
	saveFollow (data) {
		return fetch('post', '/manage/doctorFollowupRecordCall/submit', data)
	}
}
export const postExportExcelFunc = function (data, url, exportName = '导出') {
	// console.log(data);
	axios({ // 用axios发送post请求
		method: 'post',
		url: url, // 请求地址
		data: data, // 参数
		responseType: 'blob', // 表明返回服务器返回的数据类型
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => {
		// console.log(res);
		const blob = new Blob([res.data], {
			type: res.headers['Content-Type']
		})
		const fileName = exportName + '.xls'
		const elink = document.createElement('a')
		elink.download = fileName
		elink.style.display = 'none'
		elink.href = URL.createObjectURL(blob)
		document.body.appendChild(elink)
		elink.click()
		URL.revokeObjectURL(elink.href) // 释放URL 对象
		document.body.removeChild(elink)
	})
}
