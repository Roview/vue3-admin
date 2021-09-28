<template>
  <div class="role">
    <page-search :form-config="searchFormConfig"></page-search>

    <page-content
      page-name="role"
      :content-table-config="contentTableConfig"
      @newBtnClick="handleNewBtnClick"
      @editBtnClick="handleEditBtnClick"
    ></page-content>

    <page-module
      ref="pageModuleRef"
      :other-info="otherInfo"
      :modal-config="roleConfig"
      page-name="role"
      :default-info="defaultInfo"
    >
      <!--      请求完整的菜单-->
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          @check="handleCheckChange"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
        >
        </el-tree>
      </div>
    </page-module>
  </div>
</template>

<script lang="ts">
import pageContent from '../../../../components/page-Content/pageContent.vue'
import PageSearch from '../../../../components/page-search/pageSearch.vue'
import { useStore } from 'vuex'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { defineComponent, computed, ref, nextTick } from 'vue'
import { roleConfig } from './config/role.config'
import PageModule from '../../../../components/nav-menu/src/pageModule.vue'
import { usePageModal } from '../../../../hooks/use-page-modal'
import { getMenuLeaf } from '../../../../utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    PageModule,
    pageContent,
    PageSearch
  },
  setup() {
    const store = useStore()
    const otherInfo = ref({})
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    //从usePageModal函数里拿到我们当前需要编辑的内容
    const editCallBack = (row: any) => {
      console.log(56, row)
      //叶子节点
      nextTick(() => {
        const leftKeys = getMenuLeaf(row.menuList)
        console.log(64, leftKeys)
        console.log(65, elTreeRef.value) //这里的value是拿不到的
        //将获取到的叶子节点回显到el-tree中  第二个默认参数false
        elTreeRef.value?.setCheckedKeys(leftKeys, false) //第二个给个默认值
      })
    }
    // const
    const [handleNewBtnClick, handleEditBtnClick, pageModuleRef, defaultInfo] =
      usePageModal(undefined, editCallBack)
    // 这个给计算属性可以保证我们最后拿到的数据是响应式的
    const menus = computed(() => store.state.entireMenu)
    console.log(54, { ...store.state.entireMenu })

    const handleCheckChange = (data1: any, data2: any) => {
      // console.log(61, data1, data2)
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      //当前点击的id
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList } //将对象丢进数组里
    }
    return {
      contentTableConfig,
      searchFormConfig,
      roleConfig,
      handleNewBtnClick,
      handleEditBtnClick,
      pageModuleRef,
      defaultInfo,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
