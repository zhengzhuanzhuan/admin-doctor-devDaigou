<template>
  <div class="outpatient">
    <Card shadow style="marginBottom: 10px">
      <h3>住院统计详情</h3>
      <div slot="extra" style="display: flex">
				<disease-types-select
          placeholderText='全部疾病'
          :show-icd="true"
          ref="diseaseRef"
          style="width: 150px"/>
        <department-cascader @cascaderSelect="handleTreeDoctor(arguments)"/>
        <date-time-picker
          :timeBegin.sync='formHospital.beginDate'
          :timeEnd.sync='formHospital.endDate'
          :is-default-today="true"
          style="width: 280px;marginRight: 10px"/>
         <Button type="primary" @click='handleSearch'>查询</Button>
      </div>
    </Card>
    <Row :gutter="10">
			<Col :lg="12" style="height: 120px;padding-bottom: 10px">
				<infor-card shadow icon='iconic_admitted'>
					<p class="header-style">入院患者数</p>
            <count-to :end="totalOfIn" count-class="count-style">
              <p slot='right' style="margin: 3px 0 0 10px">人</p>
					  </count-to>
				</infor-card>
			</Col>
			<Col :lg="12" style="height: 120px;padding-bottom: 10px">
				<infor-card shadow icon='iconic_out'>
					<p class="header-style">出院患者数</p>
            <count-to :end="TotalOfOut" count-class="count-style">
              <p slot='right' style="margin: 3px 0 0 10px">人</p>
					  </count-to>
				</infor-card>
			</Col>
    </Row>
    <Row style="marginBottom: 10px">
			<Card shadow>
				<p slot="title">入院情况分析</p>
				<Row :gutter="20" >
					<Col span='12' class="targetPie">
						<chart-pie text='疾病分布' :value='diseaseDistributionOfIn'/>
					</Col>
					<Col span='12' class="targetPie">
						<chart-pie text='科室分布' :value="departmentOfIn"/>
					</Col>
				</Row>
			</Card>
    </Row>
    <Card shadow style="marginBottom: 10px">
      <patient-line style="height: 400px" text="每日入院人数" :value='everyDaysOfIn'/>
    </Card>
    <Row style="marginBottom: 10px">
			<Card shadow>
				<p slot="title">出院情况分析</p>
				<Row :gutter="20" >
					<Col span='12' class="targetPie">
						<chart-pie text="疾病分布" :value='diseaseDistributionOfOut'/>
					</Col>
					<Col span='12' class="targetPie">
						<chart-pie text="科室分布" :value='departmentOfOut'/>
					</Col>
				</Row>
			</Card>
    </Row>
    <Card shadow>
      <patient-line style="height: 400px" text="每日出院人数" :value='everyDaysOfOut'/>
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
      TotalOfOut: 0,
      totalOfIn: 0,
      departmentOfIn: [],
      departmentOfOut: [],
      diseaseDistributionOfIn: [],
      diseaseDistributionOfOut: [],
      everyDaysOfIn: [],
      everyDaysOfOut: [],
      formHospital: {
        userId: sessionStorage.getItem('rsysUserId'),
        disease: '',
        organizationId: '',
        selectUserId: ''
      }
    }
  },
  methods: {
    handleSearch () {
      this.formHospital.disease = this.$refs.diseaseRef.getSelectedData().secondData.paramName
      this.handleHospital()
    },
    handleTreeDoctor (value) {
      if (value[1] === 'tree') {
        this.formHospital.organizationId = value[0][value[0].length - 1]
      } else if (value[1] === 'doctor') {
        this.formHospital.selectUserId = value[0]
      }
    },
    async handleHospital () {
      const res = await this.$API.hospital.analysis(this.formHospital)
      this.TotalOfOut = res.data.TotalOfOut
      this.totalOfIn = res.data.totalOfIn
      this.departmentOfIn = res.data.departmentOfIn
      this.departmentOfOut = res.data.departmentOfOut
      this.diseaseDistributionOfIn = res.data.diseaseDistributionOfIn
      this.diseaseDistributionOfOut = res.data.diseaseDistributionOfOut
      this.everyDaysOfIn = res.data.everyDaysOfIn
      this.everyDaysOfOut = res.data.everyDaysOfOut
    }
  },
  mounted () {
    this.handleHospital()
  }
}
</script>
<style lang="less">
.outpatient {
  .header-style{
		margin-bottom: 10px;
  }
  .count-style{
    font-size: 16px;
    font-weight: 600;
    margin-right: 3px;
  }
  .targetPie {
    height: 320px;
    // line-height: 320px;
    border-right: 1px solid #eee;
  }
}
</style>
