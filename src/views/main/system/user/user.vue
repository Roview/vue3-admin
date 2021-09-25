<template>
  <div class="user">
    <page-search
      :form-config="formConfig"
      @queryBtnClick="queryBtnClick"
      @resetBtnClick="resetBtnClick"
    />
    <page-content
      ref="pageContentRef"
      pageName="users"
      :contentTableConfig="contentTableConfig"
    >
      <template #enable="scope">
        <div>{{ scope.row.enable ? '启用' : '警用' }}</div>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '../../../../components/page-search/pageSearch.vue'
import { IForm } from '../../../../interface/requestInterface'
import pageContent from '../../../../components/page-Content/pageContent.vue'
import { contentTableConfig } from './config/content.config'
import { usePageSearch } from '../../../../hooks/usePageSearch'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    pageContent
  },
  setup() {
    const formConfig: IForm = {
      labelWidth: '100px',
      itemStyle: {
        padding: '20px 60px'
      },
      formItem: [
        {
          field: 'name', //对象的key
          type: 'input',
          label: '用户名',
          rules: [],
          placeholder: '请输入用户名'
        },
        {
          field: 'realName',
          type: 'password',
          label: '真实姓名',
          rules: [],
          placeholder: '请输入真实姓名'
        },
        {
          field: 'enable',
          type: 'select',
          label: '用户状态',
          rules: [],
          placeholder: '请输入用户状态',
          options: [
            { title: '启用', value: '1' },
            { title: '禁用', value: '0' }
          ]
        },
        {
          field: 'createAt',
          type: 'datepicker',
          label: '创建时间',
          rules: [],
          placeholder: '请创建时间',
          otherOptions: {
            startPlaceholder: '开始时间',
            endPlaceholder: '开始时间',
            type: 'daterange' //给一个选择时间的范围
          }
        }
      ]
    }
    //hooks直接导入
    const [queryBtnClick, resetBtnClick, pageContentRef] = usePageSearch()
    return {
      formConfig,
      contentTableConfig,
      queryBtnClick,
      resetBtnClick,
      pageContent,
      pageContentRef
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
