<template>
  <div class="outpatient">
    <Card shadow style="marginBottom: 10px">
      <h3>门诊统计详情</h3>
      <div slot="extra" style="display: flex">
				<disease-types-select
          placeholderText='全部疾病'
          :show-icd="true"
          ref="diseaseRef"
          style="width: 150px"
        />
        <department-cascader @cascaderSelect="handleTreeDoctor(arguments)"/>
        <date-time-picker
          :timeBegin.sync='formItem.beginDate'
          :timeEnd.sync='formItem.endDate'
          :is-default-today="true"
          style="width: 280px;marginRight: 10px"/>
        <Button type="primary" @click="handleSearch">查询</Button>
      </div>
    </Card>
    <Row>
			<i-col :lg="24" style="height: 120px;padding-bottom: 10px;">
				<infor-card shadow icon='iconic_outpatient'>
					<p class="header-style">门诊就诊患者数</p>
            <count-to :end="outpatientTotal" count-class="count-style">
              <template slot='right'>
                <p style="margin: 8px 0 0 10px">人</p>
              </template>
					  </count-to>
				</infor-card>
			</i-col>
    </Row>
    <Row :gutter="10" style="margin-bottom: 10px;">
      <Col :md="24" :lg="10" >
        <Card shadow style="height: 385px">
          <p slot="title">疾病分布</p>
          <chart-pie :value='diseasePie'/>
        </Card>
      </Col>
      <Col :md="24" :lg="14">
        <Card shadow class="followPatient">
          <p slot="title">医生接诊量排行</p>
          <Table :columns="columns" :data="tableData" height="288"/>
          <Page
						:total="tableTotal"
						:current='tableParams.pager'
						:page-size='tableParams.limit'
						size="small"
						show-total
						@on-change='handlePage'
						class="pageStyle"/>
        </Card>
      </Col>
    </Row>
    <Card shadow style="marginBottom: 10px">
      <patient-line style="height: 400px" text="每日就诊人数" :value='analysisline'/>
    </Card>
  </div>
</template>
<script>
import { ChartPie, PatientLine } from './charts'
import dateTimePicker from '../common-components/dateTimePicker'
import DepartmentCascader from '../common-components/departmentCascader'
import DiseaseTypesSelect from '../common-components/diseaseTypesSelect'
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
export default {
  name: 'outpatient',
  components: {
		InforCard,
		CountTo,
    ChartPie,
    dateTimePicker,
    DepartmentCascader,
    DiseaseTypesSelect,
		PatientLine
	},
  data () {
    return {
			userId: sessionStorage.getItem('rsysUserId'),
      outpatientTotal: 0,
      diseasePie: [],
      analysisline: [],
      tableParams: {
        pager: 1,
        limit: 10
      },
      formItem: {
        userId: sessionStorage.getItem('rsysUserId'),
        disease: '',
        organizationId: '',
        selectUserId: '',
        beginDate: '',
        endDate: ''
      },
      tableData: [],
      tableTotal: 0,
      columns: [
        {
          title: '排名',
          render: (h, params) => {
            return h('div', params.row._index + 1)
          }
        },
        {
          title: '姓名',
          key: 'userName'
        },
        {
          title: '接诊量(人)',
          key: 'receiveCount'
        },
        {
          title: '随访量(人)',
          key: 'followupCount'
        }
      ]
    }
  },
  methods: {
    // 医生接诊量排行
    async handleRanking (params) {
      const res = await this.$API.outpatientDetail.ranking({
        ...this.tableParams,
        ...this.formItem,
        ...params
      })
      this.tableData = res.data
      this.tableTotal = res.total
    },
    // 疾病分布,每日就诊统计分析
    async handleAnalysis () {
      const res = await this.$API.outpatientDetail.analysis(this.formItem)
      this.analysisline = res.data.everyDays
      this.diseasePie = res.data.diseaseDistribution
      this.outpatientTotal = res.data.total
    },
    handlePage (pager) {
			this.tableParams.pager = pager
			this.handleRanking()
		},
    handleSearch () {
      this.formItem.disease = this.$refs.diseaseRef.getSelectedData().secondData.paramName
      if (this.formItem.beginDate) {
        this.handleRanking({ pager: 1 })
        this.handleAnalysis()
      } else {
        this.$Message.warning('请选择时间!')
      }
    },
    handleTreeDoctor (value) {
      if (value[1] === 'tree') {
        this.formItem.organizationId = value[0][value[0].length - 1]
      } else if (value[1] === 'doctor') {
        this.formItem.selectUserId = value[0]
      }
    }
  },
  mounted () {
    this.handleRanking()
    this.handleAnalysis()
  }
}
</script>
<style lang="less">
.outpatient {
  .header-style{
		margin-bottom: 10px;
  }
  .count-style{
    font-size: 24px;
    font-weight: 600;
    margin-right: 3px;
  }
  .pageStyle{
		text-align: right;
		padding: 10px 0;
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
}
</style>
