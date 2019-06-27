<template>
	<div>
		<Drawer
			v-model="showDrawer"
			title="编辑患者信息"
			:mask-closable="false"
			width="700">
			<el-form :model="formData" :rules="validate.patientInfoValidate" ref="form" label-width="80px" label-position="left" class="patient-form">
				<el-row :gutter="50">
					<el-col :span="12">
						<el-form-item label="姓名" prop="hzxm">
							<el-input v-model="formData.hzxm"></el-input>
						</el-form-item>
						<el-form-item label="联系电话" prop="jtdh">
							<el-input v-model="formData.jtdh"></el-input>
						</el-form-item>
						<el-form-item label="身份证号" prop="sfzh">
							<el-input v-model="formData.sfzh"></el-input>
						</el-form-item>
						<el-form-item label="出生年月" prop="csny">
							<DatePicker type="date" format="yyyy-MM-dd" :value="formData.csny" @on-change="handleDatePicked"></DatePicker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="患者状态" prop="status">
							<el-select class="filter-item" v-model="formData.status">
								<el-option v-for="(item, index) in statusMap" :label="item" :value="index" :key="index" v-show="index<3"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="联系电话2" prop="lxdh">
							<el-input v-model="formData.lxdh"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="hzxb">
							<el-select class="filter-item" v-model="formData.hzxb">
								<el-option label="男" :value="1"></el-option>
								<el-option label="女" :value="2"></el-option>
								<el-option label="其他" :value="3"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="地址" prop="csd">
							<el-input v-model="formData.csd"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<Divider/>
			<div class="text-align-center">
				<el-button type="primary" @click="handleSave">保存</el-button>
			</div>
		</Drawer>
		<!--冲突的进行中的计划弹框-->
		<Drawer
			class-name="repeat-drawer"
			v-model="showDrawerRepeat"
			title="提示"
			:mask-closable="false"
			width="700">
			<el-alert
				:title="'您所修改的手机号码  '+phone+'  有其他计划正在执行'"
				type="warning"
				:closable="false"
				description="请问您是否需要终止其他计划，或者直接放弃修改号码。"
				show-icon
				v-show="tableData.length>0">
			</el-alert>
			<el-table
				class="margin-top-16"
				v-show="tableData.length>0"
				:data="tableData"
				border
				highlight-current-row
				max-height="500"
			>
				<el-table-column
					prop="brxm"
					align="center"
					label="姓名">
					<template slot-scope="scope">
						<span>{{scope.row.brxm}}</span>
						<el-tag v-show="scope.row.brxm == formData.hzxm">本人</el-tag>
					</template>
				</el-table-column>
				<el-table-column
					prop="mobile"
					align="center"
					label="当前联系电话">
				</el-table-column>
				<el-table-column
					prop="icdName"
					align="center"
					label="疾病类型">
				</el-table-column>
				<el-table-column
					prop="schemeName"
					align="center"
					label="方案名称">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button
							size="mini"
							v-if="scope.row.status != 4"
							v-permission="$API.planList.batchEndPlay"
							@click="handleStopPlan(scope)">终止方案</el-button>
						<el-button
							size="mini"
							disabled
							v-if="scope.row.status == 4"
						>已终止</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="text-align-center margin-top-16">
				<el-button @click="showDrawerRepeat = false">放弃修改</el-button>
				<el-button type="primary" @click="postDataToUpdate">确定修改</el-button>
			</div>
			<!--终止弹框-->
			<el-dialog
				custom-class="stop-dialog"
				:modal-append-to-body="false"
				:visible.sync="showStopPlanDialog"
				title="计划终止"
				width="400px"
			>
				<stop-plan :ids="planId" v-on:close="showStopPlanDialog=false" v-on:refresh="refreshTableData" ref="stopPlan"></stop-plan>
			</el-dialog>
		</Drawer>
	</div>
</template>

<script>
  import StopPlan from '../common-components/stopPlan'
	export default {
    name: 'editInfo',
		components: { StopPlan },
		props: {
			patientInfo: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data () {
    	return {
				showDrawer: false,
				formData: {},
				statusMap: ['正常', '死亡', '拒绝随访', '正常', '正常'],
				showDrawerRepeat: false,
				phone: '',
				tableData: [],
				showStopPlanDialog: false,
				planId: '',
				currentTableIndex: 0
			}
		},
		methods: {
			toggleShowModal () {
				if (this.$refs.form) {
					this.$refs.form.resetFields()
				}
				this.$nextTick(() => {
					this.formData = {
						id: this.patientInfo.id,
						hzxm: this.patientInfo.hzxm,
						jtdh: this.patientInfo.jtdh, // 联系电话
						sfzh: this.patientInfo.sfzh,
						csny: this.patientInfo.csny,
						status: this.patientInfo.status,
						lxdh: this.patientInfo.lxdh, // 联系电话2
						hzxb: this.patientInfo.hzxb,
						csd: this.patientInfo.csd
					}
					this.showDrawer = true
				})
			},
			/**
			 * @description 保存按钮
			 */
			handleSave () {
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						const jtdhHasChanged = this.formData.jtdh !== this.patientInfo.jtdh
						const lxdhHasChanged = this.formData.lxdh !== this.patientInfo.lxdh
						if (jtdhHasChanged || lxdhHasChanged) {
							// 调用接口看是否有其他计划在执行
							let phoneIds = []
							if (jtdhHasChanged && this.formData.jtdh) {
								phoneIds.push(this.formData.jtdh)
							}
							if (lxdhHasChanged && this.formData.lxdh) {
								phoneIds.push(this.formData.lxdh)
							}
							this.phone = phoneIds.join(',')
							if (!this.phone) {
								this.postDataToUpdate()
								return false
							}
							const res = await this.$API.patientManage.getRepeatTask({ phoneIds: this.phone, patientId: this.formData.id })
							if (res.data.length) {
								this.tableData = res.data
								this.showDrawerRepeat = true
								this.showDrawer = false
							} else {
								this.postDataToUpdate()
							}
						} else {
							this.postDataToUpdate()
						}
					}
				})
			},
			/**
			 * @description 调用update接口更新信息
			 */
			async postDataToUpdate () {
				await this.$API.patientManage.update(this.formData)
				this.showDrawer = false
				this.showDrawerRepeat = false
				this.$emit('refreshData')
			},
			/**
			 * @description 终止方案 按钮
			 */
			handleStopPlan (scope) {
				this.currentTableIndex = scope.$index
				this.showStopPlanDialog = true
				this.planId = scope.row.planId
				if (this.$refs.stopPlan) {
					this.$refs.stopPlan.resetForm()
				}
			},
			/**
			 * @description 改变 某条表格数据的status
			 */
			refreshTableData () {
				this.tableData[this.currentTableIndex].status = 4
			},
			handleDatePicked (date) {
				this.formData.csny = date
			}
		}
  }
</script>

<style lang="less">
	.patient-form{
		padding-left: 20px;
		margin-top: 24px;
		.el-input__inner{
			height: 34px;
			width: 187px;
		}
		.el-input__icon{
			line-height: 34px;
		}
	}
	.repeat-drawer{
		.ivu-drawer-body{
			position: relative;
			.el-dialog__wrapper{
				position: absolute;
			}
		}
	}

</style>
