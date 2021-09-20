<template>
  <div class="user">
    <page-search :form-config="formConfig" />
    <div class="content">
      <hy-table :listData="userList" :propList="propList" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import PageSearch from '../../../../components/page-search/pageSearch.vue'
import { IForm } from '../../../../interface/requestInterface'
import HyTable from '../../../../components/table/table.vue'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    HyTable
  },
  setup() {
    let store = useStore()
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
    store.dispatch('systemModule/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.systemModule.userList)
    const userCount = computed(() => store.state.systemModule.userCount)
    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100' },
      { prop: 'creatAt', label: '创建时间', minWidth: '250' },
      { prop: 'updateAt', label: '更新时间', minWidth: '250' }
    ]
    return {
      formConfig,
      userList,
      userCount,
      propList
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
