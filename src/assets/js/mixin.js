// import {API} from '@/serve'
// import { mixinAPI } from 'HNDC_API/mixin_dialog'
// import { CommonAPI } from 'HNDC_API/common'
// import { mapGetters } from 'vuex';
const mixin = {
	data () {
		return {
			userId: sessionStorage.getItem('rsysUserId'),
			token: sessionStorage.getItem('rsysUserId')
		}
  },
  methods: {
    /**
     * 获取弹框患者个人信息(刷新特别关注的标签)
     * @function getPatientInfo
     * @param {String} adminId 医生id
     * @param {String} visitOrderId visitOrderId
     * @param {String} patientId 患者id
     */
    async getPatientInfo (userId = this.userId, patientId = this.patientId, visitOrderId = this.visitOrderId) {
      this.baseData = ''
      // eslint-disable-next-line no-return-await
      return await this.$API.patientManage.getPatientBaseInfo({ id: patientId, UserId: this.userId })
    },
    /**
     * @function 取消关心
     * @return {type} {description}
     */
    cancelSpecial () {
      this.$msgbox({
        title: '消息',
        message: '确定取消关心吗',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          done()
        }
      })
        .then(action => {
          // 取消关注
					this.$API.patientManage.foucsDelete({
						userId: this.token,
						patientId: this.patientId,
						focusTag: '',
						focus: 0 // (操作类型 1:关注 0：取消关注) （必填）
          })
            .then(res => {
              this.$emit('refreshData')
              this.baseData.focusTag = ''
							this.baseData.focus = 0
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * @function 添加关注
     * @return {type} {description}
     */
    addSpecial () {
      this.$prompt('请填写关注标签（不超过20个字符）', '添加关注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '不得超过20个字'
      }).then(({ value }) => {
        if (value.trim().length > 20 || value.trim().length === 0) {
          this.$message({
            type: 'error',
            message: '格式不对，不能为空，不能超过20个字符'
          })
          return false
        }
				this.$API.patientManage.foucsAdd({
          userId: this.token,
          patientId: this.patientId,
					focusTag: value,
					focus: 1 // (操作类型 1:关注 0：取消关注) （必填）
        }).then(res => {
          this.$emit('refreshData')
          this.baseData.focusTag = value
					this.baseData.focus = 1
          this.$message({
            type: 'success',
            message: '成功添加关注'
          })
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {

      })
    }
  }
}
export default mixin
