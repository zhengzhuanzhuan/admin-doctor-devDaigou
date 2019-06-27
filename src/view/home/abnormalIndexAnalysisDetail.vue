<template>
	<div class="abnormalIndex light-black">
		<analysis-condition :type="2" v-on:search="handleSearch"></analysis-condition>
		<Card class="margin-top-8 card-padding0" :bordered="false" dis-hover>
			<div slot="title">整体分析</div>
			<Row>
				<Col span="8">
					<chart-pie :value="anlysisAllData.abnormalTargetDistribution" text="异常指标分布" :isSolid="true"></chart-pie>
				</Col>
				<Col span="16">
					<charts-bar style="height: 270px;" text='' :value='anlysisAllData.abnormalTargetDistributionLimit10' :is-double="true"/>
				</Col>
			</Row>
		</Card>
		<Card class="margin-top-8 card-padding0" :bordered="false" dis-hover>
			<div slot="title">异常指标分析</div>
			<charts-bar style="height: 270px;" text='' :value='anlysisAllData.everyDaysDistribution' :is-double="true"/>
		</Card>
		<Card class="margin-top-8 card-padding0" :bordered="false" dis-hover>
			<div slot="title">统计总人数<span>(人)</span><strong>{{tableTotal}}</strong></div>
			<el-table
				ref="table"
				:data="tableData"
				tooltip-effect="dark"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="35"></el-table-column>
				<el-table-column label="姓名" prop="patientName"></el-table-column>
				<el-table-column label="联系电话" prop="mobile"></el-table-column>
				<el-table-column label="性别/年龄" prop="age">
					<template slot-scope="scope">
						<span>{{scope.row.gender}}</span>&nbsp;/&nbsp;<span>{{scope.row.age}}</span>
					</template>
				</el-table-column>
				<el-table-column label="就诊时间/住院时间" prop="time" width="150"></el-table-column>
				<el-table-column label="科室" prop="organizationName" show-overflow-tooltip></el-table-column>
				<el-table-column label="方案名称" prop="schemeName" show-overflow-tooltip></el-table-column>
				<el-table-column label="疾病名称" prop="diseaseName" show-overflow-tooltip></el-table-column>
				<el-table-column label="随访时间" prop="followupTime" show-overflow-tooltip></el-table-column>
				<el-table-column label="随访异常结果" prop="abnormalResult" show-overflow-tooltip></el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="pagination-container">
				<div class="pagination-container-left" v-if="tableData.length">
					<el-button @click="handleChoosePage">全选当页</el-button>
					<el-button :type="isAll ? 'primary' : ''" @click="isAll = !isAll">{{isAll ? '已选所有页' : '全选所有页'}}</el-button>
					<el-button @click="handleExport" :disabled="chosenData.length===0 && !isAll">导出报表</el-button>
				</div>
				<el-pagination  @current-change="handlePageChange" :current-page.sync="searchParam.pager" :page-size="searchParam.limit" layout="total,prev, pager, next, jumper"
												:total="tableTotal" v-if="tableTotal">
				</el-pagination>
			</div>
		</Card>
	</div>
</template>

<script>
	import AnalysisCondition from 'self_c/analysisCondition'
	import { ChartPie, ChartsBar } from '@/view/home/charts'
	export default {
		name: 'abnormalIndexAnalysisDetail',
		components: {
			AnalysisCondition,
			ChartPie,
			ChartsBar
		},
		data () {
			return {
				userId: sessionStorage.getItem('rsysUserId'),
				searchParam: {
					limit: 10,
					pager: 1,
					conditionJson: ''
				},
				tableData: [],
				tableTotal: 0,
				isAll: false,
				chosenData: [],
				anlysisAllData: {
					everyDaysDistribution: [],
					abnormalTargetDistribution: [],
					abnormalTargetDistributionLimit10: []
				}
			}
		},
		methods: {
			async handleSearch (searchData = '') {
				if (searchData) {
					this.searchParam.conditionJson = searchData
				}
				const tableRes = await this.$API.abnormalIndex.tableData({ ...this.searchParam, userId: this.userId })
				this.tableData = tableRes.data
				this.tableTotal = tableRes.total
				// 不是点 下一页，而是 点击分析时
				if (searchData) {
					const chartRes = await this.$API.abnormalIndex.anlysis({ JSON: searchData, userId: this.userId })
					this.anlysisAllData = chartRes.data
				}
			},
			handlePageChange (pager) {
				this.searchParam.pager = pager
				this.handleSearch()
			},
			handleChoosePage () {
				this.$refs.table.toggleAllSelection()
			},
			handleSelectionChange (val) {
				this.chosenData = val
			},
			handleExport () {
				const postData = {
					userId: this.userId,
					recordIds: '',
					conditionJson: '',
					isAll: this.isAll ? 1 : 0,
					type: 2
				}
				// postExportExcelFunc
				if (this.isAll) {
					postData.conditionJson = this.searchParam.conditionJson
				} else {
					const idsArr = []
					this.chosenData.forEach(item => {
						idsArr.push(item.recordId)
					})
					postData.recordIds = idsArr.join(',')
				}
				this.$API.postExportExcelFunc(postData, '/manage/export/report', '异常指标详情统计报表')
			}
		}
	}
</script>

<style lang="less">
	.abnormalIndex{
		.ivu-card-head{
			padding: 16px;
			span {
				color: #bcbcbc;
				margin: 0 8px;
			}
			strong{
				color: #2D8cF0;
			}
		}
		.card-padding0{
			.ivu-card-body{
				padding: 0;
			}
		}
		.el-button{
			height: 32px;
			line-height: 32px;
			width: 104px;
			padding: 0;
		}
		.ivu-col-span-8{
			border-right: 1px solid #e8eaec;
		}
		.ivu-col-span-8:last-child{
			border: 0;
		}
	}
</style>
