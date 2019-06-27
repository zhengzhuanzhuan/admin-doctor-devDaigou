<template>
  <div class="app-container">
    <!-- 搜索 -->
    <ul class="common_search">
      <li class="common_search_single">
        <label class="radio-label" >姓名</label>
        <el-input  placeholder="请输入患者姓名"  v-model.trim="searchParam.hzxm"></el-input>
      </li>
      <li class="common_search_single">
        <label class="radio-label" >疾病名称</label>
        <disease-types-select :show-icd="false" ref="diseaseRef" placeholder-text=""></disease-types-select>
      </li>
      <li class="common_search_single">
        <label class="radio-label" >性别</label>
        <el-select class="filter-item" v-model="searchParam.hzxb" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
					<el-option label="其他" value="3"></el-option>
        </el-select>
      </li>
      <li class="common_search_single">
        <label class="radio-label">年龄</label>
        <el-input placeholder="0" v-model.trim="searchParam.ageBegin"></el-input>
        <span class="input-separator">-</span>
        <el-input placeholder="99" v-model.trim="searchParam.ageEnd"></el-input>
      </li>
			<li class="common_search_single">
				<label class="radio-label" >关注</label>
				<el-select class="filter-item" v-model="searchParam.focus" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option label="关注的患者" value="1"></el-option>
				</el-select>
			</li>
			<li class="common_search_single">
				<label class="radio-label" >患者状态</label>
				<el-select class="filter-item" v-model="searchParam.status" placeholder="请选择">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="(item, index) in statusArray" :label="item.paramName" :value="item.paramCode" :key="index"></el-option>
				</el-select>
			</li>
      <li class="common_search_single">
        <el-button type="primary" icon="el-icon-search"  @click="handlePage(1)"
                   :loading="tableParams.isLoading">查询</el-button>
      </li>
    </ul>
    <!-- tab切换 -->
		<el-table
			:data="tableParams.data" highlight-current-row
			v-loading="tableParams.isLoading">
			<el-table-column label="" prop="patientName" align="right" width="40">
				<template slot-scope="scope">
					<Icon type="md-heart" v-if="scope.row.focus===1" />
				</template>
			</el-table-column>
			<el-table-column label="姓名" prop="hzxm"></el-table-column>
			<el-table-column prop="name" label="性别/年龄">
				<template slot-scope="scope">
					<span>{{scope.row.hzxb===1 ? '男':scope.row.hzxb===3 ? '其他':'女'}}</span>&nbsp;/&nbsp;<span>{{scope.row.age}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="lastDiagnoseTime" label="最近就诊日期">
			</el-table-column>
			<el-table-column prop="lastIcdName" label="最近就诊疾病">
				<template slot-scope="scope">
					<el-tag :type="scope.row.lastHzlx === 1 ? 'sussess' : ''" size="mini" class="margin-right-8">{{scope.row.lastHzlx === 1 ? '门诊' : '住院'}}</el-tag>
					<span>{{scope.row.lastIcdName}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="患者状态">
				<template slot-scope="scope">
					<span>{{statusMap[scope.row.status]}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="操作" width="250">
				<template slot-scope="scope">
					<el-button type="text" v-permission="$API.followRecord.list" :disabled="scope.row.isOrder===1" @click="jumptoRecord(scope.row.id)">
						查看随访结果
					</el-button>
					<el-button type="text" @click="wayButton(scope)" v-permission="$API.patientManage.getRecordDate">查看档案</el-button>
					<el-button type="text" @click="updateTelBtn(scope)" v-permission="$API.patientManage.update">信息编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-container">
			<el-pagination  @current-change="handlePage" :current-page.sync="searchParam.pager" :page-size="searchParam.limit" layout="total,prev, pager, next, jumper"
											:total="tableParams.total" v-if="tableParams.total">
			</el-pagination>
		</div>
    <!-- 弹框 -->
    <!-- 就诊档案 -->
    <patient-file
      :patient-id="patientId"
      :show-record-link="false"
      :task-id="taskId"
      v-on:refreshData="getList"
      ref="patientFile"
    ></patient-file>
    <!--信息编辑-->
    <edit-info
			ref="editInfo"
			:patient-info="editPersonRowData"
			v-on:refreshData="getList"
		></edit-info>
  </div>
</template>

<script>
/**
 * 患者列表
 * @module patientList
 */
import patientFile from 'self_c/patientFile'
import DiseaseTypesSelect from '../common-components/diseaseTypesSelect'
import EditInfo from './editInfo'
export default {
  name: 'PatientList',
  data () {
    return {
      searchParam: {
        hzxm: '', // 患者姓名
        icd: '', // 疾病类型
        hzxb: '', // 性别
        ageBegin: '', // 搜索起始年龄
        ageEnd: '', // 搜索结束年龄
				status: '',
				focus: '',
				pager: 1,
        limit: 10 // 每页条数
      },
			tableParams: {
      	data: [],
				total: 0,
				isLoading: false
			},
      patientId: '', // 病人id
      taskId: '',
			userId: sessionStorage.getItem('rsysUserId'),
			statusMap: {},
			statusArray: [],
			editPersonRowData: {}
    }
  },
  components: {
		EditInfo,
		DiseaseTypesSelect,
    patientFile
  },
  mounted () {
    this.getList()
		this.getOptionData()
  },
  methods: {
		// 计划状态
		async getOptionData () {
			const res = await this.$API.systemParamManage.list({ paramTypeCode: 'patientStatus', limit: 999 })
			this.statusArray = res.data.filter(item => item.paramName !== '门诊' && item.paramName !== '住院')
			res.data.forEach(item => {
				this.statusMap[item.paramCode] = item.paramName === '门诊' || item.paramName === '住院' ? '正常' : item.paramName
			})
		},
    /**
      * 获取列表数据
      * @function getList
      * @param {String} adminId 医生Id
      * @param {String} sex 病人性别
      * @param {String} patientName 病人名称
      * @param {String} icdName 疾病类型
      * @param {String} fromAge 搜索起始年龄
      * @param {String} endAge 搜索结束年龄
      * @param {String} schemeName 方案名称
      * @param {String} gz 全部患者(0前部，1已关注)
      * @param {String} pager 当前页码
      * @param {String} limit 每页显示条数
      */
    getList () {
      this.tableParams.isLoading = true
			const disSelectRes = this.$refs.diseaseRef.getSelectedData()
			this.searchParam.icd = disSelectRes.secondData ? disSelectRes.secondData.paramName : ''
      this.$API.patientManage.list(this.searchParam).then((res) => {
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
    /**
       * 获取表格选中行信息  查看患者档案
       * @function wayButton
       * @param {Object} scope 点击列表的scope的信息
       */
    wayButton (scope) {
      this.patientId = scope.row.id
      // this.taskId = scope.row.taskId
      this.$refs.patientFile.toggleShowModal()
    },
    /**
       * 列表 修改手机号 按钮
       * @function updateTelBtn
       * @param {Object} scope 点击列表的scope的信息
       */
    updateTelBtn (scope) {
      this.editPersonRowData = JSON.parse(JSON.stringify(scope.row))
      this.$refs.editInfo.toggleShowModal()
    },
		jumptoRecord (id) {
    	this.$router.push({
				path: '/followupRecord/followupRecordList',
				query: {
					patientId: id
				}
			})
		}
  }
}
</script>
<style scoped>
  .input-separator{
    line-height: 36px;
    padding: 0 3px;
  }
  .app-container .iconfont{
    color: #ff6e40;
    position: absolute;
    left: 15px;
  }
	.ivu-icon-md-heart{
		color: red;
	}
</style>
