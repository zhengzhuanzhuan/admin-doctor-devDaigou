<template>
	<div>
		<template v-if="!stopDetial.brxm">
			<Form :model="modalForm" :label-width="80" :rules="validate.stopFollowUp" ref="stopForm">
				<FormItem label="终止原因" prop="cancleReason">
					<Select v-model="modalForm.cancleReason">
						<Option v-for="(item, index) in reasonData" :value="index" :key="index" v-if="index">{{item}}</Option>
					</Select>
				</FormItem>
				<FormItem label="详情" prop="cancleRemark">
					<Input v-model="modalForm.cancleRemark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
				</FormItem>
			</Form>
			<div class="text-align-center">
				<Button @click="handleClose" class="margin-right-8">取消</Button>
				<Button type="primary" @click="handleFormPost('stopForm')">确定</Button>
			</div>
		</template>
		<div v-else>
			<div class="reasonDrawer">
				<h3>终止原因</h3>
				<span>{{reasonData[stopDetial.cancleReason]}}</span>
			</div>
			<div class="reasonDrawer">
				<h3>详情</h3>
				<span>{{stopDetial.cancleRemark}}</span>
			</div>
			<Divider />
			<div class="reasonMark">
				终止原因是
				<span class="spanColor">{{reasonData[stopDetial.cancleReason]}}</span>
				，系统已终止
				<span class="spanColor">{{stopDetial.brxm}}</span>
				的
				<span class="spanColor">所有计划</span>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'stopPlan',
		props: {
			ids: {
				type: String,
				default: ''
			},
			stopDetial: { // 终止详情时有
				type: Object,
				default: function () {
					return {}
				}
			},
			stopAllParams: { // 批量终止所有页
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data () {
    	return {
				reasonData: [],
				modalForm: {
					cancleReason: '',
					cancleRemark: '',
					planIds: '',
					userId: sessionStorage.getItem('rsysUserId')
				}
			}
		},
		methods: {
			async getReasonData () {
				const res = await this.$API.systemParamManage.list({ limit: 9999, pager: 1, paramTypeCode: 'planStopReasons' })
				res.data.forEach(item => {
					this.$set(this.reasonData, item.paramCode - 0, item.paramName)
				})
			},
			handleClose () {
				this.$emit('close')
			},
			handleFormPost (name) {
				this.$refs[name].validate(async (valid) => {
					if (valid) {
						if (this.stopAllParams.limit) { // 终止所有页
							const postData = {
								...this.stopAllParams,
								cancleReason: this.modalForm.cancleReason,
								cancleRemark: this.modalForm.cancleRemark
							}
							// console.log(postData)
							await this.$API.planList.batchCancleAll(postData)
						} else {
							this.modalForm.planIds = this.ids
							// console.log(this.modalForm)
							if (!this.modalForm.planIds) {
								this.$Message.error('计划id不能为空！')
								return false
							}
							await this.$API.planList.batchEndPlay(this.modalForm)
						}
						this.$Message.success('操作成功')
						this.handleClose()
						this.$emit('refresh')
					} else {
						this.$Message.error('请填写全必填信息!')
					}
				})
			},
			resetForm () {
				if (this.$refs.stopForm) {
					this.$refs.stopForm.resetFields()
				}
			}
		},
		mounted () {
    	// this.getReasonData()
		},
		created () {
			this.getReasonData()
		}
  }
</script>

<style lang="less">
	.reasonDrawer {
		display: flex;
		margin-left: 40px;
		margin-bottom: 10px;
		h3{
			margin-right:20px;
		}
	}
	.reasonMark{
		margin-left: 30px;
		.spanColor{
			color: red;
		}
	}
</style>
