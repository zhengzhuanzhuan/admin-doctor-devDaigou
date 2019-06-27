<template>
  <div class="followStatistics">
    <analysis-condition :type="3" v-on:search="handleSearch" ref='analy' style='marginBottom: 10px'></analysis-condition>
    <Card shadow>
      <p class="followTotal">统计总人数<strong>{{tableData.total}}</strong>人</p>
      <Table
        :columns="columnsParams"
        :data="tableData.data"
        :loading='tableData.loading'
        @on-selection-change='handleSelectChange'
        ref="selection"></Table>
      <br/>
      <div  v-if="tableData.data.length">
        <Button  @click="handleChoosePage" :type="tableChosenData.length ? 'primary' : 'default'">全选当页</Button>
        <Button style="margin: 0 10px" :type="isAll ? 'primary' : 'default'" @click="isAll = !isAll">{{isAll ? '已选所有页' : '全选所有页'}}</Button>
        <Button @click='handleExport' :disabled="tableChosenData.length===0 && !isAll">导出报表</Button>
      </div>
      <Page
        :page-size='searchParams.limit'
        :current='searchParams.pager'
        @on-change='handlePage'
        :total="tableData.total"
        show-total
        style="textAlign: right"/>
    </Card>
  </div>
</template>
<script>
import AnalysisCondition from 'self_c/analysisCondition'
export default {
  name: 'followStatistics',
  components: {
    AnalysisCondition
  },
  data () {
    return {
    	userId: sessionStorage.getItem('rsysUserId'),
      tableChosenData: [],
      isCurrentPage: false,
      isAll: false,
      searchParams: {
        limit: 10,
        pager: 1,
        conditionJson: ''
      },
      tableData: {
        data: [],
        total: 0,
        loading: false
      },
      columnsParams: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'patientName'
        },
        {
          title: '联系电话',
          key: 'mobile'
        },
        {
          title: '科室',
          key: 'organizationName'
        },
        {
          title: '方案名称',
          key: 'schemeName'
        },
        {
          title: '疾病名称',
          key: 'diseaseName'
        },
        {
          title: '随访时间',
          key: 'followupTime'
        },
        {
          title: '采集情况',
          key: 'resultStatus'
        },
        {
          title: '通话状态',
          key: 'callStatus'
        }
      ]
    }
  },
  methods: {
    async handleSearch (searchData) {
      this.searchParams.conditionJson = searchData
      this.tableData.loading = true
      const res = await this.$API.followCollect.followList({
        userId: this.userId,
        ...this.searchParams
      })
      this.tableData.data = res.data
      this.tableData.total = res.total
      this.tableData.loading = false
    },
    handleChoosePage () {
      this.isCurrentPage = !this.isCurrentPage
      this.$refs.selection.selectAll(this.isCurrentPage)
    },
    // 表格的选中项
    handleSelectChange (val) {
      this.tableChosenData = val
    },
    // 导出报表
    handleExport () {
      const postData = {
        userId: this.userId,
        recordIds: '',
        conditionJson: '',
        isAll: this.isAll ? 1 : 0,
        type: 3
      }
      // postExportExcelFunc
      // 为1时全选所有页
      if (this.isAll) {
        postData.conditionJson = this.searchParams.conditionJson
      } else {
        const idsArr = []
        this.tableChosenData.forEach(item => {
          idsArr.push(item.recordId)
        })
        postData.recordIds = idsArr.join(',')
      }
      this.$API.postExportExcelFunc(postData, '/manage/export/report', '随访统计的报表')
    },
    handlePage (pager) {
      this.searchParams.pager = pager
      this.handleSearch(this.$refs.analy.getSearchJsonString())
    }
  },
  mounted () {
    this.handleSearch(this.$refs.analy.getSearchJsonString())
  }
}
</script>
<style lang="less">
.followStatistics {
  .ivu-card-body{
    padding-top: 0;
  }
  .followTotal {

    font-size: 16px;
    padding: 15px 0;
  }
}
</style>
