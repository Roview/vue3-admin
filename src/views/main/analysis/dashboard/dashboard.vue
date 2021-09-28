<template>
  <div class="dashboard">
    <div ref="divRef" :style="{ width: '600px', height: '600px' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import * as echarts from 'echarts'
export default defineComponent({
  name: 'dashboard',
  setup() {
    const divRef = ref<HTMLElement>() //给divRef指定类型
    onMounted(() => {
      //在onMounted生命周期 此时页面已经完全加载出来 可以给这个ref断言
      const echartsInstance = echarts.init(divRef.value!, 'light', {
        renderer: 'svg'
      })
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
      echartsInstance.setOption(option)
    })
    return {
      divRef
    }
  }
})
</script>

<style scoped></style>
