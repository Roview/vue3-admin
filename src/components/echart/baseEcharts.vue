<template>
  <div ref="base-Echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
const echartDivRef = ref<HTMLElement>() //类型是div里面继承的那个类型
//setup中如何使用props 先导入defineProps
// defineProps({
//   //js自带的类型
//   width: String,
//   height: String
// })

//ts类型 默认是required   withDefaults是给我们props传过来的值给个默认值
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)
onMounted(() => {
  const echartInstance = echarts.init(echartDivRef.value!)
  echartInstance.setOption(props.options)
})
</script>

<style scoped></style>
