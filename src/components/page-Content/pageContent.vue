<template>
  <div class="page-content">
    <!--    @selectionChange="selectionChange"-->
    <hy-table
      v-bind="contentTableConfig"
      :list-data="dataList"
      :list-count="dataCount"
      v-model:pageList="pageInfo"
      :title="pageName === 'role' ? '角色管理' : '用户管理'"
    >
      <template #headerHandler>
        <el-button v-if="isCreate" @click="handleAddUser">新建用户</el-button>
        <el-button icon="el-icon-refresh"></el-button>
      </template>
      <!--row的方法就把scope传递出来-->
      <template #enable="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.creatAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handle="scope">
        <div class="handle-btns">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            v-if="isUpdate"
            @click="handleUpdateUser(scope.row)"
            >编辑
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除
          </el-button>
        </div>
      </template>
      <!--动态插槽=>把固定的插槽排除-->
      <!--动态遍历插槽赋值 动态插入剩余的插槽 -->
      <!-- 动态插槽-->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import HyTable from '../../components/table/table.vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { usePermission } from '../../hooks/use-permission'

export default defineComponent({
  name: 'pageContent',
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    HyTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    //获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    //双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    //如果pageInfo改变 就重新赋值
    watch(pageInfo, () => {
      console.log(72, pageInfo)
      getPageDate()
    })
    const getPageDate = (queryInfo: any = {}) => {
      console.log(76, '执行', pageInfo)
      if (!isQuery) return false //没有搜索的权限 就不需要直接请求
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo //结构对象就是把对象里的所有值全部拿出来
        }
      })
    }
    getPageDate()
    // const userList = computed(() => store.state.systemModule.userList) //获取的数据保存state中
    //从systemModule模块里面拿到getter里面的数据  返回的是一个函数   从返回的函数里面取出user和role的数据
    const dataList = computed(() =>
      store.getters['systemModule/pageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['systemModule/pageListCount'](props.pageName)
    )
    //删除用户
    const handleDeleteClick = (row: any) => {
      console.log('删除', { ...row })
      store.dispatch('systemModule/deletePageDataAction', {
        pageName: props.pageName,
        id: row.id
      })
    }
    //添加新用户
    const handleAddUser = () => {
      emit('newBtnClick')
    }
    //编辑当前用户
    const handleUpdateUser = (row: any) => {
      emit('editBtnClick', row)
    }
    //获取其他的动态插槽的名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        // if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handle') return false
        return true
      }
    )
    return {
      dataList,
      getPageDate,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleAddUser,
      handleUpdateUser
    }
  }
})
</script>

<style scoped></style>
