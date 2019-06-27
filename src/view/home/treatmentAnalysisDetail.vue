<template>
  <div class="treatment light-black">
	  <analysis-condition v-on:search="handleSearch"></analysis-condition>
		<Card class="margin-top-8 card-padding0" :bordered="false" dis-hover>
			<div slot="title">整体分析</div>
			<Row>
				<Col span="8" v-for="item in roundChartsData" :key="item.title">
					<chart-pie :value="item.data" :text="item.title" :isSolid="true"></chart-pie>
				</Col>
			</Row>
		</Card>
		<Card class="margin-top-8 card-padding0" :bordered="false" dis-hover v-for="(item, index) in lineChartsData" :key="index" v-if="item.data.length">
			<div slot="title">{{item.title}}</div>
			<charts-bar style="height: 270px;" text='' :value='item.data'/>
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
				<el-table-column label="性别" prop="gender"></el-table-column>
				<el-table-column label="年龄" prop="age"></el-table-column>
				<el-table-column label="就诊时间" prop="time" width="150"></el-table-column>
				<el-table-column label="随访时间" prop="followupTime" width="150"></el-table-column>
				<el-table-column label="科室" prop="organizationName"></el-table-column>
				<el-table-column label="疾病名称" prop="diseaseName"></el-table-column>
				<el-table-column label="用药处方" prop="drugPrescription" show-overflow-tooltip></el-table-column>
				<el-table-column label="用药依从性" prop="medicationCompliance"></el-table-column>
				<el-table-column label="用药不良反应" prop="adverseDrugReactions" width="110"></el-table-column>
				<el-table-column label="治疗效果" prop="treatmentEffect"></el-table-column>
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
    name: 'treatmentAnalysisDetail',
    components: {
			ChartsBar,
    	AnalysisCondition,
			ChartPie
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
				// 柱状图
				lineChartsData: [
					{
						title: '用药不良反应分析',
						data: []
					},
					{
						title: '用药处方分析',
						data: []
					},
					{
						title: '年龄段分析',
						data: []
					},
					{
						title: '疾病分析',
						data: []
					}
				],
				// 整体分析--饼图
				roundChartsData: [],
				isAll: false,
				chosenData: []
			}
    },
    methods: {
			async handleSearch (searchData = '') {
				// 不是点 下一页，而是 点击分析时
				if (searchData) {
					this.searchParam.conditionJson = searchData
					this.searchParam.pager = 1
					const chartRes = await this.$API.Treatment.anlysis({ JSON: searchData, userId: this.userId })
					const charResData = chartRes.data
					// 饼图数据
					this.roundChartsData = [
						{
							title: '用药依从性',
							data: charResData.MedicationCompliance
						},
						{
							title: '用药不良反应',
							data: charResData.AdverseDrugReactions
						},
						{
							title: '治疗效果',
							data: charResData.treatmentEffect
						}
					]
					// 柱状图数据
					this.lineChartsData[0].data = charResData.AnalysisOfAdverseDrugReactions
					this.lineChartsData[1].data = charResData.AnalysisOfDrugPrescription
					this.lineChartsData[2].data = charResData.AgeAnalysis
					this.lineChartsData[3].data = charResData.DiseaseAnalysis
				}
				const tableRes = await this.$API.Treatment.tableData({ ...this.searchParam, userId: this.userId })
				this.tableData = tableRes.data
				this.tableTotal = tableRes.total
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
					type: 1
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
				this.$API.postExportExcelFunc(postData, '/manage/export/report', '治疗情况分析详情统计报表')
			}
    }
}
</script>

<style lang="less">
	.treatment{
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
