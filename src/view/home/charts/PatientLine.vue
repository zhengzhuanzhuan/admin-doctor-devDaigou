<template>
  <p v-if='!value.length' class="NoData">暂无数据</p>
  <div ref="dom" v-else></div>
</template>
<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'medicalLine',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    text: String
  },
  data () {
    return {
      dom: null
    }
  },
  watch: {
    value (val, oldVal) {
      this.$nextTick(() => {
        this.initChart()
      })
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    initChart () {
      this.dom = echarts.init(this.$refs.dom)
      let XData = []
      let seriesData = []
      this.value.forEach(item => {
        XData.push(item.date)
        seriesData.push(item.count)
      })
      const option = {
        title: {
          text: this.text,
          x: '3%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: 'rgba(255,255,255, 0)'
            }
          }
        },
        grid: {
          top: '19%',
          left: '4%',
          right: '4%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              color: '#666'
            }
          },
          axisTick: {
            show: false
          },
          data: XData
        }],
        yAxis: [{
          type: 'value',
          name: '单位(人次)',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              color: '#666'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(49,86,191,1)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(49,86,191,0.8)'
                },
                {
                  offset: 0.8,
                  color: 'rgba(49,86,191,0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(49,86,191,0.2)'
                }
              ])
            }
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '就诊患者',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 255, 255, 1)'
              }, {
                offset: 1,
                color: 'rgba(255, 255, 255, 0)'
              }], false)
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(137, 115, 193, 0.6)',
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 3
            }
          },
          data: seriesData
        }]
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
<style>
.NoData {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  height: 300px;
}
</style>
