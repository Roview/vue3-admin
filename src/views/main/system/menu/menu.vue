<template>
  <div class="menu">
    <page-content
      :content-table-config="menuContentTableConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '../../../../components/page-Content/pageContent.vue'
import { menuContentTableConfig } from './config/menu.config'
export default defineComponent({
  name: 'hy-menu',
  components: {
    pageContent
  },
  setup() {
    return {
      menuContentTableConfig
    }
  }
})
</script>

<style scoped></style>
