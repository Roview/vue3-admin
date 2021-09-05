<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i>账号登陆</span>
        </template>
        <login-account />
      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i>手机登陆</span>
        </template>
        <loginPhone />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPhone from './login-phone.vue'
import loginAccount from './login-account.vue'

export default defineComponent({
  name: 'loginPanel',
  components: {
    loginPhone,
    loginAccount
  }
  // setup() {}
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 120px;
  width: 320px;
  .title {
    text-align: center;
  }
}
</style>
