<template>
  <div class="headerChosen">
    <Cascader :data="orgArray" change-on-select placeholder="全部科室" style="width:150px" @on-change="handleCascader($event, 'tree')"></Cascader>
    <Select
      v-model="doctorValue"
      style="width:150px;marginLeft: 10px"
      placeholder="全部医生"
      @on-change="handleCascader($event, 'doctor')"
      v-if='!isDoctor' clearable>
      <Option v-for='(item, index) in doctorNum' :key='index' :value="item.userId">{{ item.realName || '暂无真实姓名' }}</Option>
    </Select>
  </div>
</template>
<script>
import { formatToTreeData } from '@/libs/businessUtil'
export default {
  data () {
    return {
			userId: sessionStorage.getItem('rsysUserId'),
      doctorNum: [],
      orgArray: [],
      doctorValue: ''
    }
  },
  props: {
    isDoctor: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCascader (value, type) {
      this.$emit('cascaderSelect', value, type)
    },
    async getOptionsData () {
      const resOrg = await this.$API.organizeManage.orgAuthList({ userId: this.userId })
      const resData = resOrg.data || []
      this.orgArray = formatToTreeData({
        shouldGetParentNameArr: true,
        baseArr: resData,
        parentIdName: 'parentId',
        idName: 'value',
        sortName: 'sort',
        expand: true,
        childrenFn: function (item) {
          return {
            value: item.organizationId,
            label: item.name,
            parentId: item.parentId,
            sort: item.sort,
            expand: true,
            description: item.description,
            children: []
          }
        }
      })
    },
    async handleDoctor () {
      const res = await this.$API.userManage.manageUser({ userId: this.userId })
      this.doctorNum = res.data
    }
  },
  mounted () {
    this.getOptionsData()
    this.handleDoctor()
  }
}
</script>
<style lang="less" scoped>
.headerChosen{
  display: flex;
  margin: 0 10px
}
</style>
