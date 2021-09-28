<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          style="margin-right: 10px"
          size="small"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></el-avatar>
        <span>{{ userName }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-close" @click="handleExitClick"
            >退出登陆</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-user">用户信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-tools">系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import localCache from '../../../utils/catch'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'user-info',
  setup() {
    const store = useStore()
    const router = useRouter()
    const userName = computed(() => store.state.login.userInfo.name)

    const handleExitClick = () => {
      console.log('退出登陆')
      localCache.deleteCatch('token')
      router.push('/main')
    }
    return {
      userName,
      handleExitClick
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
  padding: 10px 10px;
}
</style>
