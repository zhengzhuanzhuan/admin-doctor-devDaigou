<template>
  <p v-if='!value.length' class="NoData">暂无数据</p>
  <Row class="chartPie" v-else>
    <Col span='13'>
      <p class="pieTitle">{{text}}</p>
      <div ref="dom" style="height: 280px;"></div>
    </Col>
    <Col span='11'>
      <ul class="diseableList">
        <li v-for='(item,index) in value' :key='index'>
          <i :style='`background: ${color[index]}`'></i>
          <p>{{ item.title }}</p>
          <span>{{ item.count }}人</span>
          <span>{{ item.proportion && `${item.proportion}%` }}</span>
        </li>
      </ul>
    </Col>
  </Row>
</template>
<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  data () {
    return {
      color: [],
      dom: null
    }
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    text: {
      type: String,
      default: ''
    },
		// 是否是实心
    isSolid: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (val, oldVal) {
      this.$nextTick(() => {
        if (this.value.length) {
          this.initChart()
        }
      })
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    initChart () {
      this.dom = echarts.init(this.$refs.dom)
      if (this.value.length <= 2) {
        this.color = ['#033fff', '#6b76ff']
      } else if (this.value.length === 3) {
        this.color = ['#033fff', '#4a9ff5', '#5ff4ee']
      } else {
        this.color = ['#6b76ff', '#a5ae77', '#c8e4fe', '#033fff', '#4a9ff5', '#5ff4ee', '#769fcd', '#b9d7ea', '#5176C9', '#415f77']
      }
      const seriesData = [] // 清空之前的，否则多次调用会存在之前的数据
      let totalData = 0
      this.value.forEach(item => {
        totalData += item.count
        seriesData.push({
          value: item.count,
          name: item.title
        })
      })
      const option = {
        title: {
          text: this.isSolid ? '' : `${totalData}人`,
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16
          }
        },
        tooltip: {
          show: true,
          trigger: 'item',
          confine: true,
          formatter: '{b}: {c}人 ({d}%)'
        },
        series: [
          {
            type: 'pie',
            selectedMode: 'single',
            radius: [`${this.isSolid ? '0' : '40%'}`, '84%'],
            color: this.color,
            label: {
              normal: {
                show: true,
                position: 'inner',
                formatter: '{d}%',
                textStyle: {
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 14
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
          data: seriesData
        }
      ]
    }
    this.dom.setOption(option)
    on(window, 'resize', this.resize)
    }
  },
  mounted () {
    if (this.value.length) {
      this.initChart()
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
<style lang="less" scoped>
.chartPie{
   .pieTitle{
    margin-left: 10px;
    color: #333;
    font-weight: 600;
  }
  .diseableList{
	  margin-left: 50px;
		list-style: none;
		li{
			margin-top: 10px;
			display: flex;
			i{
        display: line-block;
        width: 18px;
        height: 15px;
        border-radius: 20%;
        margin: 3px 10px 0 0;
      }
      p{
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
      }
			span{
        margin-left: 10px;
        width: 50px;
			}
		}
  }
}
</style>
