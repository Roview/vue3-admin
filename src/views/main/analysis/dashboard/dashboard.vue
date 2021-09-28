<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)" />
      </el-col>
      <el-col :span="10"> <hy-card title="不同城市商品销售" /></el-col>
      <el-col :span="7"> <hy-card title="分类商品数量(饼图)" /></el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <base-echarts :options="options"></base-echarts>
        </hy-card>
      </el-col>
      <el-col :span="12"> <hy-card title="分类商品的收藏" /></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import BaseEcharts from '../../../../components/echart/baseEcharts.vue'
import HyCard from '../../../../components/card/index'
export default defineComponent({
  name: 'dashboard',
  components: {
    HyCard,
    BaseEcharts
  },
  setup() {
    const store = useStore()
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }
    store.dispatch('dashboardModule/getDashboardDataAction')
    return {
      option
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
