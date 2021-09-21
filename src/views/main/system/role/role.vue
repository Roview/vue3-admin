<template>
  <div class="role">
    <page-search :form-config="searchFormConfig"></page-search>
    <page-content
      page-name="role"
      :content-table-config="contentTableConfig"
    ></page-content>
  </div>
</template>

<script lang="ts">
import pageContent from '../../../../components/page-Content/pageContent.vue'
import PageSearch from '../../../../components/page-search/pageSearch.vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'role',
  components: {
    pageContent,
    PageSearch
  },
  setup() {
    return {
      contentTableConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
