import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import chinaMapData from '../../echart/china.json'

//地图画出来 引用的资源是本地的,其实是要从接口获取过来
echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const echartsInstance = echarts.init(el)
  const setOptions = (options: EChartsOption) => {
    echartsInstance.setOption(options)
  }

  const updateResize = () => {
    echartsInstance.resize()
  }
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
  return {
    echartsInstance,
    setOptions,
    updateResize
  }
}
