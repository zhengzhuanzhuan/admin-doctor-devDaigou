<template>
  <div class='homePage'>
    <Row :gutter="10">
			<i-col :lg="8" style="height: 120px;padding-bottom: 10px;">
				<Card shadow class="info-card-wrapper" :padding="25">
					<div class='card-message'>
					<p>{{ userName }}</p>
					<span>{{ position }}</span>
					</div>
					<p>下午好，已等待您{{awaitTimer}}个小时</p>
				</Card>
			</i-col>
			<i-col :lg="4" v-for="(item, i) in publicNum" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
				<infor-card shadow :icon='item.icon'>
					<p class="header-style">{{item.title}}</p>
					<count-to :end="item.count" count-class="count-style">
						<p slot='right' style="margin: 8px 0 0 10px">{{item.unit}}</p>
					</count-to>
				</infor-card>
			</i-col>
    </Row>
		<!-- 疾病分类 -->
    <Row :gutter="10" style="margin-bottom: 10px;">
      <Col :md="24" :lg="10">
        <Card shadow style="height: 380px">
					<p slot="title">疾病分布</p>
					<div slot="extra">
						<date-time-picker
							:timeBegin.sync="formDisease.beginDate"
							:timeEnd.sync="formDisease.endDate"
							:is-default-today="true"
							@chosen="selectFollowTimer('Disease')"
							style="width: 300px">
						</date-time-picker>
					</div>
					<chart-pie :value='diseaseNum'/>
        </Card>
      </Col>
      <Col :md="24" :lg="14">
        <Card shadow class="followPatient">
					<p slot="title">关注的患者</p>
					<p slot="extra" class="detailData">
						<router-link to="/Patient/Patientlist">查看更多</router-link>
					</p>
					<Table :columns="columnsPatient" :data="patientData" height="283"></Table>
					<Page
						:total="patientTotal"
						:current='patientparams.pager'
						:page-size='patientparams.limit'
						size="small"
						show-total
						@on-change='handlePage'
						class="pageStyle"/>
        </Card>
      </Col>
    </Row>
		<!-- 门诊情况分析 -->
		<Card shadow>
			<p slot="title">门诊情况分析</p>
			<div slot="extra" style="display: flex">
				<disease-types-select
					placeholderText='全部疾病'
					:show-icd="true"
					ref="disRefOutpatient"
					@diseaseChosen="handleDiseaseSelect('Outpatient')"
					style="width: 150px"/>
				<department-cascader @cascaderSelect="handleTreeDoctor(arguments, 'Outpatient')"/>
				<date-time-picker
					:timeBegin.sync='formOutpatient.beginDate'
					:timeEnd.sync='formOutpatient.endDate'
					:is-default-today="true"
					@chosen="selectFollowTimer('Outpatient')"
					style="width: 280px"/>
				<p class="detailData">
					<router-link to="/home/outpatientDetail">详细数据</router-link>
				</p>
			</div>
			<Row>
				<Col span="4">
					<ul class="outPatientStatus">
						<li>
							<div>
								<count-to :end="outpatientTotal" count-class="count-style">
									<p slot='right' style="margin: 8px 0 0 5px">人次</p>
								</count-to>
								<p>总就诊人数(人)</p>
							</div>
						</li>
					</ul>
				</Col>
				<Col span="20">
					<patient-line style="height: 400px" text="每日就诊患者" :value="outpatientNum"/>
				</Col>
			</Row>
		</Card>
		<!-- 住院情况分析 -->
		<Card shadow style="marginTop: 10px">
			<p slot="title">住院情况分析</p>
			<div slot="extra" style="display: flex">
				<disease-types-select
					placeholderText='全部疾病'
					:show-icd="true"
					style="width: 150px"
					ref="disRefHospitalize"
					@diseaseChosen="handleDiseaseSelect('Hospitalize')"
				/>
				<department-cascader @cascaderSelect="handleTreeDoctor(arguments, 'Hospitalize')"/>
				<date-time-picker
					:timeBegin.sync='formHospitalize.beginDate'
					:timeEnd.sync='formHospitalize.endDate'
					:is-default-today="true"
					@chosen="selectFollowTimer('Hospitalize')"
					style="width: 280px"
				/>
				<p class="detailData">
					<router-link to="/home/hospitalDetail">详细数据</router-link>
				</p>
			</div>
			<Row>
				<Col span="4">
					<ul class="outPatientStatus">
						<li>
							<div>
								<count-to :end="hospitalNum.totalOfIn" count-class="count-style">
									<p slot='right' style="margin: 8px 0 0 5px">人次</p>
								</count-to>
								<p>总入院人次</p>
							</div>
						</li>
						<li>
							<div>
								<count-to :end="hospitalNum.TotalOfOut" count-class="count-style">
									<p slot='right' style="margin: 8px 0 0 5px">人次</p>
								</count-to>
								<p>总出院人次</p>
							</div>
						</li>
					</ul>
				</Col>
				<Col span="20">
					<hospital-line
						style="height: 400px"
						:valueIn="hospitalNum.everyDaysOfIn"
						:valueOut="hospitalNum.everyDaysOfOut"
						/>
				</Col>
			</Row>
		</Card>
		<!-- 治疗情况分析-->
		<Card shadow style="marginTop: 10px">
			<p slot="title">治疗情况分析</p>
			<div slot="extra" style="display: flex">
				<disease-types-select
					placeholderText='全部疾病'
					:show-icd="true"
					style="width: 150px"
					ref="disRefTreatment"
					@diseaseChosen="handleDiseaseSelect('Treatment')"
					/>
				<department-cascader @cascaderSelect="handleTreeDoctor(arguments, 'Treatment')"/>
				<date-time-picker
					:timeBegin.sync='formTreatment.beginDate'
					:timeEnd.sync='formTreatment.endDate'
					:is-default-today="true"
					@chosen="selectFollowTimer('Treatment')"
					style="width: 280px"/>
					<p class="detailData">
						<router-link to="/home/treatmentAnalysisDetail">详细数据</router-link>
					</p>
			</div>
			<Row :gutter="20" >
				<Col span='8' class="targetPie">
					<chart-pie text='用药依从性' :isSolid='true' :value="treatmenNum.MedicationCompliance"/>
				</Col>
				<Col span='8' class="targetPie">
					<chart-pie  text='用药不良反应' :isSolid='true' :value='treatmenNum.AdverseDrugReactions'/>
				</Col>
				<Col span='8' class="targetPie">
					<chart-pie text='治疗效果' :isSolid='true' :value="treatmenNum.treatmentEffect"/>
				</Col>
			</Row>
		</Card>
		<!-- 随访异常指标情况分析-->
		<Card shadow style="marginTop: 10px">
			<p slot="title">随访异常指标情况分析</p>
			<div slot="extra" style="display: flex">
				<disease-types-select
					placeholderText='全部疾病'
					:show-icd="true"
					style="width: 150px"
					ref="disRefAbnormalTarget"
					@diseaseChosen="handleDiseaseSelect('AbnormalTarget')"
				/>
				<department-cascader  @cascaderSelect="handleTreeDoctor(arguments, 'AbnormalTarget')"/>
				<date-time-picker
					:timeBegin.sync='formAbnormalTarget.beginDate'
					:timeEnd.sync='formAbnormalTarget.endDate'
					:is-default-today="true"
					@chosen="selectFollowTimer('AbnormalTarget')"
					style="width: 280px"/>
				<p class="detailData">
					<router-link to="/home/abnormalIndexAnalysisDetail">详细数据</router-link>
				</p>
			</div>
			<Row :gutter="20" >
				<Col span='12' class="targetPie">
					<chart-pie text='异常指标分布' :isSolid='true' :value='abnormalTargetPie'/>
				</Col>
				<Col span='12' class="targetPie">
					<charts-bar style="height: 330px" text='异常指标排行' :value='abnormalTargetBar' :isDouble='true'/>
				</Col>
			</Row>
		</Card>
		<!-- 随访情况统计 -->
		<Card shadow style="marginTop: 10px">
			<p slot="title">随访情况统计</p>
			<div slot="extra" style="display: flex">
				<disease-types-select
					placeholderText='全部疾病'
					:show-icd="true"
					style="width: 150px"
					ref="disRefStatistics"
					@diseaseChosen="handleDiseaseSelect('Statistics')"
					/>
				<department-cascader :isDoctor='true' @cascaderSelect="handleTreeDoctor(arguments, 'Statistics')"/>
				<date-time-picker
					:timeBegin.sync='formStatistics.beginDate'
					:timeEnd.sync='formStatistics.endDate'
					:is-default-today="true"
					@chosen="selectFollowTimer('Statistics')"
					style="width: 280px"/>
				<p class="detailData">
					<router-link to="/home/followStatistics">详细数据</router-link>
				</p>
			</div>
			<Row>
				<Col span="4">
					<ul class="outPatientStatus">
						<li>
							<div>
								<count-to :end="followStatisticsNum.followupPersonNumber" count-class="count-style">
									<p slot='right' style="margin: 8px 0 0 5px">人</p>
								</count-to>
								<p>随访人数</p>
							</div>
						</li>
						<li>
							<div>
								<count-to :end="followStatisticsNum.followupPersonTime" count-class="count-style">
									<p slot='right' style="margin: 8px 0 0 5px">人次</p>
								</count-to>
								<p>随访人次</p>
							</div>
						</li>
						<li>
							<div>
								<count-to :end="followStatisticsNum.followupSuccessPersonTime" count-class="count-style">
									<p slot='right' style="margin: 8px 0 0 5px">人次</p>
								</count-to>
								<p>成功随访人次</p>
							</div>
						</li>
					</ul>
				</Col>
				<Col span="20">
					<follow-line
						style="height: 400px"
						:valueTotal='followStatisticsNum.everyDaysPersonTime'
						:valueSuccess='followStatisticsNum.everyDaysSuccessPersonTime'
					/>
				</Col>
			</Row>
		</Card>
		<!-- 指标详情 -->
		<Card shadow>
			<p slot="title">指标采集与通话情况</p>
			<Row :gutter="20" >
				<Col span='12' class="targetPie">
					<chart-pie text='指标采集' :value='followStatisticsNum.targetGather'/>
				</Col>
				<Col span='12' class="targetPie">
					<chart-pie text='通话情况' :value='followStatisticsNum.callStatus'/>
				</Col>
			</Row>
		</Card>
  </div>
</template>
<script>
import { ChartPie, PatientLine, HospitalLine, followLine, ChartsBar } from './charts'
import dateTimePicker from '../common-components/dateTimePicker'
import DiseaseTypesSelect from '../common-components/diseaseTypesSelect'
import DepartmentCascader from '../common-components/departmentCascader'
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { timeFn } from '@/libs/tools'
export default {
	name: 'home',
	components: {
		DiseaseTypesSelect,
		DepartmentCascader,
		dateTimePicker,
		InforCard,
		CountTo,
		ChartPie,
		HospitalLine,
		PatientLine,
		followLine,
		ChartsBar
	},
	data () {
		return {
			userId: sessionStorage.getItem('rsysUserId'),
			formDisease: {
				userId: sessionStorage.getItem('rsysUserId')
			},
			formOutpatient: {
				userId: sessionStorage.getItem('rsysUserId'),
				disease: '',
				organizationId: '',
				selectUserId: ''
			},
			formHospitalize: {
				userId: sessionStorage.getItem('rsysUserId'),
				disease: '',
				organizationId: '',
				selectUserId: ''
			},
			formTreatment: {
				userId: sessionStorage.getItem('rsysUserId'),
				disease: '',
				organizationId: '',
				selectUserId: ''
			},
			formAbnormalTarget: {
				userId: sessionStorage.getItem('rsysUserId'),
				disease: '',
				organizationId: '',
				selectUserId: ''
			},
			formStatistics: {
				userId: sessionStorage.getItem('rsysUserId'),
				disease: '',
				organizationId: ''
			},
			patientparams: {
				userId: sessionStorage.getItem('rsysUserId'),
				pager: 1,
				limit: 10
			},
			diseaseNum: [],
			totalDoctor: '',
			followTree: [],
			formItem: {},
			menuList: [],
			columnsPatient: [
				{
					title: '姓名',
					key: 'patientName'
				},
				{
					title: '性别/年龄',
					render: (h, params) => {
						return h('div', `${params.row.gender}/${params.row.age}`)
					}
				},
				{
					title: '标签',
					key: 'tag'
				},
				{
					title: '提醒',
					width: 430,
					render: (h, params) => {
						const arr = [
							h('Button', {
							  props: {
									type: 'text',
									size: 'small'
								},
								style: {
									display: params.row.tips ? '' : 'none'
								},
								on: {
									click: () => {
										this.$router.push(`/followupRecord/followupRecordList?patientId=${params.row.patientId}`)
									}
								}
							}, '查看随访')
						]
						params.row.tips.split(';').forEach(item => {
							arr.unshift(
								h('Tag', {
									props: {
										color: 'magenta'
									},
									style: {
										marginRight: '10px',
										display: params.row.tips ? '' : 'none'
									}
								}, item)
							)
						})
						return h('div', arr)
					}
				}
			],
			patientData: [],
			patientTotal: 10,
			outpatientTotal: 0,
			outpatientNum: [],
			hospitalNum: {
				totalOfIn: 0,
				TotalOfOut: 0,
				everyDaysOfIn: [],
				everyDaysOfOut: []
			},
			treatmenNum: {
				AdverseDrugReactions: [],
				MedicationCompliance: [],
				treatmentEffect: []
			},
			followStatisticsNum: {
				callStatus: [],
				everyDaysPersonTime: [],
				everyDaysSuccessPersonTime: [],
				targetGather: [],
				followupPersonNumber: 0,
				followupPersonTime: 0,
				followupSuccessPersonTime: 0
			},
			abnormalTargetPie: [],
			abnormalTargetBar: [],
			publicNum: [],
			userName: sessionStorage.getItem('rsysUserName'),
 			position: sessionStorage.getItem('rsysPosition'),
 			awaitTimer: timeFn(sessionStorage.getItem('rsysLastLoginTime'))
		}
	},
	methods: {
		async handlePublic () {
			const res = await this.$API.homePage.public({ userId: this.userId })
			this.publicNum = [
				{ title: '今日成功随访', count: res.data.todaySuccessFollowUpCount, icon: 'iconic_successful', unit: '人' },
				{	title: '今日异常指标', count: res.data.todayAbnormalTargetCount, icon: 'iconic_abnormal', unit: '人'	},
				{	title: '总随访人次', count: res.data.totalFollowUpCount, icon: 'iconic_total', unit: '次'	},
				{	title: '总成功随访人次', count: res.data.totalSuccessFollowUpCount, icon: 'iconic_totalsuccess', unit: '次' }
			]
		},
		async handleDisease () {
			const res = await this.$API.homePage.distribution(this.formDisease)
			this.diseaseNum = res.data
		},
		// 关注患者
		async handlePatient () {
			const res = await this.$API.homePage.patient(this.patientparams)
			this.patientData = res.data.patients
		  this.patientTotal = res.data.total
		},
		handlePage (pager) {
			this.patientparams.pager = pager
			this.handlePatient()
		},
		// 门诊情况分析
		async handleOutpatient () {
			const res = await this.$API.homePage.outpatient(this.formOutpatient)
			this.outpatientNum = res.data.everyDays
			this.outpatientTotal = res.data.total
		},
		 // 住院情况分析
		async handleHospitalize () {
			const res = await this.$API.homePage.hospitalization(this.formHospitalize)
			this.hospitalNum = res.data || {}
		},
		// 治疗情况分析
		async handleTreatment () {
			const res = await this.$API.homePage.treatment(this.formTreatment)
			this.treatmenNum = res.data || {}
		},
		// 随访异常指标情况分析
		async handleAbnormalTarget () {
			const res = await this.$API.homePage.abnormalTarget(this.formAbnormalTarget)
			this.abnormalTargetPie = res.data.abnormalTargetDistribution
			this.abnormalTargetBar = res.data.everyDaysDistribution
		},
		// 随访情况统计
		async handleStatistics () {
			const res = await this.$API.homePage.statistics(this.formStatistics)
			this.followStatisticsNum = res.data || {}
		},
		// 疾病
		handleDiseaseSelect (type) {
			this.$nextTick(() => {
				this[`form${type}`].disease = this.$refs[`disRef${type}`].getSelectedData().secondData.paramName
				this[`handle${type}`]()
			})
		},
		handleTreeDoctor (value, type) {
      if (value[1] === 'tree') {
				this[`form${type}`].organizationId = value[0][value[0].length - 1]
				this[`handle${type}`]()
      } else if (value[1] === 'doctor') {
				this[`form${type}`].selectUserId = value[0]
				this[`handle${type}`]()
      }
    },
		// 全部时间选择器
		selectFollowTimer (type) {
			this[`handle${type}`]()
		}
	},
	mounted () {
		this.handlePublic()
		this.handleDisease()
		this.handlePatient()
		this.handleOutpatient()
		this.handleHospitalize()
		this.handleTreatment()
		this.handleStatistics()
		this.handleAbnormalTarget()
	}
}
</script>

<style lang="less">
.homePage{
	font-size: 14px;
	.header-style{
		margin-bottom: 10px;
	}
	.count-style{
		font-size: 24px;
		font-weight: 600;
	}
	.card-message{
		display: flex;
		p{
			font-size: 16px;
			font-weight: 800;
			margin: -5px 30px 20px 0;
		}
	}
	.followPatient{
		.ivu-table-wrapper{
			border: none;
			position: static;
		}
		.ivu-card-body{
			padding: 0;
		}
	}
	.outPatientStatus{
		list-style: none;
		height: 395px;
		border-right: 1px solid #eee;
		li{
			height: 135px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 1px solid #eee;
			p{
				font-size: 14px;
				color: #333;
			}
		}
		// li:last-child{
		// 	border-bottom: none;
		// }
	}
	.pageStyle{
		text-align: right;
		padding: 10px 0;
	}
  .targetPie {
		border-right: 1px solid #eee;
	}
	.detailData{
		color: rgb(76,165,251);
		margin: 3px 0 0 10px;
		cursor: pointer;
	}
}
</style>
