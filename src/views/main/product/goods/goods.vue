<template>
  <div class="goods">
    <page-content
      :content-table-config="goodsContentTableConfig"
      pageName="goods"
    >
      <template #image="scope">
        <!--preview-src-list：预览一张-->
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">
        {{ '¥' + scope.row.oldPrice }}
      </template>
      <template #status="scope">
        {{ scope.row.status ? '启用' : '禁用' }}
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '../../../../components/page-Content/pageContent.vue'
import { goodsContentTableConfig } from './config/goods.config'

export default defineComponent({
  name: 'goods',
  components: {
    pageContent
  },
  setup() {
    return {
      goodsContentTableConfig
    }
  }
})
</script>

<style scoped></style>
