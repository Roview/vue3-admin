<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClickChange"
    ></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NavHeader',
  setup() {
    const isFold = ref(false)
    const handleFoldClickChange = () => {
      isFold.value = !isFold.value
    }
    return {
      isFold,
      handleFoldClickChange
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
    margin-left: 50%;
  }
}
</style>
