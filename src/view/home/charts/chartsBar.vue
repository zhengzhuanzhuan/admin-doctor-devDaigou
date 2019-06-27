<template>
  <p v-if='!value.length' class="NoData">暂无数据</p>
  <div ref=dom v-else></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'chartsDoubleBar',
  data () {
    return {
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
    text: String,
    // 是否为双柱状图,默认为单
    isDouble: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    initChart () {
      this.dom = echarts.init(this.$refs.dom)
      let XData = []
      let seriesTotalData = []
      let seriesAbnormalData = []
      let seriesProportion = []
      this.value.forEach(item => {
        XData.push(item.title)
        seriesAbnormalData.push(item.count)
        seriesTotalData.push(item.total || '')
        seriesProportion.push(item.proportion || '')
      })
      const option = {
        title: {
          text: this.text || '',
          subtext: '人数 单位(人)',
          x: '4%',
          textStyle: {
            color: '#333',
            fontSize: '14'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '14'
          }
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
          right: '2%',
          bottom: '0%',
          containLabel: true
        },
        legend: {
          selectedMode: false,
          show: this.isDouble ? 'true' : 'false',
          textStyle: {
            color: '#90979c'
          }
        },
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          data: XData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        series: [
          {
            name: '异常人数',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 55,
            barMinHeight: this.isDouble ? 20 : 0,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'rgb(28, 123, 255)',
                label: {
                  show: true,
                  textStyle: {
                    color: this.isDouble ? '#fff' : '#333'
                  },
                  position: this.isDouble ? 'insideTop' : ['45%', '-8%'],
                  formatter: (item) => {
                    return item.value > 0 ? (item.value) : ''
                  }
                }
              }
            },
            data: seriesAbnormalData
          },
          {
            name: this.isDouble ? '总人数' : '',
            type: 'bar',
            barMinHeight: 20,
            stack: '总量',
            itemStyle: {
              normal: {
                color: this.isDouble ? 'rgb(212, 219, 232)' : 'rga(0, 0, 0)',
                label: {
                  show: true,
                  position: 'insideTop',
                  distance: -17,
                  formatter: (item) => {
                    return `{colorPropor|异常${seriesProportion[item.dataIndex] || ''} %}\n\n{colortotal|${item.value || ''}}`
                  },
                  rich: {
                    colortotal: {
                      color: '#333',
                      align: 'center'
                    },
                    colorPropor: {
                      color: 'red',
                      align: 'center'
                    }
                  }
                }
              }
            },
            data: seriesTotalData
          }
        ]
      }
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
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
