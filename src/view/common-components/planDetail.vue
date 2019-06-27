<template>
	<Drawer width='600' title="计划详情" v-model="showPlanDetailDrawer" :mask-closable="false">
		<div>
			<div class="baseMess">
				<Row class="RowSpace">
					<Col span="12">
						<span class='Name'>{{planDetailNum.brxm}}</span>
						<span class='Age'>{{planDetailNum.brxb==1? '男':'女'}}/{{planDetailNum.age}}</span>
					</Col>
					<Col span="12">
						<Button type="primary" @click="jumptoRecord(planDetailNum.planId)" v-permission="$API.followRecord.list" :disabled="isOrder===1">查看随访记录</Button>
					</Col>
				</Row>
				<Row class="RowSpace">
					<Col span="12">
						疾病分类：{{ planDetailNum.icdName}}
					</Col>
					<Col span="12">
						联系电话: {{ planDetailNum.mobile}}
					</Col>
				</Row>
				<Row class="RowSpace">
					<Col span="12">
						所属组织:{{planDetailNum.organizationName}}
					</Col>
					<Col span="12">
						方案名称：{{planDetailNum.schemeName}}
					</Col>
				</Row>
				<Row class="RowSpace">
					<Col span="12">
						计划状态：{{planStatusList[planDetailNum.status]}}
					</Col>
					<Col span="12">
						计划开始日期：{{parseTime(planDetailNum.followupStartTime)}}
					</Col>
				</Row>
				<Row class="RowSpace">
					<Col span="12">
						就诊时间：{{parseTime(planDetailNum.orderTime)}}
					</Col>
					<Col span="12">
						生成时间：{{parseTime(planDetailNum.dateAdd)}}
					</Col>
				</Row>
				<Row class="RowSpace">
					<Col span="12">
						随访周期: {{planDetailNum.type==0?'提前':'延后'}}{{planDetailNum.firstday || '--'}}天，间隔{{planDetailNum.intervalDays}}天
					</Col>
					<Col span="12">
						随访次数：{{`${planDetailNum.followupCurrentCount}/${planDetailNum.followupCount}`}}
					</Col>
				</Row>
			</div>
			<div class='testList' v-for='(item,index) in planDetailNum.lists' :key="index">
				<Row>
					<Col span="6">
						<h1>第{{index+1}}次</h1>
					</Col>
					<Col span="13">
						<p>预计执行日期：{{parseTime(item.planBeginDate)}} 开始</p>
						<p>实际执行时间：
							<span>{{item.recordBeginDate? parseTime(item.recordBeginDate) : ''}}</span>
							<span style='color: #FF9900'>{{planStatusList[item.status] || '等待开始'}}</span>
						</p>
						<h3>采集指标</h3>
						<Tag color="primary" class="btn" v-for='(text, targetIndex) in item.targets' :key="targetIndex">{{text&&text.targetName}}</Tag>
					</Col>
				</Row>
			</div>
		</div>
	</Drawer>
</template>

<script>
	import { parseTime } from '@/libs/tools.js'
  export default {
    name: 'planDetail',
		data () {
    	return {
				showPlanDetailDrawer: false,
				planDetailNum: {},
				parseTime
			}
		},
		props: {
			id: {
				type: String,
				default: ''
			},
			isOrder: {
				type: Number,
				default: 0
			},
			planStatusList: { // 终止详情时有
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		methods: {
    	getData () {
				this.$nextTick(async () => {
					this.planDetail = true
					const res = await this.$API.planList.followPlanDetail({ id: this.id })
					this.planDetailNum = res.data.followupPlanDetail || {}
				})
			},
			showPlanDetail () {
    		this.showPlanDetailDrawer = true
				this.getData()
			},
			jumptoRecord (id) {
				this.showPlanDetailDrawer = false
				this.$router.push({
					path: '/followupRecord/followupRecordList',
					query: {
						planId: id
					}
				})
			}
		}
  }
</script>

<style lang="less">
	.baseMess {
		border-bottom: 1px solid #ccc;
		margin-bottom: 20px;
		.RowSpace {
			margin-bottom: 20px;
			.Name {
				color: #3366FF;
				font-size: 24px;
				font-weight: 600;
			}
			.Age{
				color: #3366CC;
				margin-left: 20px;
			}
		}
	}
	.testList {
		padding-bottom: 20px;
		border-bottom: 1px solid #ccc;
		p {
			margin-bottom: 10px;
		}
		.btn {
			margin: 10px 10px 0 0;
		}
	}
</style>
