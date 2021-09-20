<template>
  <div>
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../../../interface/requestInterface'
export default defineComponent({
  name: 'navBreadcrumb',
  props: {
    //确定传的是什么类型
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>, //prop传过来一个具体的类型
      default: () => []
    }
  }
})
</script>

<style scoped></style>
