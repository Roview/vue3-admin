<template>
  <div class="user">
    <page-search :form-config="formConfig" />
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageSearch from '../../../../components/page-search/pageSearch.vue'
import { IForm } from '../../../../interface/requestInterface'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch
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
          field: 'passWord',
          type: 'password',
          label: '密码',
          rules: [],
          placeholder: '请输入密码'
        },
        {
          field: 'sport',
          type: 'select',
          label: '喜欢的运动',
          rules: [],
          placeholder: '请输入喜欢的运动',
          options: [
            { title: '篮球', value: 'basketball' },
            { title: '足球', value: 'football' }
          ]
        },
        {
          field: 'createTime',
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
    return {
      formConfig
    }
  }
})
</script>

<style scoped></style>
