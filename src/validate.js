// 固化、手机号格式验证
const validateContact = (rule, value, callback) => {
	// 若是非必填项且值为空，不做验证
	if (!rule.required && !value) {
		callback()
		return false
	}
	if (/^(((0\d{2,3})-)?(0\d{2,3})?\d{7,8}(-(\d{3,}))?)$/.test(value) || /^((1[3-9][0-9])+\d{8})$/.test(value)) {
		callback()
	} else {
		callback(new Error('格式不正确'))
	}
}
// 身份证号格式验证
const validateIdentityNumber = (rule, value, callback) => {
	if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value)) {
		callback(new Error('身份证号格式不正确'))
	} else {
		callback()
	}
}
export default {
	patientInfoValidate: {
		hzxm: [
			{ required: true, message: '请输入患者姓名', trigger: 'blur' }
		],
		jtdh: [
			{ validator: validateContact, required: true, message: '联系电话格式不正确！', trigger: 'blur' }
		],
		sfzh: [
			{ validator: validateIdentityNumber, required: true, message: '身份证号格式不正确！', trigger: 'blur' }
		],
		lxdh: [
			{ validator: validateContact, required: false, message: '联系电话格式不正确！', trigger: 'blur' }
		]
	},
	stopFollowUp: {
		cancleReason: [
			{ required: true, message: '请选择原因', trigger: 'change', type: 'number' }
		]
	}
}
