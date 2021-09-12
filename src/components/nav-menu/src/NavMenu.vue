<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="../../../assets/img/logo.svg" alt="" />
      <span class="title">后台管理</span>
    </div>
    <!--      :collapse="collapse"-->
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      background-color="#0c2135"
      :unique-opened="true"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="submitter in item.children" :key="submitter.id">
              <el-menu-item :index="submitter.id + ''">
                <i v-if="submitter.icon" :class="submitter.icon" />
                <span>{{ submitter.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span> {{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../../../store'
export default defineComponent({
  name: 'NavMenu',
  setup() {
    const store = useStore()
    // const userMenus = store.state.login.userMenus //菜单路由
    const userMenus = computed(() => store.state.login.userMenus)
    console.log(userMenus.value)
    return {
      userMenus
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  //height: 100%;
  background-color: #001529;
  //background-color: red;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 100%;
      //width: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
