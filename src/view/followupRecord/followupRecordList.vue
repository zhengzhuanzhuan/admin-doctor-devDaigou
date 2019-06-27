<style lang="less">
	.input-separator{
		line-height: 36px;
		padding: 0 3px;
	}
	.td-hover{
		cursor: pointer;
	}
	.td-hover:hover{
		color: #409EFF;
	}
	.wyc {
		color: #00ae00;
	}
	.yyc {
		color: #ff2626;
	}
	.cjsb {
		color: #ffb15d;
	}
	.originC {
		color: #ff6800;
	}
	.app-container .iconfont{
		color: #ff6e40;
		position: absolute;
		left: 15px;
	}
	.common_search_single_special{
		flex: auto;
		max-width: 710px;
	}
</style>
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
				<el-input  v-model.trim="searchParam.brxm"></el-input>
			</li>
			<li class="common_search_single">
				<label class="radio-label" >疾病名称</label>
				<disease-types-select :show-icd="false" ref="diseaseRef" placeholder-text=""></disease-types-select>
			</li>
			<li class="common_search_single">
				<label class="radio-label" >方案名称</label>
				<el-input  v-model.trim="searchParam.schemeName"></el-input>
			</li>
			<li class="common_search_single common_search_single_time">
				<label class="radio-label" >随访时间</label>
				<date-time-picker :timeBegin.sync="searchParam.dateEndBegin" :timeEnd.sync="searchParam.dateEndEnd" :is-default-today="isFixedTime"></date-time-picker>
			</li>
			<li class="common_search_single">
				<label class="radio-label">通话状态</label>
				<el-select class="filter-item" v-model="searchParam.callStatus">
					<el-option label="全部" value=""></el-option>
					<el-option v-for='item in thztOptions' :value="item.paramCode" :label="item.paramName" :key="item.paramCode"></el-option>
				</el-select>
			</li>
			<li class="common_search_single">
				<label class="radio-label">处理意见</label>
				<el-select class="filter-item" v-model="searchParam.diseaseInfo">
					<el-option label="全部" value=""></el-option>
					<el-option label="未处理" value="-1"></el-option>
					<el-option v-for='item in clyjOptions' :value="item.paramCode" :label="item.paramName" :key="item.paramCode"></el-option>
				</el-select>
			</li>
			<li class="common_search_single">
				<label class="radio-label">采集情况</label>
				<el-select class="filter-item" v-model="searchParam.resultStatus">
					<el-option label="全部" value=""></el-option>
					<el-option v-for='item in cjqkOptions' :value="item.paramCode" :label="item.paramName" :key="item.paramCode"></el-option>
				</el-select>
			</li>
			<li class="common_search_single">
				<label class="radio-label">异常情况</label>
				<el-select class="filter-item" v-model="searchParam.unusual">
					<el-option label="全部" value=""></el-option>
					<el-option label="有异常" value="1"></el-option>
					<el-option label="无异常" value="2"></el-option>
				</el-select>
			</li>
			<li class="common_search_single">
				<el-button type="primary" icon="el-icon-search"  @click="handlePage(1)" :loading="tableParams.isLoading">查询</el-button>
			</li>
		</ul>
		<el-table
			:data="tableParams.data" highlight-current-row
			v-loading="tableParams.isLoading"
		>
			<el-table-column label="姓名" align="center" prop="patientName">
				<template slot-scope="scope">
					<div class="td-hover" @click="handlePatientFile(scope.row.patientId)"><span>{{ scope.row.brxm }}</span></div>
				</template>
			</el-table-column>
			<el-table-column prop="organizationName" label="科室" align="center">
			</el-table-column>
			<el-table-column prop="icdName" label="疾病名称" align="center" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="schemeName" label="方案名称" align="center" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="dateEnd" label="随访时间" align="center" show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="处理意见" align="center">
				<template slot-scope="scope">
					<span>{{ transformData.clyj[scope.row.diseaseInfo] || '未处理' }}</span>
				</template>
			</el-table-column>
			<el-table-column label="通话状态" align="center">
				<template slot-scope="scope">
					<span>{{ transformData.thzt[scope.row.callStatus] }}</span>
				</template>
			</el-table-column>
			<el-table-column label="采集情况" align="center">
				<template slot-scope="scope">
					<span>{{ transformData.cjqk[scope.row.resultStatus] }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="操作" align="center">
				<template slot-scope="scope">
					<el-button :class="{'red':scope.row.unusual!==0, 'operateBtn':true}" type="text" size="mini" @click="wayButton(scope)" v-permission="$API.followRecord.recordResult">
						{{scope.row.unusual===0 ? '计划详情':`${scope.row.unusual}项异常`}}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-container">
			<el-pagination @current-change="handlePage" :current-page.sync="searchParam.pager" :page-size="searchParam.limit" layout="total,prev, pager, next, jumper"
										 :total="tableParams.total" v-if="tableParams.total">
			</el-pagination>
		</div>
		<!-- 随访记录 -->
		<followup-record-detail
			:patient-id="patientId"
			:task-id="taskId"
			:sf-number="sfNumber+''"
			:tab-active="tabActive+''"
			:visit-order-id="visitOrderId"
			:patient-other-info="patientOtherInfo"
			:transform-cjqk-data="transformData.cjqk"
			v-on:refreshData="refreshList"
			ref="followRecord"></followup-record-detail>
		<!-- 就诊档案 不显示 随访记录 链接 -->
		<!--患者档案弹框-->
		<patient-file :patient-id="patientId" :should-refresh="false" ref="patientFile"></patient-file>
	</div>
</template>

<script>
	/**
	 * 随访结果
	 * @module followway
	 */
	import { formatToTreeData } from '@/libs/businessUtil'
	import DateTimePicker from '../common-components/dateTimePicker'
	import DiseaseTypesSelect from '../common-components/diseaseTypesSelect'
	import patientFile from 'self_c/patientFile'
	import followupRecordDetail from 'self_c/followupRecordDetail'
	export default {
		data () {
			return {
				searchParam: {
					organizationId: '',
					brxm: '', // 患者姓名
					icdName: '', // 疾病类型
					schemeName: '', // 方案名称
					dateEndBegin: '',
					dateEndEnd: '',
					callStatus: '', // 通话状态
					diseaseInfo: '',
					resultStatus: '',
					unusual: '',
					pager: 1,
					limit: 10 // 每页条数
				},
				tableParams: {
					data: [],
					total: 0,
					isLoading: false
				},
				patientId: '', // 病人id
				taskId: '', // 获取病人的taskId
				sfNumber: '', // 选中第几次
				tabActive: 0,
				followTime: [],
				visitOrderId: '',
				userId: sessionStorage.getItem('rsysUserId'),
				// 查询条件选项数据
				orgChosenArr: [],
				orgOptions: [],
				thztOptions: [], // 通话状态
				clyjOptions: [], // 处理意见
				cjqkOptions: [], // 采集情况
				transformData: {
					thzt: [],
					clyj: [],
					cjqk: []
				},
				patientOtherInfo: {},
				isFixedTime: true
			}
		},
		created () {
			let patientId = location.hash.split('patientId=')[1]
			if (patientId) {
				this.searchParam.patientId = patientId
				this.isFixedTime = false
			}
			let planId = location.hash.split('planId=')[1]
			if (planId) {
				this.searchParam.planId = planId
				this.isFixedTime = false
			}
		},
		mounted () {
			this.getOptionData().then(() => {
				this.getList()
			})
		},
		components: {
			patientFile,
			followupRecordDetail,
			DateTimePicker,
			DiseaseTypesSelect
		},
		methods: {
			/**
			 * 刷新当前列表数据--特别关注切换后--子组件调用
			 * @function refreshList
			 */
			refreshList () {
				this.getList()
			},
			/**
			 * 列表数据获取
			 * @function getList
			 * @param {Object} param search参数
			 * @param {String} adminId 医生Id
			 * @param {String} sex 病人性别
			 * @param {String} patientName 病人名称
			 * @param {String} icdName 疾病类型
			 * @param {String} fromAge 搜索起始年龄
			 * @param {String} endAge 搜索结束年龄
			 * @param {String} type 时间 3：全部，2：近7天，1：近30天
			 * @param {String} schemeName 方案名称
			 * @param {String} vetStatus 未处理(1未处理，11已处理)
			 * @param {String} backStatus 通话状态
			 * @param {String} pager 当前页码
			 * @param {String} limit 每页显示条数
			 */
			getList (type) {
				if (type === 'all') {
					this.searchParam.patientId = ''
					this.searchParam.planId = ''
				}
				this.searchParam.organizationId = this.orgChosenArr.length ? this.orgChosenArr[this.orgChosenArr.length - 1] : ''
				const disSelectRes = this.$refs.diseaseRef.getSelectedData()
				this.searchParam.icdName = disSelectRes.secondData ? disSelectRes.secondData.paramName : ''
				this.tableParams.isLoading = true
				this.$API.followRecord.list(this.searchParam).then((res) => {
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
			 * @param {String} val 当前页码
			 * @description
			 */
			handlePage (page) {
				this.searchParam.pager = page
				this.getList('all')
			},
			/**
			 * 获取表格选中行信息
			 * @function wayButton
			 * @param {Object} scope 点击列表的scope的信息
			 */
			wayButton (scope) {
				this.patientId = scope.row.patientId
				this.taskId = scope.row.planId
				this.sfNumber = scope.row.followupIndex
				this.visitOrderId = scope.row.recordId
				this.patientOtherInfo = {
					icdName: scope.row.icdName,
					schemeName: scope.row.schemeName,
					organizationName: scope.row.organizationName,
					callStatus: this.transformData.thzt[scope.row.callStatus],
					dateEnd: scope.row.dateEnd
				}
				this.$refs.followRecord.toggleShowModal()
			},
			/**
			 * @description 点击 患者姓名
			 */
			handlePatientFile (id) {
				this.patientId = id
				this.$refs.patientFile.toggleShowModal()
			},
			async getOptionData () {
				const resStatus = await this.$API.systemParamManage.list({ paramTypeName: '通话状态', limit: 999 })
				this.thztOptions = resStatus.data
				const resResultStatus = await this.$API.systemParamManage.list({ paramTypeCode: 'resultStatus', limit: 999 })
				this.cjqkOptions = resResultStatus.data
				const resDiseaseInfo = await this.$API.systemParamManage.list({ paramTypeCode: 'diseaseInfo', limit: 999 })
				this.clyjOptions = resDiseaseInfo.data
				resStatus.data.forEach(item => {
					this.transformData.thzt[item.paramCode] = item.paramName
				})
				resResultStatus.data.forEach(item => {
					this.transformData.cjqk[item.paramCode] = item.paramName
				})
				resDiseaseInfo.data.forEach(item => {
					this.transformData.clyj[item.paramCode] = item.paramName
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
			}
		}
	}
</script>
