<template>
  <p class="NoData" v-if='(!valueIn.length) && (!valueOut.length)'>暂无数据</p>
  <div ref="dom" v-else></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'medicalLine',
   props: {
    valueIn: {
      type: Array,
      default () {
        return []
      }
    },
    valueOut: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    initChart () {
      this.dom = echarts.init(this.$refs.dom)
      let XData = []
      let seriesDataIn = []
      let seriesDataOut = []
      this.valueIn.forEach(item => {
        XData.push(item.date)
        seriesDataIn.push(item.count)
      })
      this.valueOut.forEach(item => {
        seriesDataOut.push(item.count)
      })
      const option = {
        title: {
          text: '出入院患者',
          x: '3%'
        },
        legend: {
          selectedMode: false,
          right: '50%',
          top: 12,
          textStyle: {
            color: '#414957',
            fontSize: 12
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
          right: '4%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#666'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgb(216, 216, 216 , 0.3)'
              // color: 'rgb(255, 255, 255, 0.8)'
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
              // color: 'rgb(255, 255, 255, 0.8)'
              color: 'rgb(216, 216, 216 , 0.3)'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#666'
            }
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
              color: 'rgb(242,247, 255)'
            }
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '入院患者',
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
              color: '#a5aeff'
            }
          },
          itemStyle: {
            normal: {
              color: '#a5aeff',
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 3
            }
          },
          data: seriesDataIn
        },
        {
          name: '出院患者',
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
              color: '#747fff'
            }
          },
          itemStyle: {
            normal: {
              color: '#747fff',
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 3
            }
          },
          data: seriesDataOut
        }
        ]
      }
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  watch: {
    valueIn (val, oldVal) {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    valueOut (val, oldVal) {
      this.$nextTick(() => {
        this.initChart()
      })
    }
  },
  mounted () {
    if (this.valueIn.length || this.valueOut.length) {
      this.initChart()
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
