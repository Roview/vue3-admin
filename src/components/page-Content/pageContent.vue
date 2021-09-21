<template>
  <div class="page-content">
    <hy-table
      v-bind="contentTableConfig"
      :list-data="dataList"
      @selectionChange="selectionChange"
      :title="pageName === 'role' ? '角色管理' : '用户管理'"
    >
      <template #headerHandler>
        <el-button @click="addUser">新建用户</el-button>
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
      <template #handle>
        <div class="handle-btns">
          <el-button size="mini" type="text" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button size="mini" type="text" icon="el-icon-delete"
            >删除</el-button
          >
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import HyTable from '../../components/table/table.vue'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

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
  setup(props) {
    const store = useStore()
    store.dispatch('systemModule/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    // const userList = computed(() => store.state.systemModule.userList) //获取的数据保存state中
    //从systemModule模块里面拿到getter里面的数据  返回的是一个函数   从返回的函数里面取出user和role的数据
    const dataList = computed(() =>
      store.getters['systemModule/pageListData'](props.pageName)
    )

    // const userCount = computed(() => store.state.systemModule.userCount)
    // const selectionChange = (value: any) => {
    //   console.log('全选:', value)
    // }
    // const addUser = () => {
    //   console.log('添加用户')
    // }
    return {
      dataList
      // selectionChange,
      // addUser,
      // userCount
    }
  }
})
</script>

<style scoped></style>
