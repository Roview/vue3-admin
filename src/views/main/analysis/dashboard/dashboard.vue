<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)">
          <pie-echarts :pieData="categoryGoodsCount"></pie-echarts>
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销售">
          <map-echarts :mapData="addressGoodsSale"></map-echarts>
        </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量(玫瑰图)">
          <rose-echarts :roseData="categoryGoodsCount"></rose-echarts>
        </hy-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <libe-echarts v-bind="categoryGoodsSale"></libe-echarts>
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏">
          <bar-echarts v-bind="categoryGoodsFavor"></bar-echarts>
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import BaseEcharts from '../../../../components/echart/baseEcharts.vue'
import HyCard from '../../../../components/card/index'
import PieEcharts from '../../../../components/page-echarts/pieEcharts.vue'
import RoseEcharts from '../../../../components/page-echarts/roseEcharts.vue'
import LibeEcharts from '../../../../components/page-echarts/libeEcharts.vue'
import BarEcharts from '../../../../components/page-echarts/barEcharts.vue'
import MapEcharts from '../../../../components/page-echarts/mapEcharts.vue'

export default defineComponent({
  name: 'dashboard',
  components: {
    MapEcharts,
    BarEcharts,
    LibeEcharts,
    RoseEcharts,
    HyCard,
    PieEcharts
  },
  setup() {
    const store = useStore()
    //如果数据发生变化，我们这里的数据也会发生变化
    const categoryGoodsCount = computed(() => {
      return store.state.dashboardModule.categoryGoodsCounts.map(
        (item: any) => {
          return { name: item.name, value: item.goodsCount }
        }
      )
    })
    store.dispatch('dashboardModule/getDashboardDataAction')

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const value: any[] = []
      for (const item of store.state.dashboardModule.categoryGoodsSale) {
        xLabels.push(item.name)
        value.push(item.goodsCount)
      }
      return {
        xLabels,
        value
      }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const value: any[] = []
      for (const item of store.state.dashboardModule.categoryGoodsFavor) {
        console.log(82, item)
        xLabels.push(item.name)
        value.push(item.goodsFavor)
      }
      return {
        xLabels,
        value
      }
    })
    //这里最好用computed 因为接口返回的值是会变化 这里有依赖是会变化的
    const addressGoodsSale = computed(() => {
      return store.state.dashboardModule.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
