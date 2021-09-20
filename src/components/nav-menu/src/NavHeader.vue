<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      style="margin-top: 8px"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClickChange"
    ></i>
    <div class="content">
      <nav-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import NavBreadcrumb from './navBreadcrumb.vue'
import userInfo from './user-info.vue'
import { pathMapToMenuCopy } from '../../../utils/map-menus'

export default defineComponent({
  name: 'NavHeader',
  emits: ['foldChange'],
  components: {
    userInfo,
    NavBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)

    const handleFoldClickChange = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value) //子传父事件
    }
    //利用computed每次菜单和当前路由改变都会执行
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      const cs = pathMapToMenuCopy(userMenus, currentPath)
      console.log(45, cs)
      return cs
    })
    return {
      isFold,
      handleFoldClickChange,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
    //margin-left: 50%;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
