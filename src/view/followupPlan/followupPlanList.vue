<template>
	<div class="app-container">
		<!-- 搜索 -->
		<ul class="common_search">
			<li class="common_search_single">
				<label class="radio-label" >科室</label>
				<Cascader :data="orgOptions" change-on-select v-model="orgChosenArr" filterable></Cascader>
			</li>
			<li class="common_search_single">
				<label class="radio-label" >姓名</label>
				<el-input  placeholder="请输入患者姓名"  v-model.trim="searchParam.brxm"></el-input>
			</li>
			<li class="common_search_single">
				<label class="radio-label" >疾病名称</label>
				<disease-types-select :show-icd="false" ref="diseaseRef" placeholder-text=""></disease-types-select>
			</li>
			<li class="common_search_single">
				<label class="radio-label" >方案名称</label>
				<el-input  placeholder="请输入方案名称"  v-model.trim="searchParam.schemeName"></el-input>
			</li>
			<li class="common_search_single">
				<label class="radio-label">状态</label>
				<el-select class="filter-item" v-model="searchParam.status" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option v-for='item in planStatusArray' :value="item.paramCode" :label="item.paramName" :key="item.paramCode"></el-option>
				</el-select>
			</li>
			<li class="common_search_single common_search_single_time">
				<label class="radio-label" >计划执行时间</label>
				<date-time-picker :timeBegin.sync="searchParam.startTime" :timeEnd.sync="searchParam.endTime" :is-default-today="true"></date-time-picker>
			</li>
			<li class="common_search_single">
				<el-button type="primary" icon="el-icon-search"  @click="handlePage(1)" :loading="tableParams.isLoading">查询</el-button>
			</li>
		</ul>
		<!-- tab切换 -->
		<el-table
			ref="table"
			:data="tableParams.data" highlight-current-row
			v-loading="tableParams.isLoading"
			@selection-change="handleSelectionChange"
		>
			<el-table-column
				type="selection"
				width="55">
			</el-table-column>
			<el-table-column label="姓名" prop="brxm">
				<template slot-scope="scope">
					<div class="td-hover" @click="handlePatientFile(scope.row.patientId)"><span>{{ scope.row.brxm }}</span></div>
				</template>
			</el-table-column>
			<el-table-column label="科室" prop="organizationName" show-overflow-tooltip></el-table-column>
			<el-table-column label="疾病名称" prop="icdName" show-overflow-tooltip></el-table-column>
			<el-table-column label="方案名称" prop="schemeName"></el-table-column>
			<el-table-column prop="followupStartTime" label="计划执行时间" show-overflow-tooltip></el-table-column>
			<el-table-column label="状态" prop="statusName"></el-table-column>
			<el-table-column prop="address" label="操作" width="170">
				<template slot-scope="scope">
					<el-button type="text" v-permission="$API.patientManage.update" @click="handlePlanDetail(scope.row.planId, scope.row.isOrder)" :v-permission="$API.planList.followPlanDetail">计划详情</el-button>
					<el-button v-if="scope.row.status === 4" type="text" v-permission="$API.planList.batchEndPlay" @click="handleEnd('oneEnded', scope.row)">终止详情</el-button>
					<el-button v-if="scope.row.status===0||scope.row.status===2||scope.row.status===3" type="text" v-permission="$API.planList.batchEndPlay" @click="handleEnd('one', scope.row.planId)">终止</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-container">
			<div class="pagination-container-left" v-if="tableParams.data.length" v-permission="$API.planList.batchCancleAll">
				<el-button @click="handleChoosePage">全选当页</el-button>
				<el-button :type="isAll ? 'primary' : ''" @click="isAll = !isAll">{{isAll ? '已选所有页' : '全选所有页'}}</el-button>
				<el-button @click="handleEnd('all')" :disabled="!stopPlanIds && !isAll">批量处理</el-button>
			</div>
			<el-pagination  @current-change="handlePage" :current-page.sync="searchParam.pager" :page-size="searchParam.limit" layout="total,prev, pager, next, jumper"
											:total="tableParams.total" v-if="tableParams.total">
			</el-pagination>
		</div>
		<!--终止弹框-->
		<Drawer :title="endType === 'oneEnded' ? '终止详情':'计划终止'" :mask-closable="false" v-model="showStopDrawer" width="400">
			<stop-plan :stop-detial="stopDetailData" :ids="stopPlanIds" :stop-all-params="isAll ? searchParam : {}" ref="stopPlan" v-on:close="showStopDrawer=false" v-on:refresh="getList"></stop-plan>
		</Drawer>
		<!--计划详情弹框-->
		<plan-detail :id="chosenPlanId" :is-order="rowIsOrder" :plan-status-list="planStatusList" ref="planDetail"></plan-detail>
		<!--患者档案弹框-->
		<patient-file :patient-id="chosenPatientId" :should-refresh="false" ref="patientFile"></patient-file>
	</div>
</template>

<script>
	import { formatToTreeData } from '@/libs/businessUtil'
	import DateTimePicker from '../common-components/dateTimePicker'
	import DiseaseTypesSelect from '../common-components/diseaseTypesSelect'
	import StopPlan from '../common-components/stopPlan'
	import PlanDetail from '../common-components/planDetail'
	import patientFile from 'self_c/patientFile'
	export default {
		name: 'followupPlanList',
		components: {
			PlanDetail,
			StopPlan,
			DateTimePicker,
			DiseaseTypesSelect,
			patientFile
		},
		data () {
			return {
				userId: sessionStorage.getItem('rsysUserId'),
				orgChosenArr: [],
				searchParam: {
					brxm: '', // 患者姓名
					icdName: '', // 疾病类型
					schemeName: '', // 方案名称
					startTime: '', // 搜索起始年龄
					endTime: '', // 搜索结束年龄
					status: '',
					organizationId: '',
					pager: 1,
					limit: 10 // 每页条数
				},
				tableParams: {
					data: [],
					total: 0,
					isLoading: false
				},
				planStatusArray: [],
				orgOptions: [],
				isAll: false,
				chosenData: [],
				showStopDrawer: false,
				endType: '',
				stopDetailData: {},
				stopPlanIds: '',
				chosenPlanId: '', // 计划详情弹框prop
				planStatusList: {}, // 计划详情状态对应对象
				chosenPatientId: '',
				rowIsOrder: 0 // 是否存在随访记录,0是;1否
			}
		},
		mounted () {
			this.getOptionData()
			this.getList()
		},
		methods: {
			/**
			 * 获取列表数据
			 * @function getList
			 */
			getList () {
				this.searchParam.organizationId = this.orgChosenArr.length ? this.orgChosenArr[this.orgChosenArr.length - 1] : ''
				this.tableParams.isLoading = true
				const disSelectRes = this.$refs.diseaseRef.getSelectedData()
				this.searchParam.icdName = disSelectRes.secondData ? disSelectRes.secondData.paramName : ''
				this.$API.planList.planList(this.searchParam).then((res) => {
					this.tableParams.isLoading = false
					this.tableParams.data = res.data
					this.tableParams.total = res.total
				}).catch((error) => {
					console.log(error)
					this.tableParams.isLoading = false
				})
			},
			/**
			 * 分页
			 * @function handlePage
			 * @param {String} page 当前页码
			 * @description
			 */
			handlePage (page) {
				this.searchParam.pager = page
				this.getList()
			},
			async getOptionData () {
				const resStatus = await this.$API.systemParamManage.list({ paramTypeCode: 'planStatus', limit: 999 })
				this.planStatusArray = resStatus.data.filter(item =>
					// 去掉 未排期，已过期状态
					item.paramName.indexOf('期') === -1
				)
				resStatus.data.forEach(item => {
					this.planStatusList[item.paramCode] = item.paramName
				})
				// 科室数据
				const res = await this.$API.organizeManage.orgAuthList({ userId: this.userId })
				this.orgOptions = formatToTreeData({
					baseArr: res.data,
					parentIdName: 'parentId',
					idName: 'organizationId',
					sortName: 'sort',
					childrenFn: function (item) {
						return {
							value: item.organizationId,
							organizationId: item.organizationId,
							label: item.name,
							children: []
						}
					}
				})
			},
			handleChoosePage () {
				this.$refs.table.toggleAllSelection()
			},
			handleSelectionChange (val) {
				this.chosenData = val
				const resArr = []
				val.forEach(item => {
					if (item.status === 0 || item.status === 2 || item.status === 3) {
						resArr.push(item.planId)
					}
				})
				this.stopPlanIds = resArr.join(',')
				// console.log(this.stopPlanIds)
			},
			/**
			 * @description 处理 弹出 终止弹框
			 * @param type oneEnded-终止详情,   one-终止条数据 ,  all-点击 批量处理
			 * @param data
			 */
			handleEnd (type, data = null) {
				this.stopDetailData.brxm = ''
				// console.log(type, data)
				if (type === 'oneEnded') {
					this.stopDetailData = {
						cancleReason: data.cancleReason,
						cancleRemark: data.cancleRemark,
						brxm: data.brxm
					}
				} else if (type === 'one') {
					this.stopPlanIds = data
				} else {
					if (!this.isAll) { // 全选当前页
						if (!this.stopPlanIds) {
							this.$Message.warning('可终止的记录数量为0！')
							return false
						}
					}
				}
				this.$refs.stopPlan.resetForm()
				this.showStopDrawer = true
				this.endType = type
			},
			/**
			 * @description 点击  计划详情
			 */
			handlePlanDetail (id, isOrder) {
				this.chosenPlanId = id
				this.rowIsOrder = isOrder
				this.$refs.planDetail.showPlanDetail()
			},
			/**
			 * @description 点击 患者姓名
			 */
			handlePatientFile (id) {
				this.chosenPatientId = id
				this.$refs.patientFile.toggleShowModal()
			}
		}
	}
</script>
<style lang="less" scoped>
	/deep/.el-table{
		.el-button--text{
			width: 60px;
			text-align: left;
		}
	}
</style>
