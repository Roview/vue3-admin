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
      @newBtnClick="handleNewBtnClick"
      @editBtnClick="handleEditBtnClick"
    >
      <template #enable="scope">
        <div>{{ scope.row.enable ? '启用' : '警用' }}</div>
      </template>
    </page-content>

    <page-module
      page-name="users"
      :defaultInfo="defaultInfo"
      ref="pageModuleRef"
      :modal-config="modalConfigRef"
    >
    </page-module>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import PageSearch from '../../../../components/page-search/pageSearch.vue'
import { IForm } from '../../../../interface/requestInterface'
import pageContent from '../../../../components/page-Content/pageContent.vue'
import { contentTableConfig } from './config/content.config'
import { usePageSearch } from '../../../../hooks/usePageSearch'
import { modalConfig } from './config/modal.config'
import pageModule from '../../../../components/nav-menu/src/pageModule.vue'
import { usePageModal } from '../../../../hooks/use-page-modal'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    pageContent,
    pageModule
  },
  setup() {
    const store = useStore()
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

    //pageModal相关的hook逻辑
    //newCallBack 和 editCallBack  是对密码进行显示隐藏
    const newCallBack = () => {
      //查找配置中有无password配置项
      const passwordItem = modalConfig.formItem.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallBack = () => {
      //查找配置中有无password配置项
      const passwordItem = modalConfig.formItem.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    //动态添加部门和角色列表

    //动态数据如果发生变化,因为computed返回的是一个ref对象
    //如果里的数据发生变化，这里的函数会重新执行，并且返回一个最新的数据
    const modalConfigRef = computed(() => {
      const departMeantItem = modalConfig.formItem?.find(
        (item) => item.field === 'departmentId'
      )
      //使用map返回个对象  因为options 需要的是一个对象
      departMeantItem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return { title: item.name, value: item.id }
        }
      )
      const departRoleItem = modalConfig.formItem?.find(
        (item) => item.field === 'roleId'
      )
      departRoleItem!.options = store.state.entireRole.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      //这里返回的是修改过后最新的数据 因为store.state.entireDepartment里面的数据发生变化 computed会重新执行并且返回一个ref对象
      return modalConfig
    })

    const [handleNewBtnClick, handleEditBtnClick, pageModuleRef, defaultInfo] =
      usePageModal(newCallBack, editCallBack)

    return {
      formConfig,
      contentTableConfig,
      queryBtnClick,
      resetBtnClick,
      pageContent,
      pageContentRef,
      modalConfig,
      handleNewBtnClick,
      handleEditBtnClick,
      pageModuleRef,
      defaultInfo,
      modalConfigRef
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
